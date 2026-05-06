import { aircraft, totalAircraft, useGroups } from "./aircraft";
import Nav from "./Nav";
import WikiImage from "./WikiImage";

const featured = [
  aircraft.find((item) => item.slug === "f-22-raptor")!,
  aircraft.find((item) => item.slug === "airbus-a380")!,
  aircraft.find((item) => item.slug === "supermarine-spitfire")!
];

export default function HomePage() {
  return (
    <>
      <Nav />
      <main className="page">
        <section className="container hero">
          <div>
            <p className="kicker">WikiAir · visual aviation index</p>
            <h1>La enciclopedia visual de aviones.</h1>
            <p className="lead">
              Más de {totalAircraft} aeronaves iniciales separadas por uso: militares, comerciales,
              privadas, carga, entrenamiento, históricas y experimentales. Con imágenes reales desde
              Wikipedia/Wikimedia y un radar en vivo por OpenSky.
            </p>
            <div className="actions">
              <a className="btn btn-primary" href="/enciclopedia">Explorar aviones</a>
              <a className="btn btn-cyan" href="/radar">Ver radar</a>
            </div>
          </div>

          <div className="hero-gallery">
            {featured.map((item) => (
              <div className="hero-shot" key={item.slug}>
                <WikiImage title={item.wikiTitle} alt={item.name} className="air-img" />
                <span className="image-label">{item.name}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="container">
          <div className="stats">
            <div className="stat"><strong>{totalAircraft}</strong><span>Aeronaves iniciales</span></div>
            <div className="stat"><strong>7</strong><span>Usos principales</span></div>
            <div className="stat"><strong>Live</strong><span>Radar OpenSky</span></div>
            <div className="stat"><strong>PWA</strong><span>Instalable en celular</span></div>
          </div>
        </section>

        <section className="container section">
          <p className="kicker">Separado por uso</p>
          <div className="grid grid-3">
            {useGroups.map((group) => (
              <a className="card card-pad category-card" href={`/enciclopedia?uso=${encodeURIComponent(group.use)}`} key={group.use}>
                <span className="badge">{group.count} fichas</span>
                <strong>{group.use}</strong>
                <span>Ver aeronaves de uso {group.use.toLowerCase()}.</span>
              </a>
            ))}
          </div>
        </section>

        <footer className="container footer">
          WikiAir V3 · Datos referenciales por versión. Imágenes solicitadas dinámicamente a Wikipedia/Wikimedia.
        </footer>
      </main>
    </>
  );
}
