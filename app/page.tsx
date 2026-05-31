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
          <div className="heroLabel">WIKIAIR · ESCUELA DE VUELO Y ENCICLOPEDIA</div>
          <h1 className="heroTitle">
            Aprendé<br />
            <span>a volar</span>
          </h1>
          <p className="heroSub">
            Desde cero hasta experto. Glosario, instrumentos, licencias, 648 aeronaves con fichas técnicas,
            radar en vivo y quiz con 50 preguntas. La escuela de vuelo digital.
          </p>
          <div className="heroCta">
            <Link className="btnPrimary" href="/vuelo">Empezar a aprender</Link>
            <Link className="btnOutline" href="/enciclopedia">Enciclopedia</Link>
          </div>

          <div className="statsBar">
            <div className="statItem"><h3>648</h3><p>Aeronaves en catálogo</p></div>
            <div className="statItem"><h3>60+</h3><p>Términos en el glosario</p></div>
            <div className="statItem"><h3>50</h3><p>Preguntas en el quiz</p></div>
            <div className="statItem"><h3>Live</h3><p>Radar en tiempo real</p></div>
          </div>
        </div>
      </section>

      {/* ESCUELA DE VUELO */}
      <section className="section sectionSm">
        <div className="container">
          <div className="sectionHeader">
            <div className="sectionLabel">ESCUELA DE VUELO</div>
            <h2 className="sectionTitle">Aprendé aviación paso a paso</h2>
          </div>
          <div className="navGrid">
            <Link className="navCard" href="/vuelo">
              <h2>¿Cómo vuela un avión?</h2>
              <p>Las 4 fuerzas, las partes del avión y las 7 fases de cada vuelo. El fundamento de todo.</p>
              <span className="cardArrow">Módulo 1 →</span>
            </Link>
            <Link className="navCard" href="/instrumentos">
              <h2>Instrumentos de vuelo</h2>
              <p>Los 6 básicos del cockpit, glass cockpit moderno, alertas y alarmas. Lo que leen los pilotos.</p>
              <span className="cardArrow">Módulo 2 →</span>
            </Link>
            <Link className="navCard" href="/glosario">
              <h2>Glosario de aviación</h2>
              <p>60+ términos explicados: ATC, IFR, VFR, METAR, ILS, ETOPS, squawk y todo lo que necesitás saber.</p>
              <span className="cardArrow">Módulo 3 →</span>
            </Link>
            <Link className="navCard" href="/licencias">
              <h2>Licencias de piloto</h2>
              <p>De PPL a ATPL: requisitos, horas y costos reales. El camino de cero a capitán de aerolínea en Argentina.</p>
              <span className="cardArrow">Módulo 4 →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* EXPLORAR */}
      <section className="section sectionSm">
        <div className="container">
          <div className="sectionHeader">
            <div className="sectionLabel">EXPLORAR</div>
            <h2 className="sectionTitle">Todo sobre aviación en un lugar</h2>
          </div>
          <div className="navGrid">
            <Link className="navCard" href="/enciclopedia">
              <h2>Enciclopedia</h2>
              <p>648 aeronaves organizadas por tipo. Militares, comerciales, históricas, helicópteros y más. Fichas técnicas completas.</p>
              <span className="cardArrow">Explorar →</span>
            </Link>
            <Link className="navCard" href="/records">
              <h2>Récords</h2>
              <p>Los más rápidos, los más grandes, los más históricos. Los extremos de la aviación mundial.</p>
              <span className="cardArrow">Ver récords →</span>
            </Link>
            <Link className="navCard" href="/quiz">
              <h2>Quiz · 50 preguntas</h2>
              <p>Ponete a prueba con 50 preguntas y 30 segundos por respuesta. Historia, récords, técnica y más.</p>
              <span className="cardArrow">Jugar →</span>
            </Link>
            <Link className="navCard" href="/radar">
              <h2>Radar en vivo</h2>
              <p>Tráfico aéreo en tiempo real. Seguí vuelos, altitudes y velocidades en todo el mundo ahora mismo.</p>
              <span className="cardArrow">Ver radar →</span>
            </Link>
            <Link className="navCard" href="/historia">
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
              <Link className="featuredCard" key={item.name} href={`/enciclopedia?open=${encodeURIComponent(item.name)}`}>
                {item.image ? (
                  <img src={item.image} alt={item.name} />
                ) : (
                  <div className="featuredCardFallback"><span className="fallbackName">{item.name}</span></div>
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
