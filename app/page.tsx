import Link from "next/link";

const featured = [
  { name: "F-22 Raptor", wiki: "F-22 Raptor", role: "Caza de 5.ª generación", group: "Militar" },
  { name: "Concorde", wiki: "Concorde", role: "Transporte supersónico", group: "Histórica" },
  { name: "Airbus A380", wiki: "Airbus A380", role: "Avión comercial más grande", group: "Comercial" },
  { name: "SR-71 Blackbird", wiki: "SR-71 Blackbird", role: "El avión más rápido", group: "Récord" },
  { name: "Supermarine Spitfire", wiki: "Supermarine Spitfire", role: "Caza de la RAF – WWII", group: "Histórica" },
  { name: "Boeing 747", wiki: "Boeing 747", role: "El jumbo jet original", group: "Comercial" },
];

async function getWikiImage(title: string) {
  try {
    const res = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data?.thumbnail?.source || data?.originalimage?.source || null;
  } catch {
    return null;
  }
}

export default async function HomePage() {
  const featuredWithImages = await Promise.all(
    featured.map(async (item) => ({
      ...item,
      image: await getWikiImage(item.wiki)
    }))
  );

  return (
    <main>
      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div className="heroLabel">✈ WIKIAIR · ENCICLOPEDIA DE AVIACIÓN</div>
          <h1 className="heroTitle">
            Todo sobre<br />
            <span>aviación</span>
          </h1>
          <p className="heroSub">
            648 aeronaves con fichas técnicas completas — militares, comerciales, históricas,
            helicópteros, planeadores y más. Imágenes reales, radar en vivo y récords mundiales.
          </p>
          <div className="heroCta">
            <Link className="btnPrimary" href="/enciclopedia">📖 Explorar enciclopedia</Link>
            <Link className="btnOutline" href="/radar">📡 Radar en vivo</Link>
          </div>

          <div className="statsBar">
            <div className="statItem"><h3>648</h3><p>Aeronaves en catálogo</p></div>
            <div className="statItem"><h3>14</h3><p>Categorías</p></div>
            <div className="statItem"><h3>3</h3><p>Radares en vivo</p></div>
            <div className="statItem"><h3>20</h3><p>Preguntas en el quiz</p></div>
          </div>
        </div>
      </section>

      {/* SECCIONES */}
      <section className="section sectionSm">
        <div className="container">
          <div className="sectionHeader">
            <div className="sectionLabel">SECCIONES</div>
            <h2 className="sectionTitle">Todo sobre aviación en un lugar</h2>
          </div>
          <div className="navGrid">
            <Link className="navCard" href="/enciclopedia">
              <span className="navCardIcon">📖</span>
              <h2>Enciclopedia</h2>
              <p>648 aeronaves organizadas por tipo. Militares, comerciales, históricas, helicópteros y más. Fichas técnicas completas.</p>
              <span className="cardArrow">Explorar →</span>
            </Link>
            <Link className="navCard" href="/records">
              <span className="navCardIcon">🏆</span>
              <h2>Récords</h2>
              <p>Los más rápidos, los más grandes, los más históricos. Los extremos de la aviación mundial.</p>
              <span className="cardArrow">Ver récords →</span>
            </Link>
            <Link className="navCard" href="/quiz">
              <span className="navCardIcon">🎯</span>
              <h2>Quiz</h2>
              <p>Ponete a prueba con 20 preguntas sobre aviones, récords, historia y curiosidades. ¿Qué tanto sabés?</p>
              <span className="cardArrow">Jugar →</span>
            </Link>
            <Link className="navCard" href="/radar">
              <span className="navCardIcon">📡</span>
              <h2>Radar en vivo</h2>
              <p>Tráfico aéreo en tiempo real. Seguí vuelos, altitudes y trayectorias en todo el mundo.</p>
              <span className="cardArrow">Ver radar →</span>
            </Link>
            <Link className="navCard" href="/historia">
              <span className="navCardIcon">📜</span>
              <h2>Historia</h2>
              <p>Desde los hermanos Wright hasta la era de los drones. La historia completa de la aviación.</p>
              <span className="cardArrow">Ver historia →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* AERONAVES DESTACADAS */}
      <section className="section">
        <div className="container">
          <div className="sectionHeader">
            <div className="sectionLabel">AERONAVES DESTACADAS</div>
            <h2 className="sectionTitle">Íconos de la aviación mundial</h2>
          </div>
          <div className="featuredGrid">
            {featuredWithImages.map((item) => (
              <Link className="featuredCard" key={item.name} href="/enciclopedia">
                {item.image ? (
                  <img src={item.image} alt={item.name} />
                ) : (
                  <div className="featuredCardFallback"><span>✈</span></div>
                )}
                <div className="featuredCardOverlay">
                  <p>{item.group} · {item.role}</p>
                  <h3>{item.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
