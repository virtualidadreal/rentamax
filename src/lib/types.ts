export type CCAA =
  | "andalucia"
  | "aragon"
  | "asturias"
  | "baleares"
  | "canarias"
  | "cantabria"
  | "castilla_la_mancha"
  | "castilla_y_leon"
  | "cataluna"
  | "extremadura"
  | "galicia"
  | "madrid"
  | "murcia"
  | "la_rioja"
  | "comunidad_valenciana"
  | "ceuta"
  | "melilla"
  | "pais_vasco"
  | "navarra";

export const CCAA_NAMES: Record<CCAA, string> = {
  andalucia: "Andalucia",
  aragon: "Aragon",
  asturias: "Principado de Asturias",
  baleares: "Islas Baleares",
  canarias: "Canarias",
  cantabria: "Cantabria",
  castilla_la_mancha: "Castilla-La Mancha",
  castilla_y_leon: "Castilla y Leon",
  cataluna: "Cataluna",
  extremadura: "Extremadura",
  galicia: "Galicia",
  madrid: "Comunidad de Madrid",
  murcia: "Region de Murcia",
  la_rioja: "La Rioja",
  comunidad_valenciana: "Comunitat Valenciana",
  ceuta: "Ceuta",
  melilla: "Melilla",
  pais_vasco: "Pais Vasco",
  navarra: "Navarra",
};

export type EmploymentType =
  | "asalariado"
  | "autonomo"
  | "ambos"
  | "desempleado"
  | "jubilado"
  | "funcionario";

export type HousingType = "propiedad" | "alquiler" | "cedida" | "ninguna";
export type FamilyType =
  | "general"
  | "numerosa"
  | "numerosa_especial"
  | "monoparental";
export type MaritalStatus =
  | "soltero"
  | "casado"
  | "pareja_hecho"
  | "separado"
  | "divorciado"
  | "viudo";
export type TaxMode = "individual" | "conjunta";
export type EstimationType = "directa_simplificada" | "directa_normal" | "modulos";
export type CompanyBenefit =
  | "seguro_medico"
  | "tickets_restaurante"
  | "transporte"
  | "guarderia"
  | "acciones";

export interface ChildInfo {
  age: number;
  hasDisability: boolean;
  disabilityDegree?: number;
}

export interface QuestionnaireState {
  // Step 1: Datos personales
  ccaa: CCAA | "";
  age: number | null;
  maritalStatus: MaritalStatus | "";
  taxMode: TaxMode;
  hasDisability: boolean;
  disabilityDegree: number;
  livesInRuralArea: boolean;

  // Step 2: Familia
  children: ChildInfo[];
  familyType: FamilyType;
  hasAscendants: boolean;
  ascendantsOver65: number;
  ascendantsOver75: number;
  ascendantsWithDisability: boolean;
  hasFosterCare: boolean;

  // Step 3: Vivienda
  housingType: HousingType;
  housingBoughtBefore2013: boolean;
  hasMortgage: boolean;
  mortgageAnnualPayment: number;
  rentContractBefore2015: boolean;
  monthlyRent: number;
  isLandlord: boolean;
  landlordAnnualIncome: number;
  landlordInTensionedZone: boolean;
  landlordToYoung: boolean;
  hasEnergyWorks: boolean;
  energyWorksAmount: number;
  energyWorksType: string[];

  // Step 4: Trabajo
  employmentType: EmploymentType | "";
  grossIncome: number;
  hasMovedForWork: boolean;
  unionDues: number;
  hasLegalDefenseExpenses: boolean;
  wasFiredIn2025: boolean;
  workedAbroad: boolean;
  companyBenefits: CompanyBenefit[];

  // Step 5: Autonomos
  worksFromHome: boolean;
  estimationType: EstimationType;
  isNewActivity2025: boolean;
  autonomoExpenses: number;
  autonomoExpenseBreakdown: {
    reta: number;
    alquilerLocal: number;
    vehiculo: number;
    suministros: number;
    profesional: number;
    otros: number;
  };
  hasEmployees: boolean;

  // Step 6: Inversiones
  pensionPlanContribution: number;
  hasDonations: boolean;
  donationAmount: number;
  donationRecurrent: boolean;
  hasStartupInvestment: boolean;
  startupInvestmentAmount: number;
  hasCrypto: boolean;
  hasElectricVehicle: boolean;
  electricVehicleAmount: number;
  hasChargingPoint: boolean;

  // Step 7: Otros
  hasEducationExpenses: boolean;
  educationExpenses: {
    guarderia: number;
    escolaridad: number;
    libros: number;
    uniformes: number;
    idiomas: number;
    extraescolares: number;
  };
  hasMedicalExpenses: boolean;
  medicalExpenses: number;
  hasSportsExpenses: boolean;
  sportsExpenses: number;
  hasVetExpenses: boolean;
  vetExpenses: number;
  affectedByDANA: boolean;
  hasCeliac: boolean;
  hasStudentLoans: boolean;
}

export const initialState: QuestionnaireState = {
  ccaa: "",
  age: null,
  maritalStatus: "",
  taxMode: "individual",
  hasDisability: false,
  disabilityDegree: 0,
  livesInRuralArea: false,

  children: [],
  familyType: "general",
  hasAscendants: false,
  ascendantsOver65: 0,
  ascendantsOver75: 0,
  ascendantsWithDisability: false,
  hasFosterCare: false,

  housingType: "propiedad",
  housingBoughtBefore2013: false,
  hasMortgage: false,
  mortgageAnnualPayment: 0,
  rentContractBefore2015: false,
  monthlyRent: 0,
  isLandlord: false,
  landlordAnnualIncome: 0,
  landlordInTensionedZone: false,
  landlordToYoung: false,
  hasEnergyWorks: false,
  energyWorksAmount: 0,
  energyWorksType: [],

  employmentType: "",
  grossIncome: 0,
  hasMovedForWork: false,
  unionDues: 0,
  hasLegalDefenseExpenses: false,
  wasFiredIn2025: false,
  workedAbroad: false,
  companyBenefits: [],

  worksFromHome: false,
  estimationType: "directa_simplificada",
  isNewActivity2025: false,
  autonomoExpenses: 0,
  autonomoExpenseBreakdown: {
    reta: 0,
    alquilerLocal: 0,
    vehiculo: 0,
    suministros: 0,
    profesional: 0,
    otros: 0,
  },
  hasEmployees: false,

  pensionPlanContribution: 0,
  hasDonations: false,
  donationAmount: 0,
  donationRecurrent: false,
  hasStartupInvestment: false,
  startupInvestmentAmount: 0,
  hasCrypto: false,
  hasElectricVehicle: false,
  electricVehicleAmount: 0,
  hasChargingPoint: false,

  hasEducationExpenses: false,
  educationExpenses: {
    guarderia: 0,
    escolaridad: 0,
    libros: 0,
    uniformes: 0,
    idiomas: 0,
    extraescolares: 0,
  },
  hasMedicalExpenses: false,
  medicalExpenses: 0,
  hasSportsExpenses: false,
  sportsExpenses: 0,
  hasVetExpenses: false,
  vetExpenses: 0,
  affectedByDANA: false,
  hasCeliac: false,
  hasStudentLoans: false,
};
