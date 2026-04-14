"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { QuestionnaireState, CCAA_NAMES } from "@/lib/types";
import type { CCAA } from "@/lib/types";
import {
  matchDeductions,
  MatchResult,
  MatchedDeduction,
  CATEGORY_LABELS,
  CATEGORY_ICONS,
  SCOPE_LABELS,
} from "@/lib/matching";
import { ExtractedSummary } from "@/lib/borrador-mapper";
import type {
  HowToClaim,
  GeneralGuide,
} from "@/data/how-to-claim";

function HowToClaimInfo({ guide }: { guide: Partial<HowToClaim> }) {
  return (
    <div className="mt-3 pt-3 border-t border-dashed border-border">
      <h4 className="text-sm font-semibold mb-2 flex items-center gap-1.5">
        <span>📝</span> Como pedirla en Renta Web
      </h4>

      <div className="mb-2 flex items-center gap-2">
        <span
          className={`text-xs px-2 py-0.5 rounded-full font-medium ${
            guide.isAutomatic
              ? "bg-green-100 text-green-700"
              : "bg-amber-100 text-amber-700"
          }`}
        >
          {guide.isAutomatic
            ? "Suele aparecer en el borrador"
            : "NO aparece automaticamente - hay que marcarla a mano"}
        </span>
      </div>

      {guide.casillas && guide.casillas.length > 0 && (
        <div className="mb-2 bg-primary-light rounded-lg p-2 text-sm">
          <span className="font-medium text-primary">
            Casilla{guide.casillas.length > 1 ? "s" : ""}:
          </span>{" "}
          {guide.casillas.join(", ")}
        </div>
      )}

      {guide.steps && guide.steps.length > 0 && (
        <div className="mb-2">
          <h5 className="text-xs font-medium text-muted mb-1">
            Pasos en Renta Web:
          </h5>
          <ol className="text-sm text-muted space-y-0.5 list-none">
            {guide.steps.map((step, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-primary shrink-0 font-medium">
                  {i + 1}.
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      )}

      {guide.commonMistakes && guide.commonMistakes.length > 0 && (
        <div className="mb-2 bg-red-50 rounded-lg p-2">
          <h5 className="text-xs font-medium text-red-700 mb-1">
            Errores comunes:
          </h5>
          <ul className="text-sm text-red-600 space-y-0.5">
            {guide.commonMistakes.map((mistake, i) => (
              <li key={i} className="flex gap-2">
                <span className="shrink-0">!</span>
                {mistake}
              </li>
            ))}
          </ul>
        </div>
      )}

      {guide.tips && guide.tips.length > 0 && (
        <div className="bg-blue-50 rounded-lg p-2">
          <h5 className="text-xs font-medium text-blue-700 mb-1">
            Consejos:
          </h5>
          <ul className="text-sm text-blue-600 space-y-0.5">
            {guide.tips.map((tip, i) => (
              <li key={i} className="flex gap-2">
                <span className="shrink-0">-</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}

      {guide.deadline && (
        <div className="mt-2 text-xs text-muted italic">
          Plazo: {guide.deadline}
        </div>
      )}
    </div>
  );
}

function GeneralGuideSection({
  guides,
  ccaa,
  autonomicaGuideData,
}: {
  guides: GeneralGuide[];
  ccaa: string;
  autonomicaGuideData: Record<
    string,
    { process: string; importantNotes: string[]; keyDocuments: string[] }
  >;
}) {
  const [expandedGuide, setExpandedGuide] = useState<number | null>(null);
  const [showAutonomica, setShowAutonomica] = useState(false);
  const ccaaGuide = ccaa ? autonomicaGuideData[ccaa] : null;

  return (
    <div className="bg-card border border-border rounded-xl p-5 mb-8">
      <h3 className="font-bold text-lg mb-1 flex items-center gap-2">
        <span>📖</span> Guia: Como hacer tu declaracion
      </h3>
      <p className="text-sm text-muted mb-4">
        Todo lo que necesitas saber para presentar tu declaracion en Renta Web
      </p>

      <div className="space-y-2">
        {guides.map((guide, i) => (
          <div key={i} className="border border-border rounded-lg">
            <button
              className="w-full text-left px-4 py-3 flex items-center justify-between hover:bg-gray-50 rounded-lg"
              onClick={() =>
                setExpandedGuide(expandedGuide === i ? null : i)
              }
            >
              <span className="text-sm font-medium">{guide.title}</span>
              <span className="text-muted text-xs">
                {expandedGuide === i ? "▲" : "▼"}
              </span>
            </button>
            {expandedGuide === i && (
              <div className="px-4 pb-3 text-sm text-muted animate-fade-in">
                {guide.content}
              </div>
            )}
          </div>
        ))}
      </div>

      {ccaaGuide && (
        <div className="mt-4 pt-4 border-t border-border">
          <button
            className="w-full text-left flex items-center justify-between"
            onClick={() => setShowAutonomica(!showAutonomica)}
          >
            <h4 className="font-semibold text-sm flex items-center gap-2">
              <span>🗺️</span> Guia para{" "}
              {CCAA_NAMES[ccaa as CCAA] || ccaa}
            </h4>
            <span className="text-muted text-xs">
              {showAutonomica ? "▲" : "▼"}
            </span>
          </button>

          {showAutonomica && (
            <div className="mt-3 animate-fade-in">
              <p className="text-sm text-muted mb-3">{ccaaGuide.process}</p>

              {ccaaGuide.importantNotes.length > 0 && (
                <div className="mb-3">
                  <h5 className="text-xs font-medium mb-1">
                    Notas importantes:
                  </h5>
                  <ul className="text-sm text-muted space-y-0.5">
                    {ccaaGuide.importantNotes.map((note, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-accent shrink-0">-</span>
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {ccaaGuide.keyDocuments.length > 0 && (
                <div>
                  <h5 className="text-xs font-medium mb-1">
                    Documentos clave:
                  </h5>
                  <ul className="text-sm text-muted space-y-0.5">
                    {ccaaGuide.keyDocuments.map((doc, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-primary shrink-0">-</span>
                        {doc}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function DeductionCard({
  deduction,
  expanded,
  onToggle,
  howToClaimGuide,
}: {
  deduction: MatchedDeduction;
  expanded: boolean;
  onToggle: () => void;
  howToClaimGuide?: Partial<HowToClaim>;
}) {
  return (
    <div
      className={`border rounded-xl p-4 bg-card card-hover cursor-pointer ${
        deduction.isNew2025 ? "border-accent" : "border-border"
      }`}
      onClick={onToggle}
    >
      <div className="flex justify-between items-start gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            {deduction.isNew2025 && (
              <span className="text-xs bg-accent-light text-accent px-2 py-0.5 rounded-full font-medium">
                NUEVO 2025
              </span>
            )}
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                deduction.scope === "estatal"
                  ? "bg-blue-100 text-blue-700"
                  : deduction.scope === "autonomica"
                    ? "bg-purple-100 text-purple-700"
                    : "bg-orange-100 text-orange-700"
              }`}
            >
              {SCOPE_LABELS[deduction.scope] || deduction.scope}
            </span>
            <span className="text-xs text-muted">
              {CATEGORY_ICONS[deduction.category]}{" "}
              {CATEGORY_LABELS[deduction.category] || deduction.category}
            </span>
          </div>
          <h3 className="font-semibold text-foreground">{deduction.name}</h3>
          <p className="text-sm text-muted mt-1">{deduction.description}</p>
        </div>
        <div className="text-right shrink-0">
          {deduction.estimatedSaving ? (
            <div className="text-lg font-bold text-accent">
              {deduction.estimatedSaving >= 1
                ? `${Math.round(deduction.estimatedSaving).toLocaleString("es-ES")} EUR`
                : "-"}
            </div>
          ) : null}
          <div className="text-xs text-muted">{deduction.amount}</div>
        </div>
      </div>

      {expanded && (
        <div className="mt-4 pt-4 border-t border-border animate-fade-in">
          {deduction.casilla && (
            <div className="mb-3 bg-primary-light rounded-lg p-2 text-sm">
              <span className="font-medium text-primary">Casilla:</span>{" "}
              {deduction.casilla}
            </div>
          )}

          {deduction.requirements.length > 0 && (
            <div className="mb-3">
              <h4 className="text-sm font-medium mb-1">Requisitos:</h4>
              <ul className="text-sm text-muted space-y-0.5">
                {deduction.requirements.map((req, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-primary shrink-0">-</span>
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {deduction.documentation.length > 0 && (
            <div className="mb-3">
              <h4 className="text-sm font-medium mb-1">
                Documentacion necesaria:
              </h4>
              <ul className="text-sm text-muted space-y-0.5">
                {deduction.documentation.map((doc, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-primary shrink-0">-</span>
                    {doc}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {deduction.tips && (
            <div className="bg-warning-light rounded-lg p-2 text-sm">
              <span className="font-medium">Consejo:</span> {deduction.tips}
            </div>
          )}

          {howToClaimGuide && <HowToClaimInfo guide={howToClaimGuide} />}
        </div>
      )}
    </div>
  );
}

function SummaryCard({
  icon,
  label,
  value,
  sub,
}: {
  icon: string;
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 text-center">
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-2xl font-bold text-foreground">{value}</div>
      <div className="text-sm text-muted">{label}</div>
      {sub && <div className="text-xs text-muted mt-0.5">{sub}</div>}
    </div>
  );
}

export default function Resultados() {
  const [result, setResult] = useState<MatchResult | null>(null);
  const [borradorSummary, setBorradorSummary] =
    useState<ExtractedSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filterScope, setFilterScope] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [userCcaa, setUserCcaa] = useState<string>("");
  const [howToClaimData, setHowToClaimData] = useState<{
    byId: Record<string, Partial<HowToClaim>>;
    byCategory: Record<string, HowToClaim>;
    general: GeneralGuide[];
    autonomica: Record<
      string,
      { process: string; importantNotes: string[]; keyDocuments: string[] }
    >;
  } | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("rentamax_state");
    if (!stored) {
      setLoading(false);
      return;
    }

    // Load borrador data if available
    const borradorStored = sessionStorage.getItem("rentamax_borrador");
    if (borradorStored) {
      setBorradorSummary(JSON.parse(borradorStored));
    }

    const state: QuestionnaireState = JSON.parse(stored);
    if (state.ccaa) {
      setUserCcaa(state.ccaa);
    }

    // Load deductions and how-to-claim data in parallel
    Promise.all([
      matchDeductions(state),
      import("@/data/how-to-claim").then((mod) => ({
        byId: mod.howToClaimById,
        byCategory: mod.howToClaimByCategory,
        general: mod.generalGuide,
        autonomica: mod.autonomicaGuide,
      })),
    ]).then(([res, htcData]) => {
      setResult(res);
      setHowToClaimData(htcData);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-pulse">🔍</div>
          <h2 className="text-xl font-semibold mb-2">
            Analizando tus deducciones...
          </h2>
          <p className="text-muted">
            Cruzando tu situacion con mas de 400 deducciones
          </p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold mb-2">
            No se encontraron datos
          </h2>
          <p className="text-muted mb-4">
            Parece que no has completado el cuestionario
          </p>
          <Link
            href="/cuestionario"
            className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark"
          >
            Ir al cuestionario
          </Link>
        </div>
      </div>
    );
  }

  // Helper to get how-to-claim guide for a deduction
  function getHowToClaimGuide(
    deduction: MatchedDeduction
  ): Partial<HowToClaim> | undefined {
    if (!howToClaimData) return undefined;

    // First check by specific deduction ID
    const byId = howToClaimData.byId[deduction.id];
    if (byId) return byId;

    // Then fall back to category guide
    const byCat = howToClaimData.byCategory[deduction.category];
    if (byCat) return byCat;

    return undefined;
  }

  const filteredDeductions = result.deductions.filter((d) => {
    if (filterScope !== "all" && d.scope !== filterScope) return false;
    if (filterCategory !== "all" && d.category !== filterCategory) return false;
    if (
      searchTerm &&
      !d.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !d.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false;
    return true;
  });

  const categories = Object.keys(result.byCategory);
  const scopes = Object.keys(result.byScope);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold text-primary">
            RentaMax
          </Link>
          <Link
            href="/cuestionario"
            className="text-sm text-primary hover:text-primary-dark font-medium"
          >
            Repetir cuestionario
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero result */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-2">Tus deducciones</h1>
          <p className="text-muted">
            Hemos encontrado{" "}
            <span className="font-semibold text-foreground">
              {result.deductions.length} deducciones
            </span>{" "}
            aplicables a tu situacion
          </p>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <SummaryCard
            icon="💰"
            label="Ahorro estimado"
            value={`${Math.round(result.totalEstimatedSaving).toLocaleString("es-ES")} EUR`}
          />
          <SummaryCard
            icon="📋"
            label="Deducciones"
            value={String(result.deductions.length)}
            sub="aplicables"
          />
          <SummaryCard
            icon="🏛️"
            label="Estatales"
            value={String(result.byScope["estatal"] || 0)}
          />
          <SummaryCard
            icon="🗺️"
            label="Autonomicas"
            value={String(result.byScope["autonomica"] || 0)}
          />
        </div>

        {/* Highlights */}
        {result.highlights.length > 0 && (
          <div className="bg-accent-light border border-accent/20 rounded-xl p-4 mb-8">
            <h3 className="font-semibold text-accent mb-2">
              Puntos destacados
            </h3>
            <ul className="space-y-1">
              {result.highlights.map((h, i) => (
                <li key={i} className="text-sm text-foreground flex gap-2">
                  <span className="text-accent">-</span> {h}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Borrador comparison */}
        {borradorSummary && (
          <div className="bg-card border-2 border-primary rounded-xl p-5 mb-8 animate-fade-in">
            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
              📊 Analisis de tu borrador
            </h3>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-xs text-muted">Deducciones en borrador</div>
                <div className="text-xl font-bold">
                  {borradorSummary.deduccionesAplicadas.length}
                </div>
              </div>
              <div className="bg-accent-light rounded-lg p-3">
                <div className="text-xs text-accent">Deducciones encontradas</div>
                <div className="text-xl font-bold text-accent">
                  {result.deductions.length}
                </div>
              </div>
            </div>

            {result.deductions.length > borradorSummary.deduccionesAplicadas.length && (
              <div className="bg-accent-light/50 rounded-lg p-4">
                <p className="font-semibold text-accent mb-1">
                  Hemos encontrado{" "}
                  {result.deductions.length -
                    borradorSummary.deduccionesAplicadas.length}{" "}
                  deducciones adicionales
                </p>
                <p className="text-sm text-foreground/70">
                  Tu borrador tiene {borradorSummary.deduccionesAplicadas.length}{" "}
                  deducciones aplicadas por un total de{" "}
                  {borradorSummary.deduccionesAplicadasTotal.toLocaleString("es-ES")}{" "}
                  EUR. Nuestro analisis ha encontrado{" "}
                  {result.deductions.length - borradorSummary.deduccionesAplicadas.length}{" "}
                  deducciones mas que podrias estar aplicando. Revisa la lista
                  completa abajo para ver cuales te faltan.
                </p>
                {borradorSummary.resultadoActual !== undefined && (
                  <p className="text-sm font-medium mt-2 text-accent">
                    Con tu resultado actual de{" "}
                    {borradorSummary.resultadoActual < 0 ? "devolucion" : "pago"}{" "}
                    de{" "}
                    {Math.abs(borradorSummary.resultadoActual).toLocaleString("es-ES")}{" "}
                    EUR, aplicando estas deducciones adicionales podrias mejorar
                    tu resultado en hasta{" "}
                    {Math.round(result.totalEstimatedSaving).toLocaleString("es-ES")}{" "}
                    EUR.
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Category breakdown */}
        <div className="bg-card border border-border rounded-xl p-4 mb-8">
          <h3 className="font-semibold mb-3">Por categoria</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() =>
                  setFilterCategory(filterCategory === cat ? "all" : cat)
                }
                className={`p-2 rounded-lg text-left text-sm ${
                  filterCategory === cat
                    ? "bg-primary-light border border-primary"
                    : "bg-gray-50 border border-transparent hover:bg-gray-100"
                }`}
              >
                <span>
                  {CATEGORY_ICONS[cat]} {CATEGORY_LABELS[cat] || cat}
                </span>
                <span className="block text-xs text-muted">
                  {result.byCategory[cat].count} deducciones
                  {result.byCategory[cat].saving > 0 &&
                    ` - ${Math.round(result.byCategory[cat].saving).toLocaleString("es-ES")} EUR`}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            placeholder="Buscar deduccion..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <div className="flex gap-2">
            {["all", ...scopes].map((s) => (
              <button
                key={s}
                onClick={() => setFilterScope(s)}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${
                  filterScope === s
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-muted hover:bg-gray-200"
                }`}
              >
                {s === "all" ? "Todas" : SCOPE_LABELS[s] || s}
              </button>
            ))}
          </div>
        </div>

        {/* Deduction list */}
        <div className="space-y-3 mb-12">
          {filteredDeductions.length === 0 ? (
            <div className="text-center py-8 text-muted">
              No se encontraron deducciones con estos filtros
            </div>
          ) : (
            filteredDeductions.map((d) => (
              <DeductionCard
                key={d.id}
                deduction={d}
                expanded={expandedId === d.id}
                onToggle={() =>
                  setExpandedId(expandedId === d.id ? null : d.id)
                }
                howToClaimGuide={getHowToClaimGuide(d)}
              />
            ))
          )}
        </div>

        {/* General Guide */}
        {howToClaimData && (
          <GeneralGuideSection
            guides={howToClaimData.general}
            ccaa={userCcaa}
            autonomicaGuideData={howToClaimData.autonomica}
          />
        )}

        {/* Disclaimer */}
        <div className="bg-warning-light border border-warning/30 rounded-xl p-4 mb-8">
          <h3 className="font-semibold text-foreground mb-2">
            Aviso importante
          </h3>
          <ul className="text-sm text-foreground/80 space-y-1">
            <li>
              - Esta herramienta es orientativa y no sustituye el asesoramiento
              fiscal profesional.
            </li>
            <li>
              - Los importes son estimaciones. El ahorro real depende de tu
              situacion fiscal concreta.
            </li>
            <li>
              - Verifica siempre los requisitos y la documentacion necesaria
              antes de aplicar una deduccion.
            </li>
            <li>
              - Datos actualizados para la declaracion de la Renta 2025
              (ejercicio fiscal 2025).
            </li>
          </ul>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/cuestionario"
            className="inline-block bg-primary text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary-dark"
          >
            Modificar mis respuestas
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border pt-8 pb-6 px-4 mt-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center mb-6">
            <p className="text-xs text-muted mb-1">Un proyecto de</p>
            <a
              href="https://franmilla.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <span className="text-lg font-bold text-foreground group-hover:text-primary">
                Fran Milla
              </span>
            </a>
            <a
              href="https://franmilla.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 text-xs text-primary hover:text-primary-dark font-medium border border-primary/30 px-3 py-1 rounded-full hover:bg-primary-light"
            >
              franmilla.com
            </a>
          </div>
          <div className="text-center text-xs text-muted">
            RentaMax 2025 - Herramienta informativa. No sustituye el asesoramiento fiscal profesional.
          </div>
        </div>
      </footer>
    </div>
  );
}
