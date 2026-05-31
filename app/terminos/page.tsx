import BackButton from "@/components/BackButton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y Condiciones — WikiAir",
  description:
    "Términos y Condiciones de uso de WikiAir, la enciclopedia de aviación más completa del mundo hispanohablante.",
};

export default function TerminosPage() {
  return (
    <div className="page">
      <div className="container" style={{ maxWidth: 820 }}>
        <BackButton label="← Volver al inicio" />

        <div className="hero" style={{ paddingBottom: 12 }}>
          <p
            className="gold"
            style={{
              fontSize: 13,
              letterSpacing: 2,
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            Legal
          </p>
          <h1 style={{ fontSize: "clamp(30px, 6vw, 56px)", marginBottom: 8 }}>
            Términos y <span className="gold">Condiciones</span>
          </h1>
          <p style={{ color: "#9e9e9e", fontSize: 14, margin: 0 }}>
            Vigentes desde enero de 2026 &nbsp;·&nbsp; WikiAir — Enciclopedia de
            Aviación
          </p>
        </div>

        <div style={bodyWrap}>

          <Section title="1. Identificación del titular">
            <p>
              El presente documento establece los Términos y Condiciones (en
              adelante, "los Términos") que regulan el acceso y uso del sitio web{" "}
              <strong>WikiAir — Enciclopedia de Aviación</strong> (en adelante,
              "el Sitio"). El titular del Sitio es:
            </p>
            <table style={tableStyle}>
              <tbody>
                <tr>
                  <td style={tdLabel}>Titular</td>
                  <td style={tdValue}>Enzo Chapino</td>
                </tr>
                <tr>
                  <td style={tdLabel}>Domicilio</td>
                  <td style={tdValue}>
                    Aldea Valle María, Entre Ríos, República Argentina
                  </td>
                </tr>
                <tr>
                  <td style={tdLabel}>Aplicación</td>
                  <td style={tdValue}>WikiAir — Enciclopedia de Aviación</td>
                </tr>
                <tr>
                  <td style={tdLabel}>Año de fundación</td>
                  <td style={tdValue}>2026</td>
                </tr>
              </tbody>
            </table>
            <p>
              El acceso y uso del Sitio implica la aceptación plena e
              incondicional de los presentes Términos. Si no estás de acuerdo
              con alguno de sus apartados, te rogamos que te abstengas de
              utilizar el Sitio.
            </p>
          </Section>

          <Section title="2. Naturaleza y finalidad del servicio">
            <Highlight color="green">
              WikiAir es un sitio web de <strong>uso gratuito y finalidad
              exclusivamente educativa</strong>. Su objetivo es difundir
              conocimiento sobre aviación civil y militar, historia aeronáutica,
              tecnología, récords y tráfico aéreo, en idioma español, sin costo
              alguno para el usuario.
            </Highlight>
            <p>
              El Sitio no requiere registro ni creación de cuenta. Cualquier
              persona con acceso a Internet puede consultarlo libremente. WikiAir
              no genera ingresos por publicidad dirigida ni por la venta de datos
              de sus visitantes.
            </p>
          </Section>

          <Section title="3. Propiedad intelectual y derechos de autor">
            <p>
              Los contenidos editoriales del Sitio — incluyendo textos
              descriptivos, fichas técnicas, selección y organización de datos,
              diseño de la interfaz, código fuente, estructura y disposición de
              la información — son obra de <strong>Enzo Chapino</strong> y están
              protegidos por las leyes de propiedad intelectual de la República
              Argentina y por los convenios internacionales de derecho de autor.
            </p>
            <p>
              © 2026 Enzo Chapino. Todos los derechos reservados.
            </p>
            <p>
              Las <strong>imágenes de aeronaves e ilustraciones</strong> que
              aparecen en el Sitio provienen de <strong>Wikipedia y Wikimedia
              Commons</strong> y son utilizadas bajo sus respectivas licencias
              libres (Creative Commons Attribution, dominio público u otras
              licencias abiertas). Cada imagen conserva los derechos de su autor
              original conforme a la licencia que la rige; WikiAir no reclama
              derechos sobre dichas imágenes.
            </p>
            <p>
              Los datos de tráfico aéreo mostrados en la sección Radar provienen
              de fuentes públicas (ADS-B) e integraciones con terceros
              (Flightradar24, ADS-B Exchange, OpenSky Network), cada uno con sus
              propias condiciones de uso.
            </p>
          </Section>

          <Section title="4. Uso permitido del contenido">
            <p>
              Se permite el uso personal, educativo y no comercial de la
              información disponible en WikiAir, siempre que se cite la fuente
              ("WikiAir — Enciclopedia de Aviación") de forma visible.
            </p>
            <p>
              Queda <strong>expresamente prohibido</strong> sin autorización
              previa y por escrito del titular:
            </p>
            <ul style={ulStyle}>
              <li>
                Reproducir, distribuir, publicar o modificar los contenidos
                editoriales de WikiAir con fines <strong>comerciales</strong>.
              </li>
              <li>
                Incorporar los textos, fichas técnicas o el diseño del Sitio en
                productos o servicios comerciales propios o de terceros.
              </li>
              <li>
                Realizar scraping masivo del Sitio o de sus APIs internas con
                fines de negocio o reventa de datos.
              </li>
              <li>
                Suplantar la identidad del Sitio o presentar sus contenidos como
                propios sin indicar la autoría correspondiente.
              </li>
            </ul>
            <p>
              Para solicitar autorización de uso comercial, contactá al titular
              mediante los datos indicados en la sección 9.
            </p>
          </Section>

          <Section title="5. Exactitud y carácter referencial de los datos">
            <p>
              WikiAir se esfuerza por ofrecer información precisa y actualizada.
              Sin embargo, los datos técnicos (velocidades, altitudes, alcances,
              capacidades de aeronaves, fechas históricas, récords, etc.) son de{" "}
              <strong>carácter aproximado y meramente referencial</strong>. No
              deben utilizarse como fuente primaria para decisiones técnicas,
              operacionales, regulatorias ni de seguridad aeronáutica.
            </p>
            <p>
              Para información oficial sobre aeronaves, operaciones o
              regulaciones aéreas, consultá las autoridades de aviación civil
              competentes (ANAC Argentina, OACI, FAA, EASA, según corresponda).
            </p>
          </Section>

          <Section title="6. Limitación de responsabilidad — Radar en tiempo real">
            <Highlight color="blue">
              Los datos mostrados en la sección <strong>Radar en Vivo</strong> son
              obtenidos de servicios externos (Flightradar24, ADS-B Exchange,
              OpenSky Network) y pueden presentar retrasos, imprecisiones o
              interrupciones. WikiAir <strong>no garantiza la exactitud, completitud
              ni disponibilidad</strong> en tiempo real de dichos datos y{" "}
              <strong>no asume responsabilidad alguna</strong> por errores en la
              información de radar mostrada.
            </Highlight>
            <p>
              La información de radar es de uso exclusivamente educativo y de
              referencia. No debe utilizarse para la planificación, supervisión
              ni gestión de operaciones de vuelo reales.
            </p>
          </Section>

          <Section title="7. Disponibilidad y modificaciones del servicio">
            <p>
              El titular se reserva el derecho de:
            </p>
            <ul style={ulStyle}>
              <li>
                Modificar, ampliar, reducir o discontinuar cualquier sección o
                funcionalidad del Sitio <strong>sin previo aviso</strong>.
              </li>
              <li>
                Actualizar el diseño, la estructura o los contenidos del Sitio
                en cualquier momento.
              </li>
              <li>
                Suspender temporalmente el acceso al Sitio por razones de
                mantenimiento, seguridad u otras causas justificadas.
              </li>
            </ul>
            <p>
              WikiAir no garantiza la disponibilidad ininterrumpida del Sitio ni
              se responsabiliza por interrupciones debidas a fallas de
              infraestructura, conectividad de terceros u otras causas fuera de
              su control directo.
            </p>
          </Section>

          <Section title="8. Exención de responsabilidad">
            <p>
              En la máxima medida permitida por la legislación aplicable, el
              titular no será responsable por daños directos, indirectos,
              incidentales o consecuentes derivados del uso o la imposibilidad
              de uso del Sitio, incluyendo pero no limitándose a:
            </p>
            <ul style={ulStyle}>
              <li>Errores u omisiones en el contenido enciclopédico.</li>
              <li>Imprecisiones en los datos de radar en tiempo real.</li>
              <li>Interrupciones o fallos en el acceso al Sitio.</li>
              <li>
                Contenidos de terceros enlazados desde el Sitio (Wikimedia,
                servicios de radar, etc.).
              </li>
            </ul>
          </Section>

          <Section title="9. Ley aplicable y jurisdicción">
            <p>
              Los presentes Términos y Condiciones se rigen e interpretan de
              conformidad con el <strong>derecho argentino</strong>, en
              particular las disposiciones del Código Civil y Comercial de la
              Nación Argentina y la legislación vigente en materia de comercio
              electrónico, propiedad intelectual y protección al consumidor.
            </p>
            <p>
              Cualquier controversia derivada del uso del Sitio o de la
              interpretación de los presentes Términos será sometida a los
              tribunales competentes de la República Argentina, con domicilio
              del titular en la provincia de Entre Ríos.
            </p>
          </Section>

          <Section title="10. Modificaciones a los Términos">
            <p>
              El titular se reserva el derecho de actualizar los presentes
              Términos en cualquier momento, publicando la nueva versión en esta
              misma página con la fecha de actualización correspondiente. El uso
              continuado del Sitio tras la publicación de cambios implica la
              aceptación de los Términos vigentes.
            </p>
          </Section>

          <Section title="11. Contacto">
            <p>
              Para consultas, solicitudes de autorización de uso, reclamos o
              cualquier comunicación relacionada con estos Términos, podés
              contactar al titular:
            </p>
            <table style={tableStyle}>
              <tbody>
                <tr>
                  <td style={tdLabel}>Responsable</td>
                  <td style={tdValue}>Enzo Chapino</td>
                </tr>
                <tr>
                  <td style={tdLabel}>Localidad</td>
                  <td style={tdValue}>
                    Aldea Valle María, Entre Ríos, República Argentina
                  </td>
                </tr>
              </tbody>
            </table>
          </Section>

          <div style={footerLinksStyle}>
            <a href="/privacidad" style={linkStyle}>Política de Privacidad →</a>
            <a href="/acerca" style={linkStyle}>Acerca de WikiAir →</a>
          </div>

        </div>
        <div style={{ paddingBottom: 64 }} />
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section style={sectionStyle}>
      <h2 style={h2Style}>{title}</h2>
      {children}
    </section>
  );
}

function Highlight({
  children,
  color,
}: {
  children: React.ReactNode;
  color: "green" | "blue";
}) {
  const borderColor =
    color === "green" ? "rgba(0,200,100,.35)" : "rgba(0,180,255,.35)";
  const bg =
    color === "green" ? "rgba(0,200,100,.06)" : "rgba(0,180,255,.06)";
  const textColor = color === "green" ? "#7effc0" : "#9eefff";
  return (
    <p
      style={{
        border: `1px solid ${borderColor}`,
        background: bg,
        color: textColor,
        borderRadius: 12,
        padding: "14px 18px",
        margin: "16px 0",
        lineHeight: 1.6,
        fontSize: 15,
      }}
    >
      {children}
    </p>
  );
}

const bodyWrap: React.CSSProperties = {
  marginTop: 8,
};

const sectionStyle: React.CSSProperties = {
  padding: "32px 0",
  borderBottom: "1px solid rgba(255,255,255,0.07)",
};

const h2Style: React.CSSProperties = {
  fontSize: "clamp(16px, 3vw, 22px)",
  color: "#d4af37",
  marginBottom: 14,
  marginTop: 0,
};

const tableStyle: React.CSSProperties = {
  borderCollapse: "collapse" as const,
  width: "100%",
  maxWidth: 560,
  marginBottom: 16,
};

const tdLabel: React.CSSProperties = {
  padding: "8px 12px 8px 0",
  color: "#888",
  fontSize: 13,
  verticalAlign: "top",
  whiteSpace: "nowrap" as const,
  width: 120,
};

const tdValue: React.CSSProperties = {
  padding: "8px 0",
  color: "#cfcfcf",
  fontSize: 14,
  lineHeight: 1.5,
};

const ulStyle: React.CSSProperties = {
  color: "#cfcfcf",
  lineHeight: 2,
  paddingLeft: 20,
  margin: "12px 0",
};

const footerLinksStyle: React.CSSProperties = {
  display: "flex",
  gap: 12,
  flexWrap: "wrap" as const,
  padding: "32px 0 0",
};

const linkStyle: React.CSSProperties = {
  border: "1px solid rgba(212,175,55,.35)",
  background: "rgba(212,175,55,.08)",
  color: "#f0d98a",
  borderRadius: 999,
  padding: "9px 18px",
  textDecoration: "none",
  fontSize: 14,
};
