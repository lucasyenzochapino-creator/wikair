export default function Nav() {
  return (
    <header className="nav">
      <div className="nav-inner">
        <a href="/" className="logo">
          <span className="logo-mark">✈</span>
          <span>WIKIAIR</span>
        </a>
        <nav className="nav-links">
          <a className="nav-link" href="/enciclopedia">Enciclopedia</a>
          <a className="nav-link" href="/historia">Historia</a>
          <a className="nav-link" href="/radar">Radar</a>
        </nav>
      </div>
    </header>
  );
}
