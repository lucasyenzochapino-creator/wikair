import Link from "next/link";
import RecordImg from "./RecordImg";

type RecordEntry = {
  badge: string;
  name: string;
  wiki: string;
  stat: string;
  desc: string;
};

const speedRecords: RecordEntry[] = [
  {
    badge: "RÉCORD ABSOLUTO",
    name: "North American X-15",
    wiki: "North American X-15",
    stat: "Mach 6.72",
    desc: "7.274 km/h · 3 de octubre de 1967, William Knight. El más rápido con tripulación de TODA LA HISTORIA.",
  },
  {
    badge: "AVIÓN DE RECONOCIMIENTO",
    name: "SR-71 Blackbird",
    wiki: "Lockheed SR-71 Blackbird",
    stat: "Mach 3.32",
    desc: "3.540 km/h · El más rápido operativo de la historia. Nunca fue derribado: simplemente aceleraba y escapaba.",
  },
  {
    badge: "CAZA DE COMBATE",
    name: "MiG-25 Foxbat",
    wiki: "Mikoyan-Gurevich MiG-25",
    stat: "Mach 3.2",
    desc: "3.400 km/h · El caza más rápido jamás construido. Sus motores se destruían después de alcanzar la velocidad máxima.",
  },
  {
    badge: "COMERCIAL SUPERSÓNICO",
    name: "Concorde",
    wiki: "Concorde",
    stat: "Mach 2.04",
    desc: "2.179 km/h · Cruzaba el Atlántico en 3 horas 30 minutos. El fuselaje se extendía 25 cm por dilatación térmica.",
  },
  {
    badge: "CAZA DE 5.ª GENERACIÓN",
    name: "F-22 Raptor",
    wiki: "Lockheed Martin F-22 Raptor",
    stat: "Mach 2.25+",
    desc: "Puede volar a Mach 1.8 sin postcombustor (supercruise), algo que la mayoría de los cazas no pueden hacer.",
  },
  {
    badge: "JET EJECUTIVO",
    name: "Cessna Citation X+",
    wiki: "Cessna Citation X",
    stat: "Mach 0.935",
    desc: "El jet privado más rápido del mundo certificado. Más veloz que algunos cazas de la época de la Guerra Fría.",
  },
];

const sizeRecords: RecordEntry[] = [
  {
    badge: "EL MÁS GRANDE DE TODOS",
    name: "Antonov An-225 Mriya",
    wiki: "Antonov An-225",
    stat: "84 m largo · 88 m envergadura",
    desc: "640 toneladas de peso bruto. Carga útil: 250 t. Destruido en Gostomel (Ucrania) en febrero de 2022. Solo existió uno.",
  },
  {
    badge: "MAYOR AVIÓN DE PASAJEROS",
    name: "Airbus A380",
    wiki: "Airbus A380",
    stat: "73 m largo · 80 m envergadura",
    desc: "Doble cubierta completa. Hasta 853 pasajeros. Emirates lo usa con suites privadas, bar y ducha en primera clase.",
  },
  {
    badge: "LA BODEGA MÁS ANCHA",
    name: "Airbus BelugaXL",
    wiki: "Airbus BelugaXL",
    stat: "8.8 m de diámetro interior",
    desc: "Diseñado para transportar alas y fuselajes del A350 entre fábricas de Airbus en Europa.",
  },
  {
    badge: "TRANSPORTE MILITAR",
    name: "Lockheed C-5 Galaxy",
    wiki: "Lockheed C-5 Galaxy",
    stat: "75 m largo · 68 m envergadura",
    desc: "Puede llevar 2 tanques M1 Abrams o 6 helicópteros Black Hawk. Tiene rampas tanto delantera como trasera.",
  },
  {
    badge: "MAYOR HELICÓPTERO",
    name: "Mil Mi-26 Halo",
    wiki: "Mil Mi-26",
    stat: "32 m de diámetro de rotor",
    desc: "El helicóptero más pesado en producción. Puede transportar 20 toneladas o incluso otro helicóptero colgado debajo.",
  },
  {
    badge: "MAYOR DIRIGIBLE",
    name: "Hindenburg LZ 129",
    wiki: "Hindenburg disaster",
    stat: "245 m de longitud",
    desc: "Más largo que tres Boeing 747 juntos. Tenía bar, comedor y camarotes. Destruido en New Jersey en 1937.",
  },
];

