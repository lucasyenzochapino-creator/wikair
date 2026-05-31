import BackButton from "@/components/BackButton";
import ExpandableCard from "@/components/ExpandableCard";
import Link from "next/link";

async function getWikiImage(title: string) {
  try {
    const res = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`,
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data?.originalimage?.source || data?.thumbnail?.source || null;
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
    badge: "PASO 1",
    wiki: "Cessna 172",
    summary: "Primera licencia. Podés volar aviones monomotores simples de día en condiciones VFR. No podés cobrar por volar.",
    detail: "La PPL (Private Pilot Licence) es la puerta de entrada a la aviación. Las 40 horas mínimas exigidas por la ANAC incluyen al menos 10 horas de vuelo solo (sin instructor a bordo), lo que para muchos es el momento más emocionante de la carrera.\n\nLa teoría cubre 7 materias: Reglamentación ANAC, Meteorología, Navegación, Principios del Vuelo, Motores y Sistemas, Performance, y Comunicaciones. El examen final incluye un vuelo con un veedor ANAC donde demostrás todas las maniobras aprendidas.\n\nCon la PPL podés volar aviones de motor piston monomotor, de día, en VMC (condiciones meteorológicas visuales). El avión más usado para entrenar en Argentina es el Cessna 172 o el PA-28 Piper. Los aeroclubes de todo el país ofrecen entrenamiento a menor costo que las escuelas privadas.",
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
    badge: "PASO 2",
    wiki: "Instrument flight rules",
    summary: "Podés volar en IMC (dentro de nubes, sin referencias visuales) usando solo los instrumentos de a bordo.",
    detail: "La habilitación instrumental (IR) transforma al piloto: de uno que depende del tiempo a uno que puede volar aunque no vea nada fuera de la cabina. Se agrega sobre la PPL o CPL.\n\nEl entrenamiento incluye: vuelo simulado en FFS/FTD (Full Flight Simulator/Flight Training Device) y vuelo real en IMC. Los procedimientos incluyen: ILS (Instrument Landing System), VOR approaches, aproximaciones GPS/RNAV, salidas y llegadas instrumentales (SID/STAR).\n\nSin habilitación instrumental, el piloto no puede cruzar las nubes ni volar cuando el techo de nubes es bajo. En la Argentina, muchas rutas regionales requieren IR por las condiciones meteorológicas variables. Es la habilitación que más mejora la seguridad del piloto privado.",
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
    badge: "PASO 3",
    wiki: "Piper Seminole",
    summary: "Podés ser pagado por volar. Primer oficial en aerolíneas regionales, instructor, taxi aéreo y trabajo aéreo.",
    detail: "La CPL (Commercial Pilot Licence) es el salto que convierte la pasión en profesión. Requiere 200 horas de vuelo total, incluyendo al menos 100 horas como PIC (Pilot In Command — piloto al mando, solo o con instructor como pasajero), 20 horas de vuelo nocturno y 10 horas de vuelo por instrumentos.\n\nEl examen teórico avanzado cubre 9 materias con mayor profundidad que la PPL: Principios del Vuelo avanzados, Meteorología avanzada, Navegación instrumental, Procedimientos de vuelo, entre otros. El examen práctico incluye vuelos de navegación cross-country con cálculo de planes de vuelo reales.\n\nCon la CPL podés ser instructor de vuelo (si agregás el rating CFI), piloto de taxi aéreo, piloto de fumigación, piloto de trabajo aéreo. Para aerolíneas, necesitás agregar la IR y el ME rating, y luego construir horas hasta el ATPL.",
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
    badge: "PASO 4",
    wiki: "Beechcraft Baron",
    summary: "Podés volar aviones con más de un motor. Obligatorio para jets y turbohélices de transporte.",
    detail: "La habilitación multimotor (ME) se realiza en aviones de dos motores como el Beechcraft Baron, Piper Seminole o el Tecnam P2006T. El objetivo principal es aprender a manejar la aeronave con un motor inoperativo — la situación más crítica en aviación.\n\nEl entrenamiento incluye: procedimientos de motor apagado (Vmc — velocidad mínima de control), identificación del motor fallado (regla 'dead leg dead engine'), performance con un motor, procedimientos de go-around con un motor y aproximaciones con motor averiado.\n\nVMC (Velocity Minimum Control) es la velocidad por debajo de la cual no se puede mantener el control del avión con un motor al máximo y el otro apagado. Conocer este valor de memoria puede salvar tu vida. El multimotor suele hacerse justo antes o durante la preparación del ATPL.",
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
    badge: "PASO 5",
    wiki: "Airbus A320",
    summary: "La licencia máxima en aviación civil. Requerida para ser Comandante en aerolíneas con pasajeros.",
    detail: "El ATPL (Airline Transport Pilot Licence) es la cima de la aviación civil. Requiere 1.500 horas totales (norma OACI Anexo 1), incluyendo 500 horas como PIC, 100 horas de vuelo nocturno como PIC y 75 horas de vuelo IFR real. En Argentina sigue estrictamente la norma OACI.\n\nEl 'ATPL frozen' (congelado) se obtiene cuando aprobás todos los exámenes teóricos del ATPL pero todavía no acumulaste las 1.500 horas. Con frozen ATPL podés ser Primer Oficial en aerolíneas. Una vez acumuladas las horas requeridas, se 'descongela' y se convierte en ATPL pleno, permitiéndote ser Comandante.\n\nEl tiempo típico para llegar a 1.500 horas: 5-8 años de carrera activa, incluyendo instructoría, vuelos chárter, taxi aéreo, trabajo aéreo. En Argentina, aerolíneas como Aerolíneas Argentinas, LATAM y JetSMART contratan Primeros Oficiales con ATPL frozen a partir de cierto número de horas en tipo.",
  },
];

const medicals = [
  {
    name: "Clase 2 — Piloto Privado",
    wiki: "Aviation medicine",
    summary: "Revisión básica de visión, corazón y audición. Válido 5 años hasta los 40 años, luego 2 años.",
    detail: "El certificado médico Clase 2 es el requerido para la PPL. Lo emiten médicos aeronáuticos habilitados por la ANAC. Incluye: revisación cardiovascular completa con ECG de reposo, examen oftalmológico (agudeza visual, campo visual, percepción cromática para señales luminosas), audiometría, examen neurológico básico, y análisis de laboratorio.\n\nVálido por 5 años si tenés menos de 40 años; 2 años entre 40 y 50; y 1 año después de los 50. Los pilotos con ciertas condiciones médicas controladas (diabetes tipo 2 bien controlada, hipertensión leve) pueden obtener el certificado con condiciones operativas especiales (SOC — Special Operating Conditions).",
    badge: "PPL",
  },
  {
    name: "Clase 1 — Piloto Comercial y ATPL",
    wiki: "Flight physical",
    summary: "Examen completo: ECG con esfuerzo, espirometría, oftalmología completa, psicológico y neurológico.",
    detail: "La Clase 1 es el examen médico más completo que existe para pilotos. Incluye: ECG con prueba de esfuerzo en bicicleta o cinta, espirometría (función pulmonar), audiometría completa con timpanometría, oftalmología con fondo de ojo y campo visual computarizado, análisis de laboratorio completo incluyendo glucemia, colesterol y función hepática, examen psicológico completo y evaluación neurológica.\n\nVálido por 1 año en la mayoría de los casos. Después de los 60 años, el co-piloto en operaciones comerciales debe tener a bordo un tripulante menor de 60 años. Después de los 65, ya no se puede ejercer como piloto en operaciones comerciales de transporte aéreo (OACI Anexo 1).",
    badge: "CPL / ATPL",
  },
  {
    name: "Clase 3 — Controlador ATC",
    wiki: "Air traffic control",
    summary: "Para controladores de tránsito aéreo. Visión y audición excelentes, psicológico obligatorio.",
    detail: "Los controladores de tránsito aéreo (ATC) requieren el certificado médico Clase 3. Incluye: visión excelente (corregida aceptable), audición perfecta sin deterioro por altas frecuencias, evaluación psicológica y psiquiátrica obligatoria.\n\nEl trabajo del controlador es extremadamente estresante: pueden manejar 20+ aeronaves simultáneas en sectores de alta densidad como el ARTCC de Buenos Aires, Ezeiza Approach o el TWR del AEP (Aeroparque Jorge Newbery). La fatiga cognitiva es el principal riesgo. Por eso los turnos están regulados y los descansos son obligatorios.",
    badge: "ATC",
  },
];

export default async function LicenciasPage() {
  const [heroImage, ...licenseImages] = await Promise.all([
    getWikiImage("Commercial pilot licence"),
    ...licenses.map((l) => getWikiImage(l.wiki)),
  ]);
  const medicalImages = await Promise.all(medicals.map((m) => getWikiImage(m.wiki)));

  return (
    <main className="page">
      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="moduleHero">
        <div className="moduleHeroImg">
          {heroImage && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={heroImage} alt="Piloto en cabina" />
          )}
          <div className="moduleHeroOverlay" />
        </div>
        <div className="container moduleHeroContent">
          <BackButton />
          <div className="moduleBadge">MÓDULO 04 · ESCUELA DE VUELO</div>
          <h1>Licencias de piloto</h1>
          <p>El camino de cero a capitán según ANAC Argentina y normas OACI. Tocá cada paso para ver todos los detalles.</p>
        </div>
      </section>

      {/* ── DATOS DESTACADOS ────────────────────────────────────── */}
      <section className="container" style={{ paddingTop: 48, paddingBottom: 0 }}>
        <div className="factRow">
          <div className="factCard"><span className="factNum">40</span><span className="factUnit">hs</span><span className="factLabel">Mínimo PPL (ANAC)</span></div>
          <div className="factCard"><span className="factNum">200</span><span className="factUnit">hs</span><span className="factLabel">Mínimo CPL</span></div>
          <div className="factCard"><span className="factNum">1.500</span><span className="factUnit">hs</span><span className="factLabel">Mínimo ATPL (OACI)</span></div>
          <div className="factCard"><span className="factNum">17</span><span className="factUnit">años</span><span className="factLabel">Edad mínima PPL</span></div>
          <div className="factCard"><span className="factNum">200+</span><span className="factLabel">Aeroclubes en Argentina</span></div>
        </div>
      </section>

      {/* ── PROGRESIÓN ──────────────────────────────────────────── */}
      <section className="container" style={{ paddingTop: 56, paddingBottom: 48 }}>
        <p className="gold">EL CAMINO</p>
        <h2 style={{ fontSize: "clamp(26px, 5vw, 44px)", margin: "8px 0 8px", letterSpacing: -1 }}>De cero a capitán</h2>
        <p style={{ color: "var(--muted2)", marginBottom: 36, maxWidth: 560 }}>
          Cada licencia abre nuevas puertas. Tocá cada paso para ver los requisitos reales, horas, costos y qué podés hacer con ella.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {licenses.map((lic, i) => (
            <ExpandableCard
              key={lic.code}
              title={`${lic.code} — ${lic.name}`}
              badge={`${lic.badge} · ${lic.eng}`}
              image={licenseImages[i]}
              summary={`${lic.summary} · ${lic.hours} · ${lic.cost}`}
              detail={`${lic.detail}\n\n📋 Requisitos: ${lic.hours} · Edad mínima: ${lic.age} · Médico: ${lic.medical} · Costo est.: ${lic.cost} · Duración: ${lic.duration}`}
              wiki={lic.wiki}
            />
          ))}
        </div>
      </section>

      {/* ── CERTIFICADO MÉDICO ──────────────────────────────────── */}
      <section className="container" style={{ paddingBottom: 48 }}>
        <p className="gold">REQUISITO MÉDICO</p>
        <h2 style={{ fontSize: "clamp(26px, 5vw, 44px)", margin: "8px 0 8px", letterSpacing: -1 }}>El certificado médico aeronáutico</h2>
        <p style={{ color: "var(--muted2)", marginBottom: 28, maxWidth: 560 }}>
          Sin certificado vigente, no se puede ejercer. La clase determina qué podés operar. Tocá cada clase para los detalles.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 18 }}>
          {medicals.map((m, i) => (
            <ExpandableCard
              key={m.name}
              title={m.name}
              badge={m.badge}
              image={medicalImages[i]}
              summary={m.summary}
              detail={m.detail}
              wiki={m.wiki}
            />
          ))}
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
            <p>La <strong>Administración Nacional de Aviación Civil</strong> regula toda la aviación civil argentina. Emite licencias, habilitaciones médicas y certifica escuelas de vuelo (ATO). Sede: Av. Paseo Colón 1452, CABA.</p>
          </div>
          <div className="learnCard">
            <div className="learnIcon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            </div>
            <h3>OACI — Estándar Internacional</h3>
            <p>Las licencias argentinas siguen el <strong>Anexo 1 de la OACI (ICAO)</strong>. Esto permite validarlas en países miembro mediante acuerdos bilaterales. Argentina es el 4.° país del mundo en desarrollar un caza a reacción propio (Pulqui II, 1950).</p>
          </div>
          <div className="learnCard">
            <div className="learnIcon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <h3>Escuelas certificadas ATO</h3>
            <p>Las escuelas deben estar certificadas como ATO (Approved Training Organisation). Los aeroclubes afiliados a FAEPA (Federación Argentina de Entidades de Pilotos Privados) también son válidos y más económicos.</p>
          </div>
        </div>

        <div className="infoBanner" style={{ marginTop: 28 }}>
          <p>
            <strong style={{ color: "var(--text)" }}>ATPL frozen:</strong> Aprobaste todos los exámenes teóricos del ATPL pero todavía no acumulaste 1.500 horas. Con frozen ATPL podés ser Primer Oficial en aerolíneas. Al completar las horas se &quot;descongela&quot; y te convertís en Comandante habilitado.
          </p>
        </div>

        <div style={{ marginTop: 32, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link className="btnPrimary" href="/simulador">Probá el simulador de vuelo →</Link>
          <Link className="btnOutline" href="/quiz">Ponete a prueba con el quiz</Link>
          <Link className="btnOutline" href="/instrumentos">← Módulo 2: Instrumentos</Link>
        </div>
      </section>
    </main>
  );
}
