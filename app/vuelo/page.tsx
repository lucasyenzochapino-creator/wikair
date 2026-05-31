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

const forces = [
  {
    badge: "↑ HACIA ARRIBA",
    name: "Sustentación",
    eng: "Lift",
    summary: "Fuerza aerodinámica generada por las alas que contrarresta el peso. Surge por la diferencia de presión entre la cara superior e inferior del ala.",
    detail: "La sustentación es la fuerza que permite que un avión vuele. Se genera principalmente por las alas gracias a dos efectos combinados: el principio de Bernoulli (el aire que pasa por la cara superior del ala viaja más rápido → menor presión → el ala es «aspirada» hacia arriba) y la deflexión newtoniana (el ala inclina el flujo de aire hacia abajo → reacción que empuja el ala hacia arriba).\n\nEn un Airbus A380 en crucero, las alas generan aprox. 560 toneladas de sustentación para mantener en aire los 280 t de peso del avión. La forma del perfil alar (asimétrico en aviones comerciales) está optimizada para maximizar la sustentación a velocidades subsónicas con el menor arrastre posible.",
    wiki: "Lift (force)",
    wikiSearch: "Airbus A380",
    color: "#22c55e",
  },
  {
    badge: "↓ HACIA ABAJO",
    name: "Peso",
    eng: "Weight",
    summary: "La fuerza de gravedad que atrae al avión hacia la Tierra. El diseño busca minimizarlo sin comprometer la resistencia estructural.",
    detail: "El peso actúa siempre hacia el centro de la Tierra. Los ingenieros dedican enormes esfuerzos a reducir el peso de cada componente: el Boeing 787 Dreamliner usa un 50% de materiales compuestos (fibra de carbono) que pesan hasta un 20% menos que el aluminio equivalente.\n\nEl centro de gravedad (CG) debe mantenerse dentro de un rango específico durante todo el vuelo. Si el CG se desplaza demasiado hacia la cola, el avión se vuelve inestable. Por eso el fuel del ala se consume en un orden preciso y el balanceo de carga es una ciencia en sí misma. Un Antonov An-225 vacío pesa 285 t; cargado puede llegar a 640 t.",
    wiki: "Weight",
    wikiSearch: "Antonov An-225",
    color: "#f87171",
  },
  {
    badge: "→ HACIA ADELANTE",
    name: "Empuje",
    eng: "Thrust",
    summary: "La fuerza que producen los motores. En turbofanes, un 80% del empuje viene del fan delantero.",
    detail: "El empuje es la fuerza que impulsa el avión hacia adelante. En un motor turbofán moderno (como el GE90 del Boeing 777), el enorme fan delantero empuja grandes volúmenes de aire «frío» alrededor del núcleo del motor — ese bypass air genera el 80% del empuje total con mucho menos ruido y consumo que quemar más combustible en el núcleo.\n\nEl empuje se mide en kilonewtons (kN) o libras-fuerza (lbf). El GE9X del 777X genera 105.000 lbf de empuje — suficiente para levantar 47 toneladas. En el despegue los motores trabajan al 100% de N1 (velocidad del fan); en crucero, ~80-85% de N1 es suficiente para mantener Mach 0.85.",
    wiki: "Turbofan",
    wikiSearch: "Jet engine",
    color: "#C8922A",
  },
  {
    badge: "← HACIA ATRÁS",
    name: "Resistencia",
    eng: "Drag",
    summary: "Se opone al movimiento del avión. Los ingenieros pasan años reduciéndola. Un 1% de mejora puede ahorrar millones en combustible.",
    detail: "La resistencia aerodinámica (drag) tiene dos componentes principales: la resistencia de fricción (la capa límite de aire en contacto con la superficie del avión) y la resistencia inducida (subproducto de la generación de sustentación — los torbellinos en las puntas de ala).\n\nLas winglets (esas aletas verticales en las puntas del ala) reducen la resistencia inducida hasta un 5%, ahorrando millones de litros de combustible al año. El SR-71 Blackbird, construido para Mach 3+, tiene un fuselaje diseñado para ser él mismo una superficie sustentadora — reduciendo la resistencia a mínimos físicos. La resistencia crece con el cuadrado de la velocidad: a Mach 2, la resistencia es 4 veces mayor que a Mach 1.",
    wiki: "Drag (physics)",
    wikiSearch: "Lockheed SR-71 Blackbird",
    color: "#fbbf24",
  },
];

