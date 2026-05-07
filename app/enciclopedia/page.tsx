import Explorer from "./Explorer";
import { aircraft } from "./data";

export default function EnciclopediaPage() {
  return (
    <main className="page">
      <section className="container hero compactHero">
        <a className="back" href="/">← Volver</a>
        <p className="gold">WIKIAIR · ENCICLOPEDIA</p>
        <h1>Aviones por tipo de uso</h1>
        <p>
          {aircraft.length} aeronaves iniciales organizadas por pestañas. No se mezclan categorías: elegí militar, comercial, privada, carga, entrenamiento, histórica o experimental y abrí la ficha completa de cada avión.
        </p>
      </section>
      <Explorer />
    </main>
  );
}
