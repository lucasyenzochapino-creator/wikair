export default function RadarPage() {
  return (
    <main className="page">
      <section className="container hero compactHero">
        <a className="back" href="/">← Volver</a>
        <p className="gold">RADAR WIKIAIR</p>
        <h1>Radar en vivo</h1>
        <p>
          Algunos radares externos bloquean iframes dentro de otras webs. Por eso WikiAir muestra un panel visual propio y botones directos para abrir el tráfico real en servicios especializados.
        </p>
      </section>

      <section className="container radarPanel">
        <div className="radarMap">
          <div>
            <p className="gold">Zona inicial</p>
            <h2>Entre Ríos · Santa Fe</h2>
            <p style={{ color: "#cfcfcf", maxWidth: 620, margin: "0 auto", lineHeight: 1.6 }}>
              Coordenadas aproximadas: latitud -31.7, longitud -60.5. Abrí el radar externo para ver vuelos reales, matrícula, altitud y trayectoria en tiempo real.
            </p>
            <div className="radarActions">
              <a className="radarLink" href="https://www.flightradar24.com/-31.7,-60.5/8" target="_blank" rel="noreferrer">Abrir Flightradar24</a>
              <a className="radarLink" href="https://globe.adsbexchange.com/?lat=-31.7&lon=-60.5&zoom=8" target="_blank" rel="noreferrer">Abrir ADS-B Exchange</a>
              <a className="radarLink" href="https://opensky-network.org/network/explorer" target="_blank" rel="noreferrer">Abrir OpenSky</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
