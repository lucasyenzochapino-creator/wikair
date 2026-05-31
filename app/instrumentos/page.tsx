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

export default async function InstrumentosPage() {
  const [
    heroImage,
    imgASI,
    imgAttitude,
    imgAltimeter,
    imgTurn,
    imgHeading,
    imgVSI,
    imgPFD,
    imgND,
    imgFMS,
    imgTCAS,
    imgGPWS,
    imgStick,
    imgFDR,
  ] = await Promise.all([
    getWikiImage("Glass cockpit"),
    getWikiImage("Airspeed indicator"),
    getWikiImage("Attitude indicator"),
    getWikiImage("Altimeter"),
    getWikiImage("Turn and slip indicator"),
    getWikiImage("Heading indicator"),
    getWikiImage("Variometer"),
    getWikiImage("Glass cockpit"),
    getWikiImage("Flight management system"),
    getWikiImage("Boeing 777"),
    getWikiImage("Traffic collision avoidance system"),
    getWikiImage("Ground proximity warning system"),
    getWikiImage("Stall (fluid mechanics)"),
    getWikiImage("Flight recorder"),
  ]);

  return (
    <main className="page">
      {/* ── HERO CON IMAGEN ──────────────────────────────────────── */}
      <section className="moduleHero">
        <div className="moduleHeroImg">
          {heroImage && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={heroImage} alt="Cabina de vuelo moderna" />
          )}
          <div className="moduleHeroOverlay" />
        </div>
        <div className="container moduleHeroContent">
          <Link className="back" href="/">← Inicio</Link>
          <div className="moduleBadge">MÓDULO 02 · ESCUELA DE VUELO</div>
          <h1>Instrumentos de vuelo</h1>
          <p>Los ojos del piloto. Todo lo que se lee en la cabina, qué significa cada número, y los sistemas que salvan vidas.</p>
        </div>
      </section>

      {/* ── DATOS DESTACADOS ────────────────────────────────────── */}
      <section className="container" style={{ paddingTop: 48, paddingBottom: 0 }}>
        <div className="factRow">
          <div className="factCard">
            <span className="factNum">6</span>
            <span className="factLabel">Instrumentos básicos (six-pack)</span>
          </div>
          <div className="factCard">
            <span className="factNum">1</span>
            <span className="factUnit">kt</span>
            <span className="factLabel">= 1,852 km/h (nudo)</span>
          </div>
          <div className="factCard">
            <span className="factNum">±27</span>
            <span className="factUnit">ft</span>
            <span className="factLabel">Error por 1 hPa en altímetro</span>
          </div>
          <div className="factCard">
            <span className="factNum">1000+</span>
            <span className="factLabel">Parámetros graba la caja negra</span>
          </div>
        </div>
      </section>

      {/* ── LOS 6 BÁSICOS ───────────────────────────────────────── */}
      <section className="container" style={{ paddingTop: 56, paddingBottom: 48 }}>
        <p className="gold">LOS 6 BÁSICOS</p>
        <h2 style={{ fontSize: "clamp(26px, 5vw, 44px)", margin: "8px 0 8px", letterSpacing: -1 }}>El six-pack del piloto</h2>
        <p style={{ color: "var(--muted2)", marginBottom: 32, maxWidth: 560 }}>
          Todo piloto aprende primero estos seis. Funcionan mecánicamente sin electricidad — son tu red de seguridad si falla todo lo demás.
        </p>
        <div className="statsGrid">

          <div className="recordCard" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ height: 160, overflow: "hidden", background: "#0A0A0A", position: "relative" }}>
              {imgASI ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={imgASI} alt="Velocímetro (ASI)" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div style={{ width: "100%", height: "100%", background: "var(--glass2)" }} />
              )}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 55%)" }} />
            </div>
            <div style={{ padding: "16px 20px 20px" }}>
              <span className="recordBadge">PITOT-ESTÁTICO</span>
              <h3 style={{ fontSize: 18, margin: "8px 0 8px" }}>Velocímetro (ASI)</h3>
              <p style={{ color: "var(--muted2)", fontSize: 13.5, lineHeight: 1.65 }}>
                <strong style={{ color: "var(--text)" }}>Airspeed Indicator.</strong> Mide la velocidad del avión respecto al aire (IAS). No mide velocidad sobre el suelo. Tiene marcas: Vso (pérdida con flaps), Vno (maniobras), Vne (nunca superar, línea roja). <strong style={{ color: "var(--sky)" }}>1 kt = 1,852 km/h.</strong>
              </p>
            </div>
          </div>

          <div className="recordCard" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ height: 160, overflow: "hidden", background: "#0A0A0A", position: "relative" }}>
              {imgAttitude ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={imgAttitude} alt="Horizonte Artificial" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div style={{ width: "100%", height: "100%", background: "var(--glass2)" }} />
              )}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 55%)" }} />
            </div>
            <div style={{ padding: "16px 20px 20px" }}>
              <span className="recordBadge">GIROSCÓPICO</span>
              <h3 style={{ fontSize: 18, margin: "8px 0 8px" }}>Horizonte Artificial</h3>
              <p style={{ color: "var(--muted2)", fontSize: 13.5, lineHeight: 1.65 }}>
                <strong style={{ color: "var(--text)" }}>Attitude Indicator.</strong> El instrumento más importante en IMC (dentro de nubes). Muestra la inclinación (roll) y el cabeceo (pitch) respecto al horizonte real. Sin él, el piloto se desorienta en minutos.
              </p>
            </div>
          </div>

          <div className="recordCard" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ height: 160, overflow: "hidden", background: "#0A0A0A", position: "relative" }}>
              {imgAltimeter ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={imgAltimeter} alt="Altímetro" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div style={{ width: "100%", height: "100%", background: "var(--glass2)" }} />
              )}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 55%)" }} />
            </div>
            <div style={{ padding: "16px 20px 20px" }}>
              <span className="recordBadge">PITOT-ESTÁTICO</span>
              <h3 style={{ fontSize: 18, margin: "8px 0 8px" }}>Altímetro</h3>
              <p style={{ color: "var(--muted2)", fontSize: 13.5, lineHeight: 1.65 }}>
                Mide la presión estática y la convierte en altitud. Tiene una perilla para ajustar el <strong style={{ color: "var(--text)" }}>QNH</strong> local. Error de 1 hPa en el ajuste = error de ±27 pies en la lectura. Se ajusta antes de cada vuelo.
              </p>
            </div>
          </div>

          <div className="recordCard" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ height: 160, overflow: "hidden", background: "#0A0A0A", position: "relative" }}>
              {imgTurn ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={imgTurn} alt="Indicador de Viraje" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div style={{ width: "100%", height: "100%", background: "var(--glass2)" }} />
              )}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 55%)" }} />
            </div>
            <div style={{ padding: "16px 20px 20px" }}>
              <span className="recordBadge">GIROSCÓPICO</span>
              <h3 style={{ fontSize: 18, margin: "8px 0 8px" }}>Indicador de Viraje</h3>
              <p style={{ color: "var(--muted2)", fontSize: 13.5, lineHeight: 1.65 }}>
                <strong style={{ color: "var(--text)" }}>Turn Coordinator.</strong> Mide la tasa de viraje y la coordinación (balance entre rudder y alerón). La marca de <strong style={{ color: "var(--sky)" }}>2 minutos</strong> = viraje de 360° en 2 minutos = 3°/segundo estándar.
              </p>
            </div>
          </div>

          <div className="recordCard" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ height: 160, overflow: "hidden", background: "#0A0A0A", position: "relative" }}>
              {imgHeading ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={imgHeading} alt="Indicador de Rumbo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div style={{ width: "100%", height: "100%", background: "var(--glass2)" }} />
              )}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 55%)" }} />
            </div>
            <div style={{ padding: "16px 20px 20px" }}>
              <span className="recordBadge">GIROSCÓPICO</span>
              <h3 style={{ fontSize: 18, margin: "8px 0 8px" }}>Indicador de Rumbo</h3>
              <p style={{ color: "var(--muted2)", fontSize: 13.5, lineHeight: 1.65 }}>
                <strong style={{ color: "var(--text)" }}>Heading Indicator / DI.</strong> Brújula giroscópica sin los errores de la brújula magnética. Debe sincronizarse con la brújula cada 15 minutos por precesión giroscópica. <strong style={{ color: "var(--sky)" }}>0° = Norte, 090° = Este, 270° = Oeste.</strong>
              </p>
            </div>
          </div>

          <div className="recordCard" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ height: 160, overflow: "hidden", background: "#0A0A0A", position: "relative" }}>
              {imgVSI ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={imgVSI} alt="Variométro (VSI)" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div style={{ width: "100%", height: "100%", background: "var(--glass2)" }} />
              )}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 55%)" }} />
            </div>
            <div style={{ padding: "16px 20px 20px" }}>
              <span className="recordBadge">PITOT-ESTÁTICO</span>
              <h3 style={{ fontSize: 18, margin: "8px 0 8px" }}>Variométro (VSI)</h3>
              <p style={{ color: "var(--muted2)", fontSize: 13.5, lineHeight: 1.65 }}>
                <strong style={{ color: "var(--text)" }}>Vertical Speed Indicator.</strong> Muestra la tasa de ascenso o descenso en pies por minuto (fpm). Un descenso normal de aproximación es <strong style={{ color: "var(--sky)" }}>-500 a -700 fpm</strong>. Un avión comercial puede ascender a 2.000 fpm.
              </p>
            </div>
          </div>

        </div>

        {/* Cómo se agrupan */}
        <div className="learnGrid" style={{ marginTop: 28 }}>
          <div className="learnCard">
            <div className="learnIcon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z"/><path d="M12 8v4l3 3"/></svg>
            </div>
            <h3>Sistema Pitot-Estático</h3>
            <p>Usa la presión dinámica (tubo Pitot) y la presión estática (puerto estático) para calcular velocidad y altitud. Si el tubo Pitot se tapa con hielo, el velocímetro da lecturas falsas — causa de varios accidentes históricos.</p>
          </div>
          <div className="learnCard">
            <div className="learnIcon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>
            </div>
            <h3>Sistema Giroscópico</h3>
            <p>Un giroscopio mantiene su orientación en el espacio sin importar cómo se mueva el avión — como un trompo que no cae. Esto permite mostrar actitud y rumbo con precisión. Requiere vacío o electricidad para girar.</p>
          </div>
        </div>
      </section>

      {/* ── CABINA MODERNA ──────────────────────────────────────── */}
      <section className="container" style={{ paddingBottom: 48 }}>
        <p className="gold">CABINA MODERNA</p>
        <h2 style={{ fontSize: "clamp(26px, 5vw, 44px)", margin: "8px 0 8px", letterSpacing: -1 }}>Glass cockpit: el futuro ya llegó</h2>
        <p style={{ color: "var(--muted2)", marginBottom: 32, maxWidth: 560 }}>
          Pantallas digitales de alta resolución que reemplazan a los instrumentos analógicos. El Boeing 737 MAX y el Airbus A320neo los llevan de serie desde hace años.
        </p>
        <div className="statsGrid">

          <div className="recordCard" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ height: 160, overflow: "hidden", background: "#0A0A0A", position: "relative" }}>
              {imgPFD ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={imgPFD} alt="PFD – Primary Flight Display" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div style={{ width: "100%", height: "100%", background: "var(--glass2)" }} />
              )}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 55%)" }} />
            </div>
            <div style={{ padding: "16px 20px 20px" }}>
              <span className="recordBadge">PANTALLA</span>
              <h3 style={{ fontSize: 18, margin: "8px 0 8px" }}>PFD – Primary Flight Display</h3>
              <p style={{ color: "var(--muted2)", fontSize: 13.5, lineHeight: 1.65 }}>Reemplaza al six-pack completo en una sola pantalla. Muestra velocidad, altitud, horizonte, tasa de viraje, variométro y más. Si falla, el piloto cambia a los instrumentos analógicos de respaldo.</p>
            </div>
          </div>

          <div className="recordCard" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ height: 160, overflow: "hidden", background: "#0A0A0A", position: "relative" }}>
              {imgND ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={imgND} alt="ND – Navigation Display" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div style={{ width: "100%", height: "100%", background: "var(--glass2)" }} />
              )}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 55%)" }} />
            </div>
            <div style={{ padding: "16px 20px 20px" }}>
              <span className="recordBadge">NAVEGACIÓN</span>
              <h3 style={{ fontSize: 18, margin: "8px 0 8px" }}>ND – Navigation Display</h3>
              <p style={{ color: "var(--muted2)", fontSize: 13.5, lineHeight: 1.65 }}>Muestra la ruta, waypoints, tráfico ADS-B cercano, clima del radar meteorológico y el plan de vuelo del FMS. Configurable según fase de vuelo: arc, plan, rose.</p>
            </div>
          </div>

          <div className="recordCard" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ height: 160, overflow: "hidden", background: "#0A0A0A", position: "relative" }}>
              {imgFMS ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={imgFMS} alt="FMS – Flight Management System" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div style={{ width: "100%", height: "100%", background: "var(--glass2)" }} />
              )}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 55%)" }} />
            </div>
            <div style={{ padding: "16px 20px 20px" }}>
              <span className="recordBadge">GESTIÓN</span>
              <h3 style={{ fontSize: 18, margin: "8px 0 8px" }}>FMS – Flight Management System</h3>
              <p style={{ color: "var(--muted2)", fontSize: 13.5, lineHeight: 1.65 }}>La computadora de vuelo. Calcula la ruta óptima, gestiona el combustible, predice el tiempo de llegada y controla el autopiloto. Puede ejecutar un aterrizaje CAT III completo sin visibilidad.</p>
            </div>
          </div>

          <div className="recordCard" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ height: 160, overflow: "hidden", background: "#0A0A0A", position: "relative" }}>
              {imgTCAS ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={imgTCAS} alt="TCAS – Anti-colisión" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div style={{ width: "100%", height: "100%", background: "var(--glass2)" }} />
              )}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 55%)" }} />
            </div>
            <div style={{ padding: "16px 20px 20px" }}>
              <span className="recordBadge">ALERTAS</span>
              <h3 style={{ fontSize: 18, margin: "8px 0 8px" }}>TCAS – Anti-colisión</h3>
              <p style={{ color: "var(--muted2)", fontSize: 13.5, lineHeight: 1.65 }}>Traffic Collision Avoidance System. Detecta transponders cercanos y emite alertas de tráfico (TA) y resoluciones de maniobra (RA). Obligatorio en aviones comerciales por norma ICAO/ANAC.</p>
            </div>
          </div>

        </div>
      </section>

      {/* ── ALERTAS CRÍTICAS ─────────────────────────────────────── */}
      <section className="container" style={{ paddingBottom: 64 }}>
        <p className="gold">ALERTAS Y ALARMAS</p>
        <h2 style={{ fontSize: "clamp(26px, 5vw, 44px)", margin: "8px 0 8px", letterSpacing: -1 }}>Cuando suena una alarma</h2>
        <p style={{ color: "var(--muted2)", marginBottom: 32, maxWidth: 560 }}>
          Los sistemas que avisan al piloto cuando algo sale mal — y que han salvado miles de vidas desde su adopción obligatoria.
        </p>
        <div className="statsGrid">

          <div className="recordCard" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ height: 160, overflow: "hidden", background: "#0A0A0A", position: "relative" }}>
              {imgGPWS ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={imgGPWS} alt="GPWS – Alerta de terreno" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div style={{ width: "100%", height: "100%", background: "var(--glass2)" }} />
              )}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 55%)" }} />
            </div>
            <div style={{ padding: "16px 20px 20px" }}>
              <span className="recordBadge">PELIGRO</span>
              <h3 style={{ fontSize: 18, margin: "8px 0 8px" }}>GPWS – Alerta de terreno</h3>
              <p style={{ color: "var(--muted2)", fontSize: 13.5, lineHeight: 1.65 }}>Ground Proximity Warning System. Emite &apos;PULL UP! PULL UP!&apos; si el avión se acerca peligrosamente al suelo o a una montaña. El EGPWS moderno agrega base de datos de terreno 3D.</p>
            </div>
          </div>

          <div className="recordCard" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ height: 160, overflow: "hidden", background: "#0A0A0A", position: "relative" }}>
              {imgStick ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={imgStick} alt="Stick Shaker" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div style={{ width: "100%", height: "100%", background: "var(--glass2)" }} />
              )}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 55%)" }} />
            </div>
            <div style={{ padding: "16px 20px 20px" }}>
              <span className="recordBadge">PÉRDIDA</span>
              <h3 style={{ fontSize: 18, margin: "8px 0 8px" }}>Stick Shaker</h3>
              <p style={{ color: "var(--muted2)", fontSize: 13.5, lineHeight: 1.65 }}>El bastón (stick) vibra mecánicamente cuando el ala está a punto de entrar en pérdida. Es la última advertencia antes del stall. Si vibra: bajar el morro inmediatamente, siempre.</p>
            </div>
          </div>

          <div className="recordCard" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ height: 160, overflow: "hidden", background: "#0A0A0A", position: "relative" }}>
              {imgFDR ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={imgFDR} alt="Flight Data Recorder" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div style={{ width: "100%", height: "100%", background: "var(--glass2)" }} />
              )}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 55%)" }} />
            </div>
            <div style={{ padding: "16px 20px 20px" }}>
              <span className="recordBadge">CÓDIGO NEGRO</span>
              <h3 style={{ fontSize: 18, margin: "8px 0 8px" }}>Flight Data Recorder</h3>
              <p style={{ color: "var(--muted2)", fontSize: 13.5, lineHeight: 1.65 }}>La &apos;caja negra&apos;. Registra 1.000+ parámetros del vuelo durante 25 horas. Es naranja (no negra). Soporta <strong style={{ color: "var(--sky)" }}>3.400 G, 1.100°C y 60 días bajo el agua</strong>.</p>
            </div>
          </div>

        </div>

        <div style={{ marginTop: 32, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link className="btnPrimary" href="/licencias">Módulo 3: Licencias →</Link>
          <Link className="btnOutline" href="/vuelo">← Módulo 1: Cómo vuela</Link>
        </div>
      </section>
    </main>
  );
}
