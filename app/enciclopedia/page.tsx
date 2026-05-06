import AircraftExplorer from "../AircraftExplorer";
import Nav from "../Nav";
import { totalAircraft } from "../aircraft";

export default function EnciclopediaPage() {
  return (
    <>
      <Nav />
      <main className="page">
        <section className="container catalog-head">
          <p className="kicker">Catálogo visual</p>
          <h1>Enciclopedia WikiAir</h1>
          <p className="lead">
            {totalAircraft} aeronaves iniciales, separadas por uso, con buscador y acceso a ficha técnica.
          </p>
          <div className="notice">
            Esta versión prioriza impacto visual y navegación. Las imágenes se cargan desde Wikipedia/Wikimedia y pueden tardar unos segundos la primera vez.
          </div>
        </section>

        <section className="container">
          <AircraftExplorer />
        </section>
      </main>
    </>
  );
}
