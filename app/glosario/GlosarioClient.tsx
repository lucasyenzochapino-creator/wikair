"use client";

import { useState } from "react";
import Link from "next/link";

type Term = { term: string; def: string; cat: string };

const terms: Term[] = [
  { term: "ADS-B", def: "Sistema de vigilancia automática donde cada avión transmite su posición GPS, altitud e identidad cada segundo. Base de los radares civiles modernos.", cat: "Tecnología" },
  { term: "Alerón", def: "Superficies móviles en el borde trasero de las alas que controlan el rolido (inclinación lateral). Cuando uno sube, el otro baja.", cat: "Aerodinámica" },
  { term: "Altímetro", def: "Instrumento que mide la altitud basándose en la presión atmosférica. A mayor altitud, menor presión. Se ajusta con el código QNH.", cat: "Instrumentos" },
  { term: "Altitud", def: "Distancia vertical sobre el nivel medio del mar (MSL). Se mide en metros o pies. 1 pie = 0,30 m.", cat: "Navegación" },
  { term: "Angulo de ataque", def: "Ángulo entre el eje longitudinal del ala y el flujo de aire que la golpea. Si supera el ángulo crítico (~15–20°), el ala entra en pérdida (stall).", cat: "Aerodinámica" },
  { term: "ATC", def: "Air Traffic Control. Sistema de control de tráfico aéreo que separa y guía aeronaves en tierra y en vuelo para evitar colisiones.", cat: "Operaciones" },
  { term: "ATPL", def: "Airline Transport Pilot Licence. Licencia máxima en aviación civil. Requerida para ser Comandante en aerolíneas comerciales. Mínimo 1.500 horas (OACI).", cat: "Licencias" },
  { term: "Autopiloto", def: "Sistema automático que mantiene el rumbo, altitud y velocidad programados. No reemplaza al piloto — éste monitorea constantemente.", cat: "Tecnología" },
  { term: "Balsa de emergencia", def: "Equipo de salvamento obligatorio en vuelos sobre océanos. Se activa automáticamente al contacto con el agua.", cat: "Seguridad" },
  { term: "Barrera del sonido", def: "Mach 1 ≈ 1.235 km/h al nivel del mar. Al superarla se genera una onda de choque y un boom sónico audible en tierra.", cat: "Aerodinámica" },
  { term: "Cabina", def: "Zona delantera del avión donde se ubican los pilotos y todos los controles e instrumentos de vuelo.", cat: "Operaciones" },
  { term: "Callsign", def: "Identificación única de cada vuelo en las comunicaciones de radio. Ej: 'Aerolíneas 1234'. Los militares usan nombres como 'Eagle 1'.", cat: "Comunicaciones" },
  { term: "Carta de navegación", def: "Mapa aeronáutico con rutas aéreas, alturas mínimas, obstáculos, aeropuertos y ayudas a la navegación. Equivalente al mapa de ruta.", cat: "Navegación" },
  { term: "CPL", def: "Commercial Pilot Licence. Licencia que habilita a ser pagado por volar. Requiere mínimo 200 horas de vuelo total (norma ANAC/OACI). Edad mínima: 18 años.", cat: "Licencias" },
  { term: "Crucero", def: "Fase de vuelo horizontal estable a altitud y velocidad constante. Es la etapa más eficiente del vuelo, entre el ascenso y el descenso.", cat: "Operaciones" },
  { term: "CRM", def: "Crew Resource Management. Metodología de trabajo en equipo en cabina para minimizar errores humanos. Obligatorio en aviación comercial.", cat: "Operaciones" },
  { term: "Depresurización", def: "Pérdida de presión en cabina. Emergencia grave: por encima de 4.000 m sin presurización, los pasajeros pierden el conocimiento en minutos.", cat: "Seguridad" },
  { term: "DME", def: "Distance Measuring Equipment. Equipo que mide la distancia en millas náuticas a una estación en tierra. Complementa al VOR.", cat: "Navegación" },
  { term: "Elevador", def: "Superficie horizontal móvil en la cola que controla el cabeceo (morro arriba o abajo). Junto con los alerones define la actitud de vuelo.", cat: "Aerodinámica" },
  { term: "Empuje", def: "Thrust en inglés. Fuerza producida por los motores que propulsa al avión hacia adelante. Debe superar la resistencia para acelerar.", cat: "Aerodinámica" },
  { term: "ETOPS", def: "Extended-range Twin-engine Operations. Autorización para volar con dos motores sobre zonas remotas. Ej: ETOPS-180 = hasta 180 min de un aeropuerto alternativo.", cat: "Operaciones" },
  { term: "Factor de carga", def: "Múltiplo de la gravedad (G) que actúa sobre el avión. Un avión comercial está certificado hasta +2.5G. Un caza puede aguantar +9G.", cat: "Aerodinámica" },
  { term: "Flaps", def: "Superficies móviles en el borde trasero del ala que aumentan la sustentación a baja velocidad. Se usan en despegue y aterrizaje.", cat: "Aerodinámica" },
  { term: "FMS", def: "Flight Management System. La 'cerebro' del avión moderno. Gestiona la ruta, el combustible, la velocidad óptima y los procedimientos de vuelo.", cat: "Tecnología" },
  { term: "Frecuencia de emergencia", def: "121.5 MHz es la frecuencia internacional de socorro que todos los aviones deben monitorear. 243.0 MHz es la versión militar.", cat: "Comunicaciones" },
  { term: "Fuselaje", def: "Cuerpo principal del avión donde viajan pasajeros y carga. Su sección circular soporta la presurización sin concentrar tensiones.", cat: "Aerodinámica" },
  { term: "GPS", def: "Global Positioning System. Sistema de navegación por 31 satélites militares estadounidenses. Precisión civil: ±3 m. Gratuito para todos.", cat: "Navegación" },
  { term: "Horizonte artificial", def: "Instrumento que muestra la actitud del avión (inclinación) respecto al horizonte real. Indispensable en vuelo sin referencias visuales (IMC).", cat: "Instrumentos" },
  { term: "IFR", def: "Instrument Flight Rules. Vuelo por instrumentos sin necesidad de referencias visuales externas. Requiere licencia específica (IR) y plan de vuelo.", cat: "Licencias" },
  { term: "ILS", def: "Instrument Landing System. Sistema de ayuda al aterrizaje por instrumentos. Guía al avión con dos haces de radio: localizer (lateral) y glideslope (vertical).", cat: "Navegación" },
  { term: "Línea Kármán", def: "Límite convencional entre la atmósfera terrestre y el espacio exterior, definido a 100 km de altitud. El X-15 la cruzó en 1963.", cat: "Aerodinámica" },
  { term: "Mach", def: "Número que expresa la velocidad del avión como fracción de la velocidad del sonido. Mach 1 = 1.235 km/h al nivel del mar (varía con temperatura).", cat: "Aerodinámica" },
  { term: "MAYDAY", def: "Señal internacional de emergencia grave, repetida 3 veces. Del francés 'm'aidez' (ayúdame). Tiene prioridad absoluta sobre todas las comunicaciones.", cat: "Comunicaciones" },
  { term: "METAR", def: "Meteorological Aerodrome Report. Informe meteorológico de observación real en un aeropuerto, actualizado cada 30 o 60 minutos.", cat: "Meteorología" },
  { term: "MTOW", def: "Maximum Take-Off Weight. Peso máximo certificado para despegar. El Antonov An-225 tenía el mayor MTOW: 640 toneladas.", cat: "Operaciones" },
  { term: "PAN-PAN", def: "Señal de urgencia (menor que MAYDAY). Indica una situación seria pero sin peligro inmediato de vida. También se repite 3 veces.", cat: "Comunicaciones" },
  { term: "Pérdida de sustentación", def: "Stall en inglés. Ocurre cuando el ángulo de ataque supera el crítico y el ala deja de generar sustentación. El avión cae si no se corrige inmediatamente.", cat: "Aerodinámica" },
  { term: "PIC", def: "Pilot in Command. Piloto al mando. Responsable legal y operacional final de la seguridad del vuelo, aunque no esté volando físicamente.", cat: "Licencias" },
  { term: "Plan de vuelo", def: "Documento oficial presentado a ATC con la ruta, altitud, combustible y tiempo estimado. Obligatorio en IFR, recomendado en VFR.", cat: "Operaciones" },
  { term: "PPL", def: "Private Pilot Licence. Primera licencia de piloto. Permite volar aviones simples en condiciones VFR. Mínimo 40 horas (ANAC). Edad mínima: 17 años.", cat: "Licencias" },
  { term: "Presurización", def: "Sistema que mantiene la presión en cabina equivalente a unos 2.400 m de altitud, aunque el avión vuele a 12.000 m.", cat: "Tecnología" },
  { term: "QNH", def: "Ajuste del altímetro según la presión atmosférica local del aeropuerto. Permite que todos los aviones 'vean' las mismas altitudes. Se recibe de ATC.", cat: "Navegación" },
  { term: "Resistencia", def: "Drag en inglés. Fuerza aerodinámica que se opone al movimiento del avión. Los diseñadores buscan minimizarla para ahorrar combustible.", cat: "Aerodinámica" },
  { term: "Rodaje", def: "Taxiing en inglés. Movimiento del avión en tierra desde el hangar o la puerta hasta la pista activa, y viceversa.", cat: "Operaciones" },
  { term: "Rumbo", def: "Heading en inglés. Dirección de vuelo medida en grados. 0° = Norte, 90° = Este, 180° = Sur, 270° = Oeste.", cat: "Navegación" },
  { term: "Slats", def: "Superficies móviles en el borde delantero del ala que aumentan la curva del perfil alar a baja velocidad. Complementan a los flaps.", cat: "Aerodinámica" },
  { term: "Squawk", def: "Código de 4 dígitos programado en el transponder para identificarse ante el radar ATC. 7700 = emergencia, 7600 = pérdida de radio, 7500 = secuestro.", cat: "Comunicaciones" },
  { term: "Sustentación", def: "Lift en inglés. Fuerza aerodinámica perpendicular al movimiento que levanta el avión. La generan las alas por diferencia de presión (Bernoulli) y deflexión del aire (Newton).", cat: "Aerodinámica" },
  { term: "TAF", def: "Terminal Aerodrome Forecast. Pronóstico meteorológico para un aeropuerto, válido entre 9 y 30 horas. Complementa al METAR.", cat: "Meteorología" },
  { term: "TCAS", def: "Traffic Collision Avoidance System. Sistema anticolisión que detecta aeronaves cercanas y emite resoluciones de maniobra. Obligatorio en aviones comerciales.", cat: "Tecnología" },
  { term: "Timón de cola", def: "Rudder en inglés. Superficie vertical móvil en la cola que controla la guiñada (movimiento izquierda-derecha de la nariz).", cat: "Aerodinámica" },
  { term: "Transponder", def: "Equipo que responde automáticamente a los radares de ATC con el código squawk y la altitud del avión.", cat: "Tecnología" },
  { term: "Turbulencia", def: "Movimiento irregular del aire por viento en chorro (CAT), tormentas o terreno montañoso. Peligrosa en exceso; normalmente solo incómoda.", cat: "Meteorología" },
  { term: "VFR", def: "Visual Flight Rules. Vuelo con referencias visuales, sin depender de instrumentos. Requiere VMC: visibilidad mínima de 1,5 km y cielo semidespejado.", cat: "Licencias" },
  { term: "Velocidad de pérdida", def: "Vs: velocidad mínima a la que el ala genera suficiente sustentación. Por debajo de ella, hay riesgo de pérdida (stall). Varía con el peso y la configuración.", cat: "Aerodinámica" },
  { term: "VOR", def: "VHF Omnidirectional Range. Sistema de radionavegación terrestre que indica al piloto el radial (dirección) desde la estación. Aún muy utilizado.", cat: "Navegación" },
  { term: "Waypoint", def: "Punto geográfico de referencia en la ruta de vuelo, definido por coordenadas. Los FMS encadenan waypoints para crear la ruta completa del plan de vuelo.", cat: "Navegación" },
];

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function getFirstLetter(term: string): string {
  return term[0].toUpperCase();
}

