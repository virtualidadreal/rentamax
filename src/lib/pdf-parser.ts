/**
 * Parser de borrador de la Renta (PDF de la Agencia Tributaria)
 *
 * El borrador contiene casillas numeradas con formato "0001", "0003", etc.
 * Cada casilla tiene un numero y un valor asociado.
 * Este parser extrae todos los pares casilla-valor del PDF.
 */

import type { TextItem } from "pdfjs-dist/types/src/display/api";

export interface CasillaData {
  number: string; // "0001", "0435", etc.
  value: string; // El valor tal cual aparece
  numericValue?: number; // Valor numerico parseado
  page: number;
}

export interface BorradorData {
  casillas: Map<string, CasillaData>;
  rawText: string;
  pageCount: number;
  extractionDate: string;
  // Datos principales extraidos
  comunidadAutonoma?: string;
  rendimientosTrabajo?: number;
  rendimientosActividades?: number;
  baseImponibleGeneral?: number;
  baseImponibleAhorro?: number;
  cuotaIntegra?: number;
  cuotaLiquida?: number;
  resultadoDeclaracion?: number;
  deduccionesAplicadas: AppliedDeduction[];
}

export interface AppliedDeduction {
  casilla: string;
  name: string;
  amount: number;
}

// Mapa de casillas conocidas del IRPF (Modelo 100)
const CASILLA_NAMES: Record<string, string> = {
  // Datos personales
  "0001": "NIF declarante",
  "0007": "Comunidad autonoma",
  "0009": "Fecha nacimiento",

  // Rendimientos del trabajo
  "0003": "Retribuciones dinerarias",
  "0012": "Total ingresos trabajo",
  "0018": "Gastos deducibles trabajo",
  "0022": "Rendimiento neto trabajo",
  "0025": "Rendimiento neto reducido trabajo",

  // Rendimientos capital inmobiliario
  "0063": "Ingresos capital inmobiliario",
  "0070": "Rendimiento neto capital inmobiliario",

  // Rendimientos actividades economicas
  "0109": "Ingresos actividades economicas",
  "0122": "Rendimiento neto actividades",
  "0130": "Rendimiento neto reducido actividades",

  // Base imponible
  "0435": "Base imponible general",
  "0460": "Base imponible del ahorro",

  // Reducciones base imponible
  "0470": "Reduccion planes pensiones",
  "0476": "Reduccion pension compensatoria",
  "0480": "Base liquidable general",
  "0485": "Base liquidable del ahorro",

  // Minimos personales y familiares
  "0500": "Minimo contribuyente",
  "0510": "Minimo descendientes",
  "0516": "Minimo ascendientes",
  "0520": "Minimo discapacidad",

  // Cuota integra
  "0545": "Cuota integra estatal",
  "0546": "Cuota integra autonomica",

  // Deducciones en cuota
  "0547": "Deduccion vivienda habitual",
  "0548": "Deduccion donativos",
  "0549": "Deduccion rentas Ceuta/Melilla",
  "0550": "Deduccion maternidad",
  "0557": "Deduccion familia numerosa",
  "0559": "Deduccion discapacidad a cargo",
  "0564": "Deduccion autonomicas total",
  "0565": "Deduccion inversiones empresas nueva creacion",
  "0567": "Deduccion eficiencia energetica reduccion demanda",
  "0568": "Deduccion eficiencia energetica mejora consumo",
  "0569": "Deduccion eficiencia energetica rehabilitacion",
  "0570": "Deduccion vehiculo electrico",
  "0571": "Deduccion punto recarga",

  // Cuota liquida
  "0595": "Cuota liquida estatal",
  "0596": "Cuota liquida autonomica",

  // Retenciones y pagos a cuenta
  "0597": "Retenciones trabajo",
  "0598": "Retenciones capital",
  "0599": "Retenciones actividades",
  "0600": "Pagos fraccionados",

  // Resultado
  "0610": "Cuota diferencial",
  "0670": "Resultado declaracion",

  // Deduccion especial 2025
  "0414": "Deduccion por baja renta (nueva 2025)",
};

