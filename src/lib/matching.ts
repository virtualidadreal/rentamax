import { QuestionnaireState, CompanyBenefit } from "./types";

export type DeductionRelevance = "direct" | "ccaa_potential" | "general_info";

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
  relevance: DeductionRelevance;
}

export interface TaxModeComparison {
  individualSaving: number;
  conjuntaSaving: number;
  recommendation: "individual" | "conjunta";
  difference: number;
}

export interface MatchResult {
  deductions: MatchedDeduction[];
  totalEstimatedSaving: number;
  byCategory: Record<string, { count: number; saving: number }>;
  byScope: Record<string, number>;
  highlights: string[];
  directCount: number;
  ccaaPotentialCount: number;
  generalInfoCount: number;
  taxModeComparison?: TaxModeComparison;
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

  // New questionnaire fields
  if (c.hasFosterCare === true) {
    if (!state.hasFosterCare) return false;
  }

  if (c.livesInRuralArea === true) {
    if (!state.livesInRuralArea) return false;
  }

  if (c.hasCeliac === true) {
    if (!state.hasCeliac) return false;
  }

  if (c.hasStudentLoans === true) {
    if (!state.hasStudentLoans) return false;
  }

  if (c.wasFiredIn2025 === true) {
    if (!state.wasFiredIn2025) return false;
  }

  if (c.workedAbroad === true) {
    if (!state.workedAbroad) return false;
  }

  // Company benefits (specific benefit type)
  if (c.companyBenefit && typeof c.companyBenefit === "string") {
    if (!state.companyBenefits.includes(c.companyBenefit as CompanyBenefit))
      return false;
  }

  // Company benefits (any)
  if (c.hasCompanyBenefits === true) {
    if (state.companyBenefits.length === 0) return false;
  }

  return true;
}

