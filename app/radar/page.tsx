export default function RadarPage() {
  return (
    <main className="page">
      <section className="container">
        <a className="back" href="/">← Volver</a>

        <p className="gold">TRÁFICO AÉREO</p>
        <h1>Radar en vivo</h1>

        <p style={{ color: "#cfcfcf", fontSize: 18, lineHeight: 1.6 }}>
          Vista inicial centrada en la zona de Entre Ríos / Santa Fe. Luego se puede ampliar con filtros y API.
        </p>

        <iframe
          title="Radar en vivo WikiAir"
          src="https://www.flightradar24.com/simple_index.php?lat=-31.7&lon=-60.5&z=8"
          loading="lazy"
        />
      </section>
    </main>
  );
}
