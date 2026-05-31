import BackButton from "@/components/BackButton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad — WikiAir",
  description:
    "Política de Privacidad de WikiAir. Conocé cómo tratamos la información en nuestra enciclopedia de aviación.",
};

export default function PrivacidadPage() {
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
            Política de <span className="gold">Privacidad</span>
          </h1>
          <p style={{ color: "#9e9e9e", fontSize: 14, margin: 0 }}>
            Vigente desde enero de 2026 &nbsp;·&nbsp; WikiAir — Enciclopedia de
            Aviación
          </p>
        </div>

        <div style={bodyWrap}>

          <Section title="1. Identificación del titular">
            <p>
              En cumplimiento con la normativa vigente en materia de protección
              de datos y privacidad digital, se informa que el titular y
              responsable del sitio web <strong>WikiAir</strong> (en adelante,
              "el Sitio") es:
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
                  <td style={tdLabel}>Sitio web</td>
                  <td style={tdValue}>WikiAir (aplicación web progresiva)</td>
                </tr>
              </tbody>
            </table>
          </Section>

          <Section title="2. Datos personales recopilados">
            <Highlight color="green">
              WikiAir <strong>no recopila, almacena ni procesa datos personales</strong> de
              sus usuarios. No existe registro de cuentas, formularios de
              suscripción, comentarios ni ningún mecanismo que identifique a las
              personas que visitan el Sitio.
            </Highlight>
            <p>
              El Sitio no solicita nombre, dirección de correo electrónico,
              número de teléfono, dirección postal, número de documento, datos
              de pago ni ningún otro dato de carácter personal. Podés navegar
              por WikiAir de forma completamente anónima.
            </p>
          </Section>

          <Section title="3. Cookies y tecnologías de seguimiento">
            <p>
              WikiAir <strong>no utiliza cookies propias de seguimiento o
              analíticas</strong>. No se instalan en tu navegador cookies que
              rastreen tu comportamiento de navegación con fines publicitarios
              ni de perfilado.
            </p>
            <p>
              El Sitio puede hacer uso de la caché del navegador (almacenamiento
              local / Service Worker) exclusivamente para mejorar el rendimiento
              de la aplicación y permitir su funcionamiento sin conexión como
              Aplicación Web Progresiva (PWA). Estos mecanismos no transmiten
              información a terceros y pueden borrarse desde la configuración de
              tu navegador en cualquier momento.
            </p>
          </Section>

          <Section title="4. Imágenes de Wikipedia y Wikimedia Commons">
            <p>
              Las imágenes de aeronaves e ilustraciones históricas que aparecen
              en WikiAir provienen de{" "}
              <strong>Wikipedia y Wikimedia Commons</strong>, proyectos de la
              Fundación Wikimedia. Dichas imágenes son servidas directamente
              desde los servidores de Wikimedia; al cargar el Sitio, tu
              navegador puede establecer una conexión con los servidores de
              Wikimedia para obtener esas imágenes.
            </p>
            <p>
              La Fundación Wikimedia tiene su propia política de privacidad,
              disponible en{" "}
              <a
                href="https://foundation.wikimedia.org/wiki/Privacy_policy"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#d4af37" }}
              >
                foundation.wikimedia.org
              </a>
              . WikiAir no controla ni es responsable de las prácticas de
              privacidad de Wikimedia.
            </p>
            <p>
              Todo el contenido proveniente de Wikimedia Commons es utilizado
              bajo sus respectivas licencias libres (Creative Commons, dominio
              público, etc.), conforme a los términos de cada obra.
            </p>
          </Section>

          <Section title="5. Radar de vuelo y datos ADS-B">
            <p>
              La sección de <strong>Radar en Vivo</strong> de WikiAir integra
              servicios externos de seguimiento de tráfico aéreo, que pueden
              incluir:
            </p>
            <ul style={ulStyle}>
              <li>Flightradar24</li>
              <li>ADS-B Exchange</li>
              <li>OpenSky Network</li>
            </ul>
            <p>
              Estos servicios operan sobre la red pública de receptores{" "}
              <strong>ADS-B (Automatic Dependent Surveillance–Broadcast)</strong>,
              una tecnología estándar de aviación civil por la cual las
              aeronaves emiten su posición, altitud, velocidad e identificador
              de vuelo de forma pública e irrestricta en frecuencias de radio
              abiertas.
            </p>
            <Highlight color="blue">
              Los datos de tráfico aéreo que muestra WikiAir son{" "}
              <strong>información pública</strong>. No identifican a personas
              físicas, no contienen datos personales de pasajeros ni tripulación,
              y su uso es exclusivamente educativo y de referencia.
            </Highlight>
            <p>
              Al acceder a la sección de Radar, tu navegador puede conectarse a
              los servidores de los proveedores antes mencionados. Cada uno de
              estos servicios tiene sus propias políticas de privacidad
              independientes de WikiAir. WikiAir no almacena, procesa ni
              retransmite datos de posicionamiento de aeronaves.
            </p>
          </Section>

          <Section title="6. Servicios de terceros">
            <p>
              El funcionamiento de WikiAir puede involucrar conexiones a los
              siguientes servicios externos, cada uno con sus propias políticas
              de privacidad:
            </p>
            <ul style={ulStyle}>
              <li>
                <strong>Wikimedia Commons / Wikipedia API</strong> — imágenes e
                información enciclopédica
              </li>
              <li>
                <strong>Flightradar24 / ADS-B Exchange / OpenSky</strong> —
                datos de tráfico aéreo en tiempo real
              </li>
              <li>
                <strong>Vercel / CDN de alojamiento</strong> — infraestructura
                del servidor (registros de acceso estándar del servidor)
              </li>
            </ul>
            <p>
              WikiAir no es responsable de las prácticas de privacidad de
              ninguno de estos terceros y recomienda consultar sus respectivas
              políticas antes de interactuar directamente con sus plataformas.
            </p>
          </Section>

          <Section title="7. Menores de edad">
            <p>
              WikiAir es un sitio de contenido educativo apto para todo público.
              Dado que no recopila datos personales de ningún usuario, no
              existen restricciones especiales relacionadas con el acceso de
              menores. No obstante, se recomienda que menores de edad naveguen
              con supervisión de un adulto responsable.
            </p>
          </Section>

          <Section title="8. Derechos del usuario">
            <p>
              Dado que WikiAir no almacena datos personales de sus visitantes,
              no es técnicamente posible ejercer derechos de acceso,
              rectificación, supresión o portabilidad sobre información que no
              existe en nuestros sistemas. Si considerás que algún aspecto de
              esta política te afecta, podés contactarnos por el medio indicado
              en la sección siguiente.
            </p>
          </Section>

          <Section title="9. Contacto para consultas de privacidad">
            <p>
              Para cualquier consulta, reclamo o sugerencia relacionada con la
              privacidad en WikiAir, podés comunicarte con el titular del Sitio:
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

          <Section title="10. Modificaciones a esta política">
            <p>
              El titular se reserva el derecho de actualizar esta Política de
              Privacidad en cualquier momento, publicando la nueva versión en
              esta misma página con la correspondiente fecha de actualización.
              El uso continuado del Sitio tras la publicación de cambios implica
              la aceptación de la política vigente.
            </p>
          </Section>

          <div style={footerLinksStyle}>
            <a href="/terminos" style={linkStyle}>Términos y Condiciones →</a>
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
