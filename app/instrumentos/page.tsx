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
    return data?.thumbnail?.source || data?.originalimage?.source || null;
  } catch {
    return null;
  }
}

const sixpack = [
  {
    badge: "PITOT-ESTÁTICO",
    name: "Velocímetro (ASI)",
    wiki: "Airspeed indicator",
    summary: "Mide la velocidad del avión respecto al aire (IAS). Tiene marcas de velocidades críticas: Vso, Vno y Vne (línea roja).",
    detail: "El Airspeed Indicator (ASI) mide la diferencia entre la presión dinámica (tubo Pitot) y la presión estática. Esta diferencia corresponde a la velocidad del avión respecto a la masa de aire que lo rodea — llamada IAS (Indicated Airspeed).\n\nEn la escala hay arcos de colores: arco blanco (flaps extendidos), arco verde (operación normal), arco amarillo (precaución — turbulencia), línea roja (Vne — never exceed, jamás superar). La velocidad sobre el suelo (GS) puede ser muy diferente: con viento de cola de 100 kt, un avión a 200 kt IAS va a 300 kt sobre tierra. 1 kt = 1,852 km/h. El sistema pitot-estático falla si el tubo Pitot se obstruye (hielo, insectos) — causa real del accidente de AF447 (2009).",
  },
  {
    badge: "GIROSCÓPICO",
    name: "Horizonte Artificial",
    wiki: "Attitude indicator",
    summary: "El instrumento más importante en IMC. Muestra la inclinación (roll) y el cabeceo (pitch) respecto al horizonte real.",
    detail: "El Attitude Indicator (horizonte artificial) usa un giroscopio que mantiene su orientación en el espacio, independiente del movimiento del avión. La parte azul representa el cielo; la marrón, la tierra. Una línea de alas (miniatura del avión) se mueve relativa al horizonte.\n\nSin horizonte artificial, el piloto pierde la orientación espacial en segundos dentro de las nubes — es el principal asesino en vuelo IFR. El cerebro humano no puede distinguir si está nivelado o en un viraje suave sin referencias visuales externas. En aviones modernos, el ADIRU (Air Data Inertial Reference Unit) usa acelerómetros y giroscopios láser para calcular la actitud con mucha mayor precisión. El Airbus A380 tiene 3 ADIRU redundantes.",
  },
  {
    badge: "PITOT-ESTÁTICO",
    name: "Altímetro",
    wiki: "Altimeter",
    summary: "Mide la presión atmosférica y la convierte en altitud. Debe ajustarse con el QNH local antes de cada vuelo.",
    detail: "El altímetro convierte la presión estática en altitud. Al ajustar la perilla de Kollsman (QNH), el piloto sintoniza la presión de referencia local — así el altímetro muestra la altitud sobre el nivel del mar correcto para ese aeropuerto.\n\nError de 1 hPa = ±27 ft (±8 m). En crucero, todos los aviones usan QNE (1013.25 hPa = presión estándar ISA) para garantizar separación vertical consistente — de ahí el concepto de «Flight Level»: FL350 = 35.000 ft con QNE ajustado. Al descender por debajo del nivel de transición, el piloto cambia a QNH local. El altímetro barométrico tiene un retraso inherente: no mide la altitud directamente, mide la presión y la asume como altitud según la atmósfera estándar ISA.",
  },
  {
    badge: "GIROSCÓPICO",
    name: "Indicador de Viraje",
    wiki: "Turn and slip indicator",
    summary: "Mide la tasa de viraje y la coordinación. Viraje estándar = 360° en 2 minutos = 3°/segundo.",
    detail: "El Turn Coordinator (o Turn and Bank Indicator) tiene dos elementos: el indicador de viraje (un avión miniatura que se inclina en la dirección del viraje) y el inclinómetro de bola (una bolita en líquido que indica si el viraje está coordinado).\n\nViraje estándar de 2 minutos: 3°/segundo, que produce 360° en 2 minutos — es la tasa de viraje de referencia en procedimientos ATC (Ej: «gire a la izquierda, viraje estándar, rumbo 090°»). Si la bola está fuera del centro, el viraje no está coordinado — el avión «patina» (skid) o «resbala» (slip). Regla: «pisa la bola» (aplica rudder del mismo lado). Es el único instrumento del six-pack que puede funcionar eléctricamente cuando el giroscopio de vacío falla.",
  },
  {
    badge: "GIROSCÓPICO",
    name: "Indicador de Rumbo",
    wiki: "Heading indicator",
    summary: "Brújula giroscópica sin los errores de la brújula magnética. Debe sincronizarse cada 15 minutos.",
    detail: "El Directional Gyro (DG) o Heading Indicator usa un giroscopio para mostrar el rumbo magnético sin los errores de la brújula magnética (oscilación en virajes, errores de aceleración, desvíos de motor).\n\nLa brújula magnética es precisa sólo en vuelo recto y nivelado a velocidad constante — difícilmente útil en maniobras. El DI es estable en cualquier condición. La precesión giroscópica hace que el instrumento derive con el tiempo (~3°/15 min), por eso debe sincronizarse periódicamente con la brújula magnética. En aviones modernos con AHRS (Attitude and Heading Reference System) o ADIRU, el rumbo se calcula inercialmente con drift mínimo y no necesita sincronización manual.",
  },
  {
    badge: "PITOT-ESTÁTICO",
    name: "Variométro (VSI)",
    wiki: "Variometer",
    summary: "Muestra la tasa de ascenso o descenso en pies por minuto. Aproximación normal: -500 a -700 fpm.",
    detail: "El Vertical Speed Indicator (VSI) usa la diferencia de presión estática en el tiempo para calcular la tasa de cambio de altitud. La escala está en pies por minuto (fpm): positivo = ascenso, negativo = descenso.\n\nUn ascenso inicial de avión comercial puede ser 2.000-2.500 fpm. En crucero, el avión vuela a 0 fpm (nivel). En descenso, -500 a -1.500 fpm. Un aterrizaje suave está por debajo de -200 fpm en el touchdown; uno duro puede ser -400 a -600 fpm. El VSI tiene un retraso inherente de varios segundos — el Instantaneous VSI (IVSI) agrega acelerómetros para eliminar este retraso. En planeadores y parapentes, el variométro (vario) es el instrumento más importante para aprovechar las térmicas.",
  },
];