// Determines if a deduction has "direct" relevance (user's answers positively confirm it)
// vs "potential" relevance (not excluded, but no positive evidence from answers)
function determineRelevance(
  deduction: DeductionData,
  state: QuestionnaireState
): DeductionRelevance {
  const c = deduction.conditions;
  if (!c) return "general_info";

  // Deductions that are universal for their demographic and always apply
  const alwaysDirectIds = [
    // Universal taxpayer
    "est_minimo_contribuyente",
    // Universal employees
    "est_reduccion_rendimientos_trabajo",
    "est_gastos_trabajo",
    // Universal autonomos - standard deductible expenses
    "aut_consumos_explotacion",
    "aut_cuotas_reta",
    "aut_alquiler_local",
    "aut_suministros_hogar",
    "aut_vehiculo",
    "aut_dietas_manutencion",
    "aut_formacion",
    "aut_seguro_medico",
    "aut_hardware_software",
    "aut_publicidad_marketing",
    "aut_servicios_profesionales",
    "aut_gastos_representacion",
    "aut_colegios_profesionales_autonomo",
    "aut_sueldos_empleados",
    "aut_gastos_viaje",
    "aut_seguros_rc",
    "aut_gastos_financieros",
    "aut_tributos_deducibles",
    "aut_amortizaciones",
    "aut_comunicaciones",
    "aut_reduccion_rentas_bajas",
    "aut_mutualistas_alternativos",
  ];
  if (alwaysDirectIds.includes(deduction.id)) return "direct";

  const keys = Object.keys(c).filter((k) => k !== "isNew2025");
  if (keys.length === 0) return "general_info";

  // Specific evidence: user actively confirmed a situation in the questionnaire
  const specificEvidenceChecks: Array<() => boolean> = [
    () => c.hasChildren === true && state.children.length > 0,
    () => c.hasDisability === true && state.hasDisability,
    () => c.hasAscendants === true && state.hasAscendants,
    () => c.hasMortgage === true && state.hasMortgage,
    () => c.hasEnergyWorks === true && state.hasEnergyWorks,
    () => c.hasElectricVehicle === true && state.hasElectricVehicle,
    () => c.hasPensionPlan === true && state.pensionPlanContribution > 0,
    () => c.hasDonations === true && state.hasDonations,
    () => c.hasStartupInvestment === true && state.hasStartupInvestment,
    () => c.hasCrypto === true && state.hasCrypto,
    () => c.worksFromHome === true && state.worksFromHome,
    () => c.hasMovedForWork === true && state.hasMovedForWork,
    () => c.isLandlord === true && state.isLandlord,
    () => c.hasEducationExpenses === true && state.hasEducationExpenses,
    () => c.hasMedicalExpenses === true && state.hasMedicalExpenses,
    () => c.affectedByDANA === true && state.affectedByDANA,
    () => c.hasVetExpenses === true && state.hasVetExpenses,
    () => c.hasSportsExpenses === true && state.hasSportsExpenses,
    () => c.hasChargingPoint === true && state.hasChargingPoint,
    () => c.isNewActivity === true && state.isNewActivity2025,
    () =>
      c.housingType !== undefined &&
      typeof c.housingType === "string" &&
      state.housingType === c.housingType,
    () =>
      c.housingBoughtBefore2013 === true && state.housingBoughtBefore2013,
    () =>
      c.rentContractBefore2015 === true && state.rentContractBefore2015,
    () =>
      c.requiresMarried === true && state.maritalStatus === "casado",
    () =>
      c.isLargeFamily === true &&
      (state.familyType === "numerosa" ||
        state.familyType === "numerosa_especial"),
    () =>
      c.isSingleParent === true && state.familyType === "monoparental",
    () =>
      Array.isArray(c.familyType) &&
      c.familyType.length > 0 &&
      c.familyType.includes(state.familyType) &&
      state.familyType !== "general",
    () =>
      c.disabilityDegree !== undefined &&
      typeof c.disabilityDegree === "number" &&
      state.hasDisability &&
      state.disabilityDegree >= c.disabilityDegree,
    // New questionnaire fields
    () => c.hasFosterCare === true && state.hasFosterCare,
    () => c.livesInRuralArea === true && state.livesInRuralArea,
    () => c.hasCeliac === true && state.hasCeliac,
    () => c.hasStudentLoans === true && state.hasStudentLoans,
    () => c.wasFiredIn2025 === true && state.wasFiredIn2025,
    () => c.workedAbroad === true && state.workedAbroad,
    () => c.hasCompanyBenefits === true && state.companyBenefits.length > 0,
    () =>
      c.companyBenefit !== undefined &&
      typeof c.companyBenefit === "string" &&
      state.companyBenefits.includes(c.companyBenefit as CompanyBenefit),
  ];

  // If any specific evidence check passes, it's a direct match
  if (specificEvidenceChecks.some((check) => check())) {
    return "direct";
  }

  // Demographic data as positive evidence when the deduction specifically
  // targets that demographic (not just uses it as a passive filter)
  // A deduction is "direct" if ALL its non-CCAA conditions match AND
  // those conditions are sufficiently specific (2+ conditions, or age/income bound)
  const nonCcaaKeys = keys.filter(
    (k) => !["ccaa", "isNew2025"].includes(k)
  );
  if (nonCcaaKeys.length >= 2) {
    // Multiple demographic conditions = targeted enough to be direct
    // (e.g., employment + maxAge, or employment + maxIncome)
    const demographicChecks: Array<() => boolean> = [
      () =>
        Array.isArray(c.employment) &&
        c.employment.length > 0 &&
        (c.employment.includes(state.employmentType) ||
          (state.employmentType === "ambos" &&
            (c.employment.includes("asalariado") ||
              c.employment.includes("autonomo")))),
      () =>
        c.maxAge !== undefined &&
        typeof c.maxAge === "number" &&
        state.age !== null &&
        state.age <= c.maxAge,
      () =>
        c.minAge !== undefined &&
        typeof c.minAge === "number" &&
        state.age !== null &&
        state.age >= c.minAge,
      () =>
        c.maxIncome !== undefined &&
        typeof c.maxIncome === "number" &&
        state.grossIncome <= c.maxIncome,
    ];
    const matchingDemographic = demographicChecks.filter((check) =>
      check()
    ).length;
    if (matchingDemographic >= 2) return "direct";
    // CCAA + 1 demographic that matches = also direct
    if (
      c.ccaa &&
      Array.isArray(c.ccaa) &&
      c.ccaa.includes(state.ccaa) &&
      matchingDemographic >= 1
    )
      return "direct";
  }

  // Single age-bound deduction in user's CCAA (e.g., minAge: 65 for a 70 year old)
  if (c.ccaa && Array.isArray(c.ccaa) && c.ccaa.includes(state.ccaa)) {
    if (
      c.minAge !== undefined &&
      typeof c.minAge === "number" &&
      state.age !== null &&
      state.age >= c.minAge
    )
      return "direct";
  }

  // Autonomica deductions that passed CCAA filter but no specific evidence
  if (
    c.ccaa &&
    Array.isArray(c.ccaa) &&
    c.ccaa.length > 0
  ) {
    return "ccaa_potential";
  }

  // Estatales without specific evidence = general informational
  return "general_info";
}

