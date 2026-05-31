"use client";

import { useState } from "react";
import Link from "next/link";

type Term = { term: string; def: string; cat: string };

const terms: Term[] = [
  { term: "ADS-B", def: "Sistema de vigilancia automática donde cada avión transmite su posición GPS, altitud e identidad cada segundo. Base de los radares civiles modernos.", cat: "Tecnología" },
  { term: "Alerón", def: "Superficies móviles en el borde trasero de las alas que controlan el rolido (inclinación lateral). Cuando uno sube, el otro baja.", cat: "Aerodinámica" },
  { term: "Altímetro", def: "Instrumento que mide la altitud basándose en la presión atmosférica. A mayor altitud, menor presión. Se ajusta con el código QNH.", cat: "Instrumentos" },
  { term: "Altitud", def: "Distancia vertical sobre el nivel medio del mar (MSL). Se mide en metros o pies. 1 pie = 0,30 m.", cat: "Navegación" },
  { term: "Angulo de ataque", def: "Ángulo entre el eje longitudinal del ala y el flujo de aire que la golpea. Si supera el ángulo crítico, el ala entra en pérdida.", cat: "Aerodinámica" },
  { term: "ATC", def: "Air Traffic Control. Sistema de control de tráfico aéreo que separa y guía aviones en tierra y en vuelo para evitar colisiones.", cat: "Operaciones" },
  { term: "Autopiloto", def: "Sistema automático que mantiene el rumbo, altitud y velocidad programados. No reemplaza al piloto — éste monitorea constantemente.", cat: "Tecnología" },
  { term: "Balsa de emergencia", def: "Equipo de salvamento obligatorio en vuelos sobre océanos. Se activa automáticamente al contacto con el agua.", cat: "Seguridad" },
  { term: "Barrera del sonido", def: "Mach 1 ≈ 1.235 km/h al nivel del mar. Al superarla se genera una onda de choque y un boom sónico audible en tierra.", cat: "Aerodinámica" },
  { term: "Cabina", def: "Zona delantera del avión donde se ubican los pilotos y todos los controles e instrumentos de vuelo.", cat: "Operaciones" },
  { term: "Callsign", def: "Identificación única de cada vuelo en las comunicaciones de radio. Ej: 'Aerolíneas 1234'. Los militares usan nombres como 'Eagle 1'.", cat: "Comunicaciones" },
  { term: "Carta de navegación", def: "Mapa aeronáutico con rutas aéreas, alturas mínimas, obstáculos, aeropuertos y ayudas a la navegación. Equivalente al mapa de ruta.", cat: "Navegación" },
  { term: "Crucero", def: "Fase de vuelo horizontal estable a altitud y velocidad constante. Es la etapa más eficiente del vuelo, entre el ascenso y el descenso.", cat: "Operaciones" },
  { term: "CRM", def: "Crew Resource Management. Metodología de trabajo en equipo en cabina para minimizar errores humanos. Obligatorio en aviación comercial.", cat: "Operaciones" },
  { term: "Depresurización", def: "Pérdida de presión en cabina. Emergencia grave: por encima de 4.000 m sin presurización, los pasajeros pierden el conocimiento en minutos.", cat: "Seguridad" },
  { term: "DME", def: "Distance Measuring Equipment. Equipo que mide la distancia en millas náuticas a una estación en tierra. Complementa al VOR.", cat: "Navegación" },
  { term: "Elevador", def: "Superficie horizontal móvil en la cola que controla el cabeceo (morro arriba o abajo). Junto con los alerones define la actitud de vuelo.", cat: "Aerodinámica" },
  { term: "Empuje", def: "Fuerza producida por los motores que propulsa al avión hacia adelante. Debe superar la resistencia para acelerar.", cat: "Aerodinámica" },
  { term: "ETOPS", def: "Extended-range Twin-engine Operations. Autorización para volar con dos motores sobre zonas remotas. Ej: ETOPS-180 = hasta 180 min de un aeropuerto.", cat: "Operaciones" },
  { term: "Factor de carga", def: "Múltiplo de la gravedad (G) que actúa sobre el avión. Un avión comercial está certificado hasta +2.5G. Un caza puede aguantar +9G.", cat: "Aerodinámica" },
  { term: "Flaps", def: "Superficies móviles en el borde trasero del ala que aumentan la sustentación a baja velocidad. Se usan en despegue y aterrizaje.", cat: "Aerodinámica" },
  { term: "FMS", def: "Flight Management System. La 'cerebro' del avión moderno. Gestiona la ruta, el combustible, la velocidad óptima y los procedimientos.", cat: "Tecnología" },
  { term: "Frecuencia de emergencia", def: "121.5 MHz es la frecuencia internacional de socorro que todos los aviones deben monitorear. 243.0 MHz es la versión militar.", cat: "Comunicaciones" },
  { term: "Fuselaje", def: "Cuerpo principal del avión donde viajan pasajeros y carga. Su forma aerodinámica reduce la resistencia al avance.", cat: "Aerodinámica" },
  { term: "GPS", def: "Global Positioning System. Sistema de navegación por 31 satélites militares estadounidenses. Precisión civil: ±3 m. Gratuito para todos.", cat: "Navegación" },
  { term: "Horizonte artificial", def: "Instrumento que muestra la actitud del avión (inclinación) respecto al horizonte real. Indispensable en vuelo sin referencias visuales (IMC).", cat: "Instrumentos" },
  { term: "IFR", def: "Instrument Flight Rules. Vuelo por instrumentos sin necesidad de referencias visuales. Requiere licencia específica y plan de vuelo.", cat: "Licencias" },
  { term: "ILS", def: "Instrument Landing System. Sistema de ayuda al aterrizaje por instrumentos. Guía al avión con dos haces de radio: localizer (lateral) y glideslope (vertical).", cat: "Navegación" },
  { term: "Línea Kármán", def: "Límite convencional entre la atmósfera terrestre y el espacio exterior, definido a 100 km de altitud. El X-15 la cruzó en 1963.", cat: "Aerodinámica" },
  { term: "Mach", def: "Número que expresa la velocidad del avión como fracción de la velocidad del sonido. Mach 1 = 1.235 km/h al nivel del mar (varía con temperatura).", cat: "Aerodinámica" },
  { term: "MAYDAY", def: "Señal internacional de emergencia grave, repetida 3 veces. Del francés 'm'aidez' (ayúdame). Tiene prioridad absoluta sobre todas las comunicaciones.", cat: "Comunicaciones" },
  { term: "METAR", def: "Meteorological Aerodrome Report. Informe meteorológico de observación real en un aeropuerto, actualizado cada 30 o 60 minutos.", cat: "Meteorología" },
  { term: "MTOW", def: "Maximum Take-Off Weight. Peso máximo certificado para despegar. El Antonov An-225 tenía el mayor MTOW: 640 toneladas.", cat: "Operaciones" },
  { term: "PAN-PAN", def: "Señal de urgencia (menor que MAYDAY). Indica una situación seria pero sin peligro inmediato de vida. También se repite 3 veces.", cat: "Comunicaciones" },
  { term: "Pérdida de sustentación", def: "Stall en inglés. Ocurre cuando el ángulo de ataque supera el crítico y el ala deja de generar sustentación. El avión cae si no se corrige.", cat: "Aerodinámica" },
  { term: "PIC", def: "Pilot in Command. Piloto al mando. Responsable legal y operacional final de la seguridad del vuelo, aunque no esté volando físicamente.", cat: "Licencias" },
  { term: "Plan de vuelo", def: "Documento oficial presentado a ATC con la ruta, altitud, combustible y tiempo estimado. Obligatorio en IFR, recomendado en VFR.", cat: "Operaciones" },
  { term: "Presurización", def: "Sistema que mantiene la presión en cabina equivalente a unos 2.400 m de altitud, aunque el avión vuele a 12.000 m.", cat: "Tecnología" },
  { term: "QNH", def: "Ajuste del altímetro según la presión atmosférica local del aeropuerto. Permite que todos los aviones 'vean' las mismas altitudes.", cat: "Navegación" },
  { term: "Resistencia", def: "Drag en inglés. Fuerza aerodinámica que se opone al movimiento del avión. Los diseñadores buscan minimizarla para ahorrar combustible.", cat: "Aerodinámica" },
  { term: "Rodaje", def: "Taxiing en inglés. Movimiento del avión en tierra desde el hangar o la puerta hasta la pista activa, y viceversa.", cat: "Operaciones" },
  { term: "Rumbo", def: "Heading en inglés. Dirección de vuelo medida en grados. 0° = Norte, 90° = Este, 180° = Sur, 270° = Oeste.", cat: "Navegación" },
  { term: "Slats", def: "Superficies móviles en el borde delantero del ala que aumentan la curva del perfil alar a baja velocidad. Complementan a los flaps.", cat: "Aerodinámica" },
  { term: "Squawk", def: "Código de 4 dígitos programado en el transponder para identificarse ante el radar ATC. 7700 = emergencia, 7600 = pérdida de radio.", cat: "Comunicaciones" },
  { term: "Sustentación", def: "Lift en inglés. Fuerza aerodinámica perpendicular al movimiento que levanta el avión. La generan las alas por diferencia de presión.", cat: "Aerodinámica" },
  { term: "TAF", def: "Terminal Aerodrome Forecast. Pronóstico meteorológico para un aeropuerto, válido entre 9 y 30 horas. Complementa al METAR.", cat: "Meteorología" },
  { term: "Timón de cola", def: "Rudder en inglés. Superficie vertical móvil en la cola que controla la guiñada (movimiento izquierda-derecha de la nariz).", cat: "Aerodinámica" },
  { term: "Transponder", def: "Equipo que responde automáticamente a los radares de ATC con el código squawk y la altitud del avión.", cat: "Tecnología" },
  { term: "Turbulencia", def: "Movimiento irregular del aire por viento en chorro, tormentas o terreno montañoso. Peligrosa en exceso, normalmente solo incómoda.", cat: "Meteorología" },
  { term: "VFR", def: "Visual Flight Rules. Vuelo con referencias visuales, sin depender de instrumentos. Requiere VMC: visibilidad mínima de 1,5 km y cielo semidespejado.", cat: "Licencias" },
  { term: "Velocidad de pérdida", def: "Vs: velocidad mínima a la que el ala genera suficiente sustentación. Por debajo de ella, hay riesgo de pérdida (stall).", cat: "Aerodinámica" },
  { term: "VOR", def: "VHF Omnidirectional Range. Sistema de radionavegación terrestre que indica al piloto el radial (dirección) desde la estación. Aún muy usado.", cat: "Navegación" },
  { term: "Waypoint", def: "Punto geográfico de referencia en la ruta de vuelo, definido por coordenadas. Los FMS encadenan waypoints para crear la ruta completa.", cat: "Navegación" },
];

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function getFirstLetter(term: string): string {
  return term[0].toUpperCase();
}

