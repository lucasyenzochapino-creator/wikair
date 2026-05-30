import Explorer from "./Explorer";
import { aircraft } from "./data";

export default function EnciclopediaPage() {
  return (
    <main className="page">
      <section className="container hero compactHero">
        <a className="back" href="/">← Volver</a>
        <p className="gold">WIKIAIR · ENCICLOPEDIA</p>
        <h1>Aeronaves por tipo de uso</h1>
        <p>
          {aircraft.length}+ aeronaves con fichas completas. Las categorías no se mezclan: tocá una pestaña y abrí la ficha de cada aeronave.
        </p>
      </section>
      <Explorer />
    </main>
  );
}