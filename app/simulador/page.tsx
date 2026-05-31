"use client";
import { useState } from "react";
import BackButton from "@/components/BackButton";

const SIMS = [
  {
    id: "geofs",
    name: "GeoFS",
    subtitle: "Simulador principal — terrneno real de todo el mundo",
    url: "https://www.geo-fs.com/geofs.php",
    desc: "El simulador gratuito más completo disponible en navegador. Usa imágenes satelitales reales del planeta entero como terreno. Incluye múltiples aviones (Cessna 172, Boeing 737, A320, planeadores y más), condiciones meteorológicas, aeropuertos reales y modo multijugador.",
    tips: [
      "En móvil: usá el joystick virtual del lado izquierdo para inclinar y el acelerador del derecho",
      "Botón de pausa → luego 'Cessna 172' para empezar fácil",
      "Presioná G para retraer/desplegar el tren de aterrizaje",
      "Tecla F (o botón en pantalla) para los flaps",
      "Si perdés el control, presioná P (auto-piloto de rescate)",
    ],
    mobile: true,
    free: true,
  },
  {
    id: "flightsim",
    name: "FlightSimulator.io",
    subtitle: "Simulador web alternativo con física realista",
    url: "https://flightsimulator.io",
    desc: "Simulador de vuelo gratuito en WebGL. Física de vuelo realista, múltiples aeronaves y entornos. Compatible con teclado, mouse y pantalla táctil.",
    tips: [
      "WASD o las flechas para controlar el avión",
      "Barra espaciadora para el acelerador",
      "En móvil: activá los controles táctiles en el menú",
    ],
    mobile: true,
    free: true,
  },
];

