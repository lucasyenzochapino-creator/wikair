import Link from "next/link";

const licenses = [
  {
    code: "PPL",
    name: "Piloto Privado",
    eng: "Private Pilot Licence",
    hours: "40 horas mínimas",
    age: "17 años",
    what: "Podés volar aviones simples, de día, en condiciones VFR (visual). No podés cobrar por volar.",
    badge: "PASO 1",
    detail: "Es la primera licencia. 40 horas incluyen al menos 10 horas de vuelo solo (sin instructor). Incluye teoría de meteorología, navegación, reglamentación y motores. En Argentina: habilitado por ANAC.",
  },
  {
    code: "IR",
    name: "Habilitación Instrumental",
    eng: "Instrument Rating",
    hours: "+50 horas instrumentos",
    age: "17 años",
    what: "Podés volar en IMC (dentro de nubes, sin referencias visuales) usando solo los instrumentos.",
    badge: "PASO 2",
    detail: "Se agrega sobre la PPL o CPL. Requiere vuelo simulado (FFS) y real en IMC. Incluye procedimientos ILS, VOR, aproximaciones de precisión y gestión de sistemas.",
  },
  {
    code: "CPL",
    name: "Piloto Comercial",
    eng: "Commercial Pilot Licence",
    hours: "200 horas totales",
    age: "18 años",
    what: "Podés ser pagado por volar. Primer oficial en aerolíneas regionales, instructor de vuelo, taxi aéreo.",
    badge: "PASO 3",
    detail: "Requiere 200 horas de vuelo total, incluyendo 100 horas como PIC (piloto al mando). Examen médico Clase 1 obligatorio. Examen teórico avanzado en ANAC.",
  },
  {
    code: "ME",
    name: "Habilitación Multimotores",
    eng: "Multi-Engine Rating",
    hours: "15-20 horas aprox.",
    age: "18 años",
    what: "Podés volar aviones con más de un motor. Obligatorio para la mayoría de los jets y aviones de línea.",
    badge: "PASO 4",
    detail: "Curso específico que incluye procedimientos de motor apagado (single-engine operations), performance con un motor inoperativo y emergencias. Típicamente se hace antes o junto con el ATPL.",
  },
  {
    code: "ATPL",
    name: "Piloto de Línea Aérea",
    eng: "Airline Transport Pilot Licence",
    hours: "1.500 horas totales",
    age: "21 años",
    what: "La licencia máxima. Comandante de aerolíneas comerciales. El capitán de cualquier avión de pasajeros debe tenerla.",
    badge: "PASO 5",
    detail: "Requiere 1.500 horas totales (OACI) o 1.000 horas en algunos países. En Argentina sigue la norma OACI. Incluye 500 horas como PIC, 100 horas nocturnas y 75 horas IFR reales.",
  },
];

