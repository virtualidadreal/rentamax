import Link from "next/link";

const features = [
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
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-2xl border border-border bg-background card-hover"
              >
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted text-sm">{feature.description}</p>
              </div>
            ))}
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
              Desarrollador AI &middot; Sistemas inteligentes para empresas y personas
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
