"use client";
import { useState } from "react";
import BackButton from "@/components/BackButton";
import Link from "next/link";

function openSim(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

export default function SimuladorPage() {
  const [launched, setLaunched] = useState(false);

  function handleLaunch() {
    setLaunched(true);
    window.open("https://www.geo-fs.com/geofs.php?v=2.91", "_blank", "noopener,noreferrer");
  }

  return (
    <main className="page" style={{ paddingBottom: 0 }}>
      <section className="moduleHero" style={{ height: 220 }}>
        <div className="moduleHeroImg">
          <div style={{
            width: "100%", height: "100%",
            background: "linear-gradient(135deg, #060d1a 0%, #0a1f3d 45%, #071528 100%)",
          }} />
          <div className="moduleHeroOverlay" />
        </div>
        <div className="container moduleHeroContent" style={{ paddingTop: 90 }}>
          <BackButton />
          <div className="moduleBadge">SIMULADOR REAL · WEBGL · GRATIS · MOBILE</div>
          <h1 style={{ fontSize: "clamp(26px, 5vw, 44px)" }}>Simulador de vuelo</h1>
        </div>
      </section>

      {/* Hero launch card */}
      <div className="container" style={{ paddingTop: 32 }}>
        <div style={{
          background: "linear-gradient(145deg, rgba(14,30,60,0.95), rgba(6,14,30,0.98))",
          border: "1px solid rgba(56, 139, 253, 0.25)",
          borderRadius: 20,
          overflow: "hidden",
          boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
        }}>
          {/* Preview banner */}
          <div style={{
            position: "relative",
            height: 200,
            background: "linear-gradient(160deg, #0a1628 0%, #112240 60%, #0a1f3d 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}>
            {/* Decorative runway lines */}
            <div style={{
              position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
              width: 60, height: "100%",
              background: "linear-gradient(to top, rgba(255,255,255,0.12) 0%, transparent 100%)",
            }} />
            {[0.2, 0.4, 0.6, 0.8].map((p) => (
              <div key={p} style={{
                position: "absolute",
                bottom: p * 200,
                left: "calc(50% - 25px)",
                width: 50, height: 14,
                background: "rgba(255,255,255,0.15)",
                borderRadius: 2,
              }} />
            ))}
            {/* Plane silhouette SVG */}
            <svg width="120" height="80" viewBox="0 0 120 80" fill="none" style={{ filter: "drop-shadow(0 0 20px rgba(56,139,253,0.6))", zIndex: 1 }}>
              <path d="M60 10 L90 50 L60 45 L30 50 Z" fill="rgba(56,139,253,0.85)" />
              <path d="M55 45 L65 45 L67 70 L53 70 Z" fill="rgba(56,139,253,0.7)" />
              <path d="M35 52 L55 47 L55 55 L35 60 Z" fill="rgba(56,139,253,0.55)" />
              <path d="M65 47 L85 52 L85 60 L65 55 Z" fill="rgba(56,139,253,0.55)" />
              <circle cx="60" cy="32" r="5" fill="rgba(100,180,255,0.9)" />
            </svg>
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height: 80,
              background: "linear-gradient(to top, rgba(6,14,30,0.98), transparent)",
            }} />
            <div style={{
              position: "absolute", top: 16, right: 16,
              background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.4)",
              borderRadius: 8, padding: "4px 12px",
              fontSize: 11, fontWeight: 700, color: "#22c55e", fontFamily: "'Space Mono', monospace",
              display: "flex", alignItems: "center", gap: 6,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block", boxShadow: "0 0 6px #22c55e" }} />
              ONLINE · GRATIS
            </div>
          </div>

          {/* Card body */}
          <div style={{ padding: "24px 28px 28px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
              <div>
                <p style={{ fontSize: 11, fontWeight: 700, color: "var(--sky)", letterSpacing: "0.1em", marginBottom: 6 }}>
                  GeoFS FLIGHT SIMULATOR
                </p>
                <h2 style={{ fontSize: "clamp(20px, 4vw, 30px)", margin: 0, letterSpacing: -0.5 }}>
                  Simulador profesional en el navegador
                </h2>
              </div>
            </div>

            <p style={{ color: "var(--muted2)", fontSize: 14.5, lineHeight: 1.65, margin: "16px 0 24px" }}>
              GeoFS es un simulador de vuelo real, desarrollado por expertos, que corre 100% en el navegador sin instalaciones.
              Usa <strong style={{ color: "var(--text)" }}>imágenes satelitales reales de todo el planeta</strong>, modelos
              de aeronaves precisos y física de vuelo realista. Funciona perfectamente en iPhone y Android.
            </p>

            {/* Feature pills */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
              {[
                "🌍 Terreno satelital real",
                "✈️ 20+ aeronaves",
                "🌤️ Clima en tiempo real",
                "📱 Mobile-first",
                "🎮 Joystick compatible",
                "🆓 100% gratis",
              ].map((f) => (
                <span key={f} style={{
                  background: "rgba(56,139,253,0.1)", border: "1px solid rgba(56,139,253,0.2)",
                  borderRadius: 20, padding: "5px 12px", fontSize: 12.5, color: "var(--text)",
                }}>
                  {f}
                </span>
              ))}
            </div>

            {/* CTA button */}
            <button
              type="button"
              onClick={handleLaunch}
              style={{
                width: "100%", padding: "16px 24px",
                background: "linear-gradient(135deg, #1d4ed8, #2563eb)",
                border: "none", borderRadius: 14,
                fontSize: 16, fontWeight: 700, color: "#fff",
                cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                boxShadow: "0 4px 20px rgba(37,99,235,0.4)",
                transition: "transform 0.1s, box-shadow 0.2s",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              {launched ? "Abriendo GeoFS… (revisar nueva pestaña)" : "Abrir simulador GeoFS"}
            </button>

            <p style={{ textAlign: "center", fontSize: 12, color: "var(--muted)", marginTop: 12 }}>
              Se abre en una nueva pestaña · geo-fs.com
            </p>
          </div>
        </div>
      </div>

      {/* Mobile tips */}
      <div className="container" style={{ paddingTop: 28, paddingBottom: 20 }}>
        <p className="gold">INSTRUCCIONES PARA CELULAR</p>
        <h2 style={{ fontSize: "clamp(18px, 3.5vw, 26px)", margin: "8px 0 18px", letterSpacing: -0.5 }}>Cómo volar desde tu teléfono</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 12 }}>
          {[
            { icon: "1️⃣", tip: "Tocá 'Abrir simulador GeoFS' — se abre en el navegador (Chrome o Safari)" },
            { icon: "2️⃣", tip: "Girá el teléfono en horizontal para mejor experiencia de vuelo" },
            { icon: "3️⃣", tip: "En iOS: tocá el botón compartir → 'Añadir a pantalla de inicio' para usarlo como app" },
            { icon: "🛫", tip: "Arrastrá la palanca de gas hacia arriba, tomá velocidad y llevá el morro hacia arriba para despegar" },
            { icon: "🕹️", tip: "Incliná el teléfono (giroscopio) o usá los controles táctiles en pantalla para maniobrar" },
            { icon: "🌍", tip: "Podés elegir el aeropuerto de salida desde el menú — probá el Aeroparque de Buenos Aires (SABE)" },
          ].map(({ icon, tip }, i) => (
            <div key={i} style={{
              background: "var(--glass)", border: "1px solid var(--border)", borderRadius: 12,
              padding: "14px 16px", display: "flex", gap: 12, alignItems: "flex-start",
            }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>{icon}</span>
              <p style={{ color: "var(--muted2)", fontSize: 13.5, lineHeight: 1.6, margin: 0 }}>{tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Aeronaves disponibles */}
      <div className="container" style={{ paddingBottom: 20 }}>
        <p className="gold">AERONAVES DISPONIBLES EN GEOFS</p>
        <h2 style={{ fontSize: "clamp(18px, 3.5vw, 26px)", margin: "8px 0 18px", letterSpacing: -0.5 }}>Más de 20 aeronaves reales</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10 }}>
          {[
            { name: "Cessna 172", type: "Avión de entrenamiento", icon: "✈️" },
            { name: "Boeing 737-800", type: "Jet comercial narrowbody", icon: "🛫" },
            { name: "Airbus A380", type: "Jumbo jet de dos pisos", icon: "🛬" },
            { name: "F/A-18 Hornet", type: "Jet de combate naval", icon: "🚀" },
            { name: "Piper Cherokee", type: "Avión de aviación general", icon: "✈️" },
            { name: "Concorde", type: "Supersónico comercial", icon: "⚡" },
            { name: "Airbus A320", type: "Jet comercial estándar", icon: "🛫" },
            { name: "Robinson R22", type: "Helicóptero liviano", icon: "🚁" },
          ].map(({ name, type, icon }) => (
            <div key={name} style={{
              background: "var(--glass)", border: "1px solid var(--border)", borderRadius: 10,
              padding: "12px 14px", display: "flex", alignItems: "center", gap: 10,
            }}>
              <span style={{ fontSize: 22 }}>{icon}</span>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: "var(--text)", margin: 0 }}>{name}</p>
                <p style={{ fontSize: 11, color: "var(--muted)", margin: 0 }}>{type}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Otros simuladores */}
      <div className="container" style={{ paddingBottom: 48 }}>
        <div className="infoBanner">
          <p>
            <strong style={{ color: "var(--text)" }}>¿Querés más opciones?</strong>{" "}
            <a href="https://www.flightgear.org" target="_blank" rel="noopener noreferrer" style={{ color: "var(--sky)" }}>FlightGear ↗</a>{" "}
            es el simulador de código abierto más completo (PC/Mac/Linux).{" "}
            <a href="https://www.x-plane.com/mobile/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--sky)" }}>X-Plane Mobile ↗</a>{" "}
            y{" "}
            <a href="https://www.infiniteflightllc.com" target="_blank" rel="noopener noreferrer" style={{ color: "var(--sky)" }}>Infinite Flight ↗</a>{" "}
            son las mejores apps para iPhone y Android con física de vuelo profesional.
          </p>
        </div>
        <div style={{ marginTop: 24, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link className="btnPrimary" href="/vuelo">Módulo 1: Cómo vuela →</Link>
          <Link className="btnOutline" href="/instrumentos">Ver instrumentos</Link>
        </div>
      </div>
    </main>
  );
}