export default function LicenciasPage() {
  return (
    <main className="page">
      <section className="container hero compactHero">
        <Link className="back" href="/">← Volver</Link>
        <p className="gold">WIKIAIR · ESCUELA DE VUELO</p>
        <h1>Licencias de piloto</h1>
        <p>El camino desde principiante absoluto hasta capitán de aerolínea. Requisitos reales según ANAC Argentina y normas OACI.</p>
      </section>

      {/* PROGRESIÓN */}
      <section className="container" style={{ paddingTop: 40, paddingBottom: 48 }}>
        <p className="gold">EL CAMINO</p>
        <h2 style={{ fontSize: "clamp(26px, 5vw, 44px)", margin: "8px 0 24px", letterSpacing: -1 }}>De cero a capitán</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {licenses.map((lic, i) => (
            <div key={lic.code} style={{
              background: "var(--glass)", border: "1px solid var(--border)", borderRadius: "var(--rXL)",
              padding: "24px 28px", backdropFilter: "blur(10px)",
            }}>
              <div style={{ display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap" }}>
                <div style={{ minWidth: 80, textAlign: "center" }}>
                  <div style={{
                    width: 64, height: 64, borderRadius: "50%", background: "var(--sky-dim)",
                    border: "2px solid var(--border-a)", display: "flex", alignItems: "center",
                    justifyContent: "center", margin: "0 auto 8px", fontSize: 22, fontWeight: 900, color: "var(--sky)"
                  }}>
                    {i + 1}
                  </div>
                  <span className="recordBadge" style={{ fontSize: 10 }}>{lic.badge}</span>
                </div>
                <div style={{ flex: 1, minWidth: 240 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
                    <span style={{ fontSize: 28, fontWeight: 900, color: "var(--sky)", letterSpacing: -1 }}>{lic.code}</span>
                    <span style={{ fontSize: 18, fontWeight: 700, color: "var(--text)" }}>{lic.name}</span>
                    <span style={{ fontSize: 13, color: "var(--muted2)" }}>{lic.eng}</span>
                  </div>
                  <p style={{ color: "var(--muted2)", marginBottom: 12, lineHeight: 1.6 }}>{lic.what}</p>
                  <p style={{ color: "var(--muted)", fontSize: 13, lineHeight: 1.7 }}>{lic.detail}</p>
                  <div style={{ display: "flex", gap: 16, marginTop: 12, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 13, color: "var(--sky)", background: "var(--sky-dim)", padding: "4px 12px", borderRadius: 6 }}>
                      ✈ {lic.hours}
                    </span>
                    <span style={{ fontSize: 13, color: "var(--muted2)", background: "var(--glass2)", padding: "4px 12px", borderRadius: 6 }}>
                      Edad mín: {lic.age}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MÉDICO */}
      <section className="container" style={{ paddingBottom: 48 }}>
        <p className="gold">REQUISITO MÉDICO</p>
        <h2 style={{ fontSize: "clamp(26px, 5vw, 44px)", margin: "8px 0 24px", letterSpacing: -1 }}>El certificado médico aeronáutico</h2>
        <div className="statsGrid">
          <div className="recordCard">
            <span className="recordBadge">CLASE 3</span>
            <h3>Piloto Privado</h3>
            <p style={{ color: "var(--muted2)", fontSize: 14, marginTop: 8 }}>Para PPL. Revisión básica de visión, corazón y audición. Válido 5 años hasta los 40, luego 2 años. Emitido por médicos aeronáuticos ANAC.</p>
          </div>
          <div className="recordCard">
            <span className="recordBadge">CLASE 1</span>
            <h3>Piloto Comercial y ATPL</h3>
            <p style={{ color: "var(--muted2)", fontSize: 14, marginTop: 8 }}>Examen más completo: ECG, espirometría, audiometría, oftalmología completa, psicológico. Válido 1 año (6 meses después de los 60). Sin aprobación, no se puede volar comercialmente.</p>
          </div>
          <div className="recordCard">
            <span className="recordBadge">CLASE 2</span>
            <h3>Controlador de tránsito</h3>
            <p style={{ color: "var(--muted2)", fontSize: 14, marginTop: 8 }}>Para controladores ATC. Visión excelente (pueden usarse lentes), audición perfecta, psicológico obligatorio. La tensión del trabajo es enorme: manejan 20+ aviones simultáneos.</p>
          </div>
        </div>
      </section>

      {/* COSTOS Y TIEMPOS */}
      <section className="container" style={{ paddingBottom: 48 }}>
        <p className="gold">REFERENCIA</p>
        <h2 style={{ fontSize: "clamp(26px, 5vw, 44px)", margin: "8px 0 24px", letterSpacing: -1 }}>¿Cuánto cuesta y cuánto lleva?</h2>
        <div className="statsGrid">
          <div className="statBox"><h3>PPL</h3><p>~12 a 18 meses · Costo estimado en Argentina: USD 8.000-15.000</p></div>
          <div className="statBox"><h3>CPL + IR</h3><p>~2 a 3 años adicionales tras la PPL · USD 25.000-45.000</p></div>
          <div className="statBox"><h3>1.500 hs</h3><p>Para ATPL: puede tomar 5-8 años construir las horas requeridas</p></div>
          <div className="statBox"><h3>Aeroclubs</h3><p>La opción más accesible en Argentina: AEROCLUB Buenos Aires, San Fernando, Morón y 200+ en todo el país</p></div>
        </div>
      </section>

      {/* ARGENTINA */}
      <section className="container" style={{ paddingBottom: 60 }}>
        <p className="gold">EN ARGENTINA</p>
        <h2 style={{ fontSize: "clamp(26px, 5vw, 44px)", margin: "8px 0 24px", letterSpacing: -1 }}>El sistema ANAC</h2>
        <div style={{ background: "var(--glass)", border: "1px solid var(--border)", borderRadius: "var(--rXL)", padding: "24px 28px", backdropFilter: "blur(10px)" }}>
          <p style={{ color: "var(--muted2)", lineHeight: 1.8, marginBottom: 16 }}>
            La <strong style={{ color: "var(--text)" }}>ANAC (Administración Nacional de Aviación Civil)</strong> regula toda la aviación civil argentina.
            Las licencias siguen los estándares <strong style={{ color: "var(--text)" }}>OACI (ICAO)</strong> del Anexo 1, lo que permite validarlas en otros países.
          </p>
          <p style={{ color: "var(--muted2)", lineHeight: 1.8, marginBottom: 16 }}>
            Argentina tiene una tradición aeronáutica histórica: fue el <strong style={{ color: "var(--text)" }}>4.° país del mundo</strong> en desarrollar un caza a reacción propio
            (FMA I.Ae. 33 Pulqui II, 1950), y tiene aeroclubes activos en casi todas las provincias.
          </p>
          <p style={{ color: "var(--muted)", fontSize: 13 }}>
            Contacto: ANAC Argentina · anac.gob.ar · Av. Paseo Colón 1452, CABA
          </p>
        </div>
      </section>
    </main>
  );
}
