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
  // Six-pack images
  const [
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
      {/* HERO */}
      <section className="container hero compactHero">
        <Link className="back" href="/">← Volver</Link>
        <p className="gold">WIKIAIR · ESCUELA DE VUELO</p>
        <h1>Instrumentos de vuelo</h1>
        <p>Los ojos del piloto. Todo lo que se lee en la cabina y qué significa cada número.</p>
      </section>

      {/* LOS 6 BÁSICOS */}
      <section className="container" style={{ paddingTop: 40, paddingBottom: 48 }}>
        <p className="gold">LOS 6 BÁSICOS</p>
        <h2>El six-pack del piloto</h2>
        <p style={{ color: "var(--muted2)", marginBottom: 32 }}>
          Todo piloto aprende primero estos seis. Funcionan mecánicamente sin electricidad.
        </p>
        <div className="statsGrid">

          <div className="recordCard" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ height: 160, overflow: "hidden", background: "#010914", position: "relative" }}>
              {imgASI ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={imgASI} alt="Velocímetro (ASI)" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div style={{ width: "100%", height: "100%", background: "var(--glass2)" }} />
              )}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(2,12,27,0.85) 0%, transparent 55%)" }} />
            </div>
            <div style={{ padding: "16px 20px 20px" }}>
              <span className="recordBadge">PITOT-ESTÁTICO</span>
              <h3 style={{ fontSize: 18, margin: "8px 0 8px" }}>Velocímetro (ASI)</h3>
              <p style={{ color: "var(--muted2)", fontSize: 13.5, lineHeight: 1.65 }}>Airspeed Indicator. Mide la velocidad del avión respecto al aire (IAS). No mide velocidad sobre el suelo. Tiene marcas: Vso (pérdida con flaps), Vno (maniobras), Vne (nunca superar, línea roja).</p>
            </div>
          </div>

          <div className="recordCard" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ height: 160, overflow: "hidden", background: "#010914", position: "relative" }}>
              {imgAttitude ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={imgAttitude} alt="Horizonte Artificial" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div style={{ width: "100%", height: "100%", background: "var(--glass2)" }} />
              )}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(2,12,27,0.85) 0%, transparent 55%)" }} />
            </div>
            <div style={{ padding: "16px 20px 20px" }}>
              <span className="recordBadge">GIROSCÓPICO</span>
              <h3 style={{ fontSize: 18, margin: "8px 0 8px" }}>Horizonte Artificial</h3>
              <p style={{ color: "var(--muted2)", fontSize: 13.5, lineHeight: 1.65 }}>Attitude Indicator. El instrumento más importante en IMC. Muestra la inclinación (roll) y el cabeceo (pitch) respecto al horizonte real. Sin él, el piloto se desorienta en minutos en nubes.</p>
            </div>
          </div>

          <div className="recordCard" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ height: 160, overflow: "hidden", background: "#010914", position: "relative" }}>
              {imgAltimeter ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={imgAltimeter} alt="Altímetro" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div style={{ width: "100%", height: "100%", background: "var(--glass2)" }} />
              )}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(2,12,27,0.85) 0%, transparent 55%)" }} />
            </div>
            <div style={{ padding: "16px 20px 20px" }}>
              <span className="recordBadge">PITOT-ESTÁTICO</span>
              <h3 style={{ fontSize: 18, margin: "8px 0 8px" }}>Altímetro</h3>
              <p style={{ color: "var(--muted2)", fontSize: 13.5, lineHeight: 1.65 }}>Mide la presión estática y la convierte en altitud. Tiene una perilla para ajustar el QNH local. Error de 1 hPa en el ajuste = error de ±27 pies en la lectura.</p>
            </div>
          </div>

          <div className="recordCard" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ height: 160, overflow: "hidden", background: "#010914", position: "relative" }}>
              {imgTurn ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={imgTurn} alt="Indicador de Viraje" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div style={{ width: "100%", height: "100%", background: "var(--glass2)" }} />
              )}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(2,12,27,0.85) 0%, transparent 55%)" }} />
            </div>
            <div style={{ padding: "16px 20px 20px" }}>
              <span className="recordBadge">GIROSCÓPICO</span>
              <h3 style={{ fontSize: 18, margin: "8px 0 8px" }}>Indicador de Viraje</h3>
              <p style={{ color: "var(--muted2)", fontSize: 13.5, lineHeight: 1.65 }}>Turn Coordinator. Mide la tasa de viraje y la coordinación (balance entre rudder y alerón). La marca de 2 minutos = viraje de 360° en 2 minutos = 3°/segundo estándar.</p>
            </div>
          </div>

          <div className="recordCard" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ height: 160, overflow: "hidden", background: "#010914", position: "relative" }}>
              {imgHeading ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={imgHeading} alt="Indicador de Rumbo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div style={{ width: "100%", height: "100%", background: "var(--glass2)" }} />
              )}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(2,12,27,0.85) 0%, transparent 55%)" }} />
            </div>
            <div style={{ padding: "16px 20px 20px" }}>
              <span className="recordBadge">GIROSCÓPICO</span>
              <h3 style={{ fontSize: 18, margin: "8px 0 8px" }}>Indicador de Rumbo</h3>
              <p style={{ color: "var(--muted2)", fontSize: 13.5, lineHeight: 1.65 }}>Heading Indicator / DI. Brújula giroscópica sin los errores de la brújula magnética. Debe sincronizarse con la brújula magnética cada 15 minutos por precesión giroscópica.</p>
            </div>
          </div>

          <div className="recordCard" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ height: 160, overflow: "hidden", background: "#010914", position: "relative" }}>
              {imgVSI ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={imgVSI} alt="Variométro (VSI)" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div style={{ width: "100%", height: "100%", background: "var(--glass2)" }} />
              )}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(2,12,27,0.85) 0%, transparent 55%)" }} />
            </div>
            <div style={{ padding: "16px 20px 20px" }}>
              <span className="recordBadge">PITOT-ESTÁTICO</span>
              <h3 style={{ fontSize: 18, margin: "8px 0 8px" }}>Variométro (VSI)</h3>
              <p style={{ color: "var(--muted2)", fontSize: 13.5, lineHeight: 1.65 }}>Vertical Speed Indicator. Muestra la tasa de ascenso o descenso en pies por minuto (fpm). Un descenso normal de aproximación es -500 a -700 fpm.</p>
            </div>
          </div>

        </div>
      </section>

      {/* CABINA MODERNA */}
      <section className="container" style={{ paddingBottom: 48 }}>
        <p className="gold">CABINA MODERNA</p>
        <h2>Glass cockpit: el futuro de la aviación</h2>
        <p style={{ color: "var(--muted2)", marginBottom: 32 }}>
          Pantallas digitales de alta resolución que reemplazan a los instrumentos analógicos clásicos.
        </p>
        <div className="statsGrid">

          <div className="recordCard" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ height: 160, overflow: "hidden", background: "#010914", position: "relative" }}>
              {imgPFD ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={imgPFD} alt="PFD – Primary Flight Display" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div style={{ width: "100%", height: "100%", background: "var(--glass2)" }} />
              )}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(2,12,27,0.85) 0%, transparent 55%)" }} />
            </div>
            <div style={{ padding: "16px 20px 20px" }}>
              <span className="recordBadge">PANTALLA</span>
              <h3 style={{ fontSize: 18, margin: "8px 0 8px" }}>PFD – Primary Flight Display</h3>
              <p style={{ color: "var(--muted2)", fontSize: 13.5, lineHeight: 1.65 }}>Reemplaza al six-pack en una sola pantalla. Muestra velocidad, altitud, horizonte, tasa de viraje, variométro y más en una sola pantalla táctil de alta resolución.</p>
            </div>
          </div>

          <div className="recordCard" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ height: 160, overflow: "hidden", background: "#010914", position: "relative" }}>
              {imgND ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={imgND} alt="ND – Navigation Display" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div style={{ width: "100%", height: "100%", background: "var(--glass2)" }} />
              )}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(2,12,27,0.85) 0%, transparent 55%)" }} />
            </div>
            <div style={{ padding: "16px 20px 20px" }}>
              <span className="recordBadge">NAVEGACIÓN</span>
              <h3 style={{ fontSize: 18, margin: "8px 0 8px" }}>ND – Navigation Display</h3>
              <p style={{ color: "var(--muted2)", fontSize: 13.5, lineHeight: 1.65 }}>Muestra la ruta, waypoints, tráfico ADS-B cercano, clima del radar meteorológico y el plan de vuelo del FMS. Configurable según fase de vuelo.</p>
            </div>
          </div>

          <div className="recordCard" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ height: 160, overflow: "hidden", background: "#010914", position: "relative" }}>
              {imgFMS ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={imgFMS} alt="FMS – Flight Management System" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div style={{ width: "100%", height: "100%", background: "var(--glass2)" }} />
              )}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(2,12,27,0.85) 0%, transparent 55%)" }} />
            </div>
            <div style={{ padding: "16px 20px 20px" }}>
              <span className="recordBadge">GESTIÓN</span>
              <h3 style={{ fontSize: 18, margin: "8px 0 8px" }}>FMS – Flight Management System</h3>
              <p style={{ color: "var(--muted2)", fontSize: 13.5, lineHeight: 1.65 }}>La computadora de vuelo. Calcula la ruta óptima, gestiona el combustible, predice el tiempo de llegada y controla el autopiloto. Puede volar un aterrizaje completo sin intervención humana.</p>
            </div>
          </div>

          <div className="recordCard" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ height: 160, overflow: "hidden", background: "#010914", position: "relative" }}>
              {imgTCAS ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={imgTCAS} alt="TCAS – Anti-colisión" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div style={{ width: "100%", height: "100%", background: "var(--glass2)" }} />
              )}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(2,12,27,0.85) 0%, transparent 55%)" }} />
            </div>
            <div style={{ padding: "16px 20px 20px" }}>
              <span className="recordBadge">ALERTAS</span>
              <h3 style={{ fontSize: 18, margin: "8px 0 8px" }}>TCAS – Anti-colisión</h3>
              <p style={{ color: "var(--muted2)", fontSize: 13.5, lineHeight: 1.65 }}>Traffic Collision Avoidance System. Detecta transponders cercanos y emite alertas de tráfico (TA) y resoluciones de maniobra (RA). Es obligatorio en aviones comerciales.</p>
            </div>
          </div>

        </div>
      </section>

      {/* ALERTAS CRÍTICAS */}
      <section className="container" style={{ paddingBottom: 64 }}>
        <p className="gold">ALERTAS Y ALARMAS</p>
        <h2>Cuando suena una alarma</h2>
        <p style={{ color: "var(--muted2)", marginBottom: 32 }}>
          Los sistemas que avisan al piloto cuando algo sale mal — y que han salvado miles de vidas.
        </p>
        <div className="statsGrid">

          <div className="recordCard" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ height: 160, overflow: "hidden", background: "#010914", position: "relative" }}>
              {imgGPWS ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={imgGPWS} alt="GPWS – Alerta de terreno" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div style={{ width: "100%", height: "100%", background: "var(--glass2)" }} />
              )}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(2,12,27,0.85) 0%, transparent 55%)" }} />
            </div>
            <div style={{ padding: "16px 20px 20px" }}>
              <span className="recordBadge">PELIGRO</span>
              <h3 style={{ fontSize: 18, margin: "8px 0 8px" }}>GPWS – Alerta de terreno</h3>
              <p style={{ color: "var(--muted2)", fontSize: 13.5, lineHeight: 1.65 }}>Ground Proximity Warning System. Emite &apos;PULL UP! PULL UP!&apos; si el avión se acerca peligrosamente al suelo. Salvó cientos de vidas desde su adopción en los 70.</p>
            </div>
          </div>

          <div className="recordCard" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ height: 160, overflow: "hidden", background: "#010914", position: "relative" }}>
              {imgStick ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={imgStick} alt="Stick Shaker" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div style={{ width: "100%", height: "100%", background: "var(--glass2)" }} />
              )}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(2,12,27,0.85) 0%, transparent 55%)" }} />
            </div>
            <div style={{ padding: "16px 20px 20px" }}>
              <span className="recordBadge">PÉRDIDA</span>
              <h3 style={{ fontSize: 18, margin: "8px 0 8px" }}>Stick Shaker</h3>
              <p style={{ color: "var(--muted2)", fontSize: 13.5, lineHeight: 1.65 }}>El bastón (stick) vibra mecánicamente antes de que el ala entre en pérdida. Es la última advertencia antes del stall. Si vibra, hay que bajar el morro inmediatamente.</p>
            </div>
          </div>

          <div className="recordCard" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ height: 160, overflow: "hidden", background: "#010914", position: "relative" }}>
              {imgFDR ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={imgFDR} alt="Flight Data Recorder" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div style={{ width: "100%", height: "100%", background: "var(--glass2)" }} />
              )}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(2,12,27,0.85) 0%, transparent 55%)" }} />
            </div>
            <div style={{ padding: "16px 20px 20px" }}>
              <span className="recordBadge">CÓDIGO NEGRO</span>
              <h3 style={{ fontSize: 18, margin: "8px 0 8px" }}>Flight Data Recorder</h3>
              <p style={{ color: "var(--muted2)", fontSize: 13.5, lineHeight: 1.65 }}>La &apos;caja negra&apos;. Registra 1000+ parámetros del vuelo durante 25 horas. Es naranja, no negra. Soporta 3.400 G, 1.100°C y 60 días bajo el agua.</p>
            </div>
          </div>

        </div>

        <div style={{ marginTop: 32, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link className="btnPrimary" href="/glosario">Módulo 3: Glosario →</Link>
          <Link className="btnOutline" href="/vuelo">← Módulo 1: Cómo vuela</Link>
        </div>
      </section>
    </main>
  );
}
