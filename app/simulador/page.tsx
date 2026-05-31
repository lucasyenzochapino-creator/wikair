"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import BackButton from "@/components/BackButton";
import Link from "next/link";

const FlightSim = dynamic(() => import("@/components/FlightSim"), {
  ssr: false,
  loading: () => (
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#0a1628" }}>
      <p style={{ color: "rgba(255,255,255,0.5)" }}>Cargando simulador…</p>
    </div>
  ),
});

export default function SimuladorPage() {
  const [fullscreen, setFullscreen] = useState(false);

  return (
    <main className="page" style={{ paddingBottom: 0 }}>
      {!fullscreen && (
        <section className="moduleHero" style={{ height: 200 }}>
          <div className="moduleHeroImg">
            <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #0C0C0C 0%, #1A1000 50%, #0C0C0C 100%)" }} />
            <div className="moduleHeroOverlay" />
          </div>
          <div className="container moduleHeroContent" style={{ paddingTop: 90 }}>
            <BackButton />
            <div className="moduleBadge">SIMULADOR 3D · WEBGL · GRATIS</div>
            <h1 style={{ fontSize: "clamp(26px, 5vw, 44px)" }}>Simulador de vuelo</h1>
          </div>
        </section>
      )}

      {/* ── Sim container ──────────────────────────────────────── */}
      <div style={{
        position: fullscreen ? "fixed" : "relative",
        inset: fullscreen ? 0 : undefined,
        zIndex: fullscreen ? 9999 : 1,
        width: "100%",
        height: fullscreen ? "100dvh" : "clamp(450px, 70vw, 680px)",
        background: "#0a1628",
        display: "flex",
        flexDirection: "column",
      }}>
        {/* Toolbar */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "8px 16px", background: "rgba(0,0,0,0.8)",
          borderBottom: "1px solid rgba(255,255,255,0.08)", flexShrink: 0,
        }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: "var(--sky)", fontFamily: "'Space Mono', monospace" }}>
            WikiAir Flight Sim · Cessna 172
          </span>
          <button
            type="button"
            onClick={() => setFullscreen((f) => !f)}
            style={{
              padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer",
              background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff",
            }}
          >
            {fullscreen ? "✕ Salir" : "⛶ Pantalla completa"}
          </button>
        </div>
        <div style={{ flex: 1, overflow: "hidden" }}>
          <FlightSim />
        </div>
      </div>

      {/* ── Info ────────────────────────────────────────────────── */}
      {!fullscreen && (
        <>
          <div className="container" style={{ paddingTop: 32, paddingBottom: 20 }}>
            <p className="gold">CONTROLES COMPLETOS</p>
            <h2 style={{ fontSize: "clamp(20px, 4vw, 30px)", margin: "8px 0 20px", letterSpacing: -0.5 }}>Cómo volar</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14 }}>
              {[
                { icon: "📱", tip: "Arrastrar lado izquierdo de la pantalla: controla pitch (arriba/abajo) y roll (izquierda/derecha)" },
                { icon: "🎚️", tip: "Arrastrar lado derecho: subir o bajar el acelerador (throttle)" },
                { icon: "⌨️", tip: "Flechas ↑↓←→ o WASD para pitch/roll. Q = más motor, E = menos motor" },
                { icon: "✈️", tip: "Aumentá el acelerador al 80-100%, tomá velocidad por la pista y tirá del morro hacia arriba para despegar" },
                { icon: "⚠️", tip: "Si aparece 'STALL' bajá el morro inmediatamente y aumentá el motor. Velocidad mínima: 43 kt" },
                { icon: "🌍", tip: "Usá pantalla completa para mejor experiencia. Funciona en iPhone y Android" },
              ].map(({ icon, tip }, i) => (
                <div key={i} style={{
                  background: "var(--glass)", border: "1px solid var(--border)", borderRadius: 12,
                  padding: "14px 18px", display: "flex", gap: 12, alignItems: "flex-start",
                }}>
                  <span style={{ fontSize: 20, flexShrink: 0 }}>{icon}</span>
                  <p style={{ color: "var(--muted2)", fontSize: 13.5, lineHeight: 1.6, margin: 0 }}>{tip}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="container" style={{ paddingBottom: 48 }}>
            <div className="infoBanner">
              <p>
                <strong style={{ color: "var(--text)" }}>Simulador 3D propio de WikiAir</strong> — construido con Three.js/WebGL, corre directamente en el navegador sin descargas ni plugins. Terreno, nubes, pista de aterrizaje y física de vuelo básica. Para un simulador más avanzado con terreno satelital real: <a href="https://www.geo-fs.com" target="_blank" rel="noopener noreferrer" style={{ color: "var(--sky)" }}>GeoFS.com ↗</a>
              </p>
            </div>

            <div style={{ marginTop: 24, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link className="btnPrimary" href="/vuelo">Módulo 1: Cómo vuela →</Link>
              <Link className="btnOutline" href="/instrumentos">Ver instrumentos</Link>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
