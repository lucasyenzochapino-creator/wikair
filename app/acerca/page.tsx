import BackButton from "@/components/BackButton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Acerca de WikiAir — Enciclopedia de Aviación",
  description:
    "Conocé la historia, misión y equipo detrás de WikiAir, la enciclopedia de aviación más completa del mundo hispanohablante.",
};

export default function AcercaPage() {
  return (
    <div className="page">
      <div className="container">
        <BackButton label="← Volver al inicio" />

        <div className="hero">
          <p className="gold" style={{ fontSize: 13, letterSpacing: 2, textTransform: "uppercase", margin: 0 }}>
            Sobre el proyecto
          </p>
          <h1>
            Acerca de <span className="gold">WikiAir</span>
          </h1>
          <p>
            La enciclopedia de aviación más completa del mundo hispanohablante,
            creada con pasión desde la Argentina.
          </p>
        </div>

        {/* Quiénes somos */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>Quiénes somos</h2>
          <p style={pStyle}>
            WikiAir nació en 2026 como un proyecto personal de{" "}
            <strong className="gold">Enzo Chapino</strong>, desde{" "}
            <strong>Aldea Valle María, Entre Ríos, República Argentina</strong>.
            Impulsado por la fascinación por la aviación y la convicción de que
            el conocimiento aeronáutico debía estar disponible en español de
            forma clara, gratuita y rigurosa, WikiAir se convirtió en un
            repositorio enciclopédico que cubre aeronaves civiles y militares,
            historia de la aviación, récords mundiales, tecnología aeroespacial
            y tráfico aéreo en tiempo real.
          </p>
          <p style={pStyle}>
            El proyecto surge de la escasez de recursos en idioma español que
            combinen profundidad técnica con accesibilidad para el gran público.
            Cada ficha, cada artículo y cada dato incluido en WikiAir es
            seleccionado y editado con criterio enciclopédico, buscando la
            precisión sin sacrificar la claridad.
          </p>
        </section>

        {/* Visión */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>Nuestra visión</h2>
          <blockquote style={blockquoteStyle}>
            "Ser la enciclopedia de aviación más completa del mundo
            hispanohablante: el lugar de referencia al que acude cualquier
            persona de habla española que quiera aprender, consultar o
            profundizar sobre aviación."
          </blockquote>
          <p style={pStyle}>
            Aspiramos a que WikiAir sea tan reconocida en el ámbito
            hispanohablante como lo son las grandes referencias aeronáuticas
            internacionales, aportando el rigor enciclopédico con la calidez y
            cercanía del español.
          </p>
        </section>

        {/* Misión */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>Misión</h2>
          <p style={pStyle}>
            Democratizar el conocimiento de la aviación para jóvenes y adultos
            de toda la comunidad hispanohablante. Creemos que la aeronáutica no
            debe ser un mundo reservado a profesionales o a quienes dominan el
            inglés: cualquier persona con curiosidad merece acceder a
            información de calidad sobre aviones, historia del vuelo, récords,
            tecnología y tráfico aéreo, sin barreras de idioma ni de costo.
          </p>
          <div style={pillRowStyle}>
            <span style={pillStyle}>Gratuito</span>
            <span style={pillStyle}>En español</span>
            <span style={pillStyle}>Educativo</span>
            <span style={pillStyle}>Rigor técnico</span>
            <span style={pillStyle}>Accesible</span>
          </div>
        </section>

        {/* Propietario */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>Propietario y autor</h2>
          <div style={ownerCardStyle}>
            <div>
              <p style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 700 }}>
                Enzo Chapino
              </p>
              <p style={{ margin: "0 0 2px", color: "#cfcfcf" }}>
                Aldea Valle María, Entre Ríos, República Argentina
              </p>
              <p style={{ margin: "8px 0 0", color: "#cfcfcf", fontSize: 14 }}>
                Fundador, editor jefe y desarrollador de WikiAir (2026)
              </p>
            </div>
          </div>
          <p style={pStyle}>
            Todos los contenidos editoriales de WikiAir son creados y curados
            por Enzo Chapino. Las imágenes y datos de terceros se obtienen de
            fuentes públicas como Wikipedia y Wikimedia Commons, citando sus
            respectivas licencias.
          </p>
        </section>

        {/* Stack tecnológico */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>Tecnología</h2>
          <p style={pStyle}>
            WikiAir está construido con tecnologías modernas de desarrollo web,
            garantizando velocidad, accesibilidad y experiencia de uso óptima
            en cualquier dispositivo.
          </p>
          <div style={techGridStyle}>
            <div style={techItemStyle}>
              <span style={{ fontSize: 28 }}>▲</span>
              <strong>Next.js 15</strong>
              <span style={{ color: "#bdbdbd", fontSize: 13 }}>Framework React</span>
            </div>
            <div style={techItemStyle}>
              <span style={{ fontSize: 28 }}>TS</span>
              <strong>TypeScript</strong>
              <span style={{ color: "#bdbdbd", fontSize: 13 }}>Tipado estático</span>
            </div>
            <div style={techItemStyle}>
              <span style={{ fontSize: 28 }}>W</span>
              <strong>Wikipedia API</strong>
              <span style={{ color: "#bdbdbd", fontSize: 13 }}>Datos e imágenes</span>
            </div>
            <div style={techItemStyle}>
              <span style={{ fontSize: 28 }}>✈</span>
              <strong>ADS-B / Radar</strong>
              <span style={{ color: "#bdbdbd", fontSize: 13 }}>Tráfico en tiempo real</span>
            </div>
          </div>
        </section>

        {/* Links legales */}
        <section style={{ ...sectionStyle, borderBottom: "none" }}>
          <h2 style={h2Style}>Información legal</h2>
          <p style={pStyle}>
            Para conocer cómo WikiAir gestiona tus datos y cuáles son las
            condiciones de uso del sitio, consultá las siguientes páginas:
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" as const, marginTop: 8 }}>
            <a href="/privacidad" className="categoryNav" style={legalLinkStyle}>
              Política de Privacidad →
            </a>
            <a href="/terminos" className="categoryNav" style={legalLinkStyle}>
              Términos y Condiciones →
            </a>
          </div>
        </section>

        <div style={{ paddingBottom: 64 }} />
      </div>
    </div>
  );
}

const sectionStyle: React.CSSProperties = {
  padding: "36px 0",
  borderBottom: "1px solid rgba(255,255,255,0.07)",
};

const h2Style: React.CSSProperties = {
  fontSize: "clamp(22px, 4vw, 34px)",
  color: "#d4af37",
  marginBottom: 16,
  marginTop: 0,
};

const pStyle: React.CSSProperties = {
  color: "#cfcfcf",
  lineHeight: 1.7,
  fontSize: 16,
  maxWidth: 780,
  marginTop: 0,
};

const blockquoteStyle: React.CSSProperties = {
  borderLeft: "3px solid #d4af37",
  margin: "0 0 20px",
  paddingLeft: 20,
  color: "#f0d98a",
  fontStyle: "italic",
  fontSize: 18,
  lineHeight: 1.6,
};

const pillRowStyle: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap" as const,
  gap: 10,
  marginTop: 20,
};

const pillStyle: React.CSSProperties = {
  border: "1px solid rgba(212,175,55,.35)",
  background: "rgba(212,175,55,.08)",
  color: "#f0d98a",
  borderRadius: 999,
  padding: "7px 16px",
  fontSize: 13,
};

const ownerCardStyle: React.CSSProperties = {
  background: "linear-gradient(180deg, rgba(25,25,25,.96), rgba(10,10,10,.96))",
  border: "1px solid rgba(212,175,55,.25)",
  borderRadius: 18,
  padding: "20px 24px",
  marginBottom: 20,
  display: "inline-block",
};

const techGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
  gap: 16,
  marginTop: 20,
};

const techItemStyle: React.CSSProperties = {
  background: "linear-gradient(180deg, rgba(23,23,23,.98), rgba(9,9,9,.98))",
  border: "1px solid rgba(255,255,255,.10)",
  borderRadius: 18,
  padding: "20px 16px",
  display: "flex",
  flexDirection: "column" as const,
  gap: 6,
  alignItems: "center",
  textAlign: "center" as const,
  color: "#d4af37",
};

const legalLinkStyle: React.CSSProperties = {
  border: "1px solid rgba(212,175,55,.35)",
  background: "rgba(212,175,55,.08)",
  color: "#f0d98a",
  borderRadius: 999,
  padding: "9px 18px",
  textDecoration: "none",
  fontSize: 14,
};
