const eras = [
  ["Antes de 1903", "El sueño de volar", "Globos, planeadores y estudios de aerodinámica preparan el camino del avión moderno."],
  ["1903", "Primer vuelo controlado", "Los hermanos Wright logran vuelo motorizado, sostenido y controlado."],
  ["1909-1914", "Aviación práctica", "Nacen escuelas de vuelo, récords, exhibiciones, correo aéreo y primeros usos militares."],
  ["1914-1918", "Primera Guerra Mundial", "Aparecen reconocimiento aéreo, combate aire-aire, bombarderos ligeros y ases de la aviación."],
  ["1919-1938", "Entreguerras", "Crecen aerolíneas, correo, navegación, grandes travesías, hidroaviones y transporte comercial."],
  ["1939-1945", "Segunda Guerra Mundial", "Cazas, bombarderos, transporte, portaaviones, radar y primeros reactores transforman el poder aéreo."],
  ["1945-1960", "Era del jet", "La turbina cambia velocidad, altitud y alcance. Nacen reactores militares y jets comerciales."],
  ["1960-1989", "Guerra Fría", "Estados Unidos y la URSS impulsan cazas supersónicos, bombarderos, transporte, reconocimiento y carrera espacial."],
  ["1970-2000", "Aviación comercial global", "Boeing 747, Airbus, wide-bodies, rutas intercontinentales y aeropuertos globales masifican el viaje aéreo."],
  ["1990-2020", "Digitalización", "Fly-by-wire, GPS, radares modernos, materiales compuestos, motores eficientes y aviónica avanzada."],
  ["2000-hoy", "Quinta generación y drones", "F-22, F-35, J-20, Su-57, UAVs, radares AESA y guerra electrónica cambian la aviación militar."],
  ["Futuro", "Nuevas tecnologías", "Aviación eléctrica, hidrógeno, eVTOL, combustibles sostenibles, supersónico silencioso y autonomía."]
];

const regions = [
  ["Estados Unidos", "Wright Flyer, DC-3, B-17, P-51, 707, 747, F-15, F-16, F-22, F-35, C-130, X-1, X-15."],
  ["Canadá", "De Havilland Canada, Dash 8, aviones bush, transporte regional, Bombardier y entrenamiento."],
  ["Argentina", "Pulqui I, Pulqui II, IA-58 Pucará, IA-63 Pampa, C-130, A-4AR, Mirage, Super Étendard y aviación comercial nacional."],
  ["Brasil", "Embraer Bandeirante, Tucano, Super Tucano, E-Jet, E2 y C-390 Millennium."],
  ["Chile, Perú, Colombia, México y América Latina", "Fuerzas aéreas regionales, transporte, entrenamiento, vigilancia, aviación civil y aerolíneas nacionales."],
  ["Reino Unido", "Spitfire, Hurricane, Lancaster, Meteor, Vulcan, Harrier, Tornado, Typhoon y Rolls-Royce."],
  ["Francia", "Blériot, Mirage, Rafale, Concorde, Airbus, Dassault, Safran y aviación naval."],
  ["Alemania", "Zeppelin, Bf 109, Me 262, ingeniería de reacción, Airbus, Eurofighter y tradición técnica."],
  ["Italia, España y Europa", "Savoia-Marchetti, Aermacchi, CASA, Airbus, ATR, Eurofighter, helicópteros y transporte."],
  ["Rusia / URSS", "MiG, Sukhoi, Tupolev, Ilyushin, Antonov, Yakovlev, Su-27, MiG-29, Tu-95, Il-76 y An-124."],
  ["China", "J-10, J-11, J-15, J-16, J-20, H-6, Y-20, C919 y crecimiento acelerado de industria propia."],
  ["Japón", "Zero, industria de posguerra, Mitsubishi, Kawasaki, ShinMaywa, MRJ/SpaceJet y defensa moderna."],
  ["India", "HAL, Tejas, Dhruv, cooperación internacional, aviación militar y mercado civil en expansión."],
  ["Corea del Sur", "T-50 Golden Eagle, KF-21 Boramae, industria moderna y cooperación tecnológica."],
  ["Medio Oriente", "Operadores militares avanzados, aerolíneas globales, hubs de largo alcance y flotas comerciales modernas."],
  ["África", "Aviación regional, transporte, patrulla, entrenamiento, ayuda humanitaria, aerolíneas nacionales y operación en pistas difíciles."],
  ["Oceanía", "Australia y Nueva Zelanda en aviación militar, regional, bush flying, Qantas y operación de largo alcance."]
];

export default function HistoriaPage() {
  return (
    <main className="page">
      <section className="container hero compactHero">
        <a className="back" href="/">← Volver</a>
        <p className="gold">HISTORIA MUNDIAL</p>
        <h1>Historia de la aviación</h1>
        <p>Una mirada global: etapas técnicas, guerras, aviación comercial, industria militar, regiones y países clave.</p>
      </section>

      <section className="container groupBlock">
        <div className="groupTitle"><p className="gold">Evolución por etapas</p><h2>Línea histórica</h2></div>
        <div className="grid">
          {eras.map(([period, title, text]) => (
            <article className="card" key={period}>
              <p className="gold">{period}</p>
              <h2>{title}</h2>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container groupBlock">
        <div className="groupTitle"><p className="gold">Cobertura global</p><h2>Países y regiones</h2></div>
        <div className="grid">
          {regions.map(([region, text]) => (
            <article className="card" key={region}>
              <p className="gold">Región / país</p>
              <h2>{region}</h2>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
