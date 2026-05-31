type Item = [string, string, string, string[]];

type ReadyItem = {
  period: string;
  title: string;
  text: string;
  images: string[];
};

const eras: Item[] = [
  ["Antes de 1903", "El sueño de volar", "Siglos de sueños se materializan en globos aerostáticos, planeadores y estudios aerodinámicos. Otto Lilienthal realizó más de 2.000 vuelos en planeador antes de morir en 1896. George Cayley definió los principios del vuelo con alas fijas en 1799. Octave Chanute y Samuel Langley también estuvieron cerca — pero el crédito es de los Wright.", ["Otto Lilienthal", "glider aviation history", "early aviation"]],
  ["1903", "Primer vuelo controlado", "El 17 de diciembre de 1903 en Kitty Hawk, Carolina del Norte, Orville Wright vuela 37 metros en 12 segundos. Ese mismo día hacen cuatro vuelos: el último, de 59 segundos y 260 metros. Wilbur y Orville eran fabricantes de bicicletas sin título universitario. Cambiaron el mundo para siempre.", ["Wright Flyer", "Wright brothers airplane", "first flight aviation"]],
  ["1909-1914", "Aviación práctica", "Louis Blériot cruza el Canal de la Mancha en 37 minutos (1909) y gana £1.000 del Daily Mail. Nacen las primeras escuelas de vuelo, el correo aéreo y las exhibiciones aéreas masivas. En 1914, los ejércitos empiezan a usar aviones para reconocimiento — al principio los pilotos enemigos se saludaban en el aire. Eso duró poco.", ["Blériot XI", "Louis Blériot aircraft", "early aircraft 1910"]],
  ["1914-1918", "Primera Guerra Mundial", "La guerra convierte al avión de curiosidad en arma estratégica en cuatro años. Nacen los 'ases' como el Barón Rojo (80 victorias), Bishop, Fonck y Mannock. Los bombardeos sobre ciudades cambian la guerra para siempre. Al terminar la guerra, la tecnología aeronáutica había avanzado más que en los once años desde Kitty Hawk.", ["Fokker Dr.I", "Sopwith Camel", "World War I aircraft"]],
  ["1919-1938", "Entreguerras", "Charles Lindbergh cruza el Atlántico en solitario en 33 horas y 30 minutos (1927), siendo recibido por 150.000 personas en París. El correo aéreo se convierte en negocio rentable. El Douglas DC-3 (1935) es el primer avión en hacer rentable el transporte de pasajeros solo con su operación, sin subsidios postales. La aviación comercial deja de ser un sueño.", ["Douglas DC-3", "airmail aircraft", "interwar aircraft"]],
  ["1939-1945", "Segunda Guerra Mundial", "La Segunda Guerra Mundial es la guerra más aérea de la historia. La Batalla de Inglaterra se gana con el Spitfire y el Hurricane. El P-51 Mustang con tanques de largo alcance llega a Berlín. El B-17 bombardea Europa por el día; el Lancaster, de noche. En 1944 aparece el Me 262 — el primer caza a reacción operativo. Los portaaviones en el Pacífico muestran el futuro de la guerra naval.", ["Supermarine Spitfire", "North American P-51 Mustang", "Boeing B-17 Flying Fortress"]],
  ["1945-1960", "Era del jet", "El motor a reacción transforma todo: velocidad, altitud, ruido y alcance. El Bell X-1 rompe la barrera del sonido en 1947. El MiG-15 sorprende a todos en Corea (1950). El de Havilland Comet inaugura la era jet comercial en 1952 — aunque sus trágicos accidentes enseñan al mundo sobre la fatiga del metal. El Boeing 707 y el DC-8 conectan los continentes y hacen el vuelo internacional accesible.", ["Messerschmitt Me 262", "de Havilland Comet", "Boeing 707"]],
  ["1960-1989", "Guerra Fría", "La Guerra Fría convierte el espacio aéreo en campo de batalla invisible. El SR-71 espía a 25 km de altura a Mach 3.2. El MiG-21 se exporta a 60 países. El Vietnam enseña que los misiles no reemplazan al cañón — y nacen el F-15 y el F-16. La URSS desarrolla el MiG-29 y el Su-27, cazas que siguen siendo relevantes hoy. El avión supersónico de pasajeros Concorde empieza a volar en 1976.", ["Lockheed SR-71 Blackbird", "MiG-21", "Tupolev Tu-95"]],
  ["1970-2000", "Aviación comercial global", "El Boeing 747 'Jumbo Jet' democratiza el vuelo internacional: de un lujo para pocos a algo accesible para millones. Airbus nace en 1970 como consorcio europeo para competir con Boeing — hoy son iguales en ventas. El fly-by-wire del A320 (1988) computeriza los controles: el piloto da órdenes, la computadora decide si ejecutarlas. Las rutas de largo alcance se multiplican.", ["Boeing 747", "Airbus A300", "McDonnell Douglas DC-10"]],
  ["1990-2020", "Digitalización", "El GPS pasa de militar a civil en 1993 y revoluciona la navegación. El Boeing 777 con motores gemelos ETOPS-180 puede sobrevolar océanos sin tierra a la vista. El A380 lleva hasta 853 pasajeros. El Boeing 787 Dreamliner usa 50% materiales compuestos — más ligero, más eficiente, cabina más cómoda. Los motores turbofán modernos consumen un 20% menos que los de los 90.", ["Airbus A320 family", "Boeing 787 Dreamliner", "Airbus A350"]],
  ["2000-hoy", "Quinta generación y drones", "El F-22 (2005) y el F-35 (2015) son los primeros cazas de quinta generación en servicio masivo: invisibles al radar, supersónicos y conectados en red. Los drones de combate como el MQ-9 Reaper cambian la guerra asimétrica. China desarrolla el J-20 y el J-35. Las flotas de drones civiles se multiplican: reparto, vigilancia, fotografía. El futuro ya llegó.", ["Lockheed Martin F-35 Lightning II", "Chengdu J-20", "Sukhoi Su-57"]],
  ["Futuro", "Nuevas tecnologías", "La aviación eléctrica despega literalmente: el NASA X-57 Maxwell, el Pipistrel Velis Electro y docenas de eVTOL (taxis aéreos eléctricos) prometen ciudades sin congestión de tráfico. El hidrógeno es el combustible del futuro — ZEROe de Airbus apunta a 2035. El boom sónico silencioso del X-59 QueSST de NASA busca rehabilitar el vuelo supersónico comercial. En 2040 los aviones actuales estarán tan obsoletos como los DC-3 hoy.", ["Lockheed Martin X-59 QueSST", "electric aircraft", "eVTOL aircraft"]]
];

