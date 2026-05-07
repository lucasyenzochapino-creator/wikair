type Item = [string, string, string, string[]];

type ReadyItem = {
  period: string;
  title: string;
  text: string;
  images: string[];
};

const eras: Item[] = [
  ["Antes de 1903", "El sueño de volar", "Globos, planeadores y estudios de aerodinámica preparan el camino del avión moderno.", ["Otto Lilienthal", "glider aviation history", "early aviation"]],
  ["1903", "Primer vuelo controlado", "Los hermanos Wright logran vuelo motorizado, sostenido y controlado.", ["Wright Flyer", "Wright brothers airplane", "first flight aviation"]],
  ["1909-1914", "Aviación práctica", "Nacen escuelas de vuelo, récords, exhibiciones, correo aéreo y primeros usos militares.", ["Blériot XI", "Louis Blériot aircraft", "early aircraft 1910"]],
  ["1914-1918", "Primera Guerra Mundial", "Aparecen reconocimiento aéreo, combate aire-aire, bombarderos ligeros y ases de la aviación.", ["Fokker Dr.I", "Sopwith Camel", "World War I aircraft"]],
  ["1919-1938", "Entreguerras", "Crecen aerolíneas, correo, navegación, grandes travesías, hidroaviones y transporte comercial.", ["Douglas DC-3", "airmail aircraft", "interwar aircraft"]],
  ["1939-1945", "Segunda Guerra Mundial", "Cazas, bombarderos, transporte, portaaviones, radar y primeros reactores transforman el poder aéreo.", ["Supermarine Spitfire", "North American P-51 Mustang", "Boeing B-17 Flying Fortress"]],
  ["1945-1960", "Era del jet", "La turbina cambia velocidad, altitud y alcance. Nacen reactores militares y jets comerciales.", ["Messerschmitt Me 262", "de Havilland Comet", "Boeing 707"]],
  ["1960-1989", "Guerra Fría", "Estados Unidos y la URSS impulsan cazas supersónicos, bombarderos, transporte, reconocimiento y carrera espacial.", ["Lockheed SR-71 Blackbird", "MiG-21", "Tupolev Tu-95"]],
  ["1970-2000", "Aviación comercial global", "Boeing 747, Airbus, wide-bodies, rutas intercontinentales y aeropuertos globales masifican el viaje aéreo.", ["Boeing 747", "Airbus A300", "McDonnell Douglas DC-10"]],
  ["1990-2020", "Digitalización", "Fly-by-wire, GPS, radares modernos, materiales compuestos, motores eficientes y aviónica avanzada.", ["Airbus A320 family", "Boeing 787 Dreamliner", "Airbus A350"]],
  ["2000-hoy", "Quinta generación y drones", "F-22, F-35, J-20, Su-57, UAVs, radares AESA y guerra electrónica cambian la aviación militar.", ["Lockheed Martin F-35 Lightning II", "Chengdu J-20", "Sukhoi Su-57"]],
  ["Futuro", "Nuevas tecnologías", "Aviación eléctrica, hidrógeno, eVTOL, combustibles sostenibles, supersónico silencioso y autonomía.", ["Lockheed Martin X-59 QueSST", "electric aircraft", "eVTOL aircraft"]]
];

const regions: Item[] = [
  ["Estados Unidos", "Industria y poder aéreo", "Wright Flyer, DC-3, B-17, P-51, 707, 747, F-15, F-16, F-22, F-35, C-130, X-1, X-15.", ["Boeing B-17 Flying Fortress", "F-22 Raptor", "Boeing 747"]],
  ["Canadá", "Aviación regional y bush flying", "De Havilland Canada, Dash 8, aviones bush, transporte regional, Bombardier y entrenamiento.", ["De Havilland Canada Dash 8", "DHC-6 Twin Otter", "Bombardier CRJ"]],
  ["Argentina", "Aviación nacional y militar", "Pulqui I, Pulqui II, IA-58 Pucará, IA-63 Pampa, C-130, A-4AR, Mirage, Super Étendard y aviación comercial nacional.", ["FMA IA-58 Pucará", "FMA IA-63 Pampa", "FMA I.Ae. 33 Pulqui II"]],
  ["Brasil", "Embraer y exportación regional", "Embraer Bandeirante, Tucano, Super Tucano, E-Jet, E2 y C-390 Millennium.", ["Embraer EMB 314 Super Tucano", "Embraer E-Jet", "Embraer C-390 Millennium"]],
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
      <p>{item.text}</p>
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
