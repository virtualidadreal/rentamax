import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Deducciones generales - RentaMax",
  description:
    "Deducciones estatales que pueden aplicar a cualquier contribuyente en la Renta 2025: becas, loterias, planes de ahorro y mas.",
};

const GENERAL_DEDUCTIONS = [
  {
    name: "Reduccion por rendimientos irregulares",
    description:
      "Si has obtenido ingresos generados en mas de 2 anos que se cobran de golpe (bonus plurianuales, atrasos, etc.), puedes reducirte un 30% sobre un maximo de 300.000 EUR.",
    who: "Contribuyentes con rendimientos de periodo de generacion superior a 2 anos",
    casilla: "Automatico en datos fiscales",
  },
  {
    name: "Pension compensatoria al conyuge",
    description:
      "La totalidad de la pension compensatoria fijada judicialmente reduce tu base imponible general.",
    who: "Separados o divorciados que pagan pension compensatoria por sentencia judicial",
    casilla: "482",
  },
  {
    name: "Anualidades por alimentos a otras personas",
    description:
      "Reduccion por anualidades por alimentos a favor de personas distintas de los hijos, fijadas judicialmente.",
    who: "Contribuyentes con obligacion judicial de pagar alimentos a personas no hijos",
    casilla: "482",
  },
  {
    name: "Cuotas de afiliacion a partidos politicos",
    description:
      "Deduccion del 20% de las cuotas de afiliacion, con un maximo de 120 EUR.",
    who: "Afiliados a partidos politicos",
    casilla: "731",
  },
  {
    name: "Proteccion del patrimonio historico",
    description:
      "Deduccion del 15% en adquisicion o conservacion de bienes del Patrimonio Historico Espanol declarados BIC.",
    who: "Propietarios o adquirentes de bienes de interes cultural",
    casilla: "729-730",
  },
  {
    name: "Doble imposicion internacional",
    description:
      "Si has pagado impuestos en el extranjero por rentas obtenidas fuera, puedes deducirte lo pagado para evitar pagar dos veces.",
    who: "Contribuyentes con rentas obtenidas en el extranjero gravadas por impuesto analogo",
    casilla: "588",
  },
  {
    name: "Exencion para mayores de 65 con renta vitalicia",
    description:
      "La ganancia patrimonial por transmision de cualquier bien esta exenta si el importe se reinvierte en una renta vitalicia asegurada (max 240.000 EUR).",
    who: "Mayores de 65 anos que venden bienes y reinvierten en renta vitalicia",
    casilla: "Datos fiscales",
  },
  {
    name: "Exencion de becas publicas",
    description:
      "Las becas concedidas por la Administracion o entidades sin animo de lucro estan exentas hasta ciertos limites (6.000-21.000 EUR segun nivel).",
    who: "Beneficiarios de becas publicas de estudio o investigacion",
    casilla: "No se declara (exenta)",
  },
  {
    name: "Exencion de prestacion por desempleo en pago unico",
    description:
      "Si cobras la prestacion por desempleo en pago unico para emprender, esta exenta.",
    who: "Desempleados que capitalizan el paro para iniciar una actividad",
    casilla: "No se declara (exenta)",
  },
  {
    name: "Exencion de premios de loterias",
    description:
      "Los primeros 40.000 EUR de premios de Loterias del Estado, CCAA, Cruz Roja y ONCE estan exentos.",
    who: "Ganadores de loterias, quinielas, ONCE y sorteos similares",
    casilla: "No se declara hasta 40.000 EUR",
  },
  {
    name: "Compensacion de perdidas patrimoniales",
    description:
      "Las perdidas de inversiones (acciones, fondos, cripto) se pueden compensar con ganancias. Si hay exceso, se arrastra 4 anos.",
    who: "Inversores con perdidas patrimoniales en el ejercicio",
    casilla: "Automatico en datos fiscales",
  },
  {
    name: "Planes Individuales de Ahorro Sistematico (PIAS)",
    description:
      "Los rendimientos generados en un PIAS estan exentos si se rescata como renta vitalicia tras al menos 5 anos.",
    who: "Titulares de PIAS con antigueedad superior a 5 anos",
    casilla: "Datos fiscales",
  },
  {
    name: "Seguro Individual de Ahorro a Largo Plazo (SIALP)",
    description:
      "Los rendimientos generados en un SIALP estan exentos tras 5 anos. Aportacion maxima de 5.000 EUR/ano.",
    who: "Titulares de SIALP con antigueedad superior a 5 anos",
    casilla: "Datos fiscales",
  },
];

export default function DeduccionesGenerales() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold text-primary">
            RentaMax
          </Link>
          <Link
            href="/resultados"
            className="text-sm text-primary hover:text-primary-dark font-medium"
          >
            Volver a resultados
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">
            Deducciones generales
          </h1>
          <p className="text-muted">
            Estas deducciones estatales pueden aplicar a cualquier contribuyente
            en situaciones concretas. Revisa si alguna encaja con tu caso.
          </p>
        </div>

        <div className="space-y-4">
          {GENERAL_DEDUCTIONS.map((d, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-xl p-5"
            >
              <h3 className="font-semibold text-foreground mb-1">{d.name}</h3>
              <p className="text-sm text-muted mb-3">{d.description}</p>
              <div className="flex flex-wrap gap-3">
                <div className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full">
                  Casilla: {d.casilla}
                </div>
                <div className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                  Aplica a: {d.who}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-warning-light border border-warning/30 rounded-xl p-4 mt-8 mb-8">
          <h3 className="font-semibold text-foreground mb-2">
            Aviso importante
          </h3>
          <p className="text-sm text-foreground/80">
            Esta informacion es orientativa. Consulta con un asesor fiscal para
            confirmar si alguna de estas deducciones aplica a tu situacion.
          </p>
        </div>

        <div className="text-center">
          <Link
            href="/resultados"
            className="inline-block bg-primary text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary-dark"
          >
            Volver a mis resultados
          </Link>
        </div>
      </div>
    </div>
  );
}
