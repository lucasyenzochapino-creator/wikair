import Nav from "../../Nav";
import WikiImage from "../../WikiImage";
import { aircraft, getAircraft, relatedAircraft } from "../../aircraft";

export function generateStaticParams() {
  return aircraft.map((item) => ({ slug: item.slug }));
}

export default async function AircraftDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getAircraft(slug);

  if (!item) {
    return (
      <>
        <Nav />
        <main className="page">
          <section className="container">
            <a className="btn" href="/enciclopedia">← Volver</a>
            <h1>Avión no encontrado</h1>
          </section>
        </main>
      </>
    );
  }

  const related = relatedAircraft(item);

  return (
    <>
      <Nav />
      <main className="page">
        <section className="container detail-hero">
          <div>
            <a className="back" href="/enciclopedia">← Volver a enciclopedia</a>
            <p className="kicker">{item.use} · {item.category}</p>
            <h1>{item.name}</h1>
            <p className="lead">{item.summary}</p>

            <div className="notice">
              Datos técnicos referenciales. En próximas versiones pueden validarse contra Wikidata/Firebase por versión exacta.
            </div>
          </div>

          <div className="detail-image">
            <WikiImage title={item.wikiTitle} alt={item.name} className="air-img" />
          </div>
        </section>

        <section className="container section">
          <div className="card card-pad">
            <h2>Ficha técnica</h2>
            <div className="spec-row"><span>Fabricante</span><strong>{item.manufacturer}</strong></div>
            <div className="spec-row"><span>País</span><strong>{item.country}</strong></div>
            <div className="spec-row"><span>Uso</span><strong>{item.use}</strong></div>
            <div className="spec-row"><span>Categoría</span><strong>{item.category}</strong></div>
            <div className="spec-row"><span>Era</span><strong>{item.era}</strong></div>
            <div className="spec-row"><span>Estado</span><strong>{item.status}</strong></div>
            <div className="spec-row"><span>Velocidad</span><strong>{item.maxSpeed}</strong></div>
            <div className="spec-row"><span>Alcance</span><strong>{item.range}</strong></div>
            <div className="spec-row"><span>Techo</span><strong>{item.ceiling}</strong></div>
            <div className="spec-row"><span>Motores</span><strong>{item.engines}</strong></div>
            <div className="spec-row"><span>Capacidad</span><strong>{item.capacity}</strong></div>
            <div className="spec-row"><span>Licencia</span><strong>{item.license}</strong></div>
          </div>
        </section>

        <section className="container section">
          <p className="kicker">Más de {item.use}</p>
          <div className="air-grid">
            {related.map((other) => (
              <a className="card air-card" href={`/avion/${other.slug}`} key={other.slug}>
                <div className="air-thumb">
                  <WikiImage title={other.wikiTitle} alt={other.name} className="air-img soft" />
                  <span className="image-label">{other.use}</span>
                </div>
                <div className="air-body">
                  <span className="badge">{other.category}</span>
                  <div className="air-title">{other.name}</div>
                  <div className="air-meta">{other.manufacturer}</div>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
