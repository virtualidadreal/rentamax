"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  QuestionnaireState,
  initialState,
  CCAA_NAMES,
  CCAA,
  ChildInfo,
} from "@/lib/types";
import { parseBorradorPDF } from "@/lib/pdf-parser";
import {
  mapBorradorToState,
  MappingResult,
} from "@/lib/borrador-mapper";

const STEP_TITLES = [
  "Datos personales",
  "Situacion familiar",
  "Vivienda",
  "Trabajo e ingresos",
  "Autonomos",
  "Inversiones y ahorro",
  "Otros gastos",
];

const STEP_ICONS = ["👤", "👨‍👩‍👧‍👦", "🏠", "💼", "📊", "📈", "📝"];

function StepIndicator({
  current,
  total,
  titles,
}: {
  current: number;
  total: number;
  titles: string[];
}) {
  const progress = ((current + 1) / total) * 100;
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-primary">
          Paso {current + 1} de {total}
        </span>
        <span className="text-sm text-muted">{Math.round(progress)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-primary h-2 rounded-full animate-progress"
          style={{ width: `${progress}%` }}
        />
      </div>
      <h2 className="text-xl font-semibold mt-4 flex items-center gap-2">
        <span>{STEP_ICONS[current]}</span>
        {titles[current]}
      </h2>
    </div>
  );
}

function FormField({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5">
      <label className="block text-sm font-medium text-foreground mb-1.5">
        {label}
      </label>
      {hint && <p className="text-xs text-muted mb-1.5">{hint}</p>}
      {children}
    </div>
  );
}

function Toggle({
  checked,
  onChange,
  label,
  hint,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  hint?: string;
}) {
  return (
    <div
      className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/30 cursor-pointer mb-3"
      onClick={() => onChange(!checked)}
    >
      <div>
        <span className="text-sm font-medium">{label}</span>
        {hint && <p className="text-xs text-muted mt-0.5">{hint}</p>}
      </div>
      <div
        className={`w-11 h-6 rounded-full relative ${checked ? "bg-primary" : "bg-gray-300"}`}
      >
        <div
          className={`w-5 h-5 bg-white rounded-full absolute top-0.5 shadow ${checked ? "right-0.5" : "left-0.5"}`}
        />
      </div>
    </div>
  );
}

function NumberInput({
  value,
  onChange,
  placeholder,
  suffix,
  min,
  max,
}: {
  value: number | null;
  onChange: (v: number) => void;
  placeholder?: string;
  suffix?: string;
  min?: number;
  max?: number;
}) {
  return (
    <div className="relative">
      <input
        type="number"
        value={value != null && value > 0 ? value : ""}
        onChange={(e) => onChange(Number(e.target.value))}
        placeholder={placeholder}
        min={min}
        max={max}
        className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
      />
      {suffix && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted">
          {suffix}
        </span>
      )}
    </div>
  );
}