const parts = [
  {
    badge: "ESTRUCTURA",
    name: "Fuselaje",
    summary: "Cuerpo principal. Su sección circular soporta la presurización uniformemente sin concentrar tensiones.",
    detail: "El fuselaje es el «tubo» principal del avión. Su sección circular no es estética: es física. Un cilindro soporta la presión interior uniformemente en toda su superficie — igual que una lata de refresco. En cabina de pasajeros, la presurización se mantiene equivalente a ~2.400 m de altitud (aunque el avión vuele a 12.000 m), para que los pasajeros no necesiten oxígeno suplementario.\n\nEl Boeing 787 Dreamliner fue el primer avión comercial con fuselaje de fibra de carbono en secciones completas (no sólo paneles). Resultado: 20% menos de peso, no se corroe, y la presurización se puede mantener más alta (equivalente a 1.800 m) mejorando el bienestar del pasajero. El fuselaje del A380 tiene 4 secciones principales unidas en la fábrica de Toulouse.",
    wiki: "Fuselage",
    wikiSearch: "Boeing 787 Dreamliner",
  },
  {
    badge: "SUSTENTACIÓN",
    name: "Alas",
    summary: "Perfil alar asimétrico: más curvo arriba, genera mayor velocidad y menor presión en la cara superior.",
    detail: "Las alas son el componente más sofisticado de un avión. Su perfil transversal (airfoil) determina las características de vuelo. Un perfil NACA 23012 típico de avión de hélice es asimétrico: la cara superior más curvada acelera el aire → crea sustentación. Un perfil supercrítico de avión comercial moderno retarda la aparición de ondas de choque a velocidades transónicas (Mach 0.8+).\n\nLas alas del Airbus A350 XWB son 100% fibra de carbono, con una envergadura de 64.75 m. La flecha (ángulo de barrido hacia atrás) de ~35° les permite volar cerca de Mach 0.85 sin que aparezcan ondas de choque en todo el intradós. Las alas también contienen hasta 158.000 litros de combustible en sus tanques integrales.",
    wiki: "Wing",
    wikiSearch: "Airbus A350 XWB",
  },
  {
    badge: "CONTROL LATERAL",
    name: "Alerones",
    summary: "Borde trasero del ala. Uno sube, el otro baja — el avión se inclina. Controlan el rolido.",
    detail: "Los alerones son superficies de control ubicadas en el borde de salida (trailing edge) de las alas, cerca de los extremos. Operan de forma diferencial: cuando el piloto gira el volante/sidestick hacia la izquierda, el alerón izquierdo sube (reduce sustentación) y el derecho baja (aumenta sustentación). El avión se inclina a la izquierda.\n\nEn aviones modernos de alta velocidad, usar sólo los alerones externos podría torsionar el ala a altas velocidades (aeroelasticidad). Por eso el Boeing 777 tiene también alerones internos y spoilers que trabajan en conjunto para el control de rolido. En el Airbus, el sidestick electrónico (fly-by-wire) envía señales eléctricas a los actuadores — no hay conexión mecánica directa.",
    wiki: "Aileron",
    wikiSearch: "Boeing 777",
  },
  {
    badge: "BAJA VELOCIDAD",
    name: "Flaps y Slats",
    summary: "Aumentan la sustentación en despegue y aterrizaje. Permiten volar más lento sin entrar en pérdida.",
    detail: "Los flaps son superficies hipersustentadoras en el borde de salida del ala; los slats en el borde de ataque. Juntos aumentan la curvatura del perfil alar y el área del ala, generando más sustentación a velocidades más bajas — esencial en despegue y aterrizaje donde el avión necesita volar lento pero sin perder sustentación.\n\nEn un Airbus A320, los flaps tienen 5 posiciones (0, 1, 2, 3, FULL). Para aterrizaje se usan los flaps FULL que reducen la velocidad de aproximación de ~240 km/h (limpia) a ~210-220 km/h. Los slats modernos del tipo Krueger aumentan adicionalmente el ángulo de ataque máximo sin entrar en pérdida, dando al piloto más margen de seguridad.",
    wiki: "Flap (aeronautics)",
    wikiSearch: "Flap aeronautics aircraft",
  },
  {
    badge: "CONTROL VERTICAL",
    name: "Timón de cola",
    summary: "Superficie vertical. Controla la guiñada: mueve la nariz izquierda o derecha. Se usa con los alerones.",
    detail: "El timón de cola (rudder) está montado en el estabilizador vertical de la cola. Su función principal es controlar la guiñada (yaw) — el movimiento de la nariz hacia izquierda o derecha. En el despegue, el timón compensa la tendencia del avión a girar hacia el motor activo si uno falla (caso crítico V1).\n\nEn crucero, el timón se usa poco — los virajes se realizan principalmente con los alerones inclinando el avión. El timón entra en acción para coordinar los virajes (evitar el deslizamiento) y para compensar el viento cruzado en el aterrizaje. El A380 tiene un enorme timón de 10.6 m² — más grande que el ala de muchos aviones ligeros.",
    wiki: "Rudder",
    wikiSearch: "Vertical stabilizer aircraft",
  },
  {
    badge: "PROPULSIÓN",
    name: "Motores turbofán",
    summary: "En aviones comerciales. El fan delantero genera el 80% del empuje. Alta eficiencia a velocidad subsónica.",
    detail: "El turbofán moderno es una obra maestra de ingeniería. El proceso: aire entra → el fan de gran diámetro lo divide en dos flujos → el flujo primario (core) pasa por compresor → cámara de combustión → turbinas → sale a alta velocidad. El flujo secundario (bypass) rodea el núcleo y sale más frío a menor velocidad.\n\nEl ratio bypass (BPR) es la clave de la eficiencia: en un CFM56 (A320) el BPR es 6:1 — 6 partes de aire «frío» por 1 de aire «caliente». El LEAP-1A del nuevo A320neo llega a BPR 11:1, con un 15% menos de consumo. El GE9X del 777X tiene el fan más grande jamás certificado: 3.40 m de diámetro, fabricado en fibra de carbono con un solo álabe sin uniones.",
    wiki: "Turbofan",
    wikiSearch: "Turbofan engine cutaway",
  },
];

