const aircraft = [
  {
    name: "F-22 Raptor",
    type: "Militar · Caza furtivo",
    maker: "Lockheed Martin",
    speed: "2.414 km/h",
    range: "2.960 km",
    ceiling: "19.800 m",
    engines: "2 × Pratt & Whitney F119",
    capacity: "1 piloto",
    license: "Piloto militar avanzado"
  },
  {
    name: "Airbus A380",
    type: "Comercial · Wide-body",
    maker: "Airbus",
    speed: "1.020 km/h",
    range: "15.200 km",
    ceiling: "13.100 m",
    engines: "4 × turbofán",
    capacity: "Hasta 853 pasajeros",
    license: "ATPL + Type Rating"
  },
  {
    name: "Boeing 747",
    type: "Comercial · Wide-body",
    maker: "Boeing",
    speed: "988 km/h",
    range: "13.450 km",
    ceiling: "13.700 m",
    engines: "4 × turbofán",
    capacity: "Pasajeros o carga pesada",
    license: "ATPL + Type Rating"
  },
  {
    name: "Supermarine Spitfire",
    type: "Histórico · Caza",
    maker: "Supermarine",
    speed: "594 km/h",
    range: "760 km",
    ceiling: "11.300 m",
    engines: "Rolls-Royce Merlin",
    capacity: "1 piloto",
    license: "Licencia especial / histórica"
  },
  {
    name: "Cessna 172",
    type: "Privada · Entrenamiento",
    maker: "Cessna",
    speed: "302 km/h",
    range: "1.185 km",
    ceiling: "4.100 m",
    engines: "1 × motor Lycoming",
    capacity: "4 personas",
    license: "PPL"
  }
];

export default function EnciclopediaPage() {
  return (
    <main className="page">
      <section className="container">
        <a className="back" href="/">← Volver</a>

        <p className="gold">CATÁLOGO INICIAL</p>
        <h1>Enciclopedia WikiAir</h1>
        <p style={{ color: "#cfcfcf", fontSize: 18, lineHeight: 1.6 }}>
          Primer módulo con cinco aeronaves base. Luego se podrá conectar con Firebase para cargar cientos de fichas.
        </p>

        <div className="grid">
          {aircraft.map((plane) => (
            <article className="card" key={plane.name}>
              <p className="gold">{plane.type}</p>
              <h2>{plane.name}</h2>
              <p>Fabricante: {plane.maker}</p>
              <div className="specs">
                <span>Velocidad máxima: {plane.speed}</span>
                <span>Alcance: {plane.range}</span>
                <span>Techo de vuelo: {plane.ceiling}</span>
                <span>Motores: {plane.engines}</span>
                <span>Capacidad: {plane.capacity}</span>
                <span>Licencia requerida: {plane.license}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