function estimateSaving(
  deduction: DeductionData,
  state: QuestionnaireState
): number {
  const marginalRate = getMarginalRate(state.grossIncome);
  const type = deduction.type;
  const base = getDeductionBase(deduction, state);

  // Special cases: child-count, donations (handled by dedicated functions)
  const childSaving = calculateChildSaving(deduction, state);
  if (childSaving !== null) return childSaving;

  const donationSaving = calculateDonationSaving(deduction, state);
  if (donationSaving !== null) return donationSaving;

  // Has percentage + calculable base → most accurate path
  if (deduction.percentage && base > 0) {
    const amount = deduction.maxAmount
      ? Math.min((base * deduction.percentage) / 100, deduction.maxAmount)
      : (base * deduction.percentage) / 100;

    if (type === "deduccion_cuota") return Math.round(amount);
    return Math.round(amount * marginalRate);
  }

  // Has maxAmount but no percentage or base → use maxAmount
  if (deduction.maxAmount) {
    if (type === "deduccion_cuota") return deduction.maxAmount;
    return Math.round(deduction.maxAmount * marginalRate);
  }

  // No maxAmount, no percentage, but has base → base is the deductible amount
  if (base > 0) {
    if (type === "deduccion_cuota") return Math.round(base);
    return Math.round(base * marginalRate);
  }

  return 0;
}

function calculateChildSaving(
  deduction: DeductionData,
  state: QuestionnaireState
): number | null {
  const id = deduction.id;

  // Maternidad: 1200 EUR per child under 3 (+ up to 1000 for childcare)
  if (id === "est_maternidad") {
    const under3 = state.children.filter((c) => c.age < 3).length;
    if (under3 === 0) return 0;
    const guarderiaPerChild = Math.min(
      1000,
      state.educationExpenses.guarderia / Math.max(under3, 1)
    );
    return under3 * (1200 + guarderiaPerChild);
  }

  // Familia numerosa general: 1200 + 600 per child beyond 3
  if (id === "est_familia_numerosa_general") {
    const extra = Math.max(0, state.children.length - 3);
    return 1200 + extra * 600;
  }

  // Familia numerosa especial: 2400 + 600 per child beyond 5
  if (id === "est_familia_numerosa_especial") {
    const extra = Math.max(0, state.children.length - 5);
    return 2400 + extra * 600;
  }

  // Minimo por descendientes: progressive scale
  if (id === "est_minimo_descendientes") {
    const marginalRate = getMarginalRate(state.grossIncome);
    const amounts = [2400, 2700, 4000, 4500]; // 1st, 2nd, 3rd, 4th+
    let total = 0;
    for (let i = 0; i < state.children.length; i++) {
      total += amounts[Math.min(i, amounts.length - 1)];
      if (state.children[i].age < 3) total += 2800; // additional for under 3
    }
    return Math.round(total * marginalRate);
  }

  return null; // not a child-specific deduction
}

function calculateDonationSaving(
  deduction: DeductionData,
  state: QuestionnaireState
): number | null {
  if (!state.hasDonations || state.donationAmount <= 0) return null;

  // Donativos Ley 49/2002 (mecenazgo): 80% first 250, 40% rest (45% if recurrent)
  if (deduction.id === "est_donativos_mecenazgo" || deduction.id === "est_donativos_50") {
    const first250 = Math.min(state.donationAmount, 250) * 0.8;
    const rest =
      state.donationAmount > 250
        ? (state.donationAmount - 250) *
          (state.donationRecurrent ? 0.45 : 0.4)
        : 0;
    return Math.round(first250 + rest);
  }

  // Donativos no Ley 49/2002: flat 10%
  if (deduction.id === "est_donativos_no_ley49" || deduction.id === "est_donativos_10") {
    return Math.round(state.donationAmount * 0.1);
  }

  return null; // not a donation deduction
}

