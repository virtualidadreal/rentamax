import Link from "next/link";
import type { Metadata } from "next";
import { CCAA_NAMES, type CCAA } from "@/lib/types";
import { deductions } from "@/data/deductions";
import { notFound } from "next/navigation";

// Disable dynamic rendering for unknown params
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(CCAA_NAMES).map((ccaa) => ({ ccaa }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ccaa: string }>;
}): Promise<Metadata> {
  const { ccaa } = await params;
  const name = CCAA_NAMES[ccaa as CCAA];
  if (!name) return {};

  const autonomicas = deductions.filter(
    (d) => d.scope === "autonomica" && d.conditions.ccaa?.includes(ccaa as CCAA)
  );

  return {
    title: `Deducciones Renta 2025 ${name} - RentaMax`,
    description: `Todas las deducciones y bonificaciones fiscales disponibles en ${name} para la Renta 2025. ${autonomicas.length} deducciones autonomicas que puedes aplicar.`,
  };
}

export default async function CcaaPage({
  params,
}: {
  params: Promise<{ ccaa: string }>;
}) {
  const { ccaa } = await params;
  const ccaaKey = ccaa as CCAA;
  const name = CCAA_NAMES[ccaaKey];

  if (!name) {
    notFound();
  }

  // Filter deductions for this CCAA
  const autonomicas = deductions.filter(
    (d) => d.scope === "autonomica" && d.conditions.ccaa?.includes(ccaaKey)
  );
  const estatales = deductions.filter(
    (d) => d.scope === "estatal" || d.scope === "autonomo"
  );
  const novedades = deductions.filter(
    (d) =>
      d.conditions.isNew2025 === true &&
      (d.scope === "estatal" ||
        d.scope === "autonomo" ||
        d.conditions.ccaa?.includes(ccaaKey))
  );

  const totalApplicable = autonomicas.length + estatales.length;

  // Other CCAA for interlinking
  const otrasCcaa = (Object.entries(CCAA_NAMES) as [CCAA, string][]).filter(
    ([key]) => key !== ccaaKey
  );

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
          <li>
            <Link href="/deducciones" className="hover:text-primary">
              Deducciones
            </Link>
          </li>
          <li>/</li>
          <li className="text-foreground font-medium">{name}</li>
        </ol>
      </nav>

      {/* Main content */}
      <main className="max-w-5xl mx-auto px-4 pb-20">
        {/* Title & intro */}
        <section className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Deducciones Renta 2025 en {name}
          </h1>
          <p className="text-lg text-muted max-w-3xl">
            Hemos encontrado{" "}
            <span className="font-semibold text-foreground">
              {totalApplicable} deducciones
            </span>{" "}
            aplicables en {name}:{" "}
            <span className="font-semibold text-primary">
              {autonomicas.length} autonomicas
            </span>{" "}
            y{" "}
            <span className="font-semibold text-foreground">
              {estatales.length} estatales
            </span>
            .
          </p>
        </section>

        {/* Novedades 2025 */}
        {novedades.length > 0 && (
          <section className="mb-12">
            <div className="bg-accent-light border border-accent/20 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-accent mb-4">
                Novedades Renta 2025
              </h2>
              <div className="grid gap-3">
                {novedades.map((d) => (
                  <div
                    key={d.id}
                    className="flex items-start gap-3 bg-white/60 rounded-xl p-4"
                  >
                    <span className="inline-block bg-accent text-white text-xs font-bold px-2 py-0.5 rounded-full mt-0.5 shrink-0">
                      NUEVO
                    </span>
                    <div>
                      <p className="font-semibold text-foreground text-sm">
                        {d.name}
                      </p>
                      <p className="text-muted text-sm mt-0.5">
                        {d.tips || d.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Deducciones autonomicas */}
        {autonomicas.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Deducciones autonomicas de {name}
            </h2>
            <div className="grid gap-4">
              {autonomicas.map((d) => (
                <div
                  key={d.id}
                  className="border border-border rounded-2xl p-6 bg-card"
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="font-semibold text-foreground">{d.name}</h3>
                    {d.conditions.isNew2025 && (
                      <span className="inline-block bg-accent text-white text-xs font-bold px-2 py-0.5 rounded-full shrink-0">
                        2025
                      </span>
                    )}
                  </div>
                  <p className="text-muted text-sm mb-3">{d.description}</p>
                  <div className="flex flex-wrap gap-3 text-sm">
                    <span className="bg-primary-light text-primary px-3 py-1 rounded-full font-medium">
                      {d.amount}
                    </span>
                    {d.casilla && (
                      <span className="bg-warning-light text-warning px-3 py-1 rounded-full font-medium">
                        Casilla {d.casilla}
                      </span>
                    )}
                    <span className="bg-background text-muted px-3 py-1 rounded-full">
                      {d.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {autonomicas.length === 0 && (
          <section className="mb-12">
            <div className="border border-border rounded-2xl p-8 bg-card text-center">
              <p className="text-muted">
                {name} no tiene deducciones autonomicas propias registradas en
                nuestra base de datos. Sin embargo, puedes beneficiarte de todas
                las deducciones estatales que se listan a continuacion.
              </p>
            </div>
          </section>
        )}

        {/* Deducciones estatales */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Deducciones estatales aplicables
          </h2>
          <p className="text-muted mb-6">
            Estas {estatales.length} deducciones estatales se aplican en todo el
            territorio nacional, incluida {name}.
          </p>
          <div className="grid md:grid-cols-2 gap-3">
            {estatales.map((d) => (
              <div
                key={d.id}
                className="border border-border rounded-xl p-4 bg-card"
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-medium text-foreground text-sm">
                    {d.name}
                  </h3>
                  {d.conditions.isNew2025 && (
                    <span className="inline-block bg-accent text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0">
                      2025
                    </span>
                  )}
                </div>
                <p className="text-muted text-xs">{d.amount}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mb-16">
          <div className="bg-primary-light border border-primary/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Descubre cuales puedes aplicar tu
            </h2>
            <p className="text-muted mb-6 max-w-lg mx-auto">
              Responde unas preguntas sencillas y te decimos exactamente que
              deducciones puedes aplicar en tu declaracion de la Renta 2025 en{" "}
              {name}.
            </p>
            <Link
              href="/cuestionario"
              className="inline-block bg-primary text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-primary-dark shadow-lg shadow-primary/25"
            >
              Empezar cuestionario gratuito
            </Link>
          </div>
        </section>

        {/* Interlinking - Other CCAA */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-foreground mb-4">
            Deducciones en otras comunidades
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {otrasCcaa.map(([key, label]) => (
              <Link
                key={key}
                href={`/deducciones/${key}`}
                className="text-sm text-primary hover:text-primary-dark hover:bg-primary-light px-3 py-2 rounded-lg transition-colors"
              >
                {label}
              </Link>
            ))}
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
