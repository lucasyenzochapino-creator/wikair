const timeline = [
  ["1903", "Primer vuelo controlado", "Los hermanos Wright realizan el primer vuelo motorizado controlado."],
  ["1914-1918", "Aviación militar temprana", "La Primera Guerra Mundial acelera el desarrollo de cazas y reconocimiento aéreo."],
  ["1939-1945", "Era de los grandes cazas", "Aviones como el Spitfire y el Mustang marcan la Segunda Guerra Mundial."],
  ["1950-1970", "Era del jet", "La aviación comercial y militar entra en una nueva etapa de velocidad y alcance."],
  ["1969", "Era espacial", "La ingeniería aeroespacial alcanza un hito con la llegada del ser humano a la Luna."],
  ["2000+", "Aviónica moderna", "Sistemas digitales, navegación avanzada y materiales compuestos dominan la aviación actual."]
];

export default function HistoriaPage() {
  return (
    <main className="page">
      <section className="container">
        <a className="back" href="/">← Volver</a>

        <p className="gold">LÍNEA DE TIEMPO</p>
        <h1>Historia de la aviación</h1>

        <div className="grid">
          {timeline.map(([year, title, text]) => (
            <article className="card" key={year}>
              <p className="gold">{year}</p>
              <h2>{title}</h2>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