export default function SimuladorPage() {
  const [active, setActive] = useState(SIMS[0].id);
  const [fullscreen, setFullscreen] = useState(false);
  const [iframeError, setIframeError] = useState<Record<string, boolean>>({});

  const sim = SIMS.find((s) => s.id === active)!;
  const hasError = iframeError[active];

  return (
    <main className="page" style={{ paddingBottom: 0 }}>
      {/* ── HEADER ────────────────────────────────────────────── */}
      {!fullscreen && (
        <section className="moduleHero" style={{ height: 220 }}>
          <div className="moduleHeroImg">
            <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #0C0C0C 0%, #1A1000 50%, #0C0C0C 100%)" }} />
            <div className="moduleHeroOverlay" />
          </div>
          <div className="container moduleHeroContent" style={{ paddingTop: 110 }}>
            <BackButton />
            <div className="moduleBadge">SIMULADOR DE VUELO · INTERACTIVO</div>
            <h1 style={{ fontSize: "clamp(28px, 6vw, 52px)" }}>Volá ahora mismo</h1>
          </div>
        </section>
      )}

      {/* ── SELECTOR DE SIMULADOR ─────────────────────────────── */}
      {!fullscreen && (
        <div className="container" style={{ paddingTop: 24, paddingBottom: 16 }}>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {SIMS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setActive(s.id)}
                style={{
                  padding: "10px 20px", borderRadius: 10, cursor: "pointer", fontSize: 14, fontWeight: 700,
                  border: `1px solid ${active === s.id ? "var(--sky)" : "var(--border)"}`,
                  background: active === s.id ? "var(--sky-dim)" : "var(--glass)",
                  color: active === s.id ? "var(--sky)" : "var(--muted2)",
                  transition: "all 0.15s",
                }}
              >
                {s.name}
                {s.mobile && <span style={{ marginLeft: 6, fontSize: 11, opacity: 0.7 }}>📱</span>}
              </button>
            ))}
          </div>
          <p style={{ color: "var(--muted2)", fontSize: 13, marginTop: 8 }}>{sim.subtitle}</p>
        </div>
      )}

      {/* ── SIMULADOR IFRAME ──────────────────────────────────── */}
      <div
        style={{
          position: fullscreen ? "fixed" : "relative",
          inset: fullscreen ? 0 : undefined,
          zIndex: fullscreen ? 999 : undefined,
          background: "#000",
          width: "100%",
          height: fullscreen ? "100dvh" : "clamp(420px, 65vw, 700px)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Toolbar */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "8px 16px", background: "rgba(0,0,0,0.85)", borderBottom: "1px solid var(--border)",
          flexShrink: 0,
        }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: "var(--sky)" }}>{sim.name}</span>
          <div style={{ display: "flex", gap: 8 }}>
            {hasError && (
              <a
                href={sim.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 700,
                  background: "var(--sky)", color: "#000", textDecoration: "none",
                }}
              >
                Abrir en nueva pestaña ↗
              </a>
            )}
            <button
              type="button"
              onClick={() => setFullscreen((f) => !f)}
              style={{
                padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer",
                background: "var(--glass2)", border: "1px solid var(--border)", color: "var(--text)",
              }}
            >
              {fullscreen ? "Salir ✕" : "⛶ Pantalla completa"}
            </button>
          </div>
        </div>

        {/* Iframe or fallback */}
        {hasError ? (
          <div style={{
            flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            gap: 20, padding: 32, textAlign: "center",
          }}>
            <div style={{ fontSize: 48 }}>✈️</div>
            <h2 style={{ fontSize: 22, margin: 0 }}>{sim.name} — Abrir en navegador</h2>
            <p style={{ color: "var(--muted2)", maxWidth: 400, lineHeight: 1.6 }}>
              {sim.desc}
            </p>
            <a
              href={sim.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block", padding: "14px 32px", borderRadius: 12,
                background: "var(--sky)", color: "#000", fontWeight: 800, fontSize: 16,
                textDecoration: "none",
              }}
            >
              Abrir {sim.name} →
            </a>
            <p style={{ color: "var(--muted2)", fontSize: 12 }}>
              Se abre en una nueva pestaña. Completamente gratuito, no requiere registro.
            </p>
          </div>
        ) : (
          <iframe
            key={active}
            src={sim.url}
            style={{ flex: 1, border: "none", display: "block", width: "100%", height: "100%" }}
            allow="fullscreen; accelerometer; gyroscope; gamepad"
            allowFullScreen
            onError={() => setIframeError((e) => ({ ...e, [active]: true }))}
            title={`${sim.name} — Simulador de vuelo`}
          />
        )}
      </div>

      {/* ── CONSEJOS ──────────────────────────────────────────── */}
      {!fullscreen && (
        <div className="container" style={{ paddingTop: 32, paddingBottom: 20 }}>
          <p className="gold">CONSEJOS DE VUELO</p>
          <h2 style={{ fontSize: "clamp(20px, 4vw, 32px)", margin: "8px 0 20px", letterSpacing: -0.5 }}>
            Cómo usar {sim.name} en el celular
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 14 }}>
            {sim.tips.map((tip, i) => (
              <div
                key={i}
                style={{
                  background: "var(--glass)", border: "1px solid var(--border)", borderRadius: 12,
                  padding: "14px 18px", display: "flex", gap: 12, alignItems: "flex-start",
                }}
              >
                <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>
                  {["🕹️", "✈️", "⚙️", "🛬", "🆘", "🌍", "📡"][i % 7]}
                </span>
                <p style={{ color: "var(--muted2)", fontSize: 13.5, lineHeight: 1.6, margin: 0 }}>{tip}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── SOBRE GEOFS ──────────────────────────────────────── */}
      {!fullscreen && (
        <div className="container" style={{ paddingBottom: 48 }}>
          <div className="infoBanner">
            <p>
              <strong style={{ color: "var(--text)" }}>GeoFS es 100% gratuito</strong> y funciona directamente en el navegador sin descargas. Usa el motor de renderizado Cesium con imágenes satelitales reales. En la versión gratuita tenés más de 20 aeronaves, todos los aeropuertos del mundo y modo multijugador básico. La versión Premium (USD 9.99/mes) agrega más aviones y resolución de terreno superior.
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
