import Link from "next/link";

export default function InstrumentosPage() {
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
          <div className="recordCard">
            <span className="recordBadge">PITOT-ESTÁTICO</span>
            <h3>Velocímetro (ASI)</h3>
            <p>Airspeed Indicator. Mide la velocidad del avión respecto al aire (IAS). No mide velocidad sobre el suelo. Tiene marcas: Vso (pérdida con flaps), Vno (maniobras), Vne (nunca superar, línea roja).</p>
          </div>
          <div className="recordCard">
            <span className="recordBadge">GIROSCÓPICO</span>
            <h3>Horizonte Artificial</h3>
            <p>Attitude Indicator. El instrumento más importante en IMC. Muestra la inclinación (roll) y el cabeceo (pitch) respecto al horizonte real. Sin él, el piloto se desorienta en minutos en nubes.</p>
          </div>
          <div className="recordCard">
            <span className="recordBadge">PITOT-ESTÁTICO</span>
            <h3>Altímetro</h3>
            <p>Mide la presión estática y la convierte en altitud. Tiene una perilla para ajustar el QNH local. Error de 1 hPa en el ajuste = error de ±27 pies en la lectura.</p>
          </div>
          <div className="recordCard">
            <span className="recordBadge">GIROSCÓPICO</span>
            <h3>Indicador de Viraje</h3>
            <p>Turn Coordinator. Mide la tasa de viraje y la coordinación (balance entre rudder y alerón). La marca de 2 minutos = viraje de 360° en 2 minutos = 3°/segundo estándar.</p>
          </div>
          <div className="recordCard">
            <span className="recordBadge">GIROSCÓPICO</span>
            <h3>Indicador de Rumbo</h3>
            <p>Heading Indicator / DI. Brújula giroscópica sin los errores de la brújula magnética. Debe sincronizarse con la brújula magnética cada 15 minutos por precesión giroscópica.</p>
          </div>
          <div className="recordCard">
            <span className="recordBadge">PITOT-ESTÁTICO</span>
            <h3>Variométro (VSI)</h3>
            <p>Vertical Speed Indicator. Muestra la tasa de ascenso o descenso en pies por minuto (fpm). Un descenso normal de aproximación es -500 a -700 fpm.</p>
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
          <div className="recordCard">
            <span className="recordBadge">PANTALLA</span>
            <h3>PFD – Primary Flight Display</h3>
            <p>Reemplaza al six-pack en una sola pantalla. Muestra velocidad, altitud, horizonte, tasa de viraje, variométro y más en una sola pantalla táctil de alta resolución.</p>
          </div>
          <div className="recordCard">
            <span className="recordBadge">NAVEGACIÓN</span>
            <h3>ND – Navigation Display</h3>
            <p>Muestra la ruta, waypoints, tráfico ADS-B cercano, clima del radar meteorológico y el plan de vuelo del FMS. Configurable según fase de vuelo.</p>
          </div>
          <div className="recordCard">
            <span className="recordBadge">GESTIÓN</span>
            <h3>FMS – Flight Management System</h3>
            <p>La computadora de vuelo. Calcula la ruta óptima, gestiona el combustible, predice el tiempo de llegada y controla el autopiloto. Puede volar un aterrizaje completo sin intervención humana.</p>
          </div>
          <div className="recordCard">
            <span className="recordBadge">ALERTAS</span>
            <h3>TCAS – Anti-colisión</h3>
            <p>Traffic Collision Avoidance System. Detecta transponders cercanos y emite alertas de tráfico (TA) y resoluciones de maniobra (RA). Es obligatorio en aviones comerciales.</p>
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
          <div className="recordCard">
            <span className="recordBadge">PELIGRO</span>
            <h3>GPWS – Alerta de terreno</h3>
            <p>Ground Proximity Warning System. Emite &apos;PULL UP! PULL UP!&apos; si el avión se acerca peligrosamente al suelo. Salvó cientos de vidas desde su adopción en los 70.</p>
          </div>
          <div className="recordCard">
            <span className="recordBadge">PÉRDIDA</span>
            <h3>Stick Shaker</h3>
            <p>El bastón (stick) vibra mecánicamente antes de que el ala entre en pérdida. Es la última advertencia antes del stall. Si vibra, hay que bajar el morro inmediatamente.</p>
          </div>
          <div className="recordCard">
            <span className="recordBadge">CÓDIGO NEGRO</span>
            <h3>Flight Data Recorder</h3>
            <p>La &apos;caja negra&apos;. Registra 1000+ parámetros del vuelo durante 25 horas. Es naranja, no negra. Soporta 3.400 G, 1.100°C y 60 días bajo el agua.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
