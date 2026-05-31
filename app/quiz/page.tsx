"use client";

import { useEffect, useState } from "react";

type Question = {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
};

const questions: Question[] = [
  {
    question: "¿Cuál fue el primer avión en superar oficialmente la barrera del sonido con un piloto a bordo?",
    options: ["Lockheed SR-71 Blackbird", "Bell X-1", "Messerschmitt Me 262", "North American F-86 Sabre"],
    correct: 1,
    explanation: "El Bell X-1, pilotado por Chuck Yeager el 14 de octubre de 1947, fue el primero en superar Mach 1 oficialmente. Yeager lo apodó 'Glamorous Glennis' en honor a su esposa."
  },
  {
    question: "¿En qué año realizaron su primer vuelo exitoso los hermanos Wright?",
    options: ["1900", "1903", "1908", "1911"],
    correct: 1,
    explanation: "El 17 de diciembre de 1903 en Kitty Hawk, Carolina del Norte. El primer vuelo duró 12 segundos y cubrió 37 metros. En ese mismo día hicieron 4 vuelos."
  },
  {
    question: "¿Cuántos motores tiene el Airbus A380?",
    options: ["2", "3", "4", "6"],
    correct: 2,
    explanation: "El A380 tiene 4 motores (Rolls-Royce Trent 900 o Engine Alliance GP7000). Es el único avión comercial de doble cubierta completa en producción."
  },
  {
    question: "¿Qué significa el acrónimo ATPL?",
    options: ["Advanced Turbo Pilot License", "Airline Transport Pilot License", "Authorized Training Pilot Level", "Aviation Technical Pilot License"],
    correct: 1,
    explanation: "ATPL significa Airline Transport Pilot License. Es la licencia de piloto de mayor nivel, requerida para ser comandante de una aerolínea comercial."
  },
  {
    question: "¿Cuál es el helicóptero más pesado del mundo en producción activa?",
    options: ["Boeing CH-47 Chinook", "Sikorsky CH-53E Super Stallion", "Mil Mi-26 Halo", "Sikorsky S-92"],
    correct: 2,
    explanation: "El Mil Mi-26 ruso puede levantar 20 toneladas. Tan grande que puede transportar otro helicóptero (como un Mi-8) colgado debajo de él."
  },
  {
    question: "¿Cuál es el avión tripulado más rápido jamás construido?",
    options: ["SR-71 Blackbird", "North American X-15", "MiG-25 Foxbat", "Concorde"],
    correct: 1,
    explanation: "El X-15 alcanzó Mach 6.72 (7.274 km/h) el 3 de octubre de 1967, pilotado por William Knight. Sigue siendo el récord absoluto de velocidad para aviones tripulados."
  },
  {
    question: "¿Cuántos pasajeros puede llevar el Airbus A380 en configuración de máxima densidad?",
    options: ["555", "660", "760", "853"],
    correct: 3,
    explanation: "En configuración de máxima densidad (todo económica), el A380 puede llevar 853 pasajeros. La mayoría de las aerolíneas lo configuran para 500-600."
  },
  {
    question: "¿Qué país diseñó y fabrica el caza Eurofighter Typhoon?",
    options: ["Solo Francia", "Solo Reino Unido", "Múltiples países europeos (UK, Alemania, Italia, España)", "Solo Alemania"],
    correct: 2,
    explanation: "El Eurofighter Typhoon es un proyecto multinacional entre Reino Unido (BAE Systems), Alemania (DASA), Italia (Alenia) y España (CASA), formando la empresa Eurofighter GmbH."
  },
  {
    question: "¿A qué velocidad crucera vuela normalmente un Airbus A320?",
    options: ["Mach 0.60", "Mach 0.78", "Mach 0.90", "Mach 1.0"],
    correct: 1,
    explanation: "El A320 vuela a aproximadamente Mach 0.78 en crucero, equivalente a unos 840 km/h a 35.000 pies de altitud."
  },
  {
    question: "¿Cuál fue el primer avión a reacción diseñado y construido en Argentina?",
    options: ["FMA IA-63 Pampa", "FMA IA-58 Pucará", "FMA I.Ae. 27 Pulqui I", "A-4AR Fightinghawk"],
    correct: 2,
    explanation: "El FMA I.Ae. 27 Pulqui I (1947) fue el primero. El Pulqui II (1950) fue el más avanzado, diseñado por Kurt Tank y siendo el 4° caza jet del mundo."
  },
  {
    question: "¿Cuál fue el primer avión de combate a reacción operativo de la historia?",
    options: ["Gloster Meteor", "Messerschmitt Me 262", "Bell P-59 Airacomet", "Heinkel He 280"],
    correct: 1,
    explanation: "El Messerschmitt Me 262 fue el primer caza jet en operaciones de combate activas (1944). Era 150 km/h más rápido que cualquier avión aliado."
  },
  {
    question: "¿Cuánta agua puede cargar el Bombardier CL-415 para combate de incendios?",
    options: ["2.000 litros", "4.500 litros", "6.137 litros", "10.000 litros"],
    correct: 2,
    explanation: "El CL-415 lleva 6.137 litros de agua o retardante. Puede recargar en un lago o río en tan solo 12 segundos de carreteo acuático."
  },
  {
    question: "¿A qué altitud opera normalmente el avión espía U-2?",
    options: ["10.000 metros", "15.000 metros", "21.000 metros", "30.000 metros"],
    correct: 2,
    explanation: "El U-2 vuela a más de 21.000 metros (70.000 pies). A esa altitud el piloto necesita traje de presión completo y el cielo se ve negro incluso de día."
  },
  {
    question: "¿Cuántos aviones hay aproximadamente en el aire al mismo tiempo en un día de máximo tráfico?",
    options: ["5.000", "15.000", "50.000", "100.000"],
    correct: 1,
    explanation: "En el momento pico de tráfico hay aproximadamente 15.000 aviones simultáneamente en el aire en todo el mundo. Durante el día se realizan más de 100.000 vuelos."
  },
  {
    question: "¿Cuál es el avión militar más caro jamás construido?",
    options: ["F-22 Raptor", "B-2 Spirit", "F-35 Lightning II", "SR-71 Blackbird"],
    correct: 1,
    explanation: "El B-2 Spirit cuesta aproximadamente USD 2.100 millones por unidad (incluyendo desarrollo). Solo se construyeron 21 ejemplares. El más caro por unidad de la historia."
  },
  {
    question: "¿Cuántas partes individuales tiene aproximadamente un Boeing 747?",
    options: ["500.000", "2 millones", "6 millones", "20 millones"],
    correct: 2,
    explanation: "Un Boeing 747 tiene aproximadamente 6 millones de partes individuales fabricadas por más de 4.500 proveedores de 70 países distintos."
  },
  {
    question: "¿En cuánto tiempo puede el Concorde cruzar el Atlántico de Nueva York a Londres?",
    options: ["2 horas", "3 horas 30 minutos", "5 horas", "7 horas"],
    correct: 1,
    explanation: "El Concorde hacía el trayecto New York-Londres en aproximadamente 3 horas 30 minutos (a Mach 2.04), vs las 7-8 horas de un avión convencional."
  },
  {
    question: "¿Cuál es el avión civil más producido de la historia?",
    options: ["Boeing 737", "Cessna 172", "Douglas DC-3", "Airbus A320"],
    correct: 1,
    explanation: "El Cessna 172 Skyhawk tiene más de 44.000 unidades construidas desde 1956 y todavía se fabrica hoy. Es el avión más producido de toda la historia de la aviación."
  },
  {
    question: "¿Cuántos aviones derribó el F-15 Eagle en combate real sin perder uno solo en dogfight?",
    options: ["12", "36", "104", "200+"],
    correct: 2,
    explanation: "El F-15 Eagle tiene un récord de 104 victorias aéreas y 0 derrotas en combate aire-aire. Es el único avión moderno con ese récord perfecto en combate real."
  },
  {
    question: "¿Cuál fue el primer avión eléctrico certificado por autoridades de aviación (EASA)?",
    options: ["Airbus E-Fan", "Pipistrel Velis Electro", "Joby S4", "Heart Aerospace ES-19"],
    correct: 1,
    explanation: "El Pipistrel Velis Electro fue el primer avión eléctrico certificado por EASA en 2020. Tiene 100 km de autonomía y recarga en 1 hora."
  }
];