const aero = [
  {
    name: "Efecto Bernoulli",
    summary: "Mayor velocidad del aire = menor presión. El aire sobre el ala va más rápido → menor presión arriba → el ala es «succionada» hacia arriba.",
    detail: "El principio de Bernoulli establece que en un fluido en movimiento, donde la velocidad aumenta, la presión disminuye. En el ala de un avión, la cara superior tiene mayor curvatura, lo que hace que el aire deba recorrer una distancia mayor en el mismo tiempo — viaja más rápido → presión más baja arriba que abajo → diferencia de presión que empuja el ala hacia arriba.\n\nEsta explicación es parcialmente correcta pero incompleta: el principio de Bernoulli no es el único mecanismo de sustentación. Es más preciso decir que el ala dirige el flujo de aire downwash hacia abajo, y la diferencia de presión resultante (que Bernoulli describe) genera la sustentación. Los dos efectos son partes del mismo fenómeno físico.",
    wiki: "Bernoulli's principle",
  },
  {
    name: "Ángulo de ataque y Newton",
    summary: "El ala inclinada desvía el aire hacia abajo. Por la 3.ª ley de Newton, el aire empuja el ala hacia arriba.",
    detail: "La tercera ley de Newton dice que toda acción tiene una reacción igual y opuesta. El ala inclinada hacia arriba (ángulo de ataque positivo) desvía el flujo de aire hacia abajo (downwash). Por reacción, el aire empuja el ala hacia arriba — generando sustentación.\n\nEsta explicación newtoniana funciona especialmente bien para perfiles simétricos (cazas, aviones acrobáticos) y explica por qué un avión puede volar invertido: si el piloto inclina negativamente el ala, el downwash va hacia arriba y la «sustentación» actúa hacia abajo. Los pilotos de acrobacia usan esto constantemente. También explica por qué aumentar el ángulo de ataque aumenta la sustentación — hasta el límite del stall.",
    wiki: "Angle of attack",
  },
  {
    name: "Stall (Entrada en pérdida)",
    summary: "Si el ángulo de ataque supera ~15-20°, el flujo se separa del ala y la sustentación cae abruptamente.",
    detail: "El stall (pérdida o entrada en pérdida) ocurre cuando el ángulo de ataque supera el ángulo crítico — típicamente 15-20° según el perfil alar. A partir de ese punto, la capa límite de aire se separa de la superficie superior del ala, creando turbulencia caótica en lugar de flujo laminar. La sustentación cae abruptamente (hasta un 50%) y la resistencia se dispara.\n\nLa recuperación del stall es el manoeuvre más importante que aprende todo piloto: bajar el morro para reducir el ángulo de ataque, aumentar potencia, recuperar velocidad. Los aviones modernos tienen sistemas ALPHA FLOOR (Airbus) o pusher de columna (Boeing) que intervienen automáticamente si se detecta un ángulo de ataque peligroso. Los stalls de aerolínea son rarísimos pero devastadores (AF447, 2009).",
    wiki: "Stall (fluid dynamics)",
  },
  {
    name: "Perfil alar (Airfoil)",
    summary: "La forma de la sección transversal del ala. Perfiles asimétricos en comerciales, simétricos en cazas supersónicos.",
    detail: "El perfil alar (airfoil en inglés) es la forma de la sección transversal del ala. Los perfiles NACA fueron los primeros estandarizados: el NACA 2412 tiene 12% de grosor y una curvatura media de 2% de la cuerda. Los aviones comerciales modernos usan perfiles supercríticos diseñados por computadora que retrasan la aparición de ondas de choque hasta velocidades cercanas a Mach 0.85.\n\nLos cazas supersónicos como el F-16 y F-22 usan perfiles simétricos muy delgados (4-6% de grosor) que tienen menos resistencia transónica pero generan menos sustentación — por eso necesitan alta velocidad y ángulos de ataque mayores para volar. Los planeadores usan perfiles muy grurvos y de alta curvatura para maximizar la relación sustentación/resistencia (L/D ratio), llegando a L/D de 60:1.",
    wiki: "Airfoil",
  },
];