const lettersWithTerms = new Set(terms.map((t) => getFirstLetter(t.term)));

export default function GlosarioPage() {
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
      <section className="container hero compactHero">
        <Link className="back" href="/">← Volver</Link>
        <p className="gold">WIKIAIR · GLOSARIO</p>
        <h1>Glosario de aviación</h1>
        <p>Todos los términos técnicos que necesitás para entender el mundo de la aviación.</p>
      </section>

      <nav className="categoryNav">
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

      <div className="container" style={{ paddingTop: 32, paddingBottom: 64 }}>
        <input
          type="search"
          placeholder="Buscar término o definición..."
          value={query}
          onChange={(e) => { setQuery(e.target.value); setActiveLetter("Todos"); }}
          style={{
            padding: "10px 16px",
            background: "var(--glass)",
            border: "1px solid var(--border)",
            borderRadius: "var(--r)",
            color: "var(--text)",
            width: "100%",
            marginBottom: 24,
            fontSize: 15,
            outline: "none",
          }}
        />

        {isFiltered && (
          <p style={{ color: "var(--muted2)", fontSize: 13.5, marginBottom: 20 }}>
            {filtered.length} término{filtered.length !== 1 ? "s" : ""}
          </p>
        )}

        {filtered.length === 0 ? (
          <p style={{ color: "var(--muted2)", textAlign: "center", padding: "48px 0" }}>
            No se encontraron términos para esa búsqueda.
          </p>
        ) : (
          <div className="statsGrid">
            {filtered.map((t) => (
              <div className="recordCard" key={t.term}>
                <span className="recordBadge">{t.cat}</span>
                <h3>{t.term}</h3>
                <p>{t.def}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