function SelectInput({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white"
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

// Step 1: Datos personales
function Step1({
  state,
  update,
}: {
  state: QuestionnaireState;
  update: (patch: Partial<QuestionnaireState>) => void;
}) {
  const ccaaOptions = Object.entries(CCAA_NAMES).map(([value, label]) => ({
    value,
    label,
  }));

  return (
    <div className="animate-fade-in space-y-1">
      <FormField label="Comunidad autonoma de residencia">
        <SelectInput
          value={state.ccaa}
          onChange={(v) => update({ ccaa: v as CCAA })}
          options={ccaaOptions}
          placeholder="Selecciona tu comunidad..."
        />
      </FormField>

      {(state.ccaa === "pais_vasco" || state.ccaa === "navarra") && (
        <div className="bg-warning-light border border-warning rounded-lg p-3 text-sm mb-4">
          <strong>Atencion:</strong> Pais Vasco y Navarra tienen regimen foral
          propio (Hacienda Foral). Sus deducciones son diferentes al IRPF
          estatal. Esta herramienta cubre el regimen comun. Consulta tu
          Hacienda Foral para informacion especifica.
        </div>
      )}

      <FormField label="Edad (a 31 de diciembre de 2025)">
        <NumberInput
          value={state.age}
          onChange={(v) => update({ age: v > 0 ? v : null })}
          placeholder="Ej: 35"
          min={16}
          max={120}
          suffix="anos"
        />
      </FormField>

      <FormField label="Estado civil">
        <SelectInput
          value={state.maritalStatus}
          onChange={(v) => update({ maritalStatus: v as QuestionnaireState["maritalStatus"] })}
          options={[
            { value: "soltero", label: "Soltero/a" },
            { value: "casado", label: "Casado/a" },
            { value: "pareja_hecho", label: "Pareja de hecho" },
            { value: "separado", label: "Separado/a legalmente" },
            { value: "divorciado", label: "Divorciado/a" },
            { value: "viudo", label: "Viudo/a" },
          ]}
          placeholder="Selecciona..."
        />
      </FormField>

      {(state.maritalStatus === "casado" ||
        state.maritalStatus === "viudo") && (
        <FormField
          label="Tipo de tributacion"
          hint="La tributacion conjunta puede ser beneficiosa si uno de los conyuges tiene pocos ingresos"
        >
          <div className="flex gap-3">
            {[
              { value: "individual", label: "Individual" },
              { value: "conjunta", label: "Conjunta" },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() =>
                  update({ taxMode: opt.value as QuestionnaireState["taxMode"] })
                }
                className={`flex-1 py-2 px-4 rounded-lg border text-sm font-medium ${
                  state.taxMode === opt.value
                    ? "border-primary bg-primary-light text-primary"
                    : "border-border hover:border-primary/30"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </FormField>
      )}

      <Toggle
        checked={state.hasDisability}
        onChange={(v) => update({ hasDisability: v })}
        label="Tengo una discapacidad reconocida"
        hint="Grado igual o superior al 33%"
      />

      {state.hasDisability && (
        <FormField label="Grado de discapacidad">
          <SelectInput
            value={String(state.disabilityDegree)}
            onChange={(v) => update({ disabilityDegree: Number(v) })}
            options={[
              { value: "33", label: "33% - 64%" },
              { value: "65", label: "65% o superior" },
            ]}
            placeholder="Selecciona grado..."
          />
        </FormField>
      )}
    </div>
  );
}

// Step 2: Familia
function Step2({
  state,
  update,
}: {
  state: QuestionnaireState;
  update: (patch: Partial<QuestionnaireState>) => void;
}) {
  const addChild = () => {
    update({
      children: [...state.children, { age: 0, hasDisability: false }],
    });
  };

  const removeChild = (index: number) => {
    update({ children: state.children.filter((_, i) => i !== index) });
  };

  const updateChild = (index: number, patch: Partial<ChildInfo>) => {
    const newChildren = [...state.children];
    newChildren[index] = { ...newChildren[index], ...patch };
    update({ children: newChildren });
  };

  return (
    <div className="animate-fade-in space-y-1">
      <div className="mb-5">
        <div className="flex justify-between items-center mb-3">
          <label className="text-sm font-medium">Hijos a cargo</label>
          <button
            onClick={addChild}
            className="text-sm text-primary font-medium hover:text-primary-dark"
          >
            + Anadir hijo
          </button>
        </div>

        {state.children.length === 0 && (
          <p className="text-sm text-muted p-3 bg-gray-50 rounded-lg">
            No hay hijos registrados. Pulsa &quot;Anadir hijo&quot; para agregar.
          </p>
        )}

        {state.children.map((child, i) => (
          <div
            key={i}
            className="p-3 border border-border rounded-lg mb-2 bg-gray-50"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Hijo {i + 1}</span>
              <button
                onClick={() => removeChild(i)}
                className="text-xs text-error hover:text-red-700"
              >
                Eliminar
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-muted">Edad a 31/12/2025</label>
                <NumberInput
                  value={child.age}
                  onChange={(v) => updateChild(i, { age: v })}
                  min={0}
                  max={30}
                />
              </div>
              <div className="flex items-end">
                <Toggle
                  checked={child.hasDisability}
                  onChange={(v) => updateChild(i, { hasDisability: v })}
                  label="Discapacidad"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <FormField label="Tipo de familia">
        <SelectInput
          value={state.familyType}
          onChange={(v) =>
            update({ familyType: v as QuestionnaireState["familyType"] })
          }
          options={[
            { value: "general", label: "General" },
            { value: "numerosa", label: "Familia numerosa (general)" },
            {
              value: "numerosa_especial",
              label: "Familia numerosa (especial - 5+ hijos)",
            },
            { value: "monoparental", label: "Familia monoparental" },
          ]}
        />
      </FormField>

      <Toggle
        checked={state.hasAscendants}
        onChange={(v) => update({ hasAscendants: v })}
        label="Tengo ascendientes a cargo"
        hint="Padres o abuelos que convivan contigo con rentas < 8.000 EUR/ano"
      />

      {state.hasAscendants && (
        <>
          <FormField label="Ascendientes mayores de 65 anos">
            <NumberInput
              value={state.ascendantsOver65}
              onChange={(v) => update({ ascendantsOver65: v })}
              min={0}
              max={10}
            />
          </FormField>
          <FormField label="De ellos, mayores de 75 anos">
            <NumberInput
              value={state.ascendantsOver75}
              onChange={(v) => update({ ascendantsOver75: v })}
              min={0}
              max={state.ascendantsOver65}
            />
          </FormField>
          <Toggle
            checked={state.ascendantsWithDisability}
            onChange={(v) => update({ ascendantsWithDisability: v })}
            label="Algun ascendiente con discapacidad"
          />
        </>
      )}
    </div>
  );
}

// Step 3: Vivienda
function Step3({
  state,
  update,
}: {
  state: QuestionnaireState;
  update: (patch: Partial<QuestionnaireState>) => void;
}) {
  return (
    <div className="animate-fade-in space-y-1">
      <FormField label="Tu vivienda habitual">
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: "propiedad", label: "En propiedad", icon: "🏡" },
            { value: "alquiler", label: "De alquiler", icon: "🔑" },
            { value: "cedida", label: "Cedida/familiar", icon: "🏠" },
            { value: "ninguna", label: "Otra situacion", icon: "📍" },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() =>
                update({ housingType: opt.value as QuestionnaireState["housingType"] })
              }
              className={`p-3 rounded-lg border text-sm font-medium text-left ${
                state.housingType === opt.value
                  ? "border-primary bg-primary-light text-primary"
                  : "border-border hover:border-primary/30"
              }`}
            >
              <span className="text-lg">{opt.icon}</span>
              <br />
              {opt.label}
            </button>
          ))}
        </div>
      </FormField>

      {state.housingType === "propiedad" && (
        <>
          <Toggle
            checked={state.housingBoughtBefore2013}
            onChange={(v) => update({ housingBoughtBefore2013: v })}
            label="Comprada antes del 1 de enero de 2013"
            hint="Solo si compraste antes de esa fecha puedes aplicar la deduccion por vivienda habitual"
          />
          <Toggle
            checked={state.hasMortgage}
            onChange={(v) => update({ hasMortgage: v })}
            label="Tengo hipoteca activa"
          />
        </>
      )}

      {state.housingType === "alquiler" && (
        <>
          <Toggle
            checked={state.rentContractBefore2015}
            onChange={(v) => update({ rentContractBefore2015: v })}
            label="Contrato firmado antes del 1 de enero de 2015"
            hint="Solo esos contratos permiten la deduccion estatal por alquiler"
          />
          <FormField label="Alquiler mensual">
            <NumberInput
              value={state.monthlyRent}
              onChange={(v) => update({ monthlyRent: v })}
              placeholder="Ej: 700"
              suffix="EUR/mes"
            />
          </FormField>
        </>
      )}

      <Toggle
        checked={state.isLandlord}
        onChange={(v) => update({ isLandlord: v })}
        label="Alquilo una propiedad a terceros"
        hint="Eres propietario de un inmueble que tienes alquilado"
      />

      {state.isLandlord && (
        <>
          <Toggle
            checked={state.landlordInTensionedZone}
            onChange={(v) => update({ landlordInTensionedZone: v })}
            label="El inmueble esta en zona tensionada"
            hint="La Ley de Vivienda establece reducciones mayores para zonas tensionadas"
          />
          <Toggle
            checked={state.landlordToYoung}
            onChange={(v) => update({ landlordToYoung: v })}
            label="El inquilino tiene entre 18 y 35 anos"
          />
        </>
      )}

      <Toggle
        checked={state.hasEnergyWorks}
        onChange={(v) => update({ hasEnergyWorks: v })}
        label="He hecho obras de eficiencia energetica en 2025"
        hint="Reduccion de demanda, mejora de consumo, o rehabilitacion energetica"
      />
    </div>
  );
}

// Step 4: Trabajo
function Step4({
  state,
  update,
}: {
  state: QuestionnaireState;
  update: (patch: Partial<QuestionnaireState>) => void;
}) {
  return (
    <div className="animate-fade-in space-y-1">
      <FormField label="Situacion laboral principal">
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: "asalariado", label: "Asalariado/a", icon: "👔" },
            { value: "autonomo", label: "Autonomo/a", icon: "💻" },
            { value: "ambos", label: "Ambos", icon: "🔄" },
            { value: "funcionario", label: "Funcionario/a", icon: "🏛️" },
            { value: "desempleado", label: "Desempleado/a", icon: "📋" },
            { value: "jubilado", label: "Jubilado/a", icon: "🌅" },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() =>
                update({
                  employmentType: opt.value as QuestionnaireState["employmentType"],
                })
              }
              className={`p-3 rounded-lg border text-sm font-medium text-left ${
                state.employmentType === opt.value
                  ? "border-primary bg-primary-light text-primary"
                  : "border-border hover:border-primary/30"
              }`}
            >
              <span className="text-lg">{opt.icon}</span>
              <br />
              {opt.label}
            </button>
          ))}
        </div>
      </FormField>

      <FormField
        label="Ingresos brutos anuales (aproximados)"
        hint="Suma de todos tus rendimientos del trabajo y actividades"
      >
        <NumberInput
          value={state.grossIncome}
          onChange={(v) => update({ grossIncome: v })}
          placeholder="Ej: 30000"
          suffix="EUR/ano"
        />
      </FormField>

      <Toggle
        checked={state.hasMovedForWork}
        onChange={(v) => update({ hasMovedForWork: v })}
        label="Me he mudado de municipio por trabajo en 2025"
        hint="Deduccion por movilidad geografica para desempleados que aceptan trabajo en otro municipio"
      />

      <FormField
        label="Cuotas sindicales anuales"
        hint="Deducibles de los rendimientos del trabajo"
      >
        <NumberInput
          value={state.unionDues}
          onChange={(v) => update({ unionDues: v })}
          placeholder="0"
          suffix="EUR"
        />
      </FormField>

      <Toggle
        checked={state.hasLegalDefenseExpenses}
        onChange={(v) => update({ hasLegalDefenseExpenses: v })}
        label="He tenido gastos de defensa juridica laboral"
        hint="Pleitos con el empleador, maximo deducible 300 EUR"
      />
    </div>
  );
}

// Step 5: Autonomos
function Step5({
  state,
  update,
}: {
  state: QuestionnaireState;
  update: (patch: Partial<QuestionnaireState>) => void;
}) {
  if (state.employmentType !== "autonomo" && state.employmentType !== "ambos") {
    return (
      <div className="animate-fade-in">
        <div className="bg-primary-light rounded-lg p-6 text-center">
          <p className="text-primary font-medium">
            Este paso es solo para autonomos
          </p>
          <p className="text-sm text-muted mt-1">
            Has indicado que tu situacion laboral es{" "}
            <strong>{state.employmentType || "no especificada"}</strong>.
            Puedes pasar al siguiente paso.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-1">
      <FormField label="Regimen de estimacion">
        <SelectInput
          value={state.estimationType}
          onChange={(v) =>
            update({ estimationType: v as QuestionnaireState["estimationType"] })
          }
          options={[
            {
              value: "directa_simplificada",
              label: "Estimacion directa simplificada (la mas comun)",
            },
            { value: "directa_normal", label: "Estimacion directa normal" },
            {
              value: "modulos",
              label: "Estimacion objetiva (modulos)",
            },
          ]}
        />
      </FormField>

      <Toggle
        checked={state.worksFromHome}
        onChange={(v) => update({ worksFromHome: v })}
        label="Trabajo desde casa"
        hint="Puedes deducir el 30% de los suministros proporcionalmente a los m2 usados"
      />

      <Toggle
        checked={state.isNewActivity2025}
        onChange={(v) => update({ isNewActivity2025: v })}
        label="Me di de alta como autonomo en 2025"
        hint="Reduccion del 20% sobre el rendimiento neto el primer ano y el siguiente"
      />

      <Toggle
        checked={state.hasEmployees}
        onChange={(v) => update({ hasEmployees: v })}
        label="Tengo empleados contratados"
      />

      <FormField
        label="Gastos deducibles totales estimados"
        hint="Cuotas RETA, alquiler local, suministros, material, seguros, gestor, etc."
      >
        <NumberInput
          value={state.autonomoExpenses}
          onChange={(v) => update({ autonomoExpenses: v })}
          placeholder="Ej: 8000"
          suffix="EUR/ano"
        />
      </FormField>
    </div>
  );
}

// Step 6: Inversiones
function Step6({
  state,
  update,
}: {
  state: QuestionnaireState;
  update: (patch: Partial<QuestionnaireState>) => void;
}) {
  return (
    <div className="animate-fade-in space-y-1">
      <FormField
        label="Aportaciones a plan de pensiones en 2025"
        hint="Maximo deducible: 1.500 EUR individual + 8.500 EUR de empleo"
      >
        <NumberInput
          value={state.pensionPlanContribution}
          onChange={(v) => update({ pensionPlanContribution: v })}
          placeholder="0"
          suffix="EUR"
        />
      </FormField>

      <Toggle
        checked={state.hasDonations}
        onChange={(v) => update({ hasDonations: v })}
        label="He hecho donaciones a ONGs, fundaciones o entidades beneficas"
        hint="80% de los primeros 250 EUR, 40% del resto (45% si son recurrentes)"
      />

      {state.hasDonations && (
        <>
          <FormField label="Importe total donado en 2025">
            <NumberInput
              value={state.donationAmount}
              onChange={(v) => update({ donationAmount: v })}
              placeholder="Ej: 500"
              suffix="EUR"
            />
          </FormField>
          <Toggle
            checked={state.donationRecurrent}
            onChange={(v) => update({ donationRecurrent: v })}
            label="Llevo donando a la misma entidad 3+ anos"
            hint="El porcentaje sube del 40% al 45% por fidelidad"
          />
        </>
      )}

      <Toggle
        checked={state.hasStartupInvestment}
        onChange={(v) => update({ hasStartupInvestment: v })}
        label="He invertido en startups o empresas de nueva creacion"
        hint="Deduccion del 50% sobre un maximo de 100.000 EUR"
      />

      {state.hasStartupInvestment && (
        <FormField label="Importe invertido en startups">
          <NumberInput
            value={state.startupInvestmentAmount}
            onChange={(v) => update({ startupInvestmentAmount: v })}
            placeholder="Ej: 10000"
            suffix="EUR"
          />
        </FormField>
      )}

      <Toggle
        checked={state.hasCrypto}
        onChange={(v) => update({ hasCrypto: v })}
        label="He operado con criptomonedas"
        hint="Las ganancias/perdidas tributan en la base del ahorro"
      />

      <Toggle
        checked={state.hasElectricVehicle}
        onChange={(v) => update({ hasElectricVehicle: v })}
        label="He comprado un vehiculo electrico en 2025"
        hint="Deduccion del 15% sobre un maximo de 20.000 EUR"
      />

      {state.hasElectricVehicle && (
        <FormField label="Precio del vehiculo">
          <NumberInput
            value={state.electricVehicleAmount}
            onChange={(v) => update({ electricVehicleAmount: v })}
            placeholder="Ej: 30000"
            suffix="EUR"
          />
        </FormField>
      )}

      <Toggle
        checked={state.hasChargingPoint}
        onChange={(v) => update({ hasChargingPoint: v })}
        label="He instalado un punto de recarga electrica"
        hint="Deduccion del 15% sobre un maximo de 4.000 EUR"
      />
    </div>
  );
}

// Step 7: Otros
function Step7({
  state,
  update,
}: {
  state: QuestionnaireState;
  update: (patch: Partial<QuestionnaireState>) => void;
}) {
  const updateEducation = (
    field: keyof QuestionnaireState["educationExpenses"],
    value: number
  ) => {
    update({
      educationExpenses: { ...state.educationExpenses, [field]: value },
    });
  };

  return (
    <div className="animate-fade-in space-y-1">
      <Toggle
        checked={state.hasEducationExpenses}
        onChange={(v) => update({ hasEducationExpenses: v })}
        label="Tengo gastos educativos de hijos"
        hint="Guarderias, colegios, libros, uniformes, idiomas"
      />

      {state.hasEducationExpenses && (
        <div className="pl-4 border-l-2 border-primary-light space-y-3 mb-4">
          {[
            { key: "guarderia" as const, label: "Guarderia / Escuela infantil 0-3" },
            { key: "escolaridad" as const, label: "Escolaridad" },
            { key: "libros" as const, label: "Libros de texto y material escolar" },
            { key: "uniformes" as const, label: "Uniformes" },
            { key: "idiomas" as const, label: "Ensenanza de idiomas" },
            { key: "extraescolares" as const, label: "Actividades extraescolares" },
          ].map((item) => (
            <FormField key={item.key} label={item.label}>
              <NumberInput
                value={state.educationExpenses[item.key]}
                onChange={(v) => updateEducation(item.key, v)}
                placeholder="0"
                suffix="EUR/ano"
              />
            </FormField>
          ))}
        </div>
      )}

      <Toggle
        checked={state.hasMedicalExpenses}
        onChange={(v) => update({ hasMedicalExpenses: v })}
        label="Tengo gastos medicos no cubiertos"
        hint="Gafas, ortodoncia, tratamientos no cubiertos por la SS (solo deducibles en algunas CCAA)"
      />

      {state.hasMedicalExpenses && (
        <FormField label="Gastos medicos totales en 2025">
          <NumberInput
            value={state.medicalExpenses}
            onChange={(v) => update({ medicalExpenses: v })}
            placeholder="Ej: 500"
            suffix="EUR"
          />
        </FormField>
      )}

      <Toggle
        checked={state.hasSportsExpenses}
        onChange={(v) => update({ hasSportsExpenses: v })}
        label="Tengo gastos en actividades deportivas"
        hint="Gimnasios, clubes deportivos (deducible en varias CCAA)"
      />

      {state.hasSportsExpenses && (
        <FormField label="Gastos deportivos en 2025">
          <NumberInput
            value={state.sportsExpenses}
            onChange={(v) => update({ sportsExpenses: v })}
            placeholder="Ej: 600"
            suffix="EUR"
          />
        </FormField>
      )}

      <Toggle
        checked={state.hasVetExpenses}
        onChange={(v) => update({ hasVetExpenses: v })}
        label="Tengo gastos veterinarios"
        hint="Deducible en algunas CCAA (Andalucia, CLM, Murcia, etc.)"
      />

      <Toggle
        checked={state.affectedByDANA}
        onChange={(v) => update({ affectedByDANA: v })}
        label="He sido afectado por la DANA"
        hint="Existen deducciones especiales para afectados en Comunitat Valenciana y otras zonas"
      />
    </div>
  );
}

const STEPS = [Step1, Step2, Step3, Step4, Step5, Step6, Step7];

// Borrador upload + summary component
function BorradorUpload({
  onBorradorParsed,
  onSkip,
}: {
  onBorradorParsed: (mapping: MappingResult) => void;
  onSkip: () => void;
}) {
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback(
    async (file: File) => {
      if (file.type !== "application/pdf") {
        setError("El archivo debe ser un PDF");
        return;
      }
      if (file.size > 20 * 1024 * 1024) {
        setError("El archivo es demasiado grande (maximo 20MB)");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const borrador = await parseBorradorPDF(file);
        const mapping = mapBorradorToState(borrador);
        onBorradorParsed(mapping);
      } catch (err) {
        console.error("Error parsing PDF:", err);
        setError(
          "No se pudo procesar el PDF. Asegurate de subir el borrador descargado de la Agencia Tributaria."
        );
      } finally {
        setLoading(false);
      }
    },
    [onBorradorParsed]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <div className="text-5xl mb-4">📄</div>
        <h2 className="text-2xl font-bold mb-2">Tienes tu borrador?</h2>
        <p className="text-muted max-w-md mx-auto">
          Sube el PDF del borrador de la Agencia Tributaria y extraeremos tus
          datos automaticamente. Despues te haremos solo las preguntas que
          faltan.
        </p>
      </div>

      {/* Drop zone */}
      <div
        className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer mb-6 ${
          dragging
            ? "border-primary bg-primary-light"
            : "border-border hover:border-primary/50"
        } ${loading ? "opacity-50 pointer-events-none" : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => {
          const input = document.createElement("input");
          input.type = "file";
          input.accept = ".pdf";
          input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) handleFile(file);
          };
          input.click();
        }}
      >
        {loading ? (
          <div>
            <div className="text-3xl mb-3 animate-pulse">⏳</div>
            <p className="font-medium">Procesando borrador...</p>
            <p className="text-sm text-muted mt-1">
              Extrayendo casillas y datos fiscales
            </p>
          </div>
        ) : (
          <div>
            <div className="text-3xl mb-3">
              {dragging ? "📥" : "📎"}
            </div>
            <p className="font-medium">
              {dragging
                ? "Suelta el PDF aqui"
                : "Arrastra tu borrador aqui o haz clic para seleccionarlo"}
            </p>
            <p className="text-sm text-muted mt-2">
              PDF del borrador de Renta 2025 (maximo 20MB)
            </p>
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-error/20 rounded-lg p-3 text-sm text-error mb-6">
          {error}
        </div>
      )}

      {/* Security note */}
      <div className="bg-primary-light rounded-xl p-4 mb-6">
        <h4 className="font-medium text-primary text-sm mb-1">
          Tu privacidad es importante
        </h4>
        <p className="text-xs text-primary/70">
          El PDF se procesa completamente en tu navegador. Ningun dato sale de
          tu ordenador. No almacenamos ni enviamos tu informacion fiscal a
          ningun servidor.
        </p>
      </div>

      {/* Skip button */}
      <div className="text-center">
        <button
          onClick={onSkip}
          className="text-muted hover:text-foreground text-sm font-medium underline underline-offset-2"
        >
          No tengo el borrador, prefiero rellenar el cuestionario
        </button>
      </div>
    </div>
  );
}

// Borrador summary after parsing
function BorradorSummary({
  mapping,
  onContinue,
  onRetry,
}: {
  mapping: MappingResult;
  onContinue: () => void;
  onRetry: () => void;
}) {
  const s = mapping.summary;

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-6">
        <div className="text-4xl mb-3">✅</div>
        <h2 className="text-xl font-bold mb-1">Borrador procesado</h2>
        <p className="text-sm text-muted">
          Hemos extraido {mapping.detectedFields.length} datos de tu borrador
        </p>
      </div>

      {/* Key figures */}
      {(s.ingresosTrabajo || s.ingresosActividades || s.resultadoActual !== undefined) && (
        <div className="grid grid-cols-2 gap-3 mb-6">
          {s.ingresosTrabajo !== undefined && s.ingresosTrabajo > 0 && (
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xs text-muted">Ingresos trabajo</div>
              <div className="font-semibold">
                {s.ingresosTrabajo.toLocaleString("es-ES")} EUR
              </div>
            </div>
          )}
          {s.ingresosActividades !== undefined && s.ingresosActividades > 0 && (
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xs text-muted">Ingresos actividades</div>
              <div className="font-semibold">
                {s.ingresosActividades.toLocaleString("es-ES")} EUR
              </div>
            </div>
          )}
          {s.baseImponible !== undefined && s.baseImponible > 0 && (
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xs text-muted">Base imponible</div>
              <div className="font-semibold">
                {s.baseImponible.toLocaleString("es-ES")} EUR
              </div>
            </div>
          )}
          {s.resultadoActual !== undefined && (
            <div
              className={`rounded-lg p-3 ${s.resultadoActual < 0 ? "bg-accent-light" : "bg-red-50"}`}
            >
              <div className="text-xs text-muted">Resultado actual</div>
              <div
                className={`font-semibold ${s.resultadoActual < 0 ? "text-accent" : "text-error"}`}
              >
                {s.resultadoActual < 0 ? "A devolver: " : "A pagar: "}
                {Math.abs(s.resultadoActual).toLocaleString("es-ES")} EUR
              </div>
            </div>
          )}
        </div>
      )}

      {/* Applied deductions */}
      {s.deduccionesAplicadas.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium mb-2">
            Deducciones ya aplicadas en tu borrador:
          </h4>
          <div className="space-y-1">
            {s.deduccionesAplicadas.map((d) => (
              <div
                key={d.casilla}
                className="flex justify-between text-sm bg-gray-50 rounded-lg px-3 py-2"
              >
                <span>{d.name}</span>
                <span className="font-medium">
                  {d.amount.toLocaleString("es-ES")} EUR
                </span>
              </div>
            ))}
            <div className="flex justify-between text-sm font-semibold bg-primary-light rounded-lg px-3 py-2">
              <span>Total deducciones aplicadas</span>
              <span className="text-primary">
                {s.deduccionesAplicadasTotal.toLocaleString("es-ES")} EUR
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Detected fields */}
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-2">Datos detectados:</h4>
        <div className="flex flex-wrap gap-1.5">
          {mapping.detectedFields.map((f) => (
            <span
              key={f}
              className="text-xs bg-accent-light text-accent px-2 py-1 rounded-full"
            >
              {f}
            </span>
          ))}
        </div>
      </div>

      {/* What's missing */}
      <div className="bg-warning-light rounded-xl p-4 mb-6">
        <h4 className="text-sm font-medium mb-2">
          Necesitamos preguntarte sobre:
        </h4>
        <p className="text-xs text-foreground/70 mb-2">
          El borrador no incluye toda la informacion necesaria para encontrar
          TODAS tus deducciones. Te haremos unas preguntas complementarias
          rapidas.
        </p>
        <div className="flex flex-wrap gap-1.5">
          {mapping.missingFields.slice(0, 8).map((f) => (
            <span
              key={f}
              className="text-xs bg-white/60 text-foreground/70 px-2 py-1 rounded-full"
            >
              {f}
            </span>
          ))}
          {mapping.missingFields.length > 8 && (
            <span className="text-xs text-foreground/50 px-2 py-1">
              +{mapping.missingFields.length - 8} mas
            </span>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onRetry}
          className="flex-1 py-3 border border-border rounded-lg text-sm font-medium text-muted hover:text-foreground hover:border-primary/30"
        >
          Subir otro archivo
        </button>
        <button
          onClick={onContinue}
          className="flex-1 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark shadow-lg shadow-primary/25"
        >
          Completar cuestionario
        </button>
      </div>
    </div>
  );
}

export default function Cuestionario() {
  const [mode, setMode] = useState<"choose" | "borrador_summary" | "questionnaire">("choose");
  const [currentStep, setCurrentStep] = useState(0);
  const [state, setState] = useState<QuestionnaireState>(initialState);
  const [borradorMapping, setBorradorMapping] = useState<MappingResult | null>(null);
  const router = useRouter();

  const update = (patch: Partial<QuestionnaireState>) => {
    setState((prev) => ({ ...prev, ...patch }));
  };

  const handleBorradorParsed = (mapping: MappingResult) => {
    // Apply extracted data to state
    setState((prev) => ({ ...prev, ...mapping.state }));
    setBorradorMapping(mapping);
    setMode("borrador_summary");
  };

  const handleSkipBorrador = () => {
    setMode("questionnaire");
  };

  const handleContinueAfterBorrador = () => {
    setMode("questionnaire");
    // Start at step 0 but fields will be pre-filled
  };

  const canGoNext = () => {
    switch (currentStep) {
      case 0:
        return state.ccaa !== "" && state.age !== null && state.age > 0 && state.maritalStatus !== "";
      case 3:
        return state.employmentType !== "" && state.grossIncome > 0;
      default:
        return true;
    }
  };

  const goNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Submit - save state and borrador data to session
      sessionStorage.setItem("rentamax_state", JSON.stringify(state));
      if (borradorMapping) {
        sessionStorage.setItem(
          "rentamax_borrador",
          JSON.stringify(borradorMapping.summary)
        );
      }
      router.push("/resultados");
    }
  };

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (borradorMapping) {
      setMode("borrador_summary");
    } else {
      setMode("choose");
    }
  };

  // Choose mode: upload borrador or skip
  if (mode === "choose") {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card sticky top-0 z-10">
          <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="text-lg font-bold text-primary">
              RentaMax
            </Link>
            <span className="text-sm text-muted">Renta 2025</span>
          </div>
        </header>
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="bg-card rounded-2xl border border-border p-6">
            <BorradorUpload
              onBorradorParsed={handleBorradorParsed}
              onSkip={handleSkipBorrador}
            />
          </div>
        </div>
      </div>
    );
  }

  // Borrador summary mode
  if (mode === "borrador_summary" && borradorMapping) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card sticky top-0 z-10">
          <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="text-lg font-bold text-primary">
              RentaMax
            </Link>
            <span className="text-sm text-muted">Renta 2025</span>
          </div>
        </header>
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="bg-card rounded-2xl border border-border p-6">
            <BorradorSummary
              mapping={borradorMapping}
              onContinue={handleContinueAfterBorrador}
              onRetry={() => setMode("choose")}
            />
          </div>
        </div>
      </div>
    );
  }

  // Questionnaire mode
  const StepComponent = STEPS[currentStep];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold text-primary">
            RentaMax
          </Link>
          <div className="flex items-center gap-3">
            {borradorMapping && (
              <span className="text-xs bg-accent-light text-accent px-2 py-0.5 rounded-full">
                Borrador importado
              </span>
            )}
            <span className="text-sm text-muted">Renta 2025</span>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Pre-filled notice */}
        {borradorMapping && currentStep === 0 && (
          <div className="bg-accent-light rounded-xl p-3 mb-4 text-sm">
            <span className="font-medium text-accent">
              Datos pre-rellenados desde tu borrador.
            </span>{" "}
            <span className="text-accent/70">
              Revisa y completa lo que falte.
            </span>
          </div>
        )}

        <StepIndicator
          current={currentStep}
          total={STEPS.length}
          titles={STEP_TITLES}
        />

        <div className="bg-card rounded-2xl border border-border p-6">
          <StepComponent state={state} update={update} />
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <button
            onClick={goBack}
            className="px-6 py-3 rounded-lg font-medium text-muted hover:text-foreground border border-border hover:border-primary/30"
          >
            Anterior
          </button>

          <button
            onClick={goNext}
            disabled={!canGoNext()}
            className={`px-8 py-3 rounded-lg font-semibold ${
              canGoNext()
                ? "bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/25"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            {currentStep === STEPS.length - 1
              ? "Ver mis deducciones"
              : "Siguiente"}
          </button>
        </div>
      </div>
    </div>
  );
}