const productionRecords: RecordEntry[] = [
  {
    badge: "EL MÁS CONSTRUIDO",
    name: "Cessna 172 Skyhawk",
    wiki: "Cessna 172",
    stat: "44.000+ unidades",
    desc: "Desde 1956 hasta hoy. El avión más producido de la historia. La escuela de vuelo del mundo entero.",
  },
  {
    badge: "CAZA MÁS PRODUCIDO",
    name: "Messerschmitt Bf 109",
    wiki: "Messerschmitt Bf 109",
    stat: "33.984 unidades",
    desc: "El caza más fabricado de la historia. Estuvo en todos los frentes de la Segunda Guerra Mundial.",
  },
  {
    badge: "NARROW-BODY MODERNO",
    name: "Airbus A320 family",
    wiki: "Airbus A320 family",
    stat: "10.000+ unidades",
    desc: "La familia más vendida de la aviación comercial moderna, superando al Boeing 737 en pedidos acumulados.",
  },
  {
    badge: "HELICÓPTERO ICÓNICO",
    name: "Bell UH-1 Iroquois",
    wiki: "Bell UH-1 Iroquois",
    stat: "16.000+ unidades",
    desc: "El símbolo del Vietnam. El sonido del Huey es el más reconocible en la historia de los helicópteros.",
  },
  {
    badge: "CLÁSICO HISTÓRICO",
    name: "Douglas DC-3",
    wiki: "Douglas DC-3",
    stat: "16.079 unidades",
    desc: "El avión que hizo rentable la aviación comercial. Todavía hay unos 150 volando hoy, 90 años después.",
  },
  {
    badge: "CAZA ALIADO WWII",
    name: "Supermarine Spitfire",
    wiki: "Supermarine Spitfire",
    stat: "20.351 unidades",
    desc: "Héroe de la Batalla de Inglaterra. La silueta de ala elíptica es una de las más bellas de la historia.",
  },
];

const altitudeRecords: RecordEntry[] = [
  {
    badge: "RÉCORD ABSOLUTO AVIÓN",
    name: "North American X-15",
    wiki: "North American X-15",
    stat: "112 km",
    desc: "22 de agosto de 1963. Joe Walker cruzó la línea Kármán (100 km). Técnicamente llegó al espacio exterior.",
  },
  {
    badge: "CONVENCIONAL CON TRIPULACIÓN",
    name: "SR-71 Blackbird",
    wiki: "Lockheed SR-71 Blackbird",
    stat: "26.000 m",
    desc: "La altitud de crucero operacional del SR-71. El cielo se vuelve negro y se pueden ver estrellas de día.",
  },
  {
    badge: "RECONOCIMIENTO MODERNO",
    name: "Lockheed U-2",
    wiki: "Lockheed U-2",
    stat: "21.000+ m",
    desc: "Todavía en servicio activo. El piloto necesita 3 horas de pre-oxigenación y usa un traje de presión completo.",
  },
  {
    badge: "CAZA SOVIÉTICO",
    name: "MiG-25 Foxbat",
    wiki: "Mikoyan-Gurevich MiG-25",
    stat: "37.650 m",
    desc: "Récord de altitud de un avión de combate. Capaz de interceptar objetivos donde otros cazas no pueden llegar.",
  },
  {
    badge: "AVIÓN COMERCIAL",
    name: "Concorde",
    wiki: "Concorde",
    stat: "18.300 m",
    desc: "El avión comercial que más alto voló. Desde esa altitud se podía ver la curvatura de la Tierra.",
  },
  {
    badge: "AVIÓN SOLAR",
    name: "Solar Impulse 2",
    wiki: "Solar Impulse 2",
    stat: "Vuelta al mundo",
    desc: "Sin una gota de combustible. 17 etapas, 558 horas de vuelo, 2015-2016. El futuro de la aviación sostenible.",
  },
];

