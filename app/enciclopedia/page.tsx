import Explorer from "./Explorer";
import { aircraft } from "./data";

export default function EnciclopediaPage() {
  return (
    <main className="page">
      <style>{`
        .imageBox {
          height: 280px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          background: #050505 !important;
          padding: 10px !important;
        }
        .imageBox .imageButton {
          width: 100% !important;
          height: 100% !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          background: #050505 !important;
        }
        .imageBox .imageButton img,
        .imageBox img {
          width: 100% !important;
          height: 100% !important;
          max-width: 100% !important;
          max-height: 100% !important;
          object-fit: contain !important;
          object-position: center center !important;
          background: #050505 !important;
        }
        @media (max-width: 600px) {
          .imageBox { height: 260px !important; padding: 8px !important; }
        }
      `}</style>

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
