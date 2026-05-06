const featured = [
  "F-22 Raptor",
  "Airbus A380",
  "Boeing 747",
  "Supermarine Spitfire",
  "Cessna 172",
  "Antonov An-225 Mriya"
];

async function getWikiImage(title: string) {
  try {
    const res = await fetch(
      `https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`,
      { next: { revalidate: 86400 } }
    );

    if (!res.ok) return null;

    const data = await res.json();
    return data?.thumbnail?.source || data?.originalimage?.source || null;
  } catch {
    return null;
  }
}

export default async function HomePage() {
  const images = await Promise.all(
    featured.map(async (name) => ({
      name,
      image: await getWikiImage(name)
    }))
  );

  return (
    <main className="page">
      <section className="container hero">
        <p className="gold">WIKIAIR V3 PRO</p>

        <h1>La enciclopedia visual de aviación</h1>

        <p>
          Más de 160 aeronaves organizadas por uso: militares, comerciales,
          privadas, históricas, de carga, entrenamiento y experimentales.
          Fichas técnicas, imágenes reales y radar en vivo.
        </p>

        <div className="grid">
          <a className="card" href="/enciclopedia">
            <p className="gold">EXPLORAR</p>
            <h2>Enciclopedia por uso</h2>
            <p>Militares, comerciales, privadas, carga, entrenamiento, históricas y experimentales.</p>
          </a>

          <a className="card" href="/radar">
            <p className="gold">EN VIVO</p>
            <h2>Radar aéreo</h2>
            <p>Tráfico aéreo actual con acceso a seguimiento externo y datos abiertos.</p>
          </a>

          <a className="card" href="/historia">
            <p className="gold">HISTORIA</p>
            <h2>Línea de tiempo</h2>
            <p>Desde los hermanos Wright hasta la aviación moderna y la era espacial.</p>
          </a>
        </div>
      </section>

      <section className="container" style={{ paddingBottom: 60 }}>
        <p className="gold">AERONAVES DESTACADAS</p>

        <div className="grid">
          {images.map((item) => (
            <article className="card" key={item.name} style={{ padding: 0, overflow: "hidden" }}>
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "100%",
                    height: 210,
                    objectFit: "cover",
                    display: "block"
                  }}
                />
              ) : (
                <div
                  style={{
                    height: 210,
                    background: "linear-gradient(135deg, #111, #333)"
                  }}
                />
              )}

              <div style={{ padding: 22 }}>
                <p className="gold">Ficha visual</p>
                <h2>{item.name}</h2>
                <p>Imagen real cargada desde Wikipedia/Wikimedia cuando está disponible.</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
