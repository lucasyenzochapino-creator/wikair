import Header from "@/components/Header";
import WikiImage from "@/components/WikiImage";
import { aircraft, getAircraftBySlug } from "@/lib/aircraft";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return aircraft.map((item) => ({ slug: item.slug }));
}

export default function AircraftDetailPage({ params }: { params: { slug: string } }) {
  const item = getAircraftBySlug(params.slug);
  if (!item) return notFound();

  const specs = [
    ["Uso", item.use],
    ["Categoría", item.category],
    ["Fabricante", item.manufacturer],
    ["País", item.country],
    ["Primer vuelo", item.firstFlight],
    ["Estado", item.status],
    ["Velocidad máxima", item.maxSpeed],
    ["Alcance", item.range],
    ["Techo de vuelo", item.ceiling],
    ["Motores", item.engines],
    ["Tripulación", item.crew],
    ["Capacidad", item.capacity],
    ["Licencia requerida", item.license],
    ["Era", item.era]
  ];

  return (
    <main className="page">
      <Header />
      <section className="container specLayout">
        <div className="specImageBox">
          <WikiImage title={item.wikiTitle} alt={item.name} className="aircraftImage" />
        </div>

        <article className="specPanel">
          <a className="backLink" href="/enciclopedia">← Volver a enciclopedia</a>
          <p className="kicker">{item.use} · {item.country}</p>
          <h1>{item.name}</h1>
          <p className="lead">{item.summary}</p>

          <div className="specGrid">
            {specs.map(([label, value]) => (
              <div className="specItem" key={label}>
                <small>{label}</small>
                <span>{value}</span>
              </div>
            ))}
          </div>

          <p className="notice">
            Los datos pueden variar según versión, motor, configuración, carga y operador. Esta ficha está preparada para ser refinada con fuentes aeronáuticas específicas.
          </p>
        </article>
      </section>
    </main>
  );
}