function getDeductionBase(
  deduction: DeductionData,
  state: QuestionnaireState
): number {
  const cat = deduction.category;

  if (cat === "vivienda" && state.hasMortgage) {
    const payment =
      state.mortgageAnnualPayment > 0
        ? state.mortgageAnnualPayment
        : state.grossIncome * 0.3;
    return Math.min(9040, payment);
  }
  if (cat === "vivienda" && state.housingType === "alquiler") {
    return state.monthlyRent * 12;
  }
  if (cat === "donaciones" && state.hasDonations) {
    return state.donationAmount;
  }
  if (cat === "emprendimiento" && state.hasStartupInvestment) {
    return Math.min(state.startupInvestmentAmount, 100000);
  }
  if (cat === "vehiculo_electrico" && state.hasElectricVehicle) {
    return Math.min(state.electricVehicleAmount, 20000);
  }
  if (cat === "ahorro" && state.pensionPlanContribution > 0) {
    return Math.min(state.pensionPlanContribution, deduction.maxAmount || 0);
  }
  if (cat === "educacion" && state.hasEducationExpenses) {
    return Object.values(state.educationExpenses).reduce((a, b) => a + b, 0);
  }
  if (cat === "salud" && state.hasMedicalExpenses) {
    return state.medicalExpenses;
  }
  if (cat === "salud" && state.hasSportsExpenses) {
    return state.sportsExpenses;
  }
  if (cat === "otros" && state.hasVetExpenses) {
    return state.vetExpenses;
  }
  if (cat === "eficiencia_energetica" && state.hasEnergyWorks) {
    return state.energyWorksAmount;
  }
  if (cat === "vivienda" && state.isLandlord) {
    return state.landlordAnnualIncome;
  }
  if (cat === "autonomo" || deduction.id.startsWith("aut_")) {
    const b = state.autonomoExpenseBreakdown;
    const id = deduction.id;
    // Map specific autonomo deductions to their sub-category
    if (id === "aut_cuotas_reta" || id === "aut_mutualistas_alternativos")
      return b.reta;
    if (id === "aut_alquiler_local") return b.alquilerLocal;
    if (id === "aut_vehiculo" || id === "aut_gastos_viaje" || id === "aut_dietas_manutencion")
      return b.vehiculo;
    if (id === "aut_suministros_hogar" || id === "aut_comunicaciones")
      return b.suministros;
    if (
      id === "aut_seguros_rc" ||
      id === "aut_colegios_profesionales_autonomo" ||
      id === "aut_servicios_profesionales" ||
      id === "aut_gastos_financieros"
    )
      return b.profesional;
    if (
      id === "aut_formacion" ||
      id === "aut_hardware_software" ||
      id === "aut_publicidad_marketing" ||
      id === "aut_consumos_explotacion" ||
      id === "aut_amortizaciones" ||
      id === "aut_tributos_deducibles" ||
      id === "aut_gastos_representacion"
    )
      return b.otros;
    if (id === "aut_sueldos_empleados") return 0; // needs separate employee cost data
    // Fallback to total
    return state.autonomoExpenses;
  }

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

// Conjunta brackets are ~double the individual thresholds
function getMarginalRateConjunta(income: number): number {
  if (income <= 24900) return 0.19;
  if (income <= 40400) return 0.24;
  if (income <= 70400) return 0.30;
  if (income <= 120000) return 0.37;
  if (income <= 600000) return 0.45;
  return 0.47;
}

// Calculate total tax using progressive brackets (not just marginal rate)
function calculateTax(income: number, conjunta: boolean): number {
  const brackets = conjunta
    ? [
        { limit: 24900, rate: 0.19 },
        { limit: 40400, rate: 0.24 },
        { limit: 70400, rate: 0.30 },
        { limit: 120000, rate: 0.37 },
        { limit: 600000, rate: 0.45 },
        { limit: Infinity, rate: 0.47 },
      ]
    : [
        { limit: 12450, rate: 0.19 },
        { limit: 20200, rate: 0.24 },
        { limit: 35200, rate: 0.30 },
        { limit: 60000, rate: 0.37 },
        { limit: 300000, rate: 0.45 },
        { limit: Infinity, rate: 0.47 },
      ];

  let tax = 0;
  let prev = 0;
  for (const b of brackets) {
    if (income <= prev) break;
    const taxable = Math.min(income, b.limit) - prev;
    tax += taxable * b.rate;
    prev = b.limit;
  }
  return Math.round(tax);
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
      const relevance = determineRelevance(d as DeductionData, state);
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
        relevance,
      });
    }
  }

  // Sort: direct first, then ccaa_potential, then general_info
  const relevanceOrder: Record<DeductionRelevance, number> = {
    direct: 0,
    ccaa_potential: 1,
    general_info: 2,
  };
  matched.sort((a, b) => {
    if (a.relevance !== b.relevance) {
      return relevanceOrder[a.relevance] - relevanceOrder[b.relevance];
    }
    return (b.estimatedSaving || 0) - (a.estimatedSaving || 0);
  });

  // Calculate totals (only from direct matches for the headline number)
  const directDeductions = matched.filter((d) => d.relevance === "direct");
  const totalEstimatedSaving = directDeductions.reduce(
    (sum, d) => sum + (d.estimatedSaving || 0),
    0
  );

  // Only count direct + ccaa_potential for stats (exclude general_info)
  const visibleDeductions = matched.filter(
    (d) => d.relevance !== "general_info"
  );

  // Group by category (visible only)
  const byCategory: Record<string, { count: number; saving: number }> = {};
  for (const d of visibleDeductions) {
    if (!byCategory[d.category]) {
      byCategory[d.category] = { count: 0, saving: 0 };
    }
    byCategory[d.category].count++;
    byCategory[d.category].saving += d.estimatedSaving || 0;
  }

  // Group by scope (visible only)
  const byScope: Record<string, number> = {};
  for (const d of visibleDeductions) {
    byScope[d.scope] = (byScope[d.scope] || 0) + 1;
  }

  // Highlights (direct only)
  const highlights: string[] = [];
  const newOnes = directDeductions.filter((d) => d.isNew2025);
  if (newOnes.length > 0) {
    highlights.push(
      `${newOnes.length} deducciones son NOVEDADES para la Renta 2025`
    );
  }
  if (totalEstimatedSaving > 100) {
    highlights.push(
      `Podrias ahorrarte unos ${Math.round(totalEstimatedSaving).toLocaleString("es-ES")} EUR`
    );
  }
  const bigSavers = directDeductions.filter(
    (d) => d.estimatedSaving && d.estimatedSaving > 200
  );
  if (bigSavers.length > 0) {
    highlights.push(
      `${bigSavers.length} deducciones con ahorro potencial superior a 500 EUR`
    );
  }

  const directCount = matched.filter((d) => d.relevance === "direct").length;
  const ccaaPotentialCount = matched.filter(
    (d) => d.relevance === "ccaa_potential"
  ).length;
  const generalInfoCount = matched.filter(
    (d) => d.relevance === "general_info"
  ).length;

  // Tax mode comparison (only for married/widowed who can choose)
  let taxModeComparison: TaxModeComparison | undefined;
  if (
    state.maritalStatus === "casado" ||
    state.maritalStatus === "viudo"
  ) {
    const conjuntaReduction = state.maritalStatus === "casado" ? 3400 : 2150;
    const taxableIncome = Math.max(0, state.grossIncome - conjuntaReduction);

    const taxIndividual = calculateTax(state.grossIncome, false);
    const taxConjunta = calculateTax(taxableIncome, true);

    const individualSaving = totalEstimatedSaving;
    const conjuntaDiff = taxIndividual - taxConjunta;
    const conjuntaSaving = individualSaving + conjuntaDiff;

    const recommendation: "individual" | "conjunta" =
      conjuntaSaving > individualSaving ? "conjunta" : "individual";
    const difference = Math.abs(conjuntaSaving - individualSaving);

    taxModeComparison = {
      individualSaving,
      conjuntaSaving,
      recommendation,
      difference,
    };
  }

  return {
    deductions: matched,
    totalEstimatedSaving,
    byCategory,
    byScope,
    highlights,
    directCount,
    ccaaPotentialCount,
    generalInfoCount,
    taxModeComparison,
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
