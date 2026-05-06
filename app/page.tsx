export default function HomePage() {
  return (
    <main className="page">
      <section className="container hero">
        <p className="gold">WIKIAIR · PWA</p>

        <h1>Enciclopedia premium de aviación</h1>

        <p>
          Explora aviones militares, comerciales, privados e históricos.
          Fichas técnicas claras, historia aeronáutica y radar en vivo.
        </p>

        <div className="grid">
          <a className="card" href="/enciclopedia">
            <p className="gold">01</p>
            <h2>Enciclopedia</h2>
            <p>Catálogo inicial con cazas, aviones comerciales, privados e históricos.</p>
          </a>

          <a className="card" href="/historia">
            <p className="gold">02</p>
            <h2>Historia</h2>
            <p>Línea de tiempo desde los hermanos Wright hasta la era espacial.</p>
          </a>

          <a className="card" href="/radar">
            <p className="gold">03</p>
            <h2>Radar en vivo</h2>
            <p>Mapa integrado para visualizar tráfico aéreo en tiempo real.</p>
          </a>
        </div>
      </section>
    </main>
  );
}