const glass = [
  {
    badge: "PANTALLA PRINCIPAL",
    name: "PFD – Primary Flight Display",
    wiki: "Primary flight display",
    summary: "Reemplaza al six-pack completo en una sola pantalla: velocidad, altitud, horizonte, VSI y más. Respaldo analógico si falla.",
    detail: "El Primary Flight Display integra todos los instrumentos del six-pack en una pantalla de alta resolución. Muestra simultáneamente: la cinta de velocidad (izquierda), el horizonte artificial (centro), la cinta de altitud (derecha), la VSI (variométro digital), el rumbo magnético, y los modos del autopiloto activos.\n\nEn aviones Airbus (A320, A350, A380), el PFD además muestra el Flight Mode Annunciator (FMA) — los modos activos de piloto automático y automaneta. El piloto debe leer y confirmar en voz alta los modos cada vez que cambian ('Thrust mode selected, OPEN CLB'). En caso de falla del PFD, el piloto mira a los instrumentos analógicos de respaldo (standby instruments) siempre presentes en el panel.",
  },
  {
    badge: "NAVEGACIÓN",
    name: "ND – Navigation Display",
    wiki: "Navigation display",
    summary: "Muestra la ruta, waypoints, tráfico ADS-B, radar meteorológico y el plan de vuelo del FMS. Configurable en varios modos.",
    detail: "El Navigation Display es el mapa de vuelo digital. Muestra la posición del avión, la ruta programada en el FMS, los waypoints (nombres de 5 letras como BARBA, DOGAL, LULES en la Argentina), el tráfico TCAS cercano (triángulos amarillos y rojos), y la imagen del radar meteorológico (celdas tormentosas en rojo/amarillo/verde).\n\nModos del ND: ARC (sector de 90°, vista frontal con la ruta), PLAN (vista cenital con la ruta completa), ROSE NAV (rosa de 360° con posición y waypoints), ROSE ILS (para aproximación). En aproximación, muestra el ILS: el localizador (desviación lateral) y el glideslope (desviación vertical) para un aterrizaje por instrumentos.",
  },
  {
    badge: "COMPUTADORA DE VUELO",
    name: "FMS – Flight Management System",
    wiki: "Flight management system",
    summary: "Calcula la ruta óptima, gestiona el combustible, predice la llegada y controla el autopiloto. Puede ejecutar aterrizajes CAT III.",
    detail: "El Flight Management System (FMS) es el cerebro del avión moderno. Integra navegación (GPS, VOR, ILS, DME), gestión de performance (peso, combustible, viento, temperatura) y automatización (control del autopiloto y la automaneta).\n\nEl FMS calcula constantemente el TOD (Top of Descent), el combustible restante, la velocidad óptima de crucero (Econ Mach), y las llegadas (STARs) y salidas (SIDs) programadas. Contiene una base de datos de navegación que se actualiza cada 28 días (ciclo AIRAC). En condiciones CAT III (visibilidad casi nula), el FMS guía el autopiloto hasta el touchdown y la carrera de aterrizaje sin que el piloto vea la pista. Sólo los aeropuertos equipados con ILS CAT III pueden hacer esto.",
  },
  {
    badge: "ANTI-COLISIÓN",
    name: "TCAS – Sistema de Aviso de Colisión",
    wiki: "Traffic collision avoidance system",
    summary: "Detecta transponders cercanos y emite alertas TA (tráfico) y RA (maniobra recomendada). Obligatorio en aviones comerciales.",
    detail: "El Traffic Collision Avoidance System (TCAS II) interroga activamente los transponders de aviones cercanos y calcula si hay riesgo de colisión. Las alertas tienen dos niveles: TA (Traffic Advisory — tráfico en la cercanía, monitorear) y RA (Resolution Advisory — maniobra inmediata necesaria).\n\nAnte una RA, el piloto DEBE seguir la instrucción del TCAS aunque contradiga la del ATC — la ley de aviación lo exige. Si dos aviones reciben RA simultáneamente, el TCAS coordina las maniobras opuestas (uno sube, el otro baja). El TCAS II salvó miles de vidas desde su adopción obligatoria por ICAO en 2003. El incidente de Überlingen (2002) donde dos aviones colisionaron ocurrió porque uno de los pilotos siguió la instrucción del ATC en lugar del TCAS.",
  },
];

