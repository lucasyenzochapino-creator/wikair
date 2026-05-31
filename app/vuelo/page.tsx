import Link from "next/link";

async function getWikiImage(title: string) {
  try {
    const res = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`,
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data?.thumbnail?.source || data?.originalimage?.source || null;
  } catch {
    return null;
  }
}

const forces = [
  { badge: "↑ HACIA ARRIBA", name: "Sustentación", eng: "Lift", desc: "Fuerza aerodinámica generada por las alas que contrarresta el peso. Surge por la diferencia de presión entre la cara superior e inferior del ala y por el ángulo de ataque.", wiki: "Airbus A380", color: "#22c55e" },
  { badge: "↓ HACIA ABAJO",  name: "Peso",         eng: "Weight", desc: "La fuerza de gravedad que atrae al avión hacia la Tierra. El diseño busca minimizarlo sin comprometer la resistencia estructural.", wiki: "Antonov An-225", color: "#f87171" },
  { badge: "→ HACIA ADELANTE", name: "Empuje",     eng: "Thrust", desc: "La fuerza que producen los motores. En turbofanes, un 80% del empuje viene del fan delantero. El 20% restante del núcleo.", wiki: "Jet engine", color: "#C8922A" },
  { badge: "← HACIA ATRÁS",   name: "Resistencia", eng: "Drag",  desc: "Se opone al movimiento del avión. Los ingenieros pasan años reduciéndola. Un 1% de mejora puede ahorrar millones en combustible al año.", wiki: "Lockheed SR-71 Blackbird", color: "#fbbf24" },
];

const parts = [
  { badge: "ESTRUCTURA",      name: "Fuselaje",         desc: "Cuerpo principal. Su sección circular soporta la presurización uniformemente sin concentrar tensiones.", wiki: "Boeing 787 Dreamliner" },
  { badge: "SUSTENTACIÓN",    name: "Alas",              desc: "Perfil alar asimétrico: más curvo arriba, genera mayor velocidad y menor presión en la cara superior.", wiki: "Airbus A350 XWB" },
  { badge: "CONTROL LATERAL", name: "Alerones",          desc: "Borde trasero del ala. Uno sube, el otro baja — el avión se inclina. Controlan el rolido.", wiki: "Boeing 777" },
  { badge: "BAJA VELOCIDAD",  name: "Flaps y Slats",    desc: "Aumentan la sustentación en despegue y aterrizaje. Permiten volar más lento sin entrar en pérdida.", wiki: "Flap (aeronautics)" },
  { badge: "CONTROL VERTICAL", name: "Timón de cola",   desc: "Superficie vertical. Controla la guiñada: mueve la nariz izquierda o derecha. Se usa con los alerones.", wiki: "Vertical stabilizer" },
  { badge: "PROPULSIÓN",      name: "Motores turbofán", desc: "En aviones comerciales. El fan delantero genera el 80% del empuje. Alta eficiencia a velocidad subsónica.", wiki: "Turbofan" },
];

const phases = [
  { n: "01", phase: "Rodaje (Taxi)",       wiki: "Taxiway",            detail: "Movimiento en tierra desde la puerta hasta la pista activa. ATC asigna la ruta de rodaje. Chequeo final de sistemas." },
  { n: "02", phase: "Despegue (Takeoff)",  wiki: "Aircraft takeoff",   detail: "Aceleración por la pista. Al alcanzar Vr el piloto eleva el morro. En V2 el avión está en el aire con motores al máximo." },
  { n: "03", phase: "Ascenso (Climb)",     wiki: "Climb (aeronautics)", detail: "El avión sube hacia FL350-FL410 (10.600-12.500 m). Los flaps se retraen progresivamente mientras sube." },
  { n: "04", phase: "Crucero (Cruise)",    wiki: "Cruise (aeronautics)", detail: "La fase más larga. Motor a régimen de crucero (~40% de potencia máxima). El FMS gestiona ruta y combustible." },
  { n: "05", phase: "Descenso",            wiki: "Instrument approach", detail: "Inicia unos 200 km antes del destino (Top of Descent). Se despliegan flaps gradualmente. Velocidad reducida." },
  { n: "06", phase: "Aterrizaje (Landing)", wiki: "Landing (aeronautics)", detail: "Touchdown a ~240-260 km/h. Inversores de empuje, spoilers y frenos de carbono detienen el avión." },
];

export default async function VueloPage() {
  const [heroImage, forceImages, partImages, phaseImages] = await Promise.all([
    getWikiImage("Fixed-wing aircraft"),
    Promise.all(forces.map((f) => getWikiImage(f.wiki))),
    Promise.all(parts.map((p) => getWikiImage(p.wiki))),
    Promise.all(phases.map((p) => getWikiImage(p.wiki))),
  ]);

  return (
    <main className="page">
      {/* ── HERO CON IMAGEN ──────────────────────────────────────── */}
      <section className="moduleHero">
        <div className="moduleHeroImg">
          {heroImage && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={heroImage} alt="Avión en vuelo" />
          )}
          <div className="moduleHeroOverlay" />
        </div>
        <div className="container moduleHeroContent">
          <Link className="back" href="/">← Inicio</Link>
          <div className="moduleBadge">MÓDULO 01 · ESCUELA DE VUELO</div>
          <h1>¿Cómo vuela un avión?</h1>
          <p>Las 4 fuerzas que hacen posible el vuelo, las partes del avión y las 6 fases de cada viaje — explicadas con ejemplos reales.</p>
        </div>
      </section>

      {/* ── DATOS DESTACADOS ────────────────────────────────────── */}
      <section className="container" style={{ paddingTop: 48, paddingBottom: 0 }}>
        <div className="factRow">
          <div className="factCard">
            <span className="factNum">4</span>
            <span className="factLabel">Fuerzas del vuelo</span>
          </div>
          <div className="factCard">
            <span className="factNum">12.500</span>
            <span className="factUnit">m</span>
            <span className="factLabel">Altitud crucero típica</span>
          </div>
          <div className="factCard">
            <span className="factNum">903</span>
            <span className="factUnit">km/h</span>
            <span className="factLabel">Velocidad crucero A380</span>
          </div>
          <div className="factCard">
            <span className="factNum">~15°</span>
            <span className="factLabel">Ángulo de stall típico</span>
          </div>
          <div className="factCard">
            <span className="factNum">6</span>
            <span className="factLabel">Fases de un vuelo</span>
          </div>
        </div>
      </section>

      {/* ── LAS 4 FUERZAS ───────────────────────────────────────── */}
      <section className="container" style={{ paddingTop: 56, paddingBottom: 56 }}>
        <p className="gold">FÍSICA DEL VUELO</p>
        <h2 style={{ fontSize: "clamp(26px, 5vw, 44px)", margin: "8px 0 8px", letterSpacing: -1 }}>Las 4 fuerzas del vuelo</h2>
        <p style={{ color: "var(--muted2)", marginBottom: 36, maxWidth: 560 }}>
          Todo avión en vuelo está sometido exactamente a estas 4 fuerzas. El secreto es mantenerlas en equilibrio — como hacer malabarismo con física.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: 20 }}>
          {forces.map((f, i) => (
            <div key={f.name} className="recordCard" style={{ padding: 0, overflow: "hidden" }}>
              <div style={{ height: 180, overflow: "hidden", position: "relative", background: "#0A0A0A" }}>
                {forceImages[i] ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={forceImages[i]!} alt={f.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <div style={{ width: "100%", height: "100%", background: "var(--glass2)" }} />
                )}
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.9) 0%, transparent 60%)" }} />
                <span style={{ position: "absolute", bottom: 12, left: 16, fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: f.color, textTransform: "uppercase", background: "rgba(10,10,10,0.75)", padding: "3px 10px", borderRadius: 6 }}>{f.badge}</span>
              </div>
              <div style={{ padding: "18px 20px 22px" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 10 }}>
                  <h3 style={{ fontSize: 21, margin: 0 }}>{f.name}</h3>
                  <span style={{ fontSize: 13, color: "var(--muted2)", fontStyle: "italic" }}>{f.eng}</span>
                </div>
                <p style={{ color: "var(--muted2)", fontSize: 13.5, lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="infoBanner" style={{ marginTop: 20 }}>
          <p>
            <strong style={{ color: "var(--text)" }}>En vuelo nivelado:</strong> Sustentación = Peso · Empuje = Resistencia. &nbsp;
            <strong style={{ color: "var(--text)" }}>En ascenso:</strong> Empuje {">"} Resistencia. &nbsp;
            <strong style={{ color: "var(--text)" }}>En descenso:</strong> El motor puede reducirse porque el peso ayuda a mantener velocidad.
          </p>
        </div>
      </section>

      {/* ── POR QUÉ VUELA: CONCEPTOS CLAVE ──────────────────────── */}
      <section className="container" style={{ paddingBottom: 56 }}>
        <p className="gold">AERODINÁMICA</p>
        <h2 style={{ fontSize: "clamp(26px, 5vw, 44px)", margin: "8px 0 8px", letterSpacing: -1 }}>¿Por qué las alas generan sustentación?</h2>
        <p style={{ color: "var(--muted2)", marginBottom: 32, maxWidth: 560 }}>Dos explicaciones que se complementan — no son alternativas, son partes del mismo fenómeno.</p>
        <div className="learnGrid">
          <div className="learnCard">
            <div className="learnIcon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h18M3 6l9-3 9 3M3 18l9 3 9-3"/></svg>
            </div>
            <h3>Efecto Bernoulli</h3>
            <p>Mayor velocidad del aire = menor presión. El aire sobre el ala va más rápido por el perfil curvo → menor presión arriba → el ala es "succionada" hacia arriba. Igual que cuando un tren pasa y sentís que te jala.</p>
          </div>
          <div className="learnCard">
            <div className="learnIcon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l14 0M5 12l4-4M5 12l4 4"/></svg>
            </div>
            <h3>Ángulo de ataque y Newton</h3>
            <p>El ala inclinada desvía el aire hacia abajo. Por la 3.ª ley de Newton, el aire empuja el ala hacia arriba. A mayor ángulo de ataque, más sustentación — hasta cierto límite.</p>
          </div>
          <div className="learnCard">
            <div className="learnIcon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22V12M12 12L8 16M12 12l4 4"/><path d="M20 6H4"/></svg>
            </div>
            <h3>Stall (Entrada en pérdida)</h3>
            <p>Si el ángulo de ataque supera ~15-20°, el flujo de aire se separa del ala y la sustentación cae abruptamente. Solución inmediata: bajar el morro para reducir el ángulo. Todos los pilotos aprenden esto en hora 1.</p>
          </div>
          <div className="learnCard">
            <div className="learnIcon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="12" rx="10" ry="4"/><path d="M12 2v20"/></svg>
            </div>
            <h3>Perfil alar</h3>
            <p>La forma de la sección transversal del ala. Los aviones comerciales usan perfiles asimétricos optimizados para crucero subsónico. Los cazas supersónicos usan perfiles simétricos más delgados.</p>
          </div>
        </div>
      </section>

      {/* ── PARTES DEL AVIÓN ────────────────────────────────────── */}
      <section className="container" style={{ paddingBottom: 56 }}>
        <p className="gold">ANATOMÍA</p>
        <h2 style={{ fontSize: "clamp(26px, 5vw, 44px)", margin: "8px 0 8px", letterSpacing: -1 }}>Partes del avión</h2>
        <p style={{ color: "var(--muted2)", marginBottom: 36, maxWidth: 560 }}>Cada parte tiene una función específica y ninguna está de adorno. Conocer el avión es el primer paso para pilotarlo.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: 18 }}>
          {parts.map((p, i) => (
            <div key={p.name} className="recordCard" style={{ padding: 0, overflow: "hidden" }}>
              <div style={{ height: 160, overflow: "hidden", background: "#0A0A0A", position: "relative" }}>
                {partImages[i] ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={partImages[i]!} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <div style={{ width: "100%", height: "100%", background: "var(--glass2)" }} />
                )}
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 55%)" }} />
              </div>
              <div style={{ padding: "16px 20px 20px" }}>
                <span className="recordBadge">{p.badge}</span>
                <h3 style={{ fontSize: 18, margin: "8px 0 8px" }}>{p.name}</h3>
                <p style={{ color: "var(--muted2)", fontSize: 13.5, lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FASES DEL VUELO ─────────────────────────────────────── */}
      <section className="container" style={{ paddingBottom: 56 }}>
        <p className="gold">DE PUERTA A PUERTA</p>
        <h2 style={{ fontSize: "clamp(26px, 5vw, 44px)", margin: "8px 0 8px", letterSpacing: -1 }}>Las 6 fases de un vuelo</h2>
        <p style={{ color: "var(--muted2)", marginBottom: 36, maxWidth: 560 }}>Desde que el avión sale de la puerta hasta que llega al destino, hay 6 fases bien definidas. Cada una tiene sus propios procedimientos y velocidades de referencia.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {phases.map((f, i) => (
            <div key={f.n} style={{
              background: "var(--glass)", border: "1px solid var(--border)", borderRadius: "var(--rXL)",
              overflow: "hidden", backdropFilter: "blur(10px)",
              display: "grid", gridTemplateColumns: phaseImages[i] ? "clamp(140px, 22%, 200px) 1fr" : "1fr",
            }}>
              {phaseImages[i] && (
                <div style={{ overflow: "hidden", background: "#0A0A0A", minHeight: 120 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={phaseImages[i]!} alt={f.phase} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              )}
              <div style={{ padding: "20px 24px", display: "flex", gap: 16, alignItems: "flex-start" }}>
                <span style={{ fontSize: 30, fontWeight: 900, color: "var(--sky)", opacity: 0.22, lineHeight: 1, minWidth: 38 }}>{f.n}</span>
                <div>
                  <h3 style={{ margin: "0 0 8px", fontSize: 17 }}>{f.phase}</h3>
                  <p style={{ color: "var(--muted2)", fontSize: 13.5, lineHeight: 1.65, margin: 0 }}>{f.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <section className="container" style={{ paddingBottom: 60 }}>
        <p className="gold">SEGUÍ APRENDIENDO</p>
        <h2 style={{ fontSize: "clamp(26px, 5vw, 44px)", margin: "8px 0 24px", letterSpacing: -1 }}>¿Listo para el siguiente módulo?</h2>
        <div style={{ marginTop: 8, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link className="btnPrimary" href="/instrumentos">Módulo 2: Instrumentos →</Link>
          <Link className="btnOutline" href="/glosario">Glosario de aviación</Link>
        </div>
      </section>
    </main>
  );
}