const historicRecords: RecordEntry[] = [
  {
    badge: "EL INICIO DE TODO",
    name: "Wright Flyer",
    wiki: "Wright Flyer",
    stat: "17 dic 1903 · 12 segundos",
    desc: "El primer vuelo motorizado controlado de la historia humana. 37 metros recorridos a 48 km/h a 0,5 metros del suelo.",
  },
  {
    badge: "PRIMER JET COMERCIAL",
    name: "De Havilland Comet",
    wiki: "De Havilland Comet",
    stat: "1952 · La era jet empieza",
    desc: "Sus accidentes por fatiga del metal enseñaron cómo presurizar aviones de forma segura. Sus errores construyeron la aviación moderna.",
  },
  {
    badge: "PRIMER JET DE COMBATE",
    name: "Messerschmitt Me 262",
    wiki: "Messerschmitt Me 262",
    stat: "1944 · 150 km/h más rápido",
    desc: "Era tan superior que los aliados no podían derribarlo en vuelo recto. Solo podían atacarlo en despegue o aterrizaje.",
  },
  {
    badge: "DEMOCRATIZÓ EL VUELO",
    name: "Boeing 747",
    wiki: "Boeing 747",
    stat: "1969 · El Jumbo",
    desc: "Antes del 747, viajar en avión era un lujo. El Jumbo lo hizo accesible. Más de 1.574 construidos en 50 años.",
  },
  {
    badge: "BARRERA DEL SONIDO",
    name: "Bell X-1",
    wiki: "Bell X-1",
    stat: "14 oct 1947 · Mach 1.06",
    desc: "Chuck Yeager rompió la barrera del sonido con dos costillas rotas de un accidente a caballo el día anterior.",
  },
  {
    badge: "ORGULLO ARGENTINO",
    name: "FMA I.Ae. 33 Pulqui II",
    wiki: "FMA I.Ae. 33 Pulqui II",
    stat: "1950 · 4.° jet del mundo",
    desc: "Diseñado por Kurt Tank (creador del FW-190). Argentina fue el 4.° país del mundo en desarrollar un caza a reacción propio.",
  },
];

function RecordCard({ entry }: { entry: RecordEntry }) {
  return (
    <div className="recordCard">
      <RecordImg wiki={entry.wiki} alt={entry.name} />
      <span className="recordBadge">{entry.badge}</span>
      <h3>{entry.name}</h3>
      <p style={{ color: "var(--gold)", fontSize: 22, fontWeight: 800, margin: "8px 0", fontFamily: "var(--mono)" }}>{entry.stat}</p>
      <p>{entry.desc}</p>
    </div>
  );
}