const phases = [
  {
    n: "01",
    phase: "Rodaje (Taxi)",
    wiki: "Taxiway",
    summary: "Movimiento en tierra desde la puerta hasta la pista activa. ATC asigna la ruta de rodaje.",
    detail: "El rodaje (taxi) puede durar desde 5 minutos (aeropuerto pequeño) hasta 45 minutos (JFK o LAX con tráfico). El ATC (Control de Tráfico Aéreo) asigna la ruta de rodaje específica: «wikair 123, taxi al punto de espera 36L vía Alpha, Bravo». El piloto repite la instrucción completa confirmando que entendió.\n\nDurante el taxi se realiza el «before takeoff checklist»: verificar flaps, trim, frenos, luces exteriores, transponder en modo AUTO, TCAS en modo TA/RA. El motor ya está a temperatura operativa. La velocidad máxima de rodaje es típicamente 30 kt (55 km/h) en línea recta y 15 kt (28 km/h) en curvas. El combustible se quema incluso en tierra: un A380 consume ~2.400 kg/h de fuel en taxi.",
  },
  {
    n: "02",
    phase: "Despegue (Takeoff)",
    wiki: "Aircraft takeoff",
    summary: "Aceleración por la pista. Al alcanzar Vr el piloto eleva el morro. En V2 el avión está en el aire.",
    detail: "El despegue tiene tres velocidades críticas: V1 (velocidad de decisión — por encima de esta, siempre despegar aunque falle un motor), Vr (velocidad de rotación — el piloto tira del volante/sidestick para levantar el morro), y V2 (velocidad de seguridad en el aire — garantiza el ascenso seguro con un motor inoperativo).\n\nEn un Airbus A320 con peso normal, V1 ≈ 140 kt, Vr ≈ 150 kt, V2 ≈ 155 kt. Todo esto ocurre en 35-40 segundos y unos 2.000 m de pista. En el instante de rotación (Vr), el piloto aplica ~3° de cabeceo por segundo hasta alcanzar 15° de nariz arriba. Los motores están al 100% de N1 desde que se da el «TOGA» (Takeoff / Go-Around).",
  },
  {
    n: "03",
    phase: "Ascenso (Climb)",
    wiki: "Climb (aeronautics)",
    summary: "El avión sube hacia FL350-FL410 (10.600-12.500 m). Los flaps se retraen progresivamente.",
    detail: "El ascenso (climb) tiene varias fases. Primero: ascenso inicial con flaps hasta 3.000 ft (900 m). Segundo: flaps retraídos, aceleración a velocidad de ascenso económica (ECON CLB). Tercero: crucero hasta FL100 (3.000 m) donde se apaga la señal de cinturón. Cuarto: ascenso al nivel de crucero en escalones si el tráfico lo requiere.\n\nLa velocidad de ascenso varía: cerca del suelo ~250 kt (restringido por regulación bajo 10.000 ft en muchos países), luego se acelera a Mach 0.78 aprox. hasta el nivel de crucero. La tasa de ascenso inicial puede ser 2.500 ft/min, reduciendo a 500 ft/min cerca del techo de servicio. Los motores trabajan a régimen CLIMB (aprox. 90% N1) durante todo este período.",
  },
  {
    n: "04",
    phase: "Crucero (Cruise)",
    wiki: "Cruise (aeronautics)",
    summary: "La fase más larga. Motor a régimen de crucero (~40% de potencia). El FMS gestiona ruta y combustible.",
    detail: "El crucero es el alma de la aviación comercial. A FL350-FL390 (10.600-11.900 m), la atmósfera es más delgada, hay menos resistencia, y los motores trabajan con mayor eficiencia. La velocidad de crucero económica (Econ Mach) es determinada por el FMS (Flight Management System) considerando el viento, el Cost Index del operador, y el combustible disponible.\n\nTípicamente: Mach 0.78-0.85 (850-920 km/h TAS) a esas altitudes. El FMS calcula automáticamente el Top of Descent (TOD) — el punto exacto donde iniciar el descenso para llegar al destino. El combustible es el recurso más crítico: un A380 quema ~12.000 kg/h en crucero. En un vuelo de 14 horas (Sydney-Dallas), puede cargar hasta 250.000 kg de fuel.",
  },
  {
    n: "05",
    phase: "Descenso",
    wiki: "Instrument approach",
    summary: "Inicia unos 200 km antes del destino (Top of Descent). Flaps gradualmente. Velocidad reducida.",
    detail: "El descenso comienza en el «Top of Descent» (TOD), típicamente a 120-150 millas náuticas (200-280 km) del aeropuerto de destino a FL350. El perfil ideal es «idle descent» — motores al mínimo, el avión planea usando su energía potencial. Esto ahorra hasta 300-400 kg de combustible versus un descenso con potencia.\n\nEl ATC puede asignar restricciones de altitud y velocidad que el FMS debe cumplir: «cruce FIXXX a FL180 con 280 kt». Las aproximaciones modernas usan ILS (Instrument Landing System), GPS (RNAV), o RNP (Required Navigation Performance) que guían el avión al umbral de pista con precisión de metros. Por debajo de 10.000 ft la velocidad se limita a 250 kt.",
  },
  {
    n: "06",
    phase: "Aterrizaje (Landing)",
    wiki: "Landing (aeronautics)",
    summary: "Touchdown a ~240-260 km/h. Inversores de empuje, spoilers y frenos de carbono detienen el avión.",
    detail: "El aterrizaje comienza con el intercept del ILS o procedimiento de aproximación a ~10-12 millas náuticas del umbral. La velocidad de aproximación final (VAPP) es típicamente VREF + 5-10 kt, donde VREF es la velocidad de referencia con flaps llenos. Para un A320 con peso medio, VAPP ≈ 138-145 kt (255-270 km/h).\n\nEn el touchdown, el piloto «flares» — levanta suavemente el morro para reducir la tasa de descenso a <200 ft/min antes del contacto. Inmediatamente: spoilers desplegados (reducen sustentación forzando el peso sobre las ruedas), inversores de empuje activados (frenan aerodinámicamente), y frenos de disco de carbono que pueden generar temperaturas de 1.000°C. La distancia de frenado: 1.500-2.000 m según velocidad y peso.",
  },
];