type Phase = "intro" | "playing" | "result";
const SAVE_KEY = "wq";

export default function QuizPage() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);

  // Restore saved progress on mount
  useEffect(() => {
    try {
      const s = JSON.parse(sessionStorage.getItem(SAVE_KEY) || "null");
      if (s?.phase === "playing" && typeof s.current === "number") {
        setPhase("playing");
        setCurrent(s.current);
        setScore(s.score ?? 0);
      }
    } catch {}
  }, []);

  // Persist progress on every relevant change
  useEffect(() => {
    try {
      if (phase === "intro") { sessionStorage.removeItem(SAVE_KEY); return; }
      sessionStorage.setItem(SAVE_KEY, JSON.stringify({ phase, current, score }));
    } catch {}
  }, [phase, current, score]);

  const q = questions[current];
  const progress = (current / questions.length) * 100;
  const finalProgress = ((current + 1) / questions.length) * 100;

  function handleSelect(idx: number) {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    if (idx === q.correct) setScore((s) => s + 1);
  }

  function handleNext() {
    if (current + 1 >= questions.length) {
      setPhase("result");
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setAnswered(false);
    }
  }

  function handleRestart() {
    sessionStorage.removeItem(SAVE_KEY);
    setPhase("intro");
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setAnswered(false);
  }

  function getResultMessage() {
    const pct = score / questions.length;
    if (pct === 1) return { title: "PERFECTO — Sos un experto en aviación", sub: "Conocimiento de piloto de pruebas." };
    if (pct >= 0.8) return { title: "Excelente — Casi perfecto", sub: "Tenés un conocimiento serio de aviación." };
    if (pct >= 0.6) return { title: "Muy bien — Buen conocimiento", sub: "Sabés bastante de aviación. Seguí aprendiendo." };
    if (pct >= 0.4) return { title: "Bien — Vas por buen camino", sub: "Tenés una base sólida. WikiAir puede ayudarte a mejorar." };
    return { title: "A seguir aprendiendo", sub: "La enciclopedia WikiAir tiene todo lo que necesitás para mejorar tu puntaje." };
  }

  if (phase === "intro") {
    return (
      <main className="page">
        <section className="container hero compactHero">
          <a className="back" href="/">← Volver</a>
          <p className="gold">WIKIAIR · QUIZ</p>
          <h1>Quiz de Aviación</h1>
          <p>20 preguntas sobre aviones, récords, historia y curiosidades. ¿Cuánto sabés del mundo de la aviación?</p>
        </section>
        <section className="container" style={{ paddingBottom: 60 }}>
          <div className="quizWrap">
            <div className="statsGrid" style={{ marginBottom: 40 }}>
              <div className="statBox"><h3>20</h3><p>Preguntas</p></div>
              <div className="statBox"><h3>1</h3><p>Puntaje por acierto</p></div>
              <div className="statBox"><h3>14</h3><p>Temas de aviación</p></div>
            </div>
            <div style={{ textAlign: "center" }}>
              <button onClick={() => setPhase("playing")} className="btnPrimary" style={{ fontSize: 18, padding: "16px 48px" }}>
                Empezar el Quiz
              </button>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (phase === "result") {
    const msg = getResultMessage();
    return (
      <main className="page">
        <section className="container hero compactHero">
          <a className="back" href="/">← Volver</a>
          <p className="gold">WIKIAIR · QUIZ</p>
          <h1>Resultado</h1>
        </section>
        <section className="container" style={{ paddingBottom: 60 }}>
          <div className="quizWrap" style={{ textAlign: "center" }}>
            <h2 style={{ fontSize: "clamp(22px, 5vw, 40px)", margin: "16px 0 8px" }}>{msg.title}</h2>
            <p style={{ color: "var(--muted2)", fontSize: 17, marginBottom: 32 }}>{msg.sub}</p>
            <div style={{ display: "flex", justifyContent: "center", gap: 24, marginBottom: 40 }}>
              <div className="statBox" style={{ minWidth: 140 }}>
                <h3 style={{ fontSize: 52 }}>{score}</h3>
                <p>correctas de {questions.length}</p>
              </div>
              <div className="statBox" style={{ minWidth: 140 }}>
                <h3 style={{ fontSize: 52 }}>{Math.round((score / questions.length) * 100)}%</h3>
                <p>de acierto</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <button onClick={handleRestart} className="btnPrimary">Jugar de nuevo</button>
              <a href="/enciclopedia" className="btnOutline">Ver Enciclopedia</a>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="page">
      <section className="container hero compactHero">
        <a className="back" href="/">← Volver</a>
        <p className="gold">WIKIAIR · QUIZ · Pregunta {current + 1} de {questions.length}</p>
        <div className="quizProgress">
          <div className="quizBar" style={{ width: `${answered ? finalProgress : progress}%` }} />
        </div>
      </section>

      <section className="container" style={{ paddingBottom: 60 }}>
        <div className="quizWrap">
          <div className="quizBox">
            <p className="quizQuestion">{q.question}</p>

            <div className="quizOptions">
              {q.options.map((opt, idx) => {
                let cls = "quizOption";
                if (answered) {
                  if (idx === q.correct) cls += " quizCorrect";
                  else if (idx === selected && idx !== q.correct) cls += " quizWrong";
                }
                return (
                  <button key={idx} className={cls} onClick={() => handleSelect(idx)} type="button">
                    <span style={{ color: "var(--sky)", marginRight: 10, fontWeight: 800 }}>
                      {["A", "B", "C", "D"][idx]}.
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>

            {answered && (
              <div style={{ marginTop: 20, padding: 18, borderRadius: 12, background: "var(--glass2)", border: "1px solid var(--border)" }}>
                <p style={{ color: selected === q.correct ? "#4ade80" : "#f87171", fontWeight: 800, marginBottom: 6 }}>
                  {selected === q.correct ? "Correcto" : `Incorrecto — era la opción ${["A", "B", "C", "D"][q.correct]}`}
                </p>
                <p style={{ color: "var(--muted2)", fontSize: 14, margin: 0, lineHeight: 1.65 }}>{q.explanation}</p>
              </div>
            )}

            {answered && (
              <div style={{ marginTop: 20, textAlign: "center" }}>
                <button onClick={handleNext} className="btnPrimary">
                  {current + 1 >= questions.length ? "Ver resultados" : "Siguiente pregunta"}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
