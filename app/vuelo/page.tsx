import Link from "next/link";

export default function VueloPage() {
  return (
    <main className="page">
      <section className="container hero compactHero">
        <Link className="back" href="/">← Volver</Link>
        <p className="gold">WIKIAIR · ESCUELA DE VUELO</p>
        <h1>¿Cómo vuela un avión?</h1>
        <p>Las 4 fuerzas, las partes del avión y las 7 fases de cada vuelo. El fundamento de todo.</p>
      </section>

      {/* LAS 4 FUERZAS */}
      <section className="container" style={{ paddingTop: 40, paddingBottom: 48 }}>
        <p className="gold">FUNDAMENTOS</p>
        <h2 style={{ fontSize: "clamp(26px, 5vw, 44px)", margin: "8px 0 12px", letterSpacing: -1 }}>Las 4 fuerzas del vuelo</h2>
        <p style={{ color: "var(--muted2)", marginBottom: 32, maxWidth: 640 }}>
          Todo avión en vuelo está sometido a exactamente 4 fuerzas. El secreto del vuelo es mantenerlas en equilibrio.
        </p>
        <div className="statsGrid">
          <div className="recordCard">
            <span className="recordBadge">↑ HACIA ARRIBA</span>
            <h3>Sustentación</h3>
            <p style={{ color: "var(--sky)", fontSize: 20, fontWeight: 800, margin: "8px 0" }}>Lift</p>
            <p>Fuerza aerodinámica generada por las alas que contrarresta el peso. Surge por la diferencia de presión entre la cara superior e inferior del ala (perfil alar) y por el ángulo de ataque. Sin sustentación, no hay vuelo.</p>
          </div>
          <div className="recordCard">
            <span className="recordBadge">↓ HACIA ABAJO</span>
            <h3>Peso</h3>
            <p style={{ color: "var(--sky)", fontSize: 20, fontWeight: 800, margin: "8px 0" }}>Weight</p>
            <p>La fuerza de gravedad que atrae al avión hacia la Tierra. Siempre actúa hacia el centro de la Tierra. El diseño del avión busca minimizarlo sin comprometer la resistencia estructural.</p>
          </div>
          <div className="recordCard">
            <span className="recordBadge">→ HACIA ADELANTE</span>
            <h3>Empuje</h3>
            <p style={{ color: "var(--sky)", fontSize: 20, fontWeight: 800, margin: "8px 0" }}>Thrust</p>
            <p>La fuerza que producen los motores para impulsar al avión hacia adelante. En turbofanes, un 80% del empuje viene del fan delantero. En aviones de hélice, la hélice "engancha" el aire y lo empuja hacia atrás.</p>
          </div>
          <div className="recordCard">
            <span className="recordBadge">← HACIA ATRÁS</span>
            <h3>Resistencia</h3>
            <p style={{ color: "var(--sky)", fontSize: 20, fontWeight: 800, margin: "8px 0" }}>Drag</p>
            <p>La fuerza que se opone al movimiento del avión a través del aire. Hay resistencia de forma (por la silueta), de inducción (por la sustentación) y de compresibilidad (cerca de Mach 1). Los ingenieros pasan años reduciéndola.</p>
          </div>
        </div>
        <div style={{ background: "var(--glass)", border: "1px solid var(--border)", borderRadius: "var(--rXL)", padding: "20px 28px", marginTop: 24, backdropFilter: "blur(10px)" }}>
          <p style={{ color: "var(--muted2)", lineHeight: 1.7 }}>
            <strong style={{ color: "var(--text)" }}>En vuelo nivelado:</strong> Sustentación = Peso · Empuje = Resistencia.<br />
            <strong style={{ color: "var(--text)" }}>En ascenso:</strong> Empuje {">"} Resistencia · Sustentación {">"} Peso.<br />
            <strong style={{ color: "var(--text)" }}>En descenso:</strong> El motor puede reducirse porque el peso ayuda a mantener velocidad.
          </p>
        </div>
      </section>

      {/* PARTES DEL AVIÓN */}
      <section className="container" style={{ paddingBottom: 48 }}>
        <p className="gold">ANATOMÍA</p>
        <h2 style={{ fontSize: "clamp(26px, 5vw, 44px)", margin: "8px 0 24px", letterSpacing: -1 }}>Partes del avión</h2>
        <div className="statsGrid">
          {[
            { badge: "ESTRUCTURA", name: "Fuselaje", desc: "Cuerpo principal del avión. Aloja pasajeros, carga y sistemas. Su sección transversal es circular para soportar la presurización uniformemente." },
            { badge: "SUSTENTACIÓN", name: "Alas", desc: "Generan la sustentación. Su perfil alar es más curvo arriba que abajo, creando mayor velocidad (y menor presión) en la cara superior según Bernoulli." },
            { badge: "CONTROL LATERAL", name: "Alerones", desc: "En el borde trasero de las alas. Controlan el rolido: cuando el alerón derecho sube, el izquierdo baja, y el avión se inclina a la derecha." },
            { badge: "BAJA VELOCIDAD", name: "Flaps y Slats", desc: "Los flaps aumentan la sustentación en despegue y aterrizaje. Los slats están en el borde delantero. Permiten volar más lento sin entrar en pérdida." },
            { badge: "CONTROL VERTICAL", name: "Timón de cola (Rudder)", desc: "Superficie vertical en la cola. Controla la guiñada (yaw): mueve la nariz izquierda o derecha. Se combina con los alerones para virar coordinadamente." },
            { badge: "CONTROL LONGITUDINAL", name: "Timón de profundidad (Elevator)", desc: "Superficie horizontal en la cola. Controla el cabeceo (pitch): nariz arriba o abajo. Determina el ángulo de ataque y, por tanto, la sustentación." },
            { badge: "PROPULSIÓN", name: "Motores", desc: "Turbofanes en comerciales, turbopropulsores en regionales, pistones en aviones ligeros. Los motores modernos tienen una relación de derivación (bypass) de 10:1 para eficiencia." },
            { badge: "ATERRIZAJE", name: "Tren de aterrizaje", desc: "Ruedas y estructuras de absorción de impacto. Se retrae en vuelo para reducir la resistencia. Los frenos de carbono del A380 pueden absorber 175 MJ." },
            { badge: "FRENADO AÉREO", name: "Spoilers / Aerofrenos", desc: "Superficies que se despliegan en la parte superior del ala para destruir sustentación y frenar. Se usan en el descenso y en el aterrizaje junto a los inversores de empuje." },
            { badge: "NAVEGACIÓN", name: "Antenas y sensores", desc: "Tubo de pitot (velocidad), sensor de ángulo de ataque, radóm (radar meteorológico en el morro), antenas GPS, VOR, ILS, transponder ADS-B." },
            { badge: "CABINA", name: "Cockpit", desc: "La cabina de vuelo. En aviones modernos domina el glass cockpit con pantallas EFIS. El A320 introdujo los sidesticks en 1984 en reemplazo del yoke tradicional." },
            { badge: "ESTABILIDAD", name: "Estabilizadores", desc: "Superficies fijas en la cola (horizontal y vertical) que dan estabilidad al avión, igual que las plumas en una flecha. Sin ellos, el avión sería incontrolable." },
          ].map((part) => (
            <div key={part.name} className="recordCard">
              <span className="recordBadge">{part.badge}</span>
              <h3>{part.name}</h3>
              <p style={{ color: "var(--muted2)", fontSize: 14, marginTop: 8 }}>{part.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FASES DEL VUELO */}
      <section className="container" style={{ paddingBottom: 48 }}>
        <p className="gold">DE PUERTA A PUERTA</p>
        <h2 style={{ fontSize: "clamp(26px, 5vw, 44px)", margin: "8px 0 24px", letterSpacing: -1 }}>Las 7 fases de un vuelo</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {[
            { n: "01", phase: "Rodaje (Taxi)", detail: "El avión se mueve en tierra desde la puerta hasta la pista activa. Los pilotos reciben instrucciones del ATC de tierra, verifican los sistemas y realizan el chequeo previo al despegue." },
            { n: "02", phase: "Despegue (Takeoff)", detail: "El avión acelera por la pista. Al alcanzar la velocidad de rotación (Vr), el piloto eleva el morro. En el V2 el avión está en el aire. Los motores al máximo, flaps desplegados, tren de aterrizaje retractándose." },
            { n: "03", phase: "Ascenso inicial (Initial Climb)", detail: "Hasta 3.000 pies sobre el aeropuerto. Velocidad de ascenso alta, flaps retraidéndose progresivamente. El ATC asigna una SID (ruta estándar de salida) para separar el tráfico saliente." },
            { n: "04", phase: "Ascenso (Climb)", detail: "El avión sube hacia la altitud de crucero (normalmente FL350-FL410, 10.600-12.500 m). A medida que sube, el aire es más delgado y el avión vuela más rápido para la misma velocidad indicada." },
            { n: "05", phase: "Crucero (Cruise)", detail: "La fase más larga. Motor a régimen de crucero (aprox. 40% de la potencia máxima). El FMS gestiona la ruta y el autopiloto mantiene el avión. El combustible se consume y el avión se vuelve más ligero, permitiendo subir más (step climb)." },
            { n: "06", phase: "Descenso y Aproximación", detail: "El avión inicia el descenso unos 200 km antes del destino (Top of Descent, TOD). Se despliegan los flaps progresivamente. El ILS guía la aproximación final a la pista. Velocidad reducida hasta ~250 km/h." },
            { n: "07", phase: "Aterrizaje (Landing)", detail: "Touchdown a unos 240-260 km/h. Se activan los inversores de empuje, los spoilers destruyen la sustentación restante y los frenos de las ruedas detienen el avión. Rodaje hasta la puerta. Motores apagados." },
          ].map((f) => (
            <div key={f.n} style={{
              background: "var(--glass)", border: "1px solid var(--border)", borderRadius: "var(--rXL)",
              padding: "20px 28px", backdropFilter: "blur(10px)", display: "flex", gap: 20, alignItems: "flex-start"
            }}>
              <span style={{ fontSize: 36, fontWeight: 900, color: "var(--sky)", opacity: 0.3, lineHeight: 1, minWidth: 48 }}>{f.n}</span>
              <div>
                <h3 style={{ margin: "0 0 8px", fontSize: 18 }}>{f.phase}</h3>
                <p style={{ color: "var(--muted2)", fontSize: 14, lineHeight: 1.7, margin: 0 }}>{f.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BERNOULLI */}
      <section className="container" style={{ paddingBottom: 60 }}>
        <p className="gold">PROFUNDIZÁ</p>
        <h2 style={{ fontSize: "clamp(26px, 5vw, 44px)", margin: "8px 0 24px", letterSpacing: -1 }}>¿Por qué las alas generan sustentación?</h2>
        <div className="statsGrid">
          <div className="statBox">
            <h3>Bernoulli</h3>
            <p>Mayor velocidad del aire = menor presión. El aire sobre el ala (cara más curva) va más rápido → menor presión → el ala es "succionada" hacia arriba.</p>
          </div>
          <div className="statBox">
            <h3>Ángulo de ataque</h3>
            <p>El ala inclinada desvía el aire hacia abajo. Por tercera ley de Newton, el aire empuja el ala hacia arriba. A mayor ángulo, más sustentación... hasta el ángulo crítico.</p>
          </div>
          <div className="statBox">
            <h3>Stall</h3>
            <p>Si el ángulo de ataque supera ~15-20°, el flujo de aire se separa del ala y la sustentación cae en picado. El avión "cae". La solución: bajar el morro.</p>
          </div>
          <div className="statBox">
            <h3>Perfil alar</h3>
            <p>La forma de la sección transversal del ala. Los aviones de carreras usan perfiles simétricos. Los comerciales usan perfiles asimétricos para máxima eficiencia a velocidad de crucero.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