export default async function VueloPage() {
  const [heroImage, forceImages, partImages, aeroImages, phaseImages] = await Promise.all([
    getWikiImage("Fixed-wing aircraft"),
    Promise.all(forces.map((f) => getWikiImage(f.wikiSearch))),
    Promise.all(parts.map((p) => getWikiImage(p.wikiSearch))),
    Promise.all(aero.map((a) => getWikiImage(a.wiki))),
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
          <BackButton />
          <div className="moduleBadge">MÓDULO 01 · ESCUELA DE VUELO</div>
          <h1>¿Cómo vuela un avión?</h1>
          <p>Las 4 fuerzas que hacen posible el vuelo, las partes del avión y las 6 fases de cada viaje — tocá cada tarjeta para aprender más.</p>
        </div>
      </section>

      {/* ── DATOS DESTACADOS ────────────────────────────────────── */}
      <section className="container" style={{ paddingTop: 48, paddingBottom: 0 }}>
        <div className="factRow">
          <div className="factCard"><span className="factNum">4</span><span className="factLabel">Fuerzas del vuelo</span></div>
          <div className="factCard"><span className="factNum">12.500</span><span className="factUnit">m</span><span className="factLabel">Altitud crucero típica</span></div>
          <div className="factCard"><span className="factNum">903</span><span className="factUnit">km/h</span><span className="factLabel">Velocidad crucero A380</span></div>
          <div className="factCard"><span className="factNum">~15°</span><span className="factLabel">Ángulo de stall típico</span></div>
          <div className="factCard"><span className="factNum">6</span><span className="factLabel">Fases de un vuelo</span></div>
        </div>
      </section>

      {/* ── LAS 4 FUERZAS ───────────────────────────────────────── */}
      <section className="container" style={{ paddingTop: 56, paddingBottom: 56 }}>
        <p className="gold">FÍSICA DEL VUELO</p>
        <h2 style={{ fontSize: "clamp(26px, 5vw, 44px)", margin: "8px 0 8px", letterSpacing: -1 }}>Las 4 fuerzas del vuelo</h2>
        <p style={{ color: "var(--muted2)", marginBottom: 36, maxWidth: 560 }}>
          Todo avión en vuelo está sometido exactamente a estas 4 fuerzas. El secreto es mantenerlas en equilibrio. Tocá cada tarjeta para entenderlas en profundidad.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: 20 }}>
          {forces.map((f, i) => (
            <ExpandableCard
              key={f.name}
              title={f.name}
              badge={`${f.badge} · ${f.eng}`}
              image={forceImages[i]}
              summary={f.summary}
              detail={f.detail}
              wiki={f.wiki}
              accentColor={f.color}
            />
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

      {/* ── AERODINÁMICA ────────────────────────────────────────── */}
      <section className="container" style={{ paddingBottom: 56 }}>
        <p className="gold">AERODINÁMICA</p>
        <h2 style={{ fontSize: "clamp(26px, 5vw, 44px)", margin: "8px 0 8px", letterSpacing: -1 }}>¿Por qué las alas generan sustentación?</h2>
        <p style={{ color: "var(--muted2)", marginBottom: 32, maxWidth: 560 }}>Dos explicaciones que se complementan. Tocá cada concepto para profundizar.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 18 }}>
          {aero.map((a, i) => (
            <ExpandableCard
              key={a.name}
              title={a.name}
              image={aeroImages[i]}
              summary={a.summary}
              detail={a.detail}
              wiki={a.wiki}
            />
          ))}
        </div>
      </section>

      {/* ── PARTES DEL AVIÓN ────────────────────────────────────── */}
      <section className="container" style={{ paddingBottom: 56 }}>
        <p className="gold">ANATOMÍA</p>
        <h2 style={{ fontSize: "clamp(26px, 5vw, 44px)", margin: "8px 0 8px", letterSpacing: -1 }}>Partes del avión</h2>
        <p style={{ color: "var(--muted2)", marginBottom: 36, maxWidth: 560 }}>
          Cada parte tiene una función específica y ninguna está de adorno. Tocá para conocer el detalle técnico de cada componente.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: 18 }}>
          {parts.map((p, i) => (
            <ExpandableCard
              key={p.name}
              title={p.name}
              badge={p.badge}
              image={partImages[i]}
              summary={p.summary}
              detail={p.detail}
              wiki={p.wiki}
            />
          ))}
        </div>
      </section>

      {/* ── FASES DEL VUELO ─────────────────────────────────────── */}
      <section className="container" style={{ paddingBottom: 56 }}>
        <p className="gold">DE PUERTA A PUERTA</p>
        <h2 style={{ fontSize: "clamp(26px, 5vw, 44px)", margin: "8px 0 8px", letterSpacing: -1 }}>Las 6 fases de un vuelo</h2>
        <p style={{ color: "var(--muted2)", marginBottom: 36, maxWidth: 560 }}>
          Desde que el avión sale de la puerta hasta que llega al destino. Tocá cada fase para ver los detalles y velocidades reales.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: 16 }}>
          {phases.map((f, i) => (
            <ExpandableCard
              key={f.n}
              title={f.phase}
              badge={`FASE ${f.n}`}
              image={phaseImages[i]}
              summary={f.summary}
              detail={f.detail}
              wiki={f.wiki}
            />
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