const alerts = [
  {
    badge: "ALERTA DE TERRENO",
    name: "GPWS / EGPWS",
    wiki: "Ground proximity warning system",
    summary: "'PULL UP! PULL UP!' — avisa si el avión se acerca peligrosamente al suelo o a una montaña. El EGPWS moderno agrega terreno en 3D.",
    detail: "El Ground Proximity Warning System (GPWS) monitorea parámetros como tasa de descenso, proximidad al suelo, configuración y velocidad para emitir alertas auditivas cuando se detecta riesgo de impacto con el terreno (CFIT — Controlled Flight Into Terrain).\n\nEl Enhanced GPWS (EGPWS) agrega una base de datos mundial de terreno y obstáculos. Puede predecir colisiones con montañas aunque el avión esté en vuelo recto y nivelado — algo que el GPWS clásico no podía. Las alertas incluyen 'TERRAIN TERRAIN PULL UP', 'TOO LOW TERRAIN', 'SINK RATE'. Ante cualquier PULL UP, el piloto no cuestiona: máxima potencia y cabeceo máximo positivo. El CFIT fue históricamente la mayor causa de accidentes de aviación comercial; el EGPWS prácticamente lo eliminó en países con adopción obligatoria.",
  },
  {
    badge: "AVISO DE PÉRDIDA",
    name: "Stick Shaker / Alpha Floor",
    wiki: "Stall warning system",
    summary: "El stick vibra mecánicamente ante un stall inminente. En Airbus: ALPHA FLOOR activa automáticamente TOGA cuando el AoA es excesivo.",
    detail: "El Stick Shaker hace vibrar físicamente la columna de mandos cuando el ángulo de ataque se acerca al valor crítico de pérdida. Es imposible de ignorar: la vibración se siente en todo el cuerpo. La recuperación siempre es la misma: bajar el morro para reducir el AoA, y aumentar potencia.\n\nEn aviones Airbus (fly-by-wire), la protección Alpha Floor es electrónica: si el ángulo de ataque alcanza cierto umbral, el sistema ACTIVAR automáticamente los motores a TOGA (máxima potencia de despegue/go-around) sin que el piloto haga nada. El AF447 demostró que ignorar o no reconocer estas alertas puede ser fatal: los pilotos mantuvieron la entrada en pérdida durante 4 minutos antes del impacto.",
  },
  {
    badge: "REGISTRADOR DE VUELO",
    name: "CVR y FDR (Caja Negra)",
    wiki: "Flight recorder",
    summary: "El FDR registra 1.000+ parámetros. El CVR graba las voces de cabina. Son naranjas, no negras. Resisten 3.400 G y 1.100°C.",
    detail: "La 'caja negra' tiene dos componentes: el Flight Data Recorder (FDR) graba más de 1.000 parámetros de vuelo durante las últimas 25 horas (posición, velocidad, altitud, fuerzas en los mandos, estados de los sistemas), y el Cockpit Voice Recorder (CVR) graba los últimos 2 horas de audio de la cabina (conversaciones, radio, alarmas).\n\nAmbas cajas son de color naranja brillante (no negras — el apodo viene de los años 50 cuando eran oscuras) y están diseñadas para sobrevivir impactos de 3.400 G durante 6,5 ms, fuego de 1.100°C durante una hora, y presión submarina de 6.000 m durante 30 días. Emiten un localizador ultrasónico submarino (pinger) por 90 días. En accidentes recientes como el MH370 (2014, desaparecido sobre el Océano Índico), la búsqueda de las cajas negras fue monumental.",
  },
];