const regions: Item[] = [
  ["Estados Unidos", "Industria y poder aéreo", "EE.UU. inventó el avión y lo convirtió en industria global. Boeing, Lockheed Martin, Northrop Grumman y Pratt & Whitney dominan la aviación mundial. El espacio aéreo estadounidense es el más transitado: más de 45.000 vuelos diarios. El FAA (Federal Aviation Administration) regula la aviación civil más compleja del mundo. Del Wright Flyer al F-35 en solo 100 años.", ["Boeing B-17 Flying Fortress", "F-22 Raptor", "Boeing 747"]],
  ["Canadá", "Aviación regional y bush flying", "Canadá tiene una aviación única: inmenso territorio, clima extremo y comunidades remotas accesibles solo en avión. El bush flying (vuelo en zonas remotas con hidroaviones y esquíes) es una tradición canadiense. De Havilland Canada creó los mejores aviones de transporte regional y bush: Beaver, Otter, Dash 8. Bombardier, con sede en Montreal, es el tercer fabricante de aviones comerciales del mundo.", ["De Havilland Canada Dash 8", "DHC-6 Twin Otter", "Bombardier CRJ"]],
  ["Argentina", "Aviación nacional y militar", "Argentina tiene una tradición aeronáutica excepcional para un país en desarrollo. En 1950 fue el 4.° país del mundo en volar un caza a reacción propio: el Pulqui II, diseñado por Kurt Tank, creador del Focke-Wulf 190. La Fábrica Militar de Aviones (FMA/FAdeA) en Córdoba produjo el Pucará, el Pampa y mantiene flotas. La Fuerza Aérea Argentina operó Mirages, A-4 Skyhawks y Super Étendards en el conflicto de Malvinas/Falklands.", ["FMA IA-58 Pucará", "FMA IA-63 Pampa", "FMA I.Ae. 33 Pulqui II"]],
  ["Brasil", "Embraer y exportación regional", "Embraer, fundada en 1969, es hoy la tercera fabricante de aviones comerciales del mundo después de Boeing y Airbus. El Super Tucano es el avión de entrenamiento y ataque liviano más vendido del mundo — operado por 15 fuerza aéreas. La familia E-Jet revolutionó los aviones regionales de 70-130 plazas. El C-390 Millennium es un transporte militar moderno que compite con el Hércules C-130.", ["Embraer EMB 314 Super Tucano", "Embraer E-Jet", "Embraer C-390 Millennium"]],
  ["América Latina", "Fuerzas aéreas regionales", "Chile, Perú, Colombia, México, Uruguay, Paraguay y otros países con transporte, entrenamiento, vigilancia y aerolíneas nacionales.", ["Cessna A-37 Dragonfly", "F-5 fighter aircraft", "Latin American air force aircraft"]],
  ["Reino Unido", "Cazas clásicos y motores", "Spitfire, Hurricane, Lancaster, Meteor, Vulcan, Harrier, Tornado, Typhoon y Rolls-Royce.", ["Supermarine Spitfire", "Avro Lancaster", "Hawker Siddeley Harrier"]],
  ["Francia", "Dassault, Airbus y aviación naval", "Blériot, Mirage, Rafale, Concorde, Airbus, Dassault, Safran y aviación naval.", ["Dassault Rafale", "Dassault Mirage 2000", "Concorde"]],
  ["Alemania", "Ingeniería y reacción", "Zeppelin, Bf 109, Me 262, ingeniería de reacción, Airbus, Eurofighter y tradición técnica.", ["Messerschmitt Bf 109", "Messerschmitt Me 262", "Eurofighter Typhoon"]],
  ["Italia, España y Europa", "Industria europea integrada", "Savoia-Marchetti, Aermacchi, CASA, Airbus, ATR, Eurofighter, helicópteros y transporte.", ["Aermacchi MB-339", "CASA C-295", "ATR 72"]],
  ["Rusia / URSS", "Escuela soviética y rusa", "MiG, Sukhoi, Tupolev, Ilyushin, Antonov, Yakovlev, Su-27, MiG-29, Tu-95, Il-76 y An-124.", ["Sukhoi Su-27", "Mikoyan MiG-29", "Tupolev Tu-95"]],
  ["China", "Crecimiento industrial acelerado", "J-10, J-11, J-15, J-16, J-20, H-6, Y-20, C919 y desarrollo de industria propia.", ["Chengdu J-20", "Chengdu J-10", "Comac C919"]],
  ["Japón", "Del Zero a la industria moderna", "Zero, industria de posguerra, Mitsubishi, Kawasaki, ShinMaywa, MRJ/SpaceJet y defensa moderna.", ["Mitsubishi A6M Zero", "Mitsubishi F-2", "Kawasaki C-2"]],
  ["India", "HAL y desarrollo propio", "HAL, Tejas, Dhruv, cooperación internacional, aviación militar y mercado civil en expansión.", ["HAL Tejas", "HAL Dhruv", "Indian Air Force aircraft"]],
  ["Corea del Sur", "Industria moderna", "T-50 Golden Eagle, KF-21 Boramae, industria moderna y cooperación tecnológica.", ["KAI T-50 Golden Eagle", "KAI KF-21 Boramae", "Republic of Korea Air Force aircraft"]],
  ["Medio Oriente", "Hubs globales y defensa", "Operadores militares avanzados, aerolíneas globales, hubs de largo alcance y flotas comerciales modernas.", ["Emirates Airbus A380", "Qatar Airways Airbus A350", "Israeli Air Force F-16"]],
  ["África", "Conectividad y operación difícil", "Aviación regional, transporte, patrulla, entrenamiento, ayuda humanitaria, aerolíneas nacionales y pistas difíciles.", ["Ethiopian Airlines Boeing 787", "South African Airways Airbus A340", "African air force aircraft"]],
  ["Oceanía", "Largo alcance y operación remota", "Australia y Nueva Zelanda en aviación militar, regional, bush flying, Qantas y operación de largo alcance.", ["Qantas Boeing 747", "Royal Australian Air Force C-130", "Air New Zealand Boeing 787"]]
];

