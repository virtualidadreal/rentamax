import { QuestionnaireState } from "./types";

export interface MatchedDeduction {
  id: string;
  name: string;
  description: string;
  type: string;
  scope: string;
  category: string;
  amount: string;
  maxAmount?: number;
  percentage?: number;
  casilla?: string;
  requirements: string[];
  documentation: string[];
  tips?: string;
  estimatedSaving?: number;
  isNew2025?: boolean;
}

export interface MatchResult {
  deductions: MatchedDeduction[];
  totalEstimatedSaving: number;
  byCategory: Record<string, { count: number; saving: number }>;
  byScope: Record<string, number>;
  highlights: string[];
}

interface DeductionData {
  id: string;
  name: string;
  description: string;
  type: string;
  scope: string;
  category: string;
  amount: string;
  maxAmount?: number;
  percentage?: number;
  casilla?: string;
  requirements: string[];
  documentation: string[];
  incompatibilities?: string[];
  tips?: string;
  conditions: Record<string, unknown>;
}

function matchesConditions(
  deduction: DeductionData,
  state: QuestionnaireState
): boolean {
  const c = deduction.conditions;
  if (!c) return true;

  // CCAA filter
  if (c.ccaa && Array.isArray(c.ccaa) && c.ccaa.length > 0) {
    if (!c.ccaa.includes(state.ccaa)) return false;
  }

  // Employment filter
  if (c.employment && Array.isArray(c.employment) && c.employment.length > 0) {
    const emp = state.employmentType;
    if (emp === "ambos") {
      if (
        !c.employment.includes("asalariado") &&
        !c.employment.includes("autonomo")
      )
        return false;
    } else if (!c.employment.includes(emp)) {
      return false;
    }
  }

  // Income filter
  if (c.maxIncome && typeof c.maxIncome === "number") {
    if (state.grossIncome > c.maxIncome) return false;
  }

  // Age filter
  if (c.minAge && typeof c.minAge === "number") {
    if (state.age !== null && state.age < c.minAge) return false;
  }
  if (c.maxAge && typeof c.maxAge === "number") {
    if (state.age !== null && state.age > c.maxAge) return false;
  }

  // Children filter
  if (c.hasChildren === true) {
    if (state.children.length === 0) return false;
  }

  // Children age filter
  if (c.childrenMaxAge && typeof c.childrenMaxAge === "number") {
    const maxAge = c.childrenMaxAge as number;
    if (!state.children.some((child) => child.age <= maxAge)) return false;
  }

  // Disability filter
  if (c.hasDisability === true) {
    if (!state.hasDisability) return false;
  }

  // Disability degree
  if (c.disabilityDegree && typeof c.disabilityDegree === "number") {
    if (state.disabilityDegree < c.disabilityDegree) return false;
  }

  // Ascendants
  if (c.hasAscendants === true) {
    if (!state.hasAscendants) return false;
  }

  // Housing
  if (c.housingType && typeof c.housingType === "string") {
    if (state.housingType !== c.housingType) return false;
  }

  if (c.housingBoughtBefore2013 === true) {
    if (!state.housingBoughtBefore2013) return false;
  }

  if (c.rentContractBefore2015 === true) {
    if (!state.rentContractBefore2015) return false;
  }

  if (c.hasMortgage === true) {
    if (!state.hasMortgage) return false;
  }

  // Family type
  if (c.familyType && Array.isArray(c.familyType) && c.familyType.length > 0) {
    if (!c.familyType.includes(state.familyType)) return false;
  }

  if (c.isLargeFamily === true) {
    if (
      state.familyType !== "numerosa" &&
      state.familyType !== "numerosa_especial"
    )
      return false;
  }

  if (c.isSingleParent === true) {
    if (state.familyType !== "monoparental") return false;
  }

  // Inversiones
  if (c.hasPensionPlan === true) {
    if (state.pensionPlanContribution <= 0) return false;
  }

  if (c.hasDonations === true) {
    if (!state.hasDonations) return false;
  }

  if (c.hasStartupInvestment === true) {
    if (!state.hasStartupInvestment) return false;
  }

  if (c.hasCrypto === true) {
    if (!state.hasCrypto) return false;
  }

  if (c.hasElectricVehicle === true) {
    if (!state.hasElectricVehicle) return false;
  }

  if (c.hasEnergyWorks === true) {
    if (!state.hasEnergyWorks) return false;
  }

  // Autonomo
  if (c.worksFromHome === true) {
    if (!state.worksFromHome) return false;
  }

  if (c.hasMovedForWork === true) {
    if (!state.hasMovedForWork) return false;
  }

  if (c.isLandlord === true) {
    if (!state.isLandlord) return false;
  }

  if (c.hasEducationExpenses === true) {
    if (!state.hasEducationExpenses) return false;
  }

  if (c.hasMedicalExpenses === true) {
    if (!state.hasMedicalExpenses) return false;
  }

  // Afectado por DANA
  if (c.affectedByDANA === true) {
    if (!state.affectedByDANA) return false;
  }

  // Gastos veterinarios
  if (c.hasVetExpenses === true) {
    if (!state.hasVetExpenses) return false;
  }

  // Gastos deportivos
  if (c.hasSportsExpenses === true) {
    if (!state.hasSportsExpenses) return false;
  }

  // Punto de recarga (sin necesidad de vehiculo electrico)
  if (c.hasChargingPoint === true) {
    if (!state.hasChargingPoint) return false;
  }

  // Casado (para tributacion conjunta)
  if (c.requiresMarried === true) {
    if (state.maritalStatus !== "casado") return false;
  }

  // Nueva actividad autonomo
  if (c.isNewActivity === true) {
    if (!state.isNewActivity2025) return false;
  }

  return true;
}

