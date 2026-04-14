import type { Metadata } from "next";
import Link from "next/link";
import { CCAA_NAMES } from "@/lib/types";
import type { CCAA } from "@/lib/types";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const params = await searchParams;
  const ahorro = (params.ahorro as string) || "0";
  const deducciones = (params.deducciones as string) || "0";
  const ccaa = (params.ccaa as string) || "";

  const ahorroNum = parseInt(ahorro, 10);
  const ahorroFormatted = isNaN(ahorroNum)
    ? "0"
    : ahorroNum.toLocaleString("es-ES");

  const ccaaName = ccaa ? CCAA_NAMES[ccaa as CCAA] || "" : "";
  const ccaaText = ccaaName ? ` en ${ccaaName}` : "";

  const title = `Podria ahorrarme ${ahorroFormatted} EUR en mi Renta 2025`;
  const description = `He encontrado ${deducciones} deducciones aplicables${ccaaText} con RentaMax. Descubre las tuyas.`;

  const ogUrl = new URL("https://rentamax.franmilla.com/api/og");
  ogUrl.searchParams.set("ahorro", ahorro);
  ogUrl.searchParams.set("deducciones", deducciones);
  if (ccaa) ogUrl.searchParams.set("ccaa", ccaa);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://rentamax.franmilla.com/compartir?ahorro=${ahorro}&deducciones=${deducciones}${ccaa ? `&ccaa=${ccaa}` : ""}`,
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogUrl.toString()],
    },
  };
}

export default async function CompartirPage({ searchParams }: Props) {
  const params = await searchParams;
  const ahorro = (params.ahorro as string) || "0";
  const deducciones = (params.deducciones as string) || "0";
  const ccaa = (params.ccaa as string) || "";

  const ahorroNum = parseInt(ahorro, 10);
  const ahorroFormatted = isNaN(ahorroNum)
    ? "0"
    : ahorroNum.toLocaleString("es-ES");

  const ccaaName = ccaa ? CCAA_NAMES[ccaa as CCAA] || "" : "";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold text-primary">
            RentaMax
          </Link>
          <Link
            href="/cuestionario"
            className="text-sm text-primary hover:text-primary-dark font-medium"
          >
            Hacer cuestionario
          </Link>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="text-center animate-fade-in">
          {/* Icon */}
          <div className="text-6xl mb-6">💰</div>

          {/* Main result */}
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Podria ahorrarse{" "}
            <span className="text-accent">{ahorroFormatted} EUR</span>
            <br />
            en su Renta 2025
          </h1>

          {/* Deducciones */}
          <p className="text-lg text-muted mb-2">
            Con{" "}
            <span className="font-semibold text-foreground">
              {deducciones} deducciones
            </span>{" "}
            aplicables
          </p>

          {/* CCAA */}
          {ccaaName && (
            <p className="text-muted mb-8">en {ccaaName}</p>
          )}

          {!ccaaName && <div className="mb-8" />}

          {/* Summary cards */}
          <div className="grid grid-cols-2 gap-4 mb-10 max-w-md mx-auto">
            <div className="bg-card border border-border rounded-xl p-4 text-center">
              <div className="text-2xl mb-1">💰</div>
              <div className="text-2xl font-bold text-accent">
                {ahorroFormatted} EUR
              </div>
              <div className="text-sm text-muted">Ahorro estimado</div>
            </div>
            <div className="bg-card border border-border rounded-xl p-4 text-center">
              <div className="text-2xl mb-1">📋</div>
              <div className="text-2xl font-bold text-foreground">
                {deducciones}
              </div>
              <div className="text-sm text-muted">Deducciones</div>
            </div>
          </div>

          {/* CTA */}
          <Link
            href="/cuestionario"
            className="inline-block bg-primary text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-primary-dark shadow-lg shadow-primary/25 mb-4"
          >
            Descubre tus deducciones
          </Link>

          <p className="text-sm text-muted mt-4">
            Responde unas preguntas sencillas y descubre cuanto puedes
            ahorrarte en tu declaracion de la Renta 2025
          </p>
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
            RentaMax 2025 - Herramienta informativa. No sustituye el
            asesoramiento fiscal profesional.
          </div>
        </div>
      </footer>
    </div>
  );
}
