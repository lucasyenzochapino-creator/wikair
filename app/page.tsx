
export default function HomePage() {
  return (
    <main style={{
      minHeight: "100vh",
      background: "#050505",
      color: "white",
      padding: "24px",
      fontFamily: "Arial, sans-serif"
    }}>
      <section style={{
        maxWidth: "900px",
        margin: "0 auto",
        paddingTop: "60px"
      }}>
        <p style={{
          color: "#d4af37",
          letterSpacing: "3px",
          textTransform: "uppercase",
          fontSize: "14px"
        }}>
          WikiAir
        </p>

        <h1 style={{
          fontSize: "42px",
          lineHeight: "1.1",
          margin: "16px 0"
        }}>
          Enciclopedia premium de aviación
        </h1>

        <p style={{
          color: "#cfcfcf",
          fontSize: "18px",
          lineHeight: "1.6"
        }}>
          Explora aviones militares, comerciales, privados e históricos.
          Fichas técnicas, historia aeronáutica y radar en vivo.
        </p>

        <div style={{
          marginTop: "32px",
          display: "grid",
          gap: "16px"
        }}>
          <a href="/enciclopedia" style={cardStyle}>Enciclopedia</a>
          <a href="/historia" style={cardStyle}>Historia de la aviación</a>
          <a href="/radar" style={cardStyle}>Radar en vivo</a>
        </div>
      </section>
    </main>
  );
}

const cardStyle = {
  display: "block",
  padding: "22px",
  border: "1px solid #333",
  borderRadius: "18px",
  background: "#111",
  color: "white",
  textDecoration: "none",
  fontSize: "20px"
};
