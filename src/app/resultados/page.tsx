"use client";

import { useState, useEffect, useCallback } from "react";
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

function ShareSection({
  totalSaving,
  deductionsCount,
  ccaa,
}: {
  totalSaving: number;
  deductionsCount: number;
  ccaa: string;
}) {
  const [copied, setCopied] = useState(false);

  const ahorroRounded = Math.round(totalSaving);
  const shareUrl = `https://rentamax.franmilla.com/compartir?ahorro=${ahorroRounded}&deducciones=${deductionsCount}${ccaa ? `&ccaa=${ccaa}` : ""}`;
  const shareText = `He descubierto que puedo ahorrarme ${ahorroRounded.toLocaleString("es-ES")} EUR en mi Renta 2025 con RentaMax. Descubre tus deducciones: ${shareUrl}`;

  const handleWhatsApp = useCallback(() => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(shareText)}`,
      "_blank"
    );
  }, [shareText]);

  const handleTwitter = useCallback(() => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
      "_blank"
    );
  }, [shareText]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [shareUrl]);

  return (
    <div className="bg-card border border-border rounded-xl p-5 mb-8 text-center animate-fade-in">
      <h3 className="font-semibold text-foreground mb-1">
        Comparte tu resultado
      </h3>
      <p className="text-sm text-muted mb-4">
        Ayuda a otros a descubrir sus deducciones
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={handleWhatsApp}
          className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-[#1da851] text-sm"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          WhatsApp
        </button>
        <button
          onClick={handleTwitter}
          className="inline-flex items-center justify-center gap-2 bg-[#1DA1F2] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-[#1a8cd8] text-sm"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          X / Twitter
        </button>
        <button
          onClick={handleCopy}
          className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm ${
            copied
              ? "bg-accent text-white"
              : "bg-gray-100 text-foreground hover:bg-gray-200 border border-border"
          }`}
        >
          {copied ? (
            <>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Copiado!
            </>
          ) : (
            <>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Copiar enlace
            </>
          )}
        </button>
      </div>
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
    const stored = localStorage.getItem("rentamax_state");
    if (!stored) {
      setLoading(false);
      return;
    }

    // Load borrador data if available
    const borradorStored = localStorage.getItem("rentamax_borrador");
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

        {/* Share section */}
        <ShareSection
          totalSaving={result.totalEstimatedSaving}
          deductionsCount={result.deductions.length}
          ccaa={userCcaa}
        />

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