const lettersWithTerms = new Set(terms.map((t) => getFirstLetter(t.term)));

interface GlosarioClientProps {
  heroImage: string | null;
}

export default function GlosarioClient({ heroImage }: GlosarioClientProps) {
  const [query, setQuery] = useState("");
  const [activeLetter, setActiveLetter] = useState("Todos");

  const filtered = terms
    .filter((t) => {
      if (query.trim()) {
        const q = query.toLowerCase();
        return t.term.toLowerCase().includes(q) || t.def.toLowerCase().includes(q);
      }
      if (activeLetter !== "Todos") {
        return getFirstLetter(t.term) === activeLetter;
      }
      return true;
    })
    .sort((a, b) => a.term.localeCompare(b.term, "es"));

  const isFiltered = query.trim() !== "" || activeLetter !== "Todos";

  return (
    <main className="page">
      {/* ── HERO CON IMAGEN ──────────────────────────────────────── */}
      <section className="moduleHero">
        <div className="moduleHeroImg">
          {heroImage && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={heroImage} alt="Aviación" />
          )}
          <div className="moduleHeroOverlay" />
        </div>
        <div className="container moduleHeroContent">
          <button className="back" onClick={() => window.history.back()} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, font: "inherit", color: "inherit" }}>← Inicio</button>
          <div className="moduleBadge">MÓDULO 04 · ESCUELA DE VUELO</div>
          <h1>Glosario de aviación</h1>
          <p>Más de 55 términos técnicos explicados en español argentino. Buscá cualquier concepto que no entiendas.</p>
        </div>
      </section>

      {/* ── STATS ───────────────────────────────────────────────── */}
      <section className="container" style={{ paddingTop: 40, paddingBottom: 0 }}>
        <div className="factRow">
          <div className="factCard">
            <span className="factNum">{terms.length}</span>
            <span className="factLabel">Términos en el glosario</span>
          </div>
          <div className="factCard">
            <span className="factNum">9</span>
            <span className="factLabel">Categorías temáticas</span>
          </div>
          <div className="factCard">
            <span className="factNum">121.5</span>
            <span className="factUnit">MHz</span>
            <span className="factLabel">Frecuencia de emergencia global</span>
          </div>
          <div className="factCard">
            <span className="factNum">7700</span>
            <span className="factLabel">Squawk de emergencia</span>
          </div>
        </div>
      </section>

      {/* ── NAVEGACIÓN ALFABÉTICA ───────────────────────────────── */}
      <nav className="categoryNav" style={{ marginTop: 32 }}>
        <div className="categoryNavInner">
          <button
            className={activeLetter === "Todos" ? "tabActive" : "tabButton"}
            onClick={() => { setActiveLetter("Todos"); setQuery(""); }}
          >
            Todos
          </button>
          {ALPHABET.filter((l) => lettersWithTerms.has(l)).map((l) => (
            <button
              key={l}
              className={activeLetter === l ? "tabActive" : "tabButton"}
              onClick={() => { setActiveLetter(l); setQuery(""); }}
            >
              {l}
            </button>
          ))}
        </div>
      </nav>

      {/* ── TÉRMINOS ─────────────────────────────────────────────── */}
      <div className="container" style={{ paddingTop: 32, paddingBottom: 64 }}>
        <input
          type="search"
          placeholder="Buscar término o definición... (ej: ILS, stall, QNH)"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setActiveLetter("Todos"); }}
          style={{
            padding: "12px 18px",
            background: "var(--glass)",
            border: "1px solid var(--border)",
            borderRadius: "var(--r)",
            color: "var(--text)",
            width: "100%",
            marginBottom: 24,
            fontSize: 15,
            outline: "none",
            transition: "border-color 0.2s",
          }}
          onFocus={(e) => { e.currentTarget.style.borderColor = "var(--border-a)"; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = "var(--border)"; }}
        />

        {isFiltered && (
          <p style={{ color: "var(--muted2)", fontSize: 13.5, marginBottom: 20 }}>
            {filtered.length} término{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
          </p>
        )}

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "48px 0" }}>
            <p style={{ color: "var(--muted2)", fontSize: 15, marginBottom: 8 }}>
              No se encontraron términos para esa búsqueda.
            </p>
            <p style={{ color: "var(--muted)", fontSize: 13 }}>
              Intentá con otra palabra o usá la navegación alfabética arriba.
            </p>
          </div>
        ) : (
          <div className="statsGrid">
            {filtered.map((t) => (
              <div className="recordCard" key={t.term}>
                <span className="recordBadge">{t.cat}</span>
                <h3 style={{ marginTop: 4 }}>{t.term}</h3>
                <p>{t.def}</p>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: 40, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link className="btnPrimary" href="/quiz">Ponete a prueba con el quiz →</Link>
          <Link className="btnOutline" href="/licencias">← Módulo 3: Licencias</Link>
        </div>
      </div>
    </main>
  );
}
