import AircraftExplorer from "@/AircraftExplorer";

export default function EnciclopediaPage() {
  return (
    <main className="page">
      <section className="container">
        <a className="back" href="/">← Volver</a>

        <p className="gold">WIKIAIR V3 PRO</p>

        <h1>Enciclopedia por uso</h1>

        <p style={{ color: "#cfcfcf", fontSize: 18, lineHeight: 1.6 }}>
          Aeronaves organizadas por uso: militares, comerciales, privadas,
          carga, entrenamiento, históricas y experimentales. Cada ficha incluye
          imagen real cuando está disponible desde Wikipedia/Wikimedia.
        </p>

        <AircraftExplorer />
      </section>
    </main>
  );
}      </section>
    </main>
  );
}
