import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page">
      <section className="container" style={{ paddingTop: 100, paddingBottom: 80, textAlign: "center" }}>
        <p className="gold" style={{ marginBottom: 16, fontSize: 12, letterSpacing: "0.12em" }}>ERROR · PÁGINA NO ENCONTRADA</p>
        <div style={{
          fontSize: "clamp(80px, 18vw, 160px)", fontWeight: 900, lineHeight: 1,
          letterSpacing: -8, color: "var(--sky)", opacity: 0.2, userSelect: "none",
        }}>
          404
        </div>
        <h2 style={{ fontSize: "clamp(20px, 4vw, 34px)", fontWeight: 800, letterSpacing: -1, marginTop: 20, marginBottom: 12 }}>
          Este avión se perdió en el radar
        </h2>
        <p style={{ color: "var(--muted2)", maxWidth: 360, margin: "0 auto 40px", lineHeight: 1.7, fontSize: 15 }}>
          La página que buscás no existe. Puede haberse movido o la URL puede estar mal escrita.
        </p>
        <Link href="/" className="btnPrimary">
          Volver a WikiAir
        </Link>
      </section>
    </main>
  );
}
