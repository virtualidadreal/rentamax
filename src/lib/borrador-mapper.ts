/**
 * Mapper: Borrador PDF → QuestionnaireState
 *
 * Convierte los datos extraidos del borrador en estado del cuestionario,
 * e identifica que preguntas adicionales hacerle al usuario.
 */

import { BorradorData } from "./pdf-parser";
import { QuestionnaireState, initialState, CCAA } from "./types";

// Mapa de codigos CCAA de la AEAT a nuestros IDs
const CCAA_MAP: Record<string, CCAA> = {
  "01": "andalucia",
  "02": "aragon",
  "03": "asturias",
  "04": "baleares",
  "05": "canarias",
  "06": "cantabria",
  "07": "castilla_la_mancha",
  "08": "castilla_y_leon",
  "09": "cataluna",
  "10": "extremadura",
  "11": "galicia",
  "12": "madrid",
  "13": "murcia",
  "14": "la_rioja",
  "15": "comunidad_valenciana",
  "18": "ceuta",
  "19": "melilla",
  "16": "pais_vasco",
  "17": "navarra",
};

export interface MappingResult {
  state: Partial<QuestionnaireState>;
  detectedFields: string[];
  missingFields: string[];
  confidence: number;
  summary: ExtractedSummary;
}

export interface ExtractedSummary {
  ingresosTrabajo?: number;
  ingresosActividades?: number;
  baseImponible?: number;
  resultadoActual?: number;
  deduccionesAplicadas: { name: string; amount: number; casilla: string }[];
  deduccionesAplicadasTotal: number;
  retencionesTotal?: number;
}