export default async function InstrumentosPage() {
  const [heroImage, sixpackImgs, glassImgs, alertImgs] = await Promise.all([
    getWikiImage("Glass cockpit"),
    Promise.all(sixpack.map((s) => getWikiImage(s.wiki))),
    Promise.all(glass.map((g) => getWikiImage(g.wiki))),
    Promise.all(alerts.map((a) => getWikiImage(a.wiki))),
  ]);

  return (
    <main className="page">
      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="moduleHero">
        <div className="moduleHeroImg">
          {heroImage && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={heroImage} alt="Cabina de vuelo moderna" />
          )}
          <div className="moduleHeroOverlay" />
        </div>
        <div className="container moduleHeroContent">
          <BackButton />
          <div className="moduleBadge">MÓDULO 02 · ESCUELA DE VUELO</div>
          <h1>Instrumentos de vuelo</h1>
          <p>Los ojos del piloto. Tocá cada instrumento para aprender qué mide, cómo funciona y por qué es crítico.</p>
        </div>
      </section>

      {/* ── DATOS DESTACADOS ────────────────────────────────────── */}
      <section className="container" style={{ paddingTop: 48, paddingBottom: 0 }}>
        <div className="factRow">
          <div className="factCard"><span className="factNum">6</span><span className="factLabel">Instrumentos básicos (six-pack)</span></div>
          <div className="factCard"><span className="factNum">1</span><span className="factUnit">kt</span><span className="factLabel">= 1,852 km/h (nudo)</span></div>
          <div className="factCard"><span className="factNum">±27</span><span className="factUnit">ft</span><span className="factLabel">Error por 1 hPa en altímetro</span></div>
          <div className="factCard"><span className="factNum">1000+</span><span className="factLabel">Parámetros graba la caja negra</span></div>
        </div>
      </section>

      {/* ── LOS 6 BÁSICOS ───────────────────────────────────────── */}
      <section className="container" style={{ paddingTop: 56, paddingBottom: 48 }}>
        <p className="gold">LOS 6 BÁSICOS</p>
        <h2 style={{ fontSize: "clamp(26px, 5vw, 44px)", margin: "8px 0 8px", letterSpacing: -1 }}>El six-pack del piloto</h2>
        <p style={{ color: "var(--muted2)", marginBottom: 32, maxWidth: 560 }}>
          Todo piloto aprende primero estos seis. Funcionan sin electricidad en muchos casos — son tu red de seguridad si falla todo lo demás. Tocá cada uno para ver el detalle.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: 18 }}>
          {sixpack.map((s, i) => (
            <ExpandableCard
              key={s.name}
              title={s.name}
              badge={s.badge}
              image={sixpackImgs[i]}
              summary={s.summary}
              detail={s.detail}
              wiki={s.wiki}
            />
          ))}
        </div>
      </section>

      {/* ── GLASS COCKPIT ───────────────────────────────────────── */}
      <section className="container" style={{ paddingBottom: 48 }}>
        <p className="gold">CABINA MODERNA</p>
        <h2 style={{ fontSize: "clamp(26px, 5vw, 44px)", margin: "8px 0 8px", letterSpacing: -1 }}>Glass cockpit: el futuro ya llegó</h2>
        <p style={{ color: "var(--muted2)", marginBottom: 32, maxWidth: 560 }}>
          Pantallas digitales que reemplazan los instrumentos analógicos. El A320neo y el 737 MAX los llevan de serie. Tocá para profundizar.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: 18 }}>
          {glass.map((g, i) => (
            <ExpandableCard
              key={g.name}
              title={g.name}
              badge={g.badge}
              image={glassImgs[i]}
              summary={g.summary}
              detail={g.detail}
              wiki={g.wiki}
            />
          ))}
        </div>
      </section>

      {/* ── ALERTAS Y ALARMAS ───────────────────────────────────── */}
      <section className="container" style={{ paddingBottom: 64 }}>
        <p className="gold">ALERTAS Y ALARMAS</p>
        <h2 style={{ fontSize: "clamp(26px, 5vw, 44px)", margin: "8px 0 8px", letterSpacing: -1 }}>Cuando suena una alarma</h2>
        <p style={{ color: "var(--muted2)", marginBottom: 32, maxWidth: 560 }}>
          Sistemas que avisan al piloto cuando algo sale mal. Han salvado miles de vidas desde su adopción obligatoria por ICAO.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: 18 }}>
          {alerts.map((a, i) => (
            <ExpandableCard
              key={a.name}
              title={a.name}
              badge={a.badge}
              image={alertImgs[i]}
              summary={a.summary}
              detail={a.detail}
              wiki={a.wiki}
            />
          ))}
        </div>

        <div style={{ marginTop: 32, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link className="btnPrimary" href="/licencias">Módulo 3: Licencias →</Link>
          <Link className="btnOutline" href="/vuelo">← Módulo 1: Cómo vuela</Link>
        </div>
      </section>
    </main>
  );
}