function estimateSaving(
  deduction: DeductionData,
  state: QuestionnaireState
): number {
  if (deduction.maxAmount) {
    if (deduction.percentage) {
      let base = 0;
      const cat = deduction.category;

      if (cat === "vivienda" && state.hasMortgage) {
        base = Math.min(9040, state.grossIncome * 0.3);
      } else if (cat === "vivienda" && state.housingType === "alquiler") {
        base = state.monthlyRent * 12;
      } else if (cat === "donaciones" && state.hasDonations) {
        base = state.donationAmount;
      } else if (cat === "emprendimiento" && state.hasStartupInvestment) {
        base = Math.min(state.startupInvestmentAmount, 100000);
      } else if (cat === "vehiculo_electrico" && state.hasElectricVehicle) {
        base = Math.min(state.electricVehicleAmount, 20000);
      } else if (cat === "ahorro" && state.pensionPlanContribution > 0) {
        const marginalRate = getMarginalRate(state.grossIncome);
        return Math.min(state.pensionPlanContribution, deduction.maxAmount) * marginalRate;
      } else if (cat === "educacion" && state.hasEducationExpenses) {
        const totalEdu = Object.values(state.educationExpenses).reduce((a, b) => a + b, 0);
        base = totalEdu;
      } else if (cat === "salud" && state.hasMedicalExpenses) {
        base = state.medicalExpenses;
      }

      if (base > 0) {
        return Math.min((base * deduction.percentage) / 100, deduction.maxAmount);
      }
    }
    // For fixed amount deductions (maternidad 1200, familia numerosa 1200, etc)
    return deduction.maxAmount;
  }

  // No maxAmount and no percentage = we can't estimate
  return 0;
}

function getMarginalRate(income: number): number {
  if (income <= 12450) return 0.19;
  if (income <= 20200) return 0.24;
  if (income <= 35200) return 0.30;
  if (income <= 60000) return 0.37;
  if (income <= 300000) return 0.45;
  return 0.47;
}

export async function matchDeductions(
  state: QuestionnaireState
): Promise<MatchResult> {
  // Dynamic import to keep the data file from loading on every page
  const { deductions } = await import("@/data/deductions");

  const matched: MatchedDeduction[] = [];

  for (const d of deductions) {
    if (matchesConditions(d as DeductionData, state)) {
      const saving = estimateSaving(d as DeductionData, state);
      matched.push({
        id: d.id,
        name: d.name,
        description: d.description,
        type: d.type,
        scope: d.scope,
        category: d.category,
        amount: d.amount,
        maxAmount: d.maxAmount,
        percentage: d.percentage,
        casilla: d.casilla,
        requirements: d.requirements,
        documentation: d.documentation,
        tips: d.tips,
        estimatedSaving: saving,
        isNew2025: d.conditions?.isNew2025 === true,
      });
    }
  }

  // Sort by estimated saving (highest first)
  matched.sort((a, b) => (b.estimatedSaving || 0) - (a.estimatedSaving || 0));

  // Calculate totals
  const totalEstimatedSaving = matched.reduce(
    (sum, d) => sum + (d.estimatedSaving || 0),
    0
  );

  // Group by category
  const byCategory: Record<string, { count: number; saving: number }> = {};
  for (const d of matched) {
    if (!byCategory[d.category]) {
      byCategory[d.category] = { count: 0, saving: 0 };
    }
    byCategory[d.category].count++;
    byCategory[d.category].saving += d.estimatedSaving || 0;
  }

  // Group by scope
  const byScope: Record<string, number> = {};
  for (const d of matched) {
    byScope[d.scope] = (byScope[d.scope] || 0) + 1;
  }

  // Highlights
  const highlights: string[] = [];
  const newOnes = matched.filter((d) => d.isNew2025);
  if (newOnes.length > 0) {
    highlights.push(
      `${newOnes.length} deducciones son NOVEDADES para la Renta 2025`
    );
  }
  if (totalEstimatedSaving > 1000) {
    highlights.push(
      `Podrias ahorrarte mas de ${Math.round(totalEstimatedSaving).toLocaleString("es-ES")} EUR`
    );
  }
  const bigSavers = matched.filter(
    (d) => d.estimatedSaving && d.estimatedSaving > 500
  );
  if (bigSavers.length > 0) {
    highlights.push(
      `${bigSavers.length} deducciones con ahorro potencial superior a 500 EUR`
    );
  }

  return {
    deductions: matched,
    totalEstimatedSaving,
    byCategory,
    byScope,
    highlights,
  };
}

export const CATEGORY_LABELS: Record<string, string> = {
  familia: "Familia",
  vivienda: "Vivienda",
  trabajo: "Trabajo",
  inversiones: "Inversiones",
  donaciones: "Donaciones y mecenazgo",
  discapacidad: "Discapacidad",
  educacion: "Educacion",
  salud: "Salud",
  eficiencia_energetica: "Eficiencia energetica",
  vehiculo_electrico: "Vehiculo electrico",
  emprendimiento: "Emprendimiento",
  ahorro: "Ahorro y pensiones",
  autonomo: "Autonomos",
  otros: "Otros",
};

export const CATEGORY_ICONS: Record<string, string> = {
  familia: "👨‍👩‍👧‍👦",
  vivienda: "🏠",
  trabajo: "💼",
  inversiones: "📈",
  donaciones: "🎗️",
  discapacidad: "♿",
  educacion: "📚",
  salud: "🏥",
  eficiencia_energetica: "🌱",
  vehiculo_electrico: "🚗",
  emprendimiento: "🚀",
  ahorro: "🏦",
  autonomo: "💻",
  otros: "📋",
};

export const SCOPE_LABELS: Record<string, string> = {
  estatal: "Estatal",
  autonomica: "Autonomica",
  autonomo: "Autonomos",
};
