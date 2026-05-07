type Item = [string, string, string, string];

const eras: Item[] = [
  ["Antes de 1903", "El sueño de volar", "Globos, planeadores y estudios de aerodinámica preparan el camino del avión moderno.", "Otto Lilienthal"],
  ["1903", "Primer vuelo controlado", "Los hermanos Wright logran vuelo motorizado, sostenido y controlado.", "Wright Flyer"],
  ["1909-1914", "Aviación práctica", "Nacen escuelas de vuelo, récords, exhibiciones, correo aéreo y primeros usos militares.", "Blériot XI"],
  ["1914-1918", "Primera Guerra Mundial", "Aparecen reconocimiento aéreo, combate aire-aire, bombarderos ligeros y ases de la aviación.", "Fokker Dr.I"],
  ["1919-1938", "Entreguerras", "Crecen aerolíneas, correo, navegación, grandes travesías, hidroaviones y transporte comercial.", "Douglas DC-3"],
  ["1939-1945", "Segunda Guerra Mundial", "Cazas, bombarderos, transporte, portaaviones, radar y primeros reactores transforman el poder aéreo.", "Supermarine Spitfire"],
  ["1945-1960", "Era del jet", "La turbina cambia velocidad, altitud y alcance. Nacen reactores militares y jets comerciales.", "Messerschmitt Me 262"],
  ["1960-1989", "Guerra Fría", "Estados Unidos y la URSS impulsan cazas supersónicos, bombarderos, transporte, reconocimiento y carrera espacial.", "Lockheed SR-71 Blackbird"],
  ["1970-2000", "Aviación comercial global", "Boeing 747, Airbus, wide-bodies, rutas intercontinentales y aeropuertos globales masifican el viaje aéreo.", "Boeing 747"],
  ["1990-2020", "Digitalización", "Fly-by-wire, GPS, radares modernos, materiales compuestos, motores eficientes y aviónica avanzada.", "Airbus A320 family"],
  ["2000-hoy", "Quinta generación y drones", "F-22, F-35, J-20, Su-57, UAVs, radares AESA y guerra electrónica cambian la aviación militar.", "Lockheed Martin F-35 Lightning II"],
  ["Futuro", "Nuevas tecnologías", "Aviación eléctrica, hidrógeno, eVTOL, combustibles sostenibles, supersónico silencioso y autonomía.", "Lockheed Martin X-59 QueSST"]
];

