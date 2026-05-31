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
  ["América Latina", "Fuerzas aéreas regionales", "Más allá de Argentina y Brasil, toda América Latina tiene aviación activa. Chile opera F-16 y A-29 Super Tucano. Colombia usa Kfir israelíes y OV-10. México con su Escuadrón 201 participó en la Segunda Guerra Mundial. Perú, Venezuela, Uruguay y Paraguay mantienen fuerzas aéreas con aviones de varias generaciones. LAN (hoy LATAM), Avianca y GOL conectan la región con vuelos internacionales.", ["Cessna A-37 Dragonfly", "F-5 fighter aircraft", "Latin American air force aircraft"]],
  ["Reino Unido", "Cazas clásicos y motores", "El Reino Unido tiene una de las tradiciones aeronáuticas más ricas del mundo. Rolls-Royce hace los mejores motores a reacción del mundo — el Trent 1000, el Pearl y el AE 3007 equipan aviones en todo el mundo. El Spitfire salvó a Gran Bretaña en 1940. El Harrier fue el primer avión de despegue vertical operativo. El Typhoon y el F-35B son los cazas actuales de la RAF.", ["Supermarine Spitfire", "Avro Lancaster", "Hawker Siddeley Harrier"]],
  ["Francia", "Dassault, Airbus y aviación naval", "Francia es pionera en aviación: Blériot cruzó el Canal en 1909 y Francia tuvo aviación comercial antes que nadie. Dassault diseña el Mirage y el Rafale — cazas que exporta a una docena de países. Airbus, cuyo corazón de diseño está en Toulouse, es hoy el mayor fabricante de aviones del mundo en pedidos. El Concorde fue un logro tecnológico franco-británico sin precedentes. Safran hace los motores CFM del 737 y el A320.", ["Dassault Rafale", "Dassault Mirage 2000", "Concorde"]],
  ["Alemania", "Ingeniería y reacción", "Alemania aportó algunas de las innovaciones más importantes de la aviación: el dirigible Zeppelin, la primera línea aérea comercial (DELAG, 1909), el primer caza a reacción operativo (Me 262, 1944) y la ingeniería que transformó la aerodinámica. Hoy Alemania es parte central de Airbus y el Eurofighter Typhoon. MTU Aero Engines hace partes de los mejores motores del mundo. La tradición técnica alemana sigue siendo incomparable.", ["Messerschmitt Bf 109", "Messerschmitt Me 262", "Eurofighter Typhoon"]],
  ["Italia, España y Europa", "Industria europea integrada", "La industria aeronáutica europea es integrada y complementaria. España con Airbus España, CASA (ahora Airbus Defence) y el A400M Atlas. Italia con Leonardo (antes Alenia/Finmeccanica), Aermacchi y el M-346 trainer. ATR (Franco-Italiana) domina los aviones turbohélice regionales de 40-90 plazas. El programa Eurofighter Typhoon fue desarrollado por UK, Alemania, Italia y España juntos.", ["Aermacchi MB-339", "CASA C-295", "ATR 72"]],
  ["Rusia / URSS", "Escuela soviética y rusa", "La Unión Soviética construyó la segunda industria aeronáutica del mundo durante la Guerra Fría. El MiG-21 es el caza más producido en la historia post-WWII con más de 11.000 unidades. El Tu-95 'Bear', con sus cuatro motores turbohélice contrarrotantes, sigue volando desde 1956. El An-124 Ruslan es el segundo avión de carga más grande del mundo. Hoy Rusia opera Su-35, MiG-29 y desarrolla el Su-57 de quinta generación.", ["Sukhoi Su-27", "Mikoyan MiG-29", "Tupolev Tu-95"]],
  ["China", "Crecimiento industrial acelerado", "China pasó de copiar aviones soviéticos a desarrollar tecnología propia en 30 años. El J-20 (2017) es el primer caza furtivo de quinta generación fuera de EE.UU. El COMAC C919, con motores CFM LEAP, es el primer avión de pasajeros narrow-body chino certificado. China está construyendo portaaviones, bombarderos estratégicos y flota de drones. En 2035 podría ser la mayor industria aeronáutica del mundo.", ["Chengdu J-20", "Chengdu J-10", "Comac C919"]],
  ["Japón", "Del Zero a la industria moderna", "El Zero (A6M) fue el mejor caza naval del mundo en 1941: largo alcance, maniobrabilidad extrema, pero sin protección para el piloto. Después de la derrota, Japón reconstruyó su industria con restricciones — hoy Mitsubishi hace el F-2 (basado en el F-16) y el X-2 Shinshin de quinta generación en desarrollo. Kawasaki hace el C-2 transport y el P-1 patrulla marítima. Japan Airlines y ANA son operadores de 787 y A350 de primera.", ["Mitsubishi A6M Zero", "Mitsubishi F-2", "Kawasaki C-2"]],
  ["India", "HAL y desarrollo propio", "India opera la cuarta fuerza aérea más grande del mundo, con Su-30MKI rusos, Rafales franceses, Mirage 2000, MiG-29 y su propio HAL Tejas — un caza ligero de cuarta generación desarrollado localmente. El Dhruv es un helicóptero utilitario indio exportado a varios países. India está desarrollando el AMCA (Advanced Medium Combat Aircraft) de quinta generación. Indigo y Air India son las aerolíneas más grandes del país.", ["HAL Tejas", "HAL Dhruv", "Indian Air Force aircraft"]],
  ["Corea del Sur", "Industria moderna", "Corea del Sur hizo un salto tecnológico impresionante: el T-50 Golden Eagle es un jet de entrenamiento avanzado exportado a varios países. El KF-21 Boramae (2022) es un caza de cuarta generación plus totalmente coreano — notable para un país que no tenía industria aeronáutica hace 30 años. Korea Aerospace Industries (KAI) también hace helicópteros Surión y participa en el programa FA-50.", ["KAI T-50 Golden Eagle", "KAI KF-21 Boramae", "Republic of Korea Air Force aircraft"]],
  ["Medio Oriente", "Hubs globales y defensa", "Los Emiratos Árabes, Qatar y Arabia Saudita operan las aerolíneas más lujosas y rentables del mundo: Emirates con 100+ A380s, Qatar Airways referencia en calidad, Etihad. Los hubs de Dubai (DXB), Doha (DOH) y Abu Dhabi (AUH) conectan Asia, Europa y África. En lo militar, Israel tiene la fuerza aérea más tecnológica de la región, con F-35I y drones Heron. Arabia Saudita y UAE operan F-15 y Rafale.", ["Emirates Airbus A380", "Qatar Airways Airbus A350", "Israeli Air Force F-16"]],
  ["África", "Conectividad y operación difícil", "La aviación africana enfrenta desafíos únicos: infraestructura limitada, pistas cortas, temperaturas extremas y mercados fragmentados. Ethiopian Airlines es la aerolínea africana más grande y rentable, con hubs en Addis Abeba. Air cargo tiene un rol enorme: gran parte de los suministros humanitarios y médicos llegan en avión. La aviación bush y médica conecta zonas remotas de África subsahariana donde no hay carreteras.", ["Ethiopian Airlines Boeing 787", "South African Airways Airbus A340", "African air force aircraft"]],
  ["Oceanía", "Largo alcance y operación remota", "Qantas, fundada en 1920, es la aerolínea más antigua del mundo en operación continua. Australia y Nueva Zelanda operan largas rutas del Pacífico: Sídney-Dallas (17h), Auckland-Nueva York (17h). El RAAF (Royal Australian Air Force) opera F-35A, P-8 Poseidon y KC-30 tanqueros. En las islas remotas del Pacífico, el avión es el único transporte — las Islas Cook, Tonga, Samoa y Fiyi dependen de él para todo.", ["Qantas Boeing 747", "Royal Australian Air Force C-130", "Air New Zealand Boeing 787"]]
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