export default function RecordsPage() {
  const funFacts = [
    {
      wiki: "Airbus A350 XWB",
      title: "El vuelo más largo del mundo",
      desc: "Singapore Airlines vuela Singapore–Nueva York en el A350-900ULR. Son 18 horas y 50 minutos y 15.349 km sin escala.",
    },
    {
      wiki: "Boeing 737",
      title: "El rayo que no para",
      desc: "Un Boeing 737 es alcanzado por un rayo en promedio una vez por año. El fuselaje metálico conduce la electricidad y protege a los pasajeros.",
    },
    {
      wiki: "Air traffic control",
      title: "Tráfico aéreo mundial",
      desc: "En un día normal hay más de 100.000 vuelos en el mundo. En el momento pico, hay 15.000+ aviones simultáneamente en el aire.",
    },
    {
      wiki: "Boeing 747",
      title: "Millones de partes",
      desc: "Un Boeing 747 tiene 6 millones de partes individuales. Si se pusieran en línea una tras otra, ocuparían 100 km.",
    },
    {
      wiki: "Aviation safety",
      title: "La estadística más tranquilizadora",
      desc: "Volar es 95 veces más seguro que manejar un auto. La probabilidad de morir en un avión comercial es de 1 en 11 millones.",
    },
    {
      wiki: "Airbus H125",
      title: "El Everest en helicóptero",
      desc: "En 2005, el piloto Didier Delsalle aterrizó un Airbus H125 en la cima del Everest a 8.848 m. Permaneció 3 minutos 50 segundos.",
    },
  ];

  return (
    <main className="page">
      <section className="container hero compactHero">
        <Link className="back" href="/">← Volver</Link>
        <p className="gold">WIKIAIR · RÉCORDS</p>
        <h1>Los extremos de la aviación</h1>
        <p>
          Los más rápidos, los más grandes, los más producidos y los más históricos.
          Datos reales, récords absolutos y curiosidades verificadas.
        </p>
      </section>

      <section className="container" style={{ paddingBottom: 48 }}>
        <p className="gold">LOS MÁS RÁPIDOS</p>
        <h2 style={{ fontSize: "clamp(28px, 5vw, 48px)", margin: "8px 0 24px", letterSpacing: -1 }}>Velocidad máxima</h2>
        <div className="statsGrid">
          {speedRecords.map((e) => <RecordCard key={e.wiki} entry={e} />)}
        </div>
      </section>

      <section className="container" style={{ paddingBottom: 48 }}>
        <p className="gold">LOS MÁS GRANDES</p>
        <h2 style={{ fontSize: "clamp(28px, 5vw, 48px)", margin: "8px 0 24px", letterSpacing: -1 }}>Dimensiones extremas</h2>
        <div className="statsGrid">
          {sizeRecords.map((e) => <RecordCard key={e.wiki} entry={e} />)}
        </div>
      </section>

      <section className="container" style={{ paddingBottom: 48 }}>
        <p className="gold">LOS MÁS PRODUCIDOS</p>
        <h2 style={{ fontSize: "clamp(28px, 5vw, 48px)", margin: "8px 0 24px", letterSpacing: -1 }}>De las fábricas al cielo</h2>
        <div className="statsGrid">
          {productionRecords.map((e) => <RecordCard key={e.wiki} entry={e} />)}
        </div>
      </section>

      <section className="container" style={{ paddingBottom: 48 }}>
        <p className="gold">RÉCORDS DE ALTITUD</p>
        <h2 style={{ fontSize: "clamp(28px, 5vw, 48px)", margin: "8px 0 24px", letterSpacing: -1 }}>Más cerca del espacio</h2>
        <div className="statsGrid">
          {altitudeRecords.map((e) => <RecordCard key={e.wiki} entry={e} />)}
        </div>
      </section>

      <section className="container" style={{ paddingBottom: 48 }}>
        <p className="gold">LOS MÁS HISTÓRICOS</p>
        <h2 style={{ fontSize: "clamp(28px, 5vw, 48px)", margin: "8px 0 24px", letterSpacing: -1 }}>Que cambiaron el mundo</h2>
        <div className="statsGrid">
          {historicRecords.map((e) => <RecordCard key={e.wiki} entry={e} />)}
        </div>
      </section>

      <section className="container" style={{ paddingBottom: 60 }}>
        <p className="gold">SABÍAS QUE</p>
        <h2 style={{ fontSize: "clamp(28px, 5vw, 48px)", margin: "8px 0 24px", letterSpacing: -1 }}>Datos que te van a volar la cabeza</h2>
        <div className="statsGrid">
          {funFacts.map((f) => (
            <div className="recordCard" key={f.wiki}>
              <RecordImg wiki={f.wiki} alt={f.title} />
              <h3>{f.title}</h3>
              <p style={{ color: "var(--muted2)", fontSize: 14, marginTop: 8 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
