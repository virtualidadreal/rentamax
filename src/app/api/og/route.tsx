import { ImageResponse } from "@vercel/og";
import { type NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const ahorro = searchParams.get("ahorro") || "0";
  const deducciones = searchParams.get("deducciones") || "0";
  const ccaa = searchParams.get("ccaa") || "";

  const ahorroNum = parseInt(ahorro, 10);
  const ahorroFormatted = isNaN(ahorroNum)
    ? "0"
    : ahorroNum.toLocaleString("es-ES");

  const ccaaNames: Record<string, string> = {
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

  const ccaaName = ccaa ? ccaaNames[ccaa] || "" : "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 40%, #dbeafe 80%, #ffffff 100%)",
          fontFamily: "system-ui, sans-serif",
          padding: "60px",
        }}
      >
        {/* Card container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            borderRadius: "24px",
            padding: "50px 60px",
            boxShadow: "0 25px 60px rgba(0, 0, 0, 0.15)",
            maxWidth: "1080px",
            width: "100%",
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "32px",
            }}
          >
            <span
              style={{
                fontSize: "42px",
                fontWeight: 800,
                color: "#2563eb",
                letterSpacing: "-1px",
              }}
            >
              RentaMax
            </span>
            <span
              style={{
                fontSize: "16px",
                fontWeight: 600,
                color: "#2563eb",
                backgroundColor: "#dbeafe",
                padding: "4px 14px",
                borderRadius: "20px",
              }}
            >
              Renta 2025
            </span>
          </div>

          {/* Main text */}
          <div
            style={{
              fontSize: "52px",
              fontWeight: 800,
              color: "#1a1a2e",
              textAlign: "center",
              lineHeight: 1.2,
              marginBottom: "16px",
            }}
          >
            Podrias ahorrarte{" "}
            <span style={{ color: "#059669" }}>{ahorroFormatted} EUR</span>
            <br />
            en tu Renta 2025
          </div>

          {/* Deducciones */}
          <div
            style={{
              fontSize: "24px",
              color: "#6b7280",
              textAlign: "center",
              marginBottom: "12px",
            }}
          >
            He encontrado{" "}
            <span style={{ color: "#2563eb", fontWeight: 700 }}>
              {deducciones} deducciones
            </span>{" "}
            aplicables
          </div>

          {/* CCAA */}
          {ccaaName && (
            <div
              style={{
                fontSize: "20px",
                color: "#6b7280",
                textAlign: "center",
                marginBottom: "24px",
              }}
            >
              en {ccaaName}
            </div>
          )}

          {/* CTA */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "#2563eb",
              color: "#ffffff",
              fontSize: "22px",
              fontWeight: 700,
              padding: "16px 36px",
              borderRadius: "16px",
              marginTop: "8px",
            }}
          >
            Descubre tus deducciones en rentamax.franmilla.com
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