async function getWikipediaImage(title: string) {
  try {
    const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`, { next: { revalidate: 86400 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.thumbnail?.source || data?.originalimage?.source || null;
  } catch {
    return null;
  }
}

async function getCommonsImages(query: string) {
  try {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query + " aviation aircraft")}&gsrnamespace=6&gsrlimit=5&prop=imageinfo&iiprop=url&iiurlwidth=900&format=json&origin=*`;
    const res = await fetch(url, { next: { revalidate: 86400 } });
    if (!res.ok) return [];
    const data = await res.json();
    const pages = Object.values(data?.query?.pages || {}) as any[];
    return pages.map((page) => page?.imageinfo?.[0]?.thumburl || page?.imageinfo?.[0]?.url).filter(Boolean) as string[];
  } catch {
    return [];
  }
}

async function prepare(items: Item[]) {
  return Promise.all(items.map(async ([period, title, text, queries]) => {
    const images: string[] = [];
    for (const query of queries) {
      const wiki = await getWikipediaImage(query);
      if (wiki) images.push(wiki);
      const commons = await getCommonsImages(query);
      images.push(...commons);
    }
    return { period, title, text, images: Array.from(new Set(images)).slice(0, 6) } as ReadyItem;
  }));
}

function CardWithImages({ item, label }: { item: ReadyItem; label: string }) {
  const main = item.images[0];
  const rest = item.images.slice(1, 6);
  return (
    <article className="card">
      <div className="historyImage">
        {main ? <img src={main} alt={item.title} /> : <div className="imageFallback">WikiAir</div>}
      </div>
      {rest.length > 0 && (
        <div className="historyThumbs">
          {rest.map((src) => <img key={src} src={src} alt={item.title} />)}
        </div>
      )}
      <p className="gold">{label}: {item.period}</p>
      <h2>{item.title}</h2>
      <p style={{ lineHeight: 1.7, fontSize: 14, color: "var(--muted2)" }}>{item.text}</p>
    </article>
  );
}

export default async function HistoriaPage() {
  const readyEras = await prepare(eras);
  const readyRegions = await prepare(regions);

  return (
    <main className="page">
      <section className="container hero compactHero">
        <a className="back" href="/">← Volver</a>
        <p className="gold">HISTORIA MUNDIAL</p>
        <h1>Historia de la aviación</h1>
        <p>Una mirada global con varias imágenes por tarjeta: etapas técnicas, guerras, aviación comercial, industria militar, regiones y países clave.</p>
      </section>

      <section className="container groupBlock">
        <div className="groupTitle"><p className="gold">Evolución por etapas</p><h2>Línea histórica</h2></div>
        <div className="grid">
          {readyEras.map((item) => <CardWithImages key={item.period} item={item} label="Etapa" />)}
        </div>
      </section>

      <section className="container groupBlock">
        <div className="groupTitle"><p className="gold">Cobertura global</p><h2>Países y regiones</h2></div>
        <div className="grid">
          {readyRegions.map((item) => <CardWithImages key={item.period} item={item} label="Región" />)}
        </div>
      </section>
    </main>
  );
}
