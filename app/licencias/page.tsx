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

const licenses = [
  {
    code: "PPL",
    name: "Piloto Privado de Avión",
    eng: "Private Pilot Licence",
    hours: "40 hs mínimas",
    age: "17 años",
    medical: "Clase 2",
    cost: "USD 8.000–12.000",
    duration: "12–18 meses",
    what: "Podés volar aviones monomotores simples, de día, en condiciones VFR (vuelo visual). No podés cobrar por volar.",
    badge: "PASO 1",
    detail: "Es la primera licencia. Las 40 horas incluyen al menos 10 horas de vuelo solo (sin instructor). La teoría cubre meteorología, navegación, reglamentación ANAC, motores y performance. Examen escrito y vuelo de habilitación ante un veedor ANAC.",
    wiki: "Cessna 172",
  },
  {
    code: "IR",
    name: "Habilitación Instrumental",
    eng: "Instrument Rating",
    hours: "+50 hs en instrumentos",
    age: "17 años",
    medical: "Clase 1",
    cost: "USD 6.000–10.000",
    duration: "6–12 meses",
    what: "Podés volar en IMC (dentro de nubes, sin referencias visuales externas) usando solo los instrumentos de a bordo.",
    badge: "PASO 2",
    detail: "Se agrega sobre la PPL o CPL. Requiere vuelo simulado (FFS/FTD) y real en IMC. Incluye procedimientos ILS, VOR, aproximaciones de precisión y gestión de sistemas en condiciones adversas.",
    wiki: "Instrument flight rules",
  },
  {
    code: "CPL",
    name: "Piloto Comercial de Avión",
    eng: "Commercial Pilot Licence",
    hours: "200 hs totales",
    age: "18 años",
    medical: "Clase 1",
    cost: "USD 25.000–40.000",
    duration: "2–3 años adicionales",
    what: "Podés ser pagado por volar. Primer oficial en aerolíneas regionales, instructor de vuelo, taxi aéreo, trabajo aéreo.",
    badge: "PASO 3",
    detail: "Requiere 200 horas de vuelo total, incluyendo 100 horas como PIC (piloto al mando) y 20 horas de vuelo nocturno. Examen médico Clase 1 obligatorio según ANAC. Examen teórico avanzado en 9 materias.",
    wiki: "Piper Seminole",
  },
  {
    code: "ME",
    name: "Habilitación Multimotores",
    eng: "Multi-Engine Rating",
    hours: "15–20 hs aprox.",
    age: "18 años",
    medical: "Clase 1",
    cost: "USD 4.000–7.000",
    duration: "3–6 semanas",
    what: "Podés volar aviones con más de un motor. Obligatorio para la mayoría de los jets y aviones turbohélice de transporte.",
    badge: "PASO 4",
    detail: "Curso específico que incluye procedimientos de motor apagado (single-engine operations), performance con un motor inoperativo y emergencias. Generalmente se realiza antes o junto con la preparación para el ATPL.",
    wiki: "Beechcraft Baron",
  },
  {
    code: "ATPL",
    name: "Piloto de Línea Aérea",
    eng: "Airline Transport Pilot Licence",
    hours: "1.500 hs totales",
    age: "21 años",
    medical: "Clase 1",
    cost: "5–8 años de carrera",
    duration: "Variable según construcción de horas",
    what: "La licencia máxima en aviación civil. Requerida para ser Comandante en aerolíneas comerciales con pasajeros.",
    badge: "PASO 5",
    detail: "Requiere 1.500 horas totales (norma OACI Anexo 1), incluyendo 500 horas como PIC, 100 horas nocturnas y 75 horas de vuelo IFR real. En Argentina sigue estrictamente la norma OACI. El ATPL frozen se obtiene antes de las 1.500 horas.",
    wiki: "Airbus A320",
  },
];

