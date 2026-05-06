import Header from "@/components/Header";
import { aircraft, countByUse } from "@/lib/aircraft";

export default function HomePage() {
  const stats = countByUse();

  return (
    <main className="page">
      <Header />

      <section className="container hero">
        <div>
          <p className="kicker">WIKIAIR · Enciclopedia visual</p>
          <h1>La app de aviación que sí llama la atención.</h1>
          <p>
            Base visual con aeronaves militares, comerciales, privadas, históricas, cargueras,
            entrenadores y experimentales. Cada ficha tiene imagen real desde Wikipedia/Wikimedia,
            datos técnicos y separación clara por uso.
          </p>

          <div className="heroActions">
            <a className="primaryBtn" href="/enciclopedia">Explorar aviones</a>
            <a className="secondaryBtn" href="/radar">Ver radar en vivo</a>
          </div>
        </div>

        <div className="heroPanel" aria-label="Panel visual WikiAir">
          <div className="heroPlane">✈</div>
        </div>
      </section>

      <section className="container statsGrid">
        <div className="statCard">
          <strong>{aircraft.length}</strong>
          <span>Aeronaves iniciales</span>
        </div>
        {stats.slice(0, 3).map((item) => (
          <div className="statCard" key={item.group}>
            <strong>{item.count}</strong>
            <span>{item.group}</span>
          </div>
        ))}
      </section>

      <section className="container featureGrid">
        <a className="featureCard" href="/enciclopedia">
          <p className="kicker">01</p>
          <h2>Enciclopedia</h2>
          <p>Buscador, filtros por uso y tarjetas visuales con foto real para cada aeronave.</p>
        </a>
        <a className="featureCard" href="/historia">
          <p className="kicker">02</p>
          <h2>Historia</h2>
          <p>Línea de tiempo desde los pioneros hasta jets, guerra fría y era espacial.</p>
        </a>
        <a className="featureCard" href="/radar">
          <p className="kicker">03</p>
          <h2>Radar en vivo</h2>
          <p>Mapa de tráfico aéreo centrado en Entre Ríos y zona litoral.</p>
        </a>
      </section>

      <footer className="container footerNote">
        Imágenes: se cargan automáticamente desde la API pública de Wikipedia cuando existe miniatura disponible.
        Datos técnicos: valores aproximados por variante; la app está preparada para ampliar la base y conectar Firebase más adelante.
      </footer>
    </main>
  );
}
