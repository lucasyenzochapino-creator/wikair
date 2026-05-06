export default function Header() {
  return (
    <header className="siteHeader">
      <a href="/" className="brand">
        <span className="brandIcon">✦</span>
        <span>WikiAir</span>
      </a>
      <nav>
        <a href="/enciclopedia">Enciclopedia</a>
        <a href="/historia">Historia</a>
        <a href="/radar">Radar</a>
      </nav>
    </header>
  );
}