export default async function LicenciasPage() {
  const [heroImage, ...licenseImages] = await Promise.all([
    getWikiImage("Pilot certification in the United States"),
    ...licenses.map((l) => getWikiImage(l.wiki)),
  ]);

  return (
    <main className="page">
      {/* ── HERO CON IMAGEN ──────────────────────────────────────── */}
      <section className="moduleHero">
        <div className="moduleHeroImg">
          {heroImage && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={heroImage} alt="Piloto en cabina" />
          )}
          <div className="moduleHeroOverlay" />
        </div>
        <div className="container moduleHeroContent">
          <Link className="back" href="/">← Inicio</Link>
          <div className="moduleBadge">MÓDULO 03 · ESCUELA DE VUELO</div>
          <h1>Licencias de piloto</h1>
          <p>El camino de cero a capitán: requisitos reales según ANAC Argentina y normas OACI. Horas, edades, costos y exámenes.</p>
        </div>
      </section>

      {/* ── DATOS DESTACADOS ────────────────────────────────────── */}
      <section className="container" style={{ paddingTop: 48, paddingBottom: 0 }}>
        <div className="factRow">
          <div className="factCard">
            <span className="factNum">40</span>
            <span className="factUnit">hs</span>
            <span className="factLabel">Mínimo para PPL (ANAC)</span>
          </div>
          <div className="factCard">
            <span className="factNum">200</span>
            <span className="factUnit">hs</span>
            <span className="factLabel">Mínimo para CPL</span>
          </div>
          <div className="factCard">
            <span className="factNum">1.500</span>
            <span className="factUnit">hs</span>
            <span className="factLabel">Mínimo para ATPL (OACI)</span>
          </div>
          <div className="factCard">
            <span className="factNum">17</span>
            <span className="factUnit">años</span>
            <span className="factLabel">Edad mínima para PPL</span>
          </div>
          <div className="factCard">
            <span className="factNum">200+</span>
            <span className="factLabel">Aeroclubes en Argentina</span>
          </div>
        </div>
      </section>

      {/* ── PROGRESIÓN ──────────────────────────────────────────── */}
      <section className="container" style={{ paddingTop: 56, paddingBottom: 48 }}>
        <p className="gold">EL CAMINO</p>
        <h2 style={{ fontSize: "clamp(26px, 5vw, 44px)", margin: "8px 0 8px", letterSpacing: -1 }}>De cero a capitán</h2>
        <p style={{ color: "var(--muted2)", marginBottom: 36, maxWidth: 560 }}>
          En Argentina, la ANAC regula cada paso. Las licencias siguen el Anexo 1 de la OACI, lo que permite validarlas en otros países miembro. Cada nivel abre nuevas puertas.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {licenses.map((lic, i) => (
            <div key={lic.code} className="licenseCard">
              {/* Image header */}
              <div className="licenseCardImg">
                {licenseImages[i] ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={licenseImages[i]!} alt={lic.code} />
                ) : (
                  <div style={{ width: "100%", height: "100%", background: "var(--glass2)" }} />
                )}
                <div className="licenseCardImgOverlay" />
                <div className="licenseCardImgLabel">
                  <span className="licenseCode">{lic.code}</span>
                  <span className="recordBadge" style={{ fontSize: 10 }}>{lic.badge}</span>
                </div>
              </div>
              {/* Content */}
              <div className="licenseBody">
                <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", marginBottom: 8, gap: 4 }}>
                  <span className="licenseTitle">{lic.name}</span>
                  <span className="licenseEng">{lic.eng}</span>
                </div>
                <p style={{ color: "var(--muted2)", marginBottom: 12, lineHeight: 1.6, fontSize: 15 }}>{lic.what}</p>
                <p style={{ color: "var(--muted)", fontSize: 13, lineHeight: 1.7, marginBottom: 14 }}>{lic.detail}</p>
                <div className="licenseTags">
                  <span className="licenseTag">✈ {lic.hours}</span>
                  <span className="licenseTagGray">Edad mín: {lic.age}</span>
                  <span className="licenseTagGray">Médico: {lic.medical}</span>
                  <span className="licenseTagGray">Costo est.: {lic.cost}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── EXAMEN MÉDICO ────────────────────────────────────────── */}
      <section className="container" style={{ paddingBottom: 48 }}>
        <p className="gold">REQUISITO MÉDICO</p>
        <h2 style={{ fontSize: "clamp(26px, 5vw, 44px)", margin: "8px 0 8px", letterSpacing: -1 }}>El certificado médico aeronáutico</h2>
        <p style={{ color: "var(--muted2)", marginBottom: 28, maxWidth: 560 }}>
          Emitido por médicos aeronáuticos habilitados por la ANAC. Sin certificado vigente, no se puede ejercer como piloto. La clase determina qué tipo de operaciones se pueden realizar.
        </p>
        <div className="learnGrid">
          <div className="learnCard">
            <div className="learnIcon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            </div>
            <h3>Clase 2 — Piloto Privado (PPL)</h3>
            <p>Revisión básica de visión, corazón y audición. Válido 5 años hasta los 40 años, luego 2 años. Emitido por médicos aeronáuticos ANAC. Incluye ECG básico y test de visión cromática.</p>
          </div>
          <div className="learnCard">
            <div className="learnIcon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
            </div>
            <h3>Clase 1 — Piloto Comercial y ATPL</h3>
            <p>Examen completo: ECG con esfuerzo, espirometría, audiometría, oftalmología completa, psicológico y neurológico. Válido 1 año (6 meses después de los 60). Sin aprobación, no se puede operar comercialmente.</p>
          </div>
          <div className="learnCard">
            <div className="learnIcon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            </div>
            <h3>Clase 2 — Controlador ATC</h3>
            <p>Para controladores de tránsito aéreo. Visión excelente (pueden usarse lentes correctivos), audición perfecta, psicológico obligatorio. La tensión del trabajo es enorme: manejan 20+ aeronaves simultáneas.</p>
          </div>
        </div>
      </section>

      {/* ── COSTOS Y TIEMPOS ────────────────────────────────────── */}
      <section className="container" style={{ paddingBottom: 48 }}>
        <p className="gold">REFERENCIA ECONÓMICA</p>
        <h2 style={{ fontSize: "clamp(26px, 5vw, 44px)", margin: "8px 0 8px", letterSpacing: -1 }}>¿Cuánto cuesta y cuánto lleva?</h2>
        <p style={{ color: "var(--muted2)", marginBottom: 28, maxWidth: 560 }}>
          Costos estimados para Argentina, año 2024. Varían según escuela, tipo de avión y contexto económico. Los aeroclubes son la opción más accesible.
        </p>
        <div className="statsGrid">
          <div className="statBox">
            <h3>PPL</h3>
            <p>12–18 meses · USD 8.000–12.000</p>
          </div>
          <div className="statBox">
            <h3>CPL + IR</h3>
            <p>2–3 años adicionales · USD 25.000–45.000</p>
          </div>
          <div className="statBox">
            <h3>1.500 hs</h3>
            <p>Para ATPL: 5–8 años construyendo horas</p>
          </div>
          <div className="statBox">
            <h3>Aeroclubes</h3>
            <p>La opción más accesible: Buenos Aires, San Fernando, Morón y 200+ en todo el país</p>
          </div>
        </div>
      </section>

      {/* ── SISTEMA ANAC ─────────────────────────────────────────── */}
      <section className="container" style={{ paddingBottom: 60 }}>
        <p className="gold">EN ARGENTINA</p>
        <h2 style={{ fontSize: "clamp(26px, 5vw, 44px)", margin: "8px 0 24px", letterSpacing: -1 }}>El sistema ANAC</h2>
        <div className="learnGrid">
          <div className="learnCard">
            <div className="learnIcon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            </div>
            <h3>ANAC — Regulador Nacional</h3>
            <p>La <strong>Administración Nacional de Aviación Civil</strong> regula toda la aviación civil argentina. Emite licencias, habilitaciones médicas y certifica escuelas. Sede: Av. Paseo Colón 1452, CABA. Sitio: anac.gob.ar</p>
          </div>
          <div className="learnCard">
            <div className="learnIcon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            </div>
            <h3>OACI — Estándar Internacional</h3>
            <p>Las licencias argentinas siguen el <strong>Anexo 1 de la OACI (ICAO)</strong>, el estándar global. Esto permite validarlas en países miembro mediante acuerdos bilaterales. Argentina es el 4.° país del mundo en desarrollar un caza a reacción propio (Pulqui II, 1950).</p>
          </div>
          <div className="learnCard">
            <div className="learnIcon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <h3>Escuelas certificadas</h3>
            <p>Las escuelas de aviación deben estar certificadas por ANAC como ATO (Approved Training Organisation). Los aeroclubes afiliados a la Federación Argentina de Entidades de Pilotos Privados (FAEPA) también son opciones válidas y más económicas.</p>
          </div>
        </div>

        <div className="infoBanner" style={{ marginTop: 28 }}>
          <p>
            <strong style={{ color: "var(--text)" }}>Dato importante:</strong> El código &quot;ATPL frozen&quot; significa que tenés aprobados todos los exámenes teóricos del ATPL, pero todavía no acumulaste las 1.500 horas. Con frozen ATPL podés volar como Primer Oficial en aerolíneas. Una vez acumuladas las horas, se &quot;descongela&quot; y se convierte en ATPL pleno.
          </p>
        </div>

        <div style={{ marginTop: 32, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link className="btnPrimary" href="/quiz">Ponete a prueba con el quiz →</Link>
          <Link className="btnOutline" href="/instrumentos">← Módulo 2: Instrumentos</Link>
        </div>
      </section>
    </main>
  );
}