export function mapBorradorToState(borrador: BorradorData): MappingResult {
  const state: Partial<QuestionnaireState> = {};
  const detectedFields: string[] = [];
  const missingFields: string[] = [];

  // --- CCAA ---
  if (borrador.comunidadAutonoma) {
    const ccaaCode = borrador.comunidadAutonoma.trim().padStart(2, "0");
    const ccaa = CCAA_MAP[ccaaCode];
    if (ccaa) {
      state.ccaa = ccaa;
      detectedFields.push("Comunidad autonoma");
    }
  }
  if (!state.ccaa) missingFields.push("Comunidad autonoma");

  // --- Ingresos ---
  const ingresosTrabajo = borrador.rendimientosTrabajo;
  const ingresosActividades = borrador.rendimientosActividades;

  if (ingresosTrabajo !== undefined && ingresosTrabajo > 0) {
    detectedFields.push("Rendimientos del trabajo");

    if (ingresosActividades && ingresosActividades > 0) {
      state.employmentType = "ambos";
      state.grossIncome = ingresosTrabajo + ingresosActividades;
      detectedFields.push("Rendimientos de actividades economicas");
    } else {
      state.employmentType = "asalariado";
      state.grossIncome = ingresosTrabajo;
    }
  } else if (ingresosActividades && ingresosActividades > 0) {
    state.employmentType = "autonomo";
    state.grossIncome = ingresosActividades;
    detectedFields.push("Rendimientos de actividades economicas");
  }
  if (!state.grossIncome) missingFields.push("Ingresos brutos");

  // --- Tipo empleo (autonomo) ---
  if (
    state.employmentType === "autonomo" ||
    state.employmentType === "ambos"
  ) {
    detectedFields.push("Situacion laboral: autonomo");
  }

  // --- Deducciones detectadas (ya aplicadas en borrador) ---
  const casillas = borrador.casillas;

  // Vivienda habitual
  const viviendaHabitual = casillas.get("0547");
  if (viviendaHabitual?.numericValue && viviendaHabitual.numericValue > 0) {
    state.housingType = "propiedad";
    state.housingBoughtBefore2013 = true;
    state.hasMortgage = true;
    detectedFields.push("Deduccion vivienda habitual (pre-2013)");
  }

  // Maternidad
  const maternidad = casillas.get("0550");
  if (maternidad?.numericValue && maternidad.numericValue > 0) {
    if (state.children === undefined || (Array.isArray(state.children) && state.children.length === 0)) {
      state.children = [{ age: 1, hasDisability: false }];
    }
    detectedFields.push("Deduccion por maternidad");
  }

  // Familia numerosa
  const famNumerosa = casillas.get("0557");
  if (famNumerosa?.numericValue && famNumerosa.numericValue > 0) {
    if (famNumerosa.numericValue > 1200) {
      state.familyType = "numerosa_especial";
    } else {
      state.familyType = "numerosa";
    }
    detectedFields.push("Deduccion familia numerosa");
  }

  // Discapacidad a cargo
  const discapacidad = casillas.get("0559");
  if (discapacidad?.numericValue && discapacidad.numericValue > 0) {
    detectedFields.push("Deduccion discapacidad a cargo");
  }

  // Minimos personales
  const minDescendientes = casillas.get("0510");
  if (minDescendientes?.numericValue && minDescendientes.numericValue > 0) {
    if (!state.children || state.children.length === 0) {
      // Estimate number of children from minimum amount
      // First child: 2.400, second: 2.700, third: 4.000, fourth+: 4.500
      state.children = [{ age: 5, hasDisability: false }];
    }
    detectedFields.push("Minimo por descendientes");
  }

  const minAscendientes = casillas.get("0516");
  if (minAscendientes?.numericValue && minAscendientes.numericValue > 0) {
    state.hasAscendants = true;
    state.ascendantsOver65 = 1;
    detectedFields.push("Minimo por ascendientes");
  }

  const minDiscapacidad = casillas.get("0520");
  if (minDiscapacidad?.numericValue && minDiscapacidad.numericValue > 0) {
    state.hasDisability = true;
    state.disabilityDegree = 33;
    detectedFields.push("Minimo por discapacidad");
  }

  // Planes pensiones
  const planesPensiones = casillas.get("0470");
  if (planesPensiones?.numericValue && planesPensiones.numericValue > 0) {
    state.pensionPlanContribution = planesPensiones.numericValue;
    detectedFields.push("Aportaciones a planes de pensiones");
  }

  // Donativos
  const donativos = casillas.get("0548");
  if (donativos?.numericValue && donativos.numericValue > 0) {
    state.hasDonations = true;
    state.donationAmount = donativos.numericValue * 2.5; // Estimate base from deduction
    detectedFields.push("Deduccion por donativos");
  }

  // Vehiculo electrico
  const vehiculo = casillas.get("0570");
  if (vehiculo?.numericValue && vehiculo.numericValue > 0) {
    state.hasElectricVehicle = true;
    state.electricVehicleAmount = (vehiculo.numericValue / 0.15); // Reverse calculate from 15%
    detectedFields.push("Deduccion vehiculo electrico");
  }

  // Punto recarga
  const puntoRecarga = casillas.get("0571");
  if (puntoRecarga?.numericValue && puntoRecarga.numericValue > 0) {
    state.hasChargingPoint = true;
    detectedFields.push("Deduccion punto de recarga");
  }

  // Eficiencia energetica
  const eficiencia1 = casillas.get("0567");
  const eficiencia2 = casillas.get("0568");
  const eficiencia3 = casillas.get("0569");
  if (
    (eficiencia1?.numericValue && eficiencia1.numericValue > 0) ||
    (eficiencia2?.numericValue && eficiencia2.numericValue > 0) ||
    (eficiencia3?.numericValue && eficiencia3.numericValue > 0)
  ) {
    state.hasEnergyWorks = true;
    detectedFields.push("Deduccion eficiencia energetica");
  }

  // Startups
  const startups = casillas.get("0565");
  if (startups?.numericValue && startups.numericValue > 0) {
    state.hasStartupInvestment = true;
    state.startupInvestmentAmount = (startups.numericValue / 0.5); // 50% deduction
    detectedFields.push("Deduccion inversion empresas nueva creacion");
  }

  // --- Lo que SIEMPRE falta en el borrador ---
  missingFields.push(
    "Edad exacta",
    "Estado civil",
    "Edades de hijos",
    "Gastos educativos",
    "Gastos medicos no cubiertos",
    "Gastos deportivos",
    "Gastos veterinarios",
    "Si trabaja desde casa",
    "Si es nueva actividad 2025",
    "Si las donaciones son recurrentes (3+ anos)",
    "Si alquila propiedad a terceros",
    "Si tiene contrato alquiler pre-2015",
    "Si ha sido afectado por la DANA",
    "Cuotas sindicales",
    "Gastos defensa juridica",
    "Si se ha mudado por trabajo"
  );

  // --- Resumen ---
  const retencionesTotal =
    (casillas.get("0597")?.numericValue || 0) +
    (casillas.get("0598")?.numericValue || 0) +
    (casillas.get("0599")?.numericValue || 0) +
    (casillas.get("0600")?.numericValue || 0);

  const summary: ExtractedSummary = {
    ingresosTrabajo: ingresosTrabajo,
    ingresosActividades: ingresosActividades || undefined,
    baseImponible: borrador.baseImponibleGeneral,
    resultadoActual: borrador.resultadoDeclaracion,
    deduccionesAplicadas: borrador.deduccionesAplicadas.map((d) => ({
      name: d.name,
      amount: d.amount,
      casilla: d.casilla,
    })),
    deduccionesAplicadasTotal: borrador.deduccionesAplicadas.reduce(
      (sum, d) => sum + d.amount,
      0
    ),
    retencionesTotal: retencionesTotal > 0 ? retencionesTotal : undefined,
  };

  const confidence = detectedFields.length / (detectedFields.length + missingFields.length);

  return {
    state,
    detectedFields,
    missingFields,
    confidence,
    summary,
  };
}

/**
 * Determina que pasos del cuestionario necesitan completarse
 * despues de importar el borrador.
 */
export function getRequiredSteps(mapping: MappingResult): number[] {
  const required: number[] = [];
  const s = mapping.state;

  // Step 0 (datos personales): casi siempre necesario (edad, estado civil)
  if (!s.age || !s.maritalStatus) required.push(0);

  // Step 1 (familia): si no detectamos hijos con precision
  required.push(1);

  // Step 2 (vivienda): si no detectamos tipo vivienda
  if (!s.housingType) required.push(2);

  // Step 3 (trabajo): si falta empleo o ingresos
  if (!s.employmentType || !s.grossIncome) required.push(3);

  // Step 4 (autonomos): solo si es autonomo
  if (s.employmentType === "autonomo" || s.employmentType === "ambos") {
    required.push(4);
  }

  // Step 5 (inversiones): parcialmente cubierto por borrador
  required.push(5);

  // Step 6 (otros): NUNCA esta en el borrador
  required.push(6);

  return required;
}
