export default function RecordsPage() {
  return (
    <main className="page">
      <section className="container hero compactHero">
        <a className="back" href="/">← Volver</a>
        <p className="gold">WIKIAIR · RÉCORDS</p>
        <h1>Los extremos de la aviación</h1>
        <p>
          Los más rápidos, los más grandes, los más producidos y los más históricos. Datos reales, récords absolutos y curiosidades que te van a volar la cabeza.
        </p>
      </section>

      {/* LOS MÁS RÁPIDOS */}
      <section className="container" style={{ paddingBottom: 48 }}>
        <p className="gold">🚀 LOS MÁS RÁPIDOS</p>
        <h2 style={{ fontSize: "clamp(28px, 5vw, 48px)", margin: "8px 0 24px", letterSpacing: -1 }}>Velocidad máxima</h2>
        <div className="statsGrid">
          <div className="recordCard">
            <span className="recordBadge">🥇 RÉCORD ABSOLUTO</span>
            <h3>North American X-15</h3>
            <p style={{ color: "#d4af37", fontSize: 28, fontWeight: 800, margin: "8px 0" }}>Mach 6.72</p>
            <p style={{ color: "#bdbdbd", fontSize: 14 }}>7.274 km/h · 3 de octubre de 1967<br />William Knight. El más rápido con tripulación de TODA LA HISTORIA.</p>
          </div>
          <div className="recordCard">
            <span className="recordBadge">🥈 AVIÓN DE RECONOCIMIENTO</span>
            <h3>SR-71 Blackbird</h3>
            <p style={{ color: "#d4af37", fontSize: 28, fontWeight: 800, margin: "8px 0" }}>Mach 3.32</p>
            <p style={{ color: "#bdbdbd", fontSize: 14 }}>3.540 km/h · El más rápido operativo de la historia. Nunca fue derribado: simplemente aceleraba y escapaba.</p>
          </div>
          <div className="recordCard">
            <span className="recordBadge">🥉 CAZA DE COMBATE</span>
            <h3>MiG-25 Foxbat</h3>
            <p style={{ color: "#d4af37", fontSize: 28, fontWeight: 800, margin: "8px 0" }}>Mach 3.2</p>
            <p style={{ color: "#bdbdbd", fontSize: 14 }}>3.400 km/h · El caza más rápido jamás construido. Sus motores se destruían después de alcanzar la velocidad máxima.</p>
          </div>
          <div className="recordCard">
            <span className="recordBadge">✈️ COMERCIAL SUPERSÓNICO</span>
            <h3>Concorde</h3>
            <p style={{ color: "#d4af37", fontSize: 28, fontWeight: 800, margin: "8px 0" }}>Mach 2.04</p>
            <p style={{ color: "#bdbdbd", fontSize: 14 }}>2.179 km/h · Cruzaba el Atlántico en 3 horas 30 minutos. El fuselaje se extendía 25cm por dilatación térmica.</p>
          </div>
          <div className="recordCard">
            <span className="recordBadge">⚡ CAZA MODERNO</span>
            <h3>F-22 Raptor</h3>
            <p style={{ color: "#d4af37", fontSize: 28, fontWeight: 800, margin: "8px 0" }}>Mach 2.25+</p>
            <p style={{ color: "#bdbdbd", fontSize: 14 }}>Puede volar a Mach 1.8 sin postcombustor (supercruise), algo que la mayoría de los cazas no pueden hacer.</p>
          </div>
          <div className="recordCard">
            <span className="recordBadge">🏢 JET EJECUTIVO</span>
            <h3>Cessna Citation X+</h3>
            <p style={{ color: "#d4af37", fontSize: 28, fontWeight: 800, margin: "8px 0" }}>Mach 0.935</p>
            <p style={{ color: "#bdbdbd", fontSize: 14 }}>El jet privado más rápido del mundo certificado. Más veloz que algunos cazas de la época de la Guerra Fría.</p>
          </div>
        </div>
      </section>

      {/* LOS MÁS GRANDES */}
      <section className="container" style={{ paddingBottom: 48 }}>
        <p className="gold">📏 LOS MÁS GRANDES</p>
        <h2 style={{ fontSize: "clamp(28px, 5vw, 48px)", margin: "8px 0 24px", letterSpacing: -1 }}>Dimensiones extremas</h2>
        <div className="statsGrid">
          <div className="recordCard">
            <span className="recordBadge">🥇 EL MÁS GRANDE DE TODOS</span>
            <h3>Antonov An-225 Mriya</h3>
            <p style={{ color: "#d4af37", fontSize: 22, fontWeight: 800, margin: "8px 0" }}>84m largo · 88m envergadura</p>
            <p style={{ color: "#bdbdbd", fontSize: 14 }}>640 toneladas de peso bruto. Carga útil: 250t. Destruido en Gostomel (Ucrania) en febrero de 2022. Solo existió uno.</p>
          </div>
          <div className="recordCard">
            <span className="recordBadge">✈️ MAYOR AVIÓN DE PASAJEROS</span>
            <h3>Airbus A380</h3>
            <p style={{ color: "#d4af37", fontSize: 22, fontWeight: 800, margin: "8px 0" }}>73m largo · 80m envergadura</p>
            <p style={{ color: "#bdbdbd", fontSize: 14 }}>Doble cubierta completa. Hasta 853 pasajeros. Emirates lo usa con suites privadas, bar y ducha en primera clase.</p>
          </div>
          <div className="recordCard">
            <span className="recordBadge">🐳 LA BALLENA</span>
            <h3>Airbus BelugaXL</h3>
            <p style={{ color: "#d4af37", fontSize: 22, fontWeight: 800, margin: "8px 0" }}>8.8m de diámetro interior</p>
            <p style={{ color: "#bdbdbd", fontSize: 14 }}>La bodega más ancha de cualquier avión. Diseñado para transportar alas y fuselajes del A350 entre fábricas de Airbus.</p>
          </div>
          <div className="recordCard">
            <span className="recordBadge">🦥 EL CÓNDOR AMERICANO</span>
            <h3>Lockheed C-5 Galaxy</h3>
            <p style={{ color: "#d4af37", fontSize: 22, fontWeight: 800, margin: "8px 0" }}>75m largo · 68m envergadura</p>
            <p style={{ color: "#bdbdbd", fontSize: 14 }}>Puede llevar 2 tanques M1 Abrams o 6 helicópteros Black Hawk. Tiene rampas tanto delantera como trasera.</p>
          </div>
          <div className="recordCard">
            <span className="recordBadge">🚁 MAYOR HELICÓPTERO</span>
            <h3>Mil Mi-26 Halo</h3>
            <p style={{ color: "#d4af37", fontSize: 22, fontWeight: 800, margin: "8px 0" }}>32m de diámetro de rotor</p>
            <p style={{ color: "#bdbdbd", fontSize: 14 }}>El helicóptero más pesado en producción. Puede transportar 20 toneladas o incluso otro helicóptero colgado debajo.</p>
          </div>
          <div className="recordCard">
            <span className="recordBadge">🎈 MAYOR DIRIGIBLE</span>
            <h3>Hindenburg LZ 129</h3>
            <p style={{ color: "#d4af37", fontSize: 22, fontWeight: 800, margin: "8px 0" }}>245m de longitud</p>
            <p style={{ color: "#bdbdbd", fontSize: 14 }}>Más largo que tres Boeing 747 juntos. Tenía bar, comedor y camarotes. Destruido en New Jersey en 1937.</p>
          </div>
        </div>
      </section>

      {/* LOS MÁS PRODUCIDOS */}
      <section className="container" style={{ paddingBottom: 48 }}>
        <p className="gold">🏭 LOS MÁS PRODUCIDOS</p>
        <h2 style={{ fontSize: "clamp(28px, 5vw, 48px)", margin: "8px 0 24px", letterSpacing: -1 }}>De las fábricas al cielo</h2>
        <div className="statsGrid">
          <div className="recordCard">
            <span className="recordBadge">🥇 EL MÁS CONSTRUIDO</span>
            <h3>Cessna 172 Skyhawk</h3>
            <p style={{ color: "#d4af37", fontSize: 28, fontWeight: 800, margin: "8px 0" }}>44.000+ unidades</p>
            <p style={{ color: "#bdbdbd", fontSize: 14 }}>Desde 1956 hasta hoy. El avión más producido de la historia. La escuela de vuelo del mundo entero.</p>
          </div>
          <div className="recordCard">
            <span className="recordBadge">⚔️ CAZA MÁS PRODUCIDO</span>
            <h3>Messerschmitt Bf 109</h3>
            <p style={{ color: "#d4af37", fontSize: 28, fontWeight: 800, margin: "8px 0" }}>33.984 unidades</p>
            <p style={{ color: "#bdbdbd", fontSize: 14 }}>El caza más fabricado de la historia. Estuvo en todos los frentes de la Segunda Guerra Mundial.</p>
          </div>
          <div className="recordCard">
            <span className="recordBadge">✈️ NARROW-BODY MODERNO</span>
            <h3>Airbus A320 family</h3>
            <p style={{ color: "#d4af37", fontSize: 28, fontWeight: 800, margin: "8px 0" }}>10.000+ unidades</p>
            <p style={{ color: "#bdbdbd", fontSize: 14 }}>La familia más vendida de la aviación comercial moderna, superando al Boeing 737 en pedidos acumulados.</p>
          </div>
          <div className="recordCard">
            <span className="recordBadge">🚁 HELICÓPTERO ICÓNICO</span>
            <h3>Bell UH-1 Huey</h3>
            <p style={{ color: "#d4af37", fontSize: 28, fontWeight: 800, margin: "8px 0" }}>16.000+ unidades</p>
            <p style={{ color: "#bdbdbd", fontSize: 14 }}>El símbolo del Vietnam. El sonido del Huey es el más reconocible en la historia de los helicópteros.</p>
          </div>
          <div className="recordCard">
            <span className="recordBadge">🛩️ HISTÓRICO CLÁSICO</span>
            <h3>Douglas DC-3</h3>
            <p style={{ color: "#d4af37", fontSize: 28, fontWeight: 800, margin: "8px 0" }}>16.079 unidades</p>
            <p style={{ color: "#bdbdbd", fontSize: 14 }}>El avión que hizo rentable la aviación comercial. ¡Todavía hay ~150 volando hoy, 90 años después!</p>
          </div>
          <div className="recordCard">
            <span className="recordBadge">🌟 CAZA ALIADO WWII</span>
            <h3>Supermarine Spitfire</h3>
            <p style={{ color: "#d4af37", fontSize: 28, fontWeight: 800, margin: "8px 0" }}>20.351 unidades</p>
            <p style={{ color: "#bdbdbd", fontSize: 14 }}>Héroe de la Batalla de Inglaterra. La silueta de ala elíptica es una de las más bellas de la historia.</p>
          </div>
        </div>
      </section>

      {/* RÉCORDS DE ALTITUD */}
      <section className="container" style={{ paddingBottom: 48 }}>
        <p className="gold">🌌 RÉCORDS DE ALTITUD</p>
        <h2 style={{ fontSize: "clamp(28px, 5vw, 48px)", margin: "8px 0 24px", letterSpacing: -1 }}>Más cerca del espacio</h2>
        <div className="statsGrid">
          <div className="recordCard">
            <span className="recordBadge">🚀 RÉCORD ABSOLUTO AVIÓN</span>
            <h3>North American X-15</h3>
            <p style={{ color: "#d4af37", fontSize: 28, fontWeight: 800, margin: "8px 0" }}>112 km</p>
            <p style={{ color: "#bdbdbd", fontSize: 14 }}>22 de agosto de 1963. Joe Walker cruzó la línea Kármán (100km). Técnicamente llegó al espacio exterior.</p>
          </div>
          <div className="recordCard">
            <span className="recordBadge">✈️ AVIÓN CON TRIPULACIÓN CONVENCIONAL</span>
            <h3>SR-71 Blackbird</h3>
            <p style={{ color: "#d4af37", fontSize: 28, fontWeight: 800, margin: "8px 0" }}>26.000 m</p>
            <p style={{ color: "#bdbdbd", fontSize: 14 }}>La altitud de cruzero operacional del SR-71. El cielo se vuelve negro y se pueden ver estrellas de día.</p>
          </div>
          <div className="recordCard">
            <span className="recordBadge">🕵️ RECONOCIMIENTO MODERNO</span>
            <h3>Lockheed U-2</h3>
            <p style={{ color: "#d4af37", fontSize: 28, fontWeight: 800, margin: "8px 0" }}>21.000+ m</p>
            <p style={{ color: "#bdbdbd", fontSize: 14 }}>Todavía en servicio activo. El piloto necesita 3 horas de pre-oxigenación antes del vuelo y usa un traje de presión completo.</p>
          </div>
          <div className="recordCard">
            <span className="recordBadge">🦥 CAZA SOVIÉTICO</span>
            <h3>MiG-25 Foxbat</h3>
            <p style={{ color: "#d4af37", fontSize: 28, fontWeight: 800, margin: "8px 0" }}>37.650 m</p>
            <p style={{ color: "#bdbdbd", fontSize: 14 }}>Récord de altitud de un avión de combate. Capaz de interceptar objetivos donde otros cazas no pueden llegar.</p>
          </div>
          <div className="recordCard">
            <span className="recordBadge">☁️ AVIÓN COMERCIAL</span>
            <h3>Concorde</h3>
            <p style={{ color: "#d4af37", fontSize: 28, fontWeight: 800, margin: "8px 0" }}>18.300 m</p>
            <p style={{ color: "#bdbdbd", fontSize: 14 }}>El avión comercial que más alto voló. Desde esa altitud se podía ver la curvatura de la Tierra.</p>
          </div>
          <div className="recordCard">
            <span className="recordBadge">☀️ AVIÓN SOLAR</span>
            <h3>Solar Impulse 2</h3>
            <p style={{ color: "#d4af37", fontSize: 28, fontWeight: 800, margin: "8px 0" }}>Vuelta al mundo</p>
            <p style={{ color: "#bdbdbd", fontSize: 14 }}>Sin una gota de combustible. 17 etapas, 558 horas de vuelo, 2015-2016. El futuro de la aviación sostenible.</p>
          </div>
        </div>
      </section>

      {/* LOS MÁS HISTÓRICOS */}
      <section className="container" style={{ paddingBottom: 48 }}>
        <p className="gold">📜 LOS MÁS HISTÓRICOS</p>
        <h2 style={{ fontSize: "clamp(28px, 5vw, 48px)", margin: "8px 0 24px", letterSpacing: -1 }}>Que cambiaron el mundo</h2>
        <div className="statsGrid">
          <div className="recordCard">
            <span className="recordBadge">🌍 EL INICIO DE TODO</span>
            <h3>Wright Flyer</h3>
            <p style={{ color: "#d4af37", fontSize: 22, fontWeight: 800, margin: "8px 0" }}>17 dic 1903 · 12 segundos</p>
            <p style={{ color: "#bdbdbd", fontSize: 14 }}>El primer vuelo motorizado controlado de la historia humana. 37 metros recorridos a 48 km/h a 0.5 metros del suelo.</p>
          </div>
          <div className="recordCard">
            <span className="recordBadge">💨 PRIMER JET COMERCIAL</span>
            <h3>De Havilland Comet</h3>
            <p style={{ color: "#d4af37", fontSize: 22, fontWeight: 800, margin: "8px 0" }}>1952 · La era jet empieza</p>
            <p style={{ color: "#bdbdbd", fontSize: 14 }}>Sus accidentes por fatiga del metal enseñaron cómo presurizar aviones de forma segura. Sus errores construyeron la aviación moderna.</p>
          </div>
          <div className="recordCard">
            <span className="recordBadge">🔥 PRIMER JET DE COMBATE</span>
            <h3>Messerschmitt Me 262</h3>
            <p style={{ color: "#d4af37", fontSize: 22, fontWeight: 800, margin: "8px 0" }}>1944 · 150 km/h más rápido</p>
            <p style={{ color: "#bdbdbd", fontSize: 14 }}>Era tan superior que los aliados no podían derribarlo en vuelo recto. Solo podían atacarlo en despegue o aterrizaje.</p>
          </div>
          <div className="recordCard">
            <span className="recordBadge">👑 EL JUMBO</span>
            <h3>Boeing 747</h3>
            <p style={{ color: "#d4af37", fontSize: 22, fontWeight: 800, margin: "8px 0" }}>1969 · Democratizó el vuelo</p>
            <p style={{ color: "#bdbdbd", fontSize: 14 }}>Antes del 747, viajar en avión era un lujo. El Jumbo lo hizo accesible. Más de 1.574 construidos en 50 años de producción.</p>
          </div>
          <div className="recordCard">
            <span className="recordBadge">🛸 PRIMER SONIC BOOM</span>
            <h3>Bell X-1</h3>
            <p style={{ color: "#d4af37", fontSize: 22, fontWeight: 800, margin: "8px 0" }}>14 oct 1947 · Mach 1.06</p>
            <p style={{ color: "#bdbdbd", fontSize: 14 }}>Chuck Yeager rompió la barrera del sonido en el día en que el propio Yeager tenía dos costillas rotas de un accidente a caballo.</p>
          </div>
          <div className="recordCard">
            <span className="recordBadge">🇦🇷 ORGULLO ARGENTINO</span>
            <h3>FMA I.Ae. 33 Pulqui II</h3>
            <p style={{ color: "#d4af37", fontSize: 22, fontWeight: 800, margin: "8px 0" }}>1950 · 4° jet del mundo</p>
            <p style={{ color: "#bdbdbd", fontSize: 14 }}>Diseñado por Kurt Tank (creador del FW-190). Argentina fue el 4° país del mundo en desarrollar un caza a reacción propio.</p>
          </div>
        </div>
      </section>

      {/* FUN FACTS */}
      <section className="container" style={{ paddingBottom: 60 }}>
        <p className="gold">🤯 ¿SABÍAS QUE?</p>
        <h2 style={{ fontSize: "clamp(28px, 5vw, 48px)", margin: "8px 0 24px", letterSpacing: -1 }}>Datos que te van a volar la cabeza</h2>
        <div className="statsGrid">
          <div className="recordCard">
            <span style={{ fontSize: 32 }}>✈️</span>
            <h3>El vuelo más largo del mundo</h3>
            <p style={{ color: "#bdbdbd", fontSize: 14, marginTop: 8 }}>Singapore Airlines vuela Singapore–Nueva York en el A350-900ULR. Son <strong style={{ color: "#d4af37" }}>18 horas y 50 minutos</strong> y 15.349 km sin escala.</p>
          </div>
          <div className="recordCard">
            <span style={{ fontSize: 32 }}>⚡</span>
            <h3>Relámpago que no para</h3>
            <p style={{ color: "#bdbdbd", fontSize: 14, marginTop: 8 }}>Un Boeing 737 es alcanzado por un rayo en promedio <strong style={{ color: "#d4af37" }}>una vez por año</strong>. El fuselaje metálico conduce la electricidad y protege a los pasajeros.</p>
          </div>
          <div className="recordCard">
            <span style={{ fontSize: 32 }}>🌍</span>
            <h3>Tráfico aéreo mundial</h3>
            <p style={{ color: "#bdbdbd", fontSize: 14, marginTop: 8 }}>En un día normal hay <strong style={{ color: "#d4af37" }}>más de 100.000 vuelos</strong> en el mundo. En el momento pico, hay 15.000+ aviones simultáneamente en el aire.</p>
          </div>
          <div className="recordCard">
            <span style={{ fontSize: 32 }}>🔧</span>
            <h3>Millones de partes</h3>
            <p style={{ color: "#bdbdbd", fontSize: 14, marginTop: 8 }}>Un Boeing 747 tiene <strong style={{ color: "#d4af37" }}>6 millones de partes individuales</strong>. Si se pusieran en línea una tras otra, ocuparían 100 km.</p>
          </div>
          <div className="recordCard">
            <span style={{ fontSize: 32 }}>🎯</span>
            <h3>La estadística más tranquilizadora</h3>
            <p style={{ color: "#bdbdbd", fontSize: 14, marginTop: 8 }}>Volar es <strong style={{ color: "#d4af37" }}>95 veces más seguro</strong> que manejar un auto. La probabilidad de morir en un avión comercial es de 1 en 11 millones.</p>
          </div>
          <div className="recordCard">
            <span style={{ fontSize: 32 }}>🏔️</span>
            <h3>El Everest en helicóptero</h3>
            <p style={{ color: "#bdbdbd", fontSize: 14, marginTop: 8 }}>En 2005, el piloto Didier Delsalle aterrizó un Airbus H125 <strong style={{ color: "#d4af37" }}>en la cima del Everest</strong> a 8.848m. Permaneçió 3 minutos 50 segundos.</p>
          </div>
        </div>
      </section>
    </main>
  );
}