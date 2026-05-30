export default function Footer() {
  return (
    <footer className="mainFooter">
      <div className="footerInner">
        <div className="footerGrid">
          <div className="footerBrand">
            <h3>WikiAir</h3>
            <p>La enciclopedia de aviación más completa del mundo hispanohablante. Más de 500 aeronaves con fichas técnicas, imágenes reales y radar en vivo.</p>
          </div>
          <div className="footerCol">
            <h4>Explorar</h4>
            <ul>
              <li><a href="/enciclopedia">Enciclopedia</a></li>
              <li><a href="/historia">Historia</a></li>
              <li><a href="/records">Récords</a></li>
              <li><a href="/radar">Radar en vivo</a></li>
              <li><a href="/quiz">Quiz</a></li>
            </ul>
          </div>
          <div className="footerCol">
            <h4>Legal</h4>
            <ul>
              <li><a href="/privacidad">Privacidad</a></li>
              <li><a href="/terminos">Términos de uso</a></li>
              <li><a href="/acerca">Acerca de</a></li>
            </ul>
          </div>
          <div className="footerCol">
            <h4>Proyecto</h4>
            <ul>
              <li><a href="/acerca">Sobre WikiAir</a></li>
              <li><a href="/">Inicio</a></li>
            </ul>
          </div>
        </div>
        <div className="footerDivider" />
        <div className="footerBottom">
          <p>© 2026 Enzo Chapino · Aldea Valle María, Entre Ríos, Argentina · Todos los derechos reservados</p>
          <div className="footerLegalLinks">
            <a href="/privacidad">Privacidad</a>
            <a href="/terminos">Términos</a>
            <a href="/acerca">Acerca</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