const regions: Item[] = [
  ["Estados Unidos", "Industria y poder aéreo", "Wright Flyer, DC-3, B-17, P-51, 707, 747, F-15, F-16, F-22, F-35, C-130, X-1, X-15.", "Boeing B-17 Flying Fortress"],
  ["Canadá", "Aviación regional y bush flying", "De Havilland Canada, Dash 8, aviones bush, transporte regional, Bombardier y entrenamiento.", "De Havilland Canada Dash 8"],
  ["Argentina", "Aviación nacional y militar", "Pulqui I, Pulqui II, IA-58 Pucará, IA-63 Pampa, C-130, A-4AR, Mirage, Super Étendard y aviación comercial nacional.", "FMA IA-58 Pucará"],
  ["Brasil", "Embraer y exportación regional", "Embraer Bandeirante, Tucano, Super Tucano, E-Jet, E2 y C-390 Millennium.", "Embraer EMB 314 Super Tucano"],
  ["América Latina", "Fuerzas aéreas regionales", "Chile, Perú, Colombia, México, Uruguay, Paraguay y otros países con transporte, entrenamiento, vigilancia y aerolíneas nacionales.", "Cessna A-37 Dragonfly"],
  ["Reino Unido", "Cazas clásicos y motores", "Spitfire, Hurricane, Lancaster, Meteor, Vulcan, Harrier, Tornado, Typhoon y Rolls-Royce.", "Supermarine Spitfire"],
  ["Francia", "Dassault, Airbus y aviación naval", "Blériot, Mirage, Rafale, Concorde, Airbus, Dassault, Safran y aviación naval.", "Dassault Rafale"],
  ["Alemania", "Ingeniería y reacción", "Zeppelin, Bf 109, Me 262, ingeniería de reacción, Airbus, Eurofighter y tradición técnica.", "Messerschmitt Bf 109"],
  ["Italia, España y Europa", "Industria europea integrada", "Savoia-Marchetti, Aermacchi, CASA, Airbus, ATR, Eurofighter, helicópteros y transporte.", "Eurofighter Typhoon"],
  ["Rusia / URSS", "Escuela soviética y rusa", "MiG, Sukhoi, Tupolev, Ilyushin, Antonov, Yakovlev, Su-27, MiG-29, Tu-95, Il-76 y An-124.", "Sukhoi Su-27"],
  ["China", "Crecimiento industrial acelerado", "J-10, J-11, J-15, J-16, J-20, H-6, Y-20, C919 y desarrollo de industria propia.", "Chengdu J-20"],
  ["Japón", "Del Zero a la industria moderna", "Zero, industria de posguerra, Mitsubishi, Kawasaki, ShinMaywa, MRJ/SpaceJet y defensa moderna.", "Mitsubishi A6M Zero"],
  ["India", "HAL y desarrollo propio", "HAL, Tejas, Dhruv, cooperación internacional, aviación militar y mercado civil en expansión.", "HAL Tejas"],
  ["Corea del Sur", "Industria moderna", "T-50 Golden Eagle, KF-21 Boramae, industria moderna y cooperación tecnológica.", "KAI T-50 Golden Eagle"],
  ["Medio Oriente", "Hubs globales y defensa", "Operadores militares avanzados, aerolíneas globales, hubs de largo alcance y flotas comerciales modernas.", "Emirates Airbus A380"],
  ["África", "Conectividad y operación difícil", "Aviación regional, transporte, patrulla, entrenamiento, ayuda humanitaria, aerolíneas nacionales y pistas difíciles.", "Ethiopian Airlines Boeing 787"],
  ["Oceanía", "Largo alcance y operación remota", "Australia y Nueva Zelanda en aviación militar, regional, bush flying, Qantas y operación de largo alcance.", "Qantas Boeing 747"]
];

async function getImage(title: string) {
  try {
    const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`, { next: { revalidate: 86400 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.thumbnail?.source || data?.originalimage?.source || null;
  } catch {
    return null;
  }
}

async function CardWithImage({ item, label }: { item: Item; label: string }) {
  const [period, title, text, imageQuery] = item;
  const image = await getImage(imageQuery);
  return (
    <article className="card">
      <div className="historyImage">
        {image ? <img src={image} alt={title} /> : <div className="imageFallback">WikiAir</div>}
      </div>
      <p className="gold">{label}: {period}</p>
      <h2>{title}</h2>
      <p>{text}</p>
    </article>
  );
}

export default async function HistoriaPage() {
  return (
    <main className="page">
      <section className="container hero compactHero">
        <a className="back" href="/">← Volver</a>
        <p className="gold">HISTORIA MUNDIAL</p>
        <h1>Historia de la aviación</h1>
        <p>Una mirada global con imágenes: etapas técnicas, guerras, aviación comercial, industria militar, regiones y países clave.</p>
      </section>

      <section className="container groupBlock">
        <div className="groupTitle"><p className="gold">Evolución por etapas</p><h2>Línea histórica</h2></div>
        <div className="grid">
          {eras.map((item) => <CardWithImage key={item[0]} item={item} label="Etapa" />)}
        </div>
      </section>

      <section className="container groupBlock">
        <div className="groupTitle"><p className="gold">Cobertura global</p><h2>Países y regiones</h2></div>
        <div className="grid">
          {regions.map((item) => <CardWithImage key={item[0]} item={item} label="Región" />)}
        </div>
      </section>
    </main>
  );
}
