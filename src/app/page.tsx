import Link from "next/link";

const features: {
  icon: string;
  title: string;
  description: string;
  link?: string;
}[] = [
  {
    icon: "🔍",
    title: "400+ deducciones analizadas",
    description:
      "Estatales, autonomicas y para autonomos. La base de datos mas completa de deducciones fiscales de Espana.",
  },
  {
    icon: "📋",
    title: "Cuestionario inteligente",
    description:
      "Respondiendo unas preguntas sencillas sobre tu situacion, el sistema identifica exactamente que puedes aplicar.",
  },
  {
    icon: "💰",
    title: "Calcula tu ahorro",
    description:
      "Estima cuanto puedes ahorrarte aplicando todas las deducciones a las que tienes derecho.",
  },
  {
    icon: "🗺️",
    title: "Todas las comunidades",
    description:
      "Cubre las 17 comunidades autonomas mas Ceuta y Melilla, cada una con sus deducciones propias.",
    link: "/deducciones",
  },
  {
    icon: "⚡",
    title: "Novedades Renta 2025",
    description:
      "Incluye todas las novedades fiscales del ejercicio 2025: nueva deduccion de 340 euros, cambios en eficiencia energetica y mas.",
  },
  {
    icon: "📄",
    title: "Casillas incluidas",
    description:
      "Para cada deduccion te indicamos en que casilla de la declaracion debes aplicarla.",
  },
];

const stats = [
  { value: "400+", label: "Deducciones" },
  { value: "17", label: "Comunidades" },
  { value: "7", label: "Categorias" },
  { value: "2025", label: "Renta actualizada" },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">RentaMax</span>
            <span className="text-xs bg-primary-light text-primary px-2 py-0.5 rounded-full font-medium">
              Renta 2025
            </span>
          </div>
          <Link
            href="/cuestionario"
            className="bg-primary text-white px-5 py-2 rounded-lg font-medium hover:bg-primary-dark"
          >
            Empezar
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-accent-light text-accent px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            Campana Renta 2025 - Abierta hasta 30 junio 2026
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
            No dejes dinero
            <br />
            <span className="text-primary">en la mesa</span>
          </h1>
          <p className="text-xl text-muted max-w-2xl mx-auto mb-10">
            El 60% de los contribuyentes no aplica todas las deducciones a las
            que tiene derecho. Descubre en minutos cuanto puedes ahorrarte en tu
            declaracion.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/cuestionario"
              className="bg-primary text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-primary-dark shadow-lg shadow-primary/25"
            >
              Descubre tus deducciones
            </Link>
            <a
              href="#como-funciona"
              className="border-2 border-border text-foreground px-8 py-4 rounded-xl text-lg font-semibold hover:border-primary hover:text-primary"
            >
              Como funciona
            </a>
          </div>
          <div className="mt-6">
            <Link
              href="/deducciones"
              className="text-sm text-primary hover:text-primary-dark font-medium underline underline-offset-4"
            >
              Ver deducciones por comunidad autonoma
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 bg-card border-y border-border">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="text-sm text-muted mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="como-funciona" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            Como funciona
          </h2>
          <p className="text-muted text-center mb-12 max-w-xl mx-auto">
            En 3 pasos sencillos, descubre todas las deducciones que puedes
            aplicar
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Responde el cuestionario",
                desc: "Preguntas sencillas sobre tu situacion personal, familiar, laboral y financiera.",
              },
              {
                step: "2",
                title: "Analisis automatico",
                desc: "El sistema cruza tus respuestas con mas de 400 deducciones estatales y autonomicas.",
              },
              {
                step: "3",
                title: "Resultados personalizados",
                desc: "Recibe tu lista de deducciones aplicables, con importes estimados y casillas.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="text-center p-6 rounded-2xl border border-border bg-card"
              >
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-muted text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-card border-y border-border">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Todo lo que necesitas
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const content = (
                <>
                  <div className="text-3xl mb-3">{feature.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted text-sm">{feature.description}</p>
                  {feature.link && (
                    <span className="inline-block mt-3 text-primary text-sm font-medium">
                      Ver todas &rarr;
                    </span>
                  )}
                </>
              );
              return feature.link ? (
                <Link
                  key={feature.title}
                  href={feature.link}
                  className="p-6 rounded-2xl border border-border bg-background card-hover block"
                >
                  {content}
                </Link>
              ) : (
                <div
                  key={feature.title}
                  className="p-6 rounded-2xl border border-border bg-background card-hover"
                >
                  {content}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Empieza a ahorrar ahora
          </h2>
          <p className="text-muted mb-8">
            No necesitas registrarte. Responde unas preguntas y descubre en
            minutos cuanto puedes deducirte.
          </p>
          <Link
            href="/cuestionario"
            className="inline-block bg-primary text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-primary-dark shadow-lg shadow-primary/25"
          >
            Empezar cuestionario gratuito
          </Link>
        </div>
      </section>

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

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebApplication",
                "name": "RentaMax",
                "url": "https://rentamax.franmilla.com",
                "description": "Herramienta gratuita para encontrar todas las deducciones y bonificaciones aplicables en la declaracion de la Renta 2025 en Espana. 345 deducciones analizadas.",
                "applicationCategory": "FinanceApplication",
                "operatingSystem": "Web",
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "EUR"
                },
                "author": {
                  "@type": "Person",
                  "name": "Fran Milla",
                  "url": "https://franmilla.com"
                },
                "featureList": [
                  "345 deducciones fiscales analizadas",
                  "17 comunidades autonomas cubiertas",
                  "Upload de borrador PDF de la Agencia Tributaria",
                  "Cuestionario inteligente adaptativo",
                  "Guia paso a paso para reclamar cada deduccion",
                  "Ahorro estimado personalizado",
                  "100% gratuita, sin registro"
                ]
              },
              {
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "Cuantas deducciones cubre RentaMax?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "RentaMax cubre 345 deducciones: 67 estatales, 256 autonomicas (17 comunidades autonomas + Ceuta y Melilla) y 22 especificas para autonomos. Incluye 41 novedades del ejercicio fiscal 2025."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Es gratis RentaMax?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Si, RentaMax es 100% gratuita. No requiere registro, no pide datos personales y no cobra por mostrar resultados. Todos los datos se procesan en tu navegador sin enviarse a ningun servidor."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Como funciona el analisis del borrador de la renta?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Puedes subir el PDF del borrador descargado de la Agencia Tributaria. RentaMax extrae automaticamente tus datos fiscales (ingresos, retenciones, deducciones ya aplicadas) y los compara con las 345 deducciones disponibles para encontrar las que te faltan."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Que diferencia hay entre RentaMax y TaxDown?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "TaxDown cobra 35-239 EUR por presentar la declaracion. RentaMax es gratuita y te muestra exactamente que deducciones aplicar, con casillas, pasos en Renta Web y documentacion necesaria. TaxDown la presenta por ti; RentaMax te ensena a hacerlo tu mismo."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Cuando es el plazo para la declaracion de la Renta 2025?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "La campana de la Renta 2025 va del 2 de abril al 30 de junio de 2026. Si el resultado sale a pagar y quieres domiciliar, el plazo acaba el 25 de junio. Puedes fraccionar el pago en 60% (junio) y 40% (noviembre)."
                    }
                  }
                ]
              }
            ]
          })
        }}
      />
    </div>
  );
}
