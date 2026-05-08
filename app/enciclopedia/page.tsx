import Explorer from "./Explorer";
import data from "./registry.json";

export default function EnciclopediaPage() {
  return (
    <main className="page">
      <section className="container hero compactHero">
        <a className="back" href="/">← Volver</a>
        <p className="gold">WIKIAIR · ENCICLOPEDIA</p>
        <h1>Aeronaves por tipo de uso</h1>
        <p>
          Registro v2 con {data.total} aeronaves. Las categorías no se mezclan: tocá una pestaña y abrí la ficha completa de cada aeronave.
        </p>
      </section>
      <Explorer />
    </main>
  );
}
