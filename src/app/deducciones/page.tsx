import Link from "next/link";
import type { Metadata } from "next";
import { CCAA_NAMES, type CCAA } from "@/lib/types";
import { deductions } from "@/data/deductions";

export const metadata: Metadata = {
  title: "Deducciones Renta 2025 por Comunidad Autonoma - RentaMax",
  description:
    "Consulta todas las deducciones fiscales de la Renta 2025 por comunidad autonoma. 17 comunidades + Ceuta y Melilla con sus deducciones autonomicas y estatales.",
};

function getCcaaStats(ccaaKey: CCAA) {
  const autonomicas = deductions.filter(
    (d) => d.scope === "autonomica" && d.conditions.ccaa?.includes(ccaaKey)
  );
  const novedades = deductions.filter(
    (d) =>
      d.conditions.isNew2025 === true &&
      d.scope === "autonomica" &&
      d.conditions.ccaa?.includes(ccaaKey)
  );
  return { autonomicas: autonomicas.length, novedades: novedades.length };
}

const estatalesCount = deductions.filter(
  (d) => d.scope === "estatal" || d.scope === "autonomo"
).length;

export default function DeduccionesIndexPage() {
  const ccaaEntries = Object.entries(CCAA_NAMES) as [CCAA, string][];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">RentaMax</span>
            <span className="text-xs bg-primary-light text-primary px-2 py-0.5 rounded-full font-medium">
              Renta 2025
            </span>
          </Link>
          <Link
            href="/cuestionario"
            className="bg-primary text-white px-5 py-2 rounded-lg font-medium hover:bg-primary-dark"
          >
            Empezar
          </Link>
        </div>
      </header>

      {/* Breadcrumb */}
      <nav className="max-w-5xl mx-auto px-4 py-4">
        <ol className="flex items-center gap-2 text-sm text-muted">
          <li>
            <Link href="/" className="hover:text-primary">
              Inicio
            </Link>
          </li>
          <li>/</li>
          <li className="text-foreground font-medium">Deducciones</li>
        </ol>
      </nav>

      {/* Main content */}
      <main className="max-w-5xl mx-auto px-4 pb-20">
        <section className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Deducciones Renta 2025 por Comunidad Autonoma
          </h1>
          <p className="text-lg text-muted max-w-3xl">
            Cada comunidad autonoma tiene sus propias deducciones fiscales,
            ademas de las {estatalesCount} deducciones estatales que se aplican
            en todo el territorio. Selecciona tu comunidad para ver el detalle
            completo.
          </p>
        </section>

        {/* CCAA Grid */}
        <section className="mb-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ccaaEntries.map(([key, label]) => {
              const stats = getCcaaStats(key);
              return (
                <Link
                  key={key}
                  href={`/deducciones/${key}`}
                  className="border border-border rounded-2xl p-6 bg-card card-hover block"
                >
                  <h2 className="text-lg font-semibold text-foreground mb-2">
                    {label}
                  </h2>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-primary font-medium">
                      {stats.autonomicas} autonomicas
                    </span>
                    {stats.novedades > 0 && (
                      <span className="bg-accent-light text-accent px-2 py-0.5 rounded-full text-xs font-medium">
                        {stats.novedades} novedades
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted mt-2">
                    + {estatalesCount} estatales aplicables
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="mb-12">
          <div className="bg-primary-light border border-primary/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Descubre tus deducciones personalizadas
            </h2>
            <p className="text-muted mb-6 max-w-lg mx-auto">
              Responde unas preguntas sencillas sobre tu situacion y te decimos
              exactamente que deducciones puedes aplicar.
            </p>
            <Link
              href="/cuestionario"
              className="inline-block bg-primary text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-primary-dark shadow-lg shadow-primary/25"
            >
              Empezar cuestionario gratuito
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border pt-10 pb-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center mb-8">
            <p className="text-sm text-muted mb-1">Un proyecto de</p>
            <a
              href="https://franmilla.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 hover:opacity-80"
            >
              <span className="text-xl font-bold text-foreground group-hover:text-primary">
                Fran Milla
              </span>
            </a>
            <p className="text-xs text-muted mt-1">
              Desarrollado junto a su Humano Aumentado
            </p>
            <a
              href="https://franmilla.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 text-xs text-primary hover:text-primary-dark font-medium border border-primary/30 px-4 py-1.5 rounded-full hover:bg-primary-light"
            >
              franmilla.com
            </a>
          </div>
          <div className="border-t border-border pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-xs text-muted">
              RentaMax 2025 - Herramienta informativa. No sustituye el
              asesoramiento fiscal profesional.
            </div>
            <div className="text-xs text-muted">
              Datos actualizados para la Renta 2025 (ejercicio fiscal 2025)
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