// Casillas que representan deducciones aplicadas
const DEDUCTION_CASILLAS = [
  "0547", "0548", "0549", "0550", "0557", "0559", "0564",
  "0565", "0567", "0568", "0569", "0570", "0571", "0414",
  "0470",
];

export async function parseBorradorPDF(file: File): Promise<BorradorData> {
  const arrayBuffer = await file.arrayBuffer();

  // Dynamic import of pdfjs-dist for client-side only
  const pdfjsLib = await import("pdfjs-dist");

  // Set worker source
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const casillas = new Map<string, CasillaData>();
  let rawText = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const items = textContent.items.filter(
      (item): item is TextItem => "str" in item
    );

    const pageText = items.map((item) => item.str).join(" ");
    rawText += pageText + "\n\n";

    // Strategy 1: Find casilla patterns like "[0435] 25.000,00" or "Casilla 435: 25.000,00"
    // The borrador uses numbered boxes with format XXXX
    for (let j = 0; j < items.length; j++) {
      const text = items[j].str.trim();

      // Pattern: 3-4 digit number that could be a casilla
      const casillaMatch = text.match(/^(?:\[)?(\d{3,4})(?:\])?$/);
      if (casillaMatch) {
        const num = casillaMatch[1].padStart(4, "0");

        // Look at the next few items for the value
        for (let k = j + 1; k < Math.min(j + 5, items.length); k++) {
          const nextText = items[k].str.trim();
          // Spanish number format: 25.000,00 or 1.234,56 or just 0,00
          const valueMatch = nextText.match(
            /^-?[\d.]+,\d{2}$|^-?\d+(?:\.\d{3})*(?:,\d{2})?$/
          );
          if (valueMatch) {
            const numericValue = parseSpanishNumber(nextText);
            casillas.set(num, {
              number: num,
              value: nextText,
              numericValue,
              page: i,
            });
            break;
          }
        }
      }
    }

    // Strategy 2: Regex on full page text for patterns like "0435 25.000,00"
    const regex =
      /(?:^|\s)(\d{3,4})\s+(-?[\d.]+,\d{2})/g;
    let match;
    while ((match = regex.exec(pageText)) !== null) {
      const num = match[1].padStart(4, "0");
      if (!casillas.has(num)) {
        const numericValue = parseSpanishNumber(match[2]);
        casillas.set(num, {
          number: num,
          value: match[2],
          numericValue,
          page: i,
        });
      }
    }
  }

  // Extract known deductions
  const deduccionesAplicadas: AppliedDeduction[] = [];
  for (const casillaNum of DEDUCTION_CASILLAS) {
    const casilla = casillas.get(casillaNum);
    if (casilla && casilla.numericValue && casilla.numericValue > 0) {
      deduccionesAplicadas.push({
        casilla: casillaNum,
        name: CASILLA_NAMES[casillaNum] || `Casilla ${casillaNum}`,
        amount: casilla.numericValue,
      });
    }
  }

  return {
    casillas,
    rawText,
    pageCount: pdf.numPages,
    extractionDate: new Date().toISOString(),
    comunidadAutonoma: casillas.get("0007")?.value,
    rendimientosTrabajo: casillas.get("0012")?.numericValue,
    rendimientosActividades: casillas.get("0122")?.numericValue,
    baseImponibleGeneral: casillas.get("0435")?.numericValue,
    baseImponibleAhorro: casillas.get("0460")?.numericValue,
    cuotaIntegra:
      (casillas.get("0545")?.numericValue || 0) +
      (casillas.get("0546")?.numericValue || 0),
    cuotaLiquida:
      (casillas.get("0595")?.numericValue || 0) +
      (casillas.get("0596")?.numericValue || 0),
    resultadoDeclaracion: casillas.get("0670")?.numericValue,
    deduccionesAplicadas,
  };
}

function parseSpanishNumber(str: string): number {
  // "25.000,50" → 25000.50
  // "-1.234,56" → -1234.56
  const cleaned = str.replace(/\./g, "").replace(",", ".");
  const result = parseFloat(cleaned);
  return isNaN(result) ? 0 : result;
}

export function getCasillaName(number: string): string {
  return CASILLA_NAMES[number] || `Casilla ${number}`;
}

export { CASILLA_NAMES };
