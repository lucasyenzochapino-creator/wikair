"use client";

import { useEffect, useState } from "react";

type Question = {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
};

const questions: Question[] = [
  // --- EXISTING 20 ---
  { question: "¿Cuál fue el primer avión en superar oficialmente la barrera del sonido con un piloto a bordo?", options: ["Lockheed SR-71 Blackbird", "Bell X-1", "Messerschmitt Me 262", "North American F-86 Sabre"], correct: 1, explanation: "El Bell X-1, pilotado por Chuck Yeager el 14 de octubre de 1947, fue el primero en superar Mach 1 oficialmente. Yeager lo apodó 'Glamorous Glennis' en honor a su esposa." },
  { question: "¿En qué año realizaron su primer vuelo exitoso los hermanos Wright?", options: ["1900", "1903", "1908", "1911"], correct: 1, explanation: "El 17 de diciembre de 1903 en Kitty Hawk, Carolina del Norte. El primer vuelo duró 12 segundos y cubrió 37 metros. En ese mismo día hicieron 4 vuelos." },
  { question: "¿Cuántos motores tiene el Airbus A380?", options: ["2", "3", "4", "6"], correct: 2, explanation: "El A380 tiene 4 motores (Rolls-Royce Trent 900 o Engine Alliance GP7000). Es el único avión comercial de doble cubierta completa en producción." },
  { question: "¿Qué significa el acrónimo ATPL?", options: ["Advanced Turbo Pilot License", "Airline Transport Pilot License", "Authorized Training Pilot Level", "Aviation Technical Pilot License"], correct: 1, explanation: "ATPL significa Airline Transport Pilot License. Es la licencia de piloto de mayor nivel, requerida para ser comandante de una aerolínea comercial." },
  { question: "¿Cuál es el helicóptero más pesado del mundo en producción activa?", options: ["Boeing CH-47 Chinook", "Sikorsky CH-53E Super Stallion", "Mil Mi-26 Halo", "Sikorsky S-92"], correct: 2, explanation: "El Mil Mi-26 ruso puede levantar 20 toneladas. Tan grande que puede transportar otro helicóptero (como un Mi-8) colgado debajo de él." },
  { question: "¿Cuál es el avión tripulado más rápido jamás construido?", options: ["SR-71 Blackbird", "North American X-15", "MiG-25 Foxbat", "Concorde"], correct: 1, explanation: "El X-15 alcanzó Mach 6.72 (7.274 km/h) el 3 de octubre de 1967, pilotado por William Knight. Sigue siendo el récord absoluto de velocidad para aviones tripulados." },
  { question: "¿Cuántos pasajeros puede llevar el Airbus A380 en configuración de máxima densidad?", options: ["555", "660", "760", "853"], correct: 3, explanation: "En configuración de máxima densidad (todo económica), el A380 puede llevar 853 pasajeros. La mayoría de las aerolíneas lo configuran para 500-600." },
  { question: "¿Qué país diseñó y fabrica el caza Eurofighter Typhoon?", options: ["Solo Francia", "Solo Reino Unido", "Múltiples países europeos (UK, Alemania, Italia, España)", "Solo Alemania"], correct: 2, explanation: "El Eurofighter Typhoon es un proyecto multinacional entre Reino Unido (BAE Systems), Alemania (DASA), Italia (Alenia) y España (CASA), formando la empresa Eurofighter GmbH." },
  { question: "¿A qué velocidad crucera vuela normalmente un Airbus A320?", options: ["Mach 0.60", "Mach 0.78", "Mach 0.90", "Mach 1.0"], correct: 1, explanation: "El A320 vuela a aproximadamente Mach 0.78 en crucero, equivalente a unos 840 km/h a 35.000 pies de altitud." },
  { question: "¿Cuál fue el primer avión a reacción diseñado y construido en Argentina?", options: ["FMA IA-63 Pampa", "FMA IA-58 Pucará", "FMA I.Ae. 27 Pulqui I", "A-4AR Fightinghawk"], correct: 2, explanation: "El FMA I.Ae. 27 Pulqui I (1947) fue el primero. El Pulqui II (1950) fue el más avanzado, diseñado por Kurt Tank y siendo el 4° caza jet del mundo." },
  { question: "¿Cuál fue el primer avión de combate a reacción operativo de la historia?", options: ["Gloster Meteor", "Messerschmitt Me 262", "Bell P-59 Airacomet", "Heinkel He 280"], correct: 1, explanation: "El Messerschmitt Me 262 fue el primer caza jet en operaciones de combate activas (1944). Era 150 km/h más rápido que cualquier avión aliado." },
  { question: "¿Cuánta agua puede cargar el Bombardier CL-415 para combate de incendios?", options: ["2.000 litros", "4.500 litros", "6.137 litros", "10.000 litros"], correct: 2, explanation: "El CL-415 lleva 6.137 litros de agua o retardante. Puede recargar en un lago o río en tan solo 12 segundos de carreteo acuático." },
  { question: "¿A qué altitud opera normalmente el avión espía U-2?", options: ["10.000 metros", "15.000 metros", "21.000 metros", "30.000 metros"], correct: 2, explanation: "El U-2 vuela a más de 21.000 metros (70.000 pies). A esa altitud el piloto necesita traje de presión completo y el cielo se ve negro incluso de día." },
  { question: "¿Cuántos aviones hay aproximadamente en el aire al mismo tiempo en un día de máximo tráfico?", options: ["5.000", "15.000", "50.000", "100.000"], correct: 1, explanation: "En el momento pico de tráfico hay aproximadamente 15.000 aviones simultáneamente en el aire en todo el mundo. Durante el día se realizan más de 100.000 vuelos." },
  { question: "¿Cuál es el avión militar más caro jamás construido?", options: ["F-22 Raptor", "B-2 Spirit", "F-35 Lightning II", "SR-71 Blackbird"], correct: 1, explanation: "El B-2 Spirit cuesta aproximadamente USD 2.100 millones por unidad (incluyendo desarrollo). Solo se construyeron 21 ejemplares. El más caro por unidad de la historia." },
  { question: "¿Cuántas partes individuales tiene aproximadamente un Boeing 747?", options: ["500.000", "2 millones", "6 millones", "20 millones"], correct: 2, explanation: "Un Boeing 747 tiene aproximadamente 6 millones de partes individuales fabricadas por más de 4.500 proveedores de 70 países distintos." },
  { question: "¿En cuánto tiempo puede el Concorde cruzar el Atlántico de Nueva York a Londres?", options: ["2 horas", "3 horas 30 minutos", "5 horas", "7 horas"], correct: 1, explanation: "El Concorde hacía el trayecto New York-Londres en aproximadamente 3 horas 30 minutos (a Mach 2.04), vs las 7-8 horas de un avión convencional." },
  { question: "¿Cuál es el avión civil más producido de la historia?", options: ["Boeing 737", "Cessna 172", "Douglas DC-3", "Airbus A320"], correct: 1, explanation: "El Cessna 172 Skyhawk tiene más de 44.000 unidades construidas desde 1956 y todavía se fabrica hoy. Es el avión más producido de toda la historia de la aviación." },
  { question: "¿Cuántos aviones derribó el F-15 Eagle en combate real sin perder uno solo en dogfight?", options: ["12", "36", "104", "200+"], correct: 2, explanation: "El F-15 Eagle tiene un récord de 104 victorias aéreas y 0 derrotas en combate aire-aire. Es el único avión moderno con ese récord perfecto en combate real." },
  { question: "¿Cuál fue el primer avión eléctrico certificado por autoridades de aviación (EASA)?", options: ["Airbus E-Fan", "Pipistrel Velis Electro", "Joby S4", "Heart Aerospace ES-19"], correct: 1, explanation: "El Pipistrel Velis Electro fue el primer avión eléctrico certificado por EASA en 2020. Tiene 100 km de autonomía y recarga en 1 hora." },

  // --- 30 NEW QUESTIONS ---
  { question: "¿Qué piloto argentino es considerado el as más condecorado de la Fuerza Aérea Argentina?", options: ["Jorge Newbery", "Enrique Mosconi", "Marcos Zar", "Luis Candelaria"], correct: 0, explanation: "Jorge Newbery fue pionero de la aviación en Argentina. El Aeroparque de Buenos Aires lleva su nombre en su homenaje. Murió en 1914 en un accidente de prueba." },
  { question: "¿Cuál es el aeropuerto más alto del mundo a nivel del mar?", options: ["La Paz (Bolivia)", "Lhasa (Tibet)", "Daocheng Yading (China)", "Cusco (Perú)"], correct: 2, explanation: "El aeropuerto de Daocheng Yading en China está a 4.411 metros sobre el nivel del mar, el más alto del mundo para vuelos comerciales regulares." },
  { question: "¿Qué significa VFR en aviación?", options: ["Very Fast Route", "Visual Flight Rules", "Verified Flight Record", "Vertical Flight Regulation"], correct: 1, explanation: "VFR (Visual Flight Rules) son las reglas de vuelo visual, donde el piloto navega usando referencias visuales. Lo contrario es IFR (Instrument Flight Rules) para vuelo por instrumentos." },
  { question: "¿Cuántos motores tiene el Boeing 777X?", options: ["2", "4", "3", "6"], correct: 0, explanation: "El Boeing 777X tiene 2 motores GE9X, los más grandes del mundo. Cada uno tiene un diámetro de 3,4 metros — más grande que el fuselaje de un Boeing 737." },
  { question: "¿Cuál es el único avión comercial que cruza el Atlántico con solo 2 motores bajo reglas ETOPS-330?", options: ["Airbus A350", "Boeing 777", "Boeing 787", "Airbus A330neo"], correct: 1, explanation: "El Boeing 777 puede alejarse hasta 330 minutos de un aeropuerto de emergencia con un motor inactivo. Esto permite las rutas transoceánicas más directas del mundo." },
  { question: "¿Cuál fue el avión más rápido de la Primera Guerra Mundial?", options: ["Sopwith Camel", "Fokker Dr.I", "SPAD S.XIII", "Fokker D.VII"], correct: 2, explanation: "El SPAD S.XIII alcanzaba 224 km/h, siendo el caza más rápido y uno de los más usados por los aliados al final de la Primera Guerra Mundial." },
  { question: "¿Qué aerolínea fue la primera en operar el Boeing 747?", options: ["British Airways", "Pan American World Airways", "TWA", "United Airlines"], correct: 1, explanation: "Pan Am realizó el vuelo inaugural del Boeing 747 el 22 de enero de 1970 entre Nueva York y Londres. Fue el inicio de la era de los vuelos masivos a largo alcance." },
  { question: "¿A cuántos km/h equivale aproximadamente Mach 1 a nivel del mar?", options: ["1.000 km/h", "1.225 km/h", "900 km/h", "1.500 km/h"], correct: 1, explanation: "Mach 1 equivale aproximadamente a 1.225 km/h a nivel del mar (15°C). La velocidad del sonido varía con la temperatura y altitud — a 12.000 metros es solo 1.062 km/h." },
  { question: "¿Cuántos litros de combustible consume por hora un Airbus A380?", options: ["5.000 litros", "10.000 litros", "17.000 litros", "30.000 litros"], correct: 1, explanation: "El A380 consume aproximadamente 10.000 litros por hora (unos 2,75 litros por pasajero cada 100 km), similar al consumo de un auto muy pequeño por persona." },
  { question: "¿Qué avión fue conocido como 'El más bello jamás construido' según pilotos y expertos?", options: ["P-51 Mustang", "Spitfire", "Zero A6M", "Hurricane"], correct: 1, explanation: "El Supermarine Spitfire es considerado el avión más hermoso de la historia por su icónica ala elíptica. El diseñador R.J. Mitchell creó una obra maestra aerodinámica y estética." },
  { question: "¿Cuál es la velocidad máxima del Airbus A320neo?", options: ["Mach 0.78", "Mach 0.82", "Mach 0.90", "Mach 0.95"], correct: 1, explanation: "El Airbus A320neo tiene una velocidad máxima de operación de Mach 0.82, equivalente a unos 890 km/h a altitud de crucero." },
  { question: "¿Cuántos vuelos comerciales hay aproximadamente por día en todo el mundo?", options: ["20.000", "50.000", "100.000", "200.000"], correct: 2, explanation: "En un día normal de tráfico máximo hay más de 100.000 vuelos comerciales en el mundo. En 2023 el récord fue de 134.386 vuelos en un solo día." },
  { question: "¿Cuál fue el primer avión en completar la vuelta al mundo?", options: ["Spirit of St. Louis", "Douglas World Cruiser", "Vickers Vimy", "Ford Trimotor"], correct: 1, explanation: "El Douglas World Cruiser completó la primera vuelta al mundo en 1924, en 175 días. El viaje cubrió 44.085 km con múltiples escalas y dos tripulaciones." },
  { question: "¿Qué color tienen las cajas negras de los aviones en realidad?", options: ["Negro", "Rojo anaranjado", "Amarillo", "Plateado"], correct: 1, explanation: "Las 'cajas negras' son en realidad de color naranja brillante para facilitar su localización tras un accidente. Resisten impactos de hasta 3.400 G y temperaturas de 1.100°C." },
  { question: "¿En qué año voló el primer Airbus A380?", options: ["2003", "2005", "2007", "2009"], correct: 1, explanation: "El Airbus A380 realizó su vuelo inaugural el 27 de abril de 2005 en Toulouse, Francia. Entró en servicio comercial con Singapore Airlines en octubre de 2007." },
  { question: "¿Cuánto pesa aproximadamente un motor Rolls-Royce Trent 1000 del Boeing 787?", options: ["2 toneladas", "4.8 toneladas", "8 toneladas", "12 toneladas"], correct: 1, explanation: "El Rolls-Royce Trent 1000 pesa aproximadamente 4.800 kg y genera un empuje de 250-340 kN. A pesar de su tamaño, es uno de los más eficientes de la historia." },
  { question: "¿Cuál es el avión de transporte militar más grande del mundo en servicio activo?", options: ["Boeing C-17 Globemaster III", "Lockheed C-5M Super Galaxy", "Antonov An-124 Ruslan", "Airbus A400M"], correct: 2, explanation: "El Antonov An-124 Ruslan ruso tiene una carga útil de 150 toneladas y es el mayor avión de transporte militar en servicio activo. Rusia opera la mayor flota." },
  { question: "¿Cuántas horas de vuelo necesita un piloto para obtener la licencia ATPL?", options: ["500 horas", "1.000 horas", "1.500 horas", "3.000 horas"], correct: 2, explanation: "Para la licencia ATPL (Airline Transport Pilot License) se requieren al menos 1.500 horas de vuelo según regulaciones ICAO. En algunos países como EE.UU. son 1.500 horas mínimas." },
  { question: "¿Cuál fue el primer avión supersónico comercial en entrar en servicio?", options: ["Concorde", "Tupolev Tu-144", "Boeing 2707", "Aerion AS2"], correct: 1, explanation: "El Tupolev Tu-144 soviético realizó su vuelo inaugural el 31 de diciembre de 1968, antes que el Concorde. Entró en servicio comercial de carga en 1975, aunque fue retirado en 1978 por problemas técnicos." },
  { question: "¿Cuánto tiempo demoró el Voyager en completar la primera vuelta al mundo sin escala ni repostaje?", options: ["6 días", "9 días", "14 días", "21 días"], correct: 1, explanation: "El Rutan Voyager completó la primera vuelta al mundo sin escalas ni repostaje en 9 días, 3 minutos y 44 segundos en diciembre de 1986, pilotado por Dick Rutan y Jeana Yeager." },
  { question: "¿Cuál es la longitud de la pista del aeropuerto más largo del mundo?", options: ["4.500 m", "5.500 m", "6.400 m", "8.000 m"], correct: 1, explanation: "El aeropuerto de Qamdo Bamda en Tibet tiene la pista más larga del mundo con 5.500 metros, necesaria por la altitud de 4.334 m que reduce la sustentación aerodinámica." },
  { question: "¿Qué significa ILS en aviación?", options: ["Internal Landing System", "Instrument Landing System", "Integrated Level Sensor", "Inertial Lift System"], correct: 1, explanation: "ILS (Instrument Landing System) es el sistema de aterrizaje por instrumentos. Guía automáticamente a los aviones en condiciones de baja visibilidad usando señales de radio." },
  { question: "¿A cuántos grados Celsius puede llegar la temperatura exterior cuando un avión vuela a 12.000 metros?", options: ["-20°C", "-40°C", "-56°C", "-80°C"], correct: 2, explanation: "A 12.000 metros de altitud la temperatura exterior es de aproximadamente -56°C. Por eso los aviones tienen sistemas de presurización y calefacción para mantener la cabina a 20-22°C." },
  { question: "¿Cuál es el avión de pasajeros más vendido de la historia?", options: ["Boeing 737", "Airbus A320", "Boeing 747", "Douglas DC-9"], correct: 0, explanation: "El Boeing 737 es el avión más vendido de la historia con más de 10.500 pedidos. Ha estado en producción desde 1967 y actualmente vuela en su versión MAX." },
  { question: "¿Cuántos F-35 están en servicio en todo el mundo aproximadamente?", options: ["200", "500", "900", "1.500"], correct: 2, explanation: "A 2024 hay más de 900 F-35 en servicio en 17 países. Es el programa de armamento más caro de la historia de EE.UU. con un costo total estimado de USD 1,7 billones." },
  { question: "¿Cuál es la principal diferencia entre un turbofan y un turbohélice?", options: ["El turbofan usa hélice visible, el turbohélice no", "El turbohélice impulsa una hélice externa, el turbofan usa una hélice interna en el motor", "No hay diferencia", "El turbofan solo se usa en helicópteros"], correct: 1, explanation: "El turbohélice tiene una hélice exterior que gira y mueve el avión. El turbofan tiene un fan grande dentro del motor que propulsa una mezcla de aire frío y gases calientes. El turbofan es más eficiente a altas velocidades." },
  { question: "¿Cuánto pesa aproximadamente un Boeing 747 vacío?", options: ["150 toneladas", "178 toneladas", "220 toneladas", "300 toneladas"], correct: 1, explanation: "El Boeing 747-400 pesa aproximadamente 178 toneladas vacío (peso operativo en vacío). A máximo peso de despegue puede llegar a 412 toneladas." },
  { question: "¿Cuál fue el primer avión en cruzar el Atlántico sin escala?", options: ["Spirit of St. Louis", "Alcock y Brown en Vickers Vimy", "Lindbergh en Curtis JN-4", "Earhart en Lockheed Vega"], correct: 1, explanation: "John Alcock y Arthur Brown cruzaron el Atlántico sin escala por primera vez el 14-15 de junio de 1919, en un Vickers Vimy, de Terranova a Irlanda. Ocho años antes que Lindbergh (que fue el primero en solitario)." },
  { question: "¿Cuántos pilotos lleva normalmente un vuelo largo en un Boeing 787?", options: ["2", "3", "4", "1"], correct: 1, explanation: "En vuelos de más de 8-9 horas, un Boeing 787 lleva 3 pilotos (capitán + 2 primeros oficiales) para que puedan turnarse y descansar. En vuelos muy largos pueden ser 4." },
  { question: "¿Cuál es el avión más silencioso de la historia según NASA?", options: ["Airbus A220", "Boeing 787", "NASA X-59 QueSST", "Bombardier CRJ-900"], correct: 2, explanation: "El NASA X-59 QueSST (Quiet SuperSonic Technology) está diseñado para crear solo un 'thump' suave en lugar de una explosión sónica, abriendo la puerta a vuelos supersónicos sobre tierra." },
];

type Phase = "intro" | "study" | "playing" | "result";

const studySections = [
  {
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    title: "Hitos históricos",
    facts: [
      { label: "Primer vuelo de la historia", value: "17 dic 1903 · Kitty Hawk · 12 segundos · 37 metros · Hermanos Wright" },
      { label: "Primer cruce del Atlántico sin escala", value: "Alcock & Brown (1919) en Vickers Vimy — 8 años antes que Lindbergh, que fue el primero EN SOLITARIO" },
      { label: "Barrera del sonido rota", value: "Bell X-1 · Chuck Yeager · 14 oct 1947 · Mach 1 superado por primera vez" },
      { label: "Primer vuelo a reacción de Argentina", value: "FMA I.Ae. 27 Pulqui I (1947) — luego el Pulqui II (1950), 4° caza jet del mundo" },
      { label: "Primer jet operativo en combate", value: "Messerschmitt Me 262 (1944) — 150 km/h más rápido que cualquier avión aliado" },
      { label: "Primer supersónico comercial en volar", value: "Tupolev Tu-144 soviético (31 dic 1968) — antes que el Concorde" },
      { label: "Vuelta al mundo sin escalas ni repostaje", value: "Rutan Voyager · Dick Rutan y Jeana Yeager · 9 días 3 min 44 seg · Dic 1986" },
    ]
  },
  {
    icon: "M5 3l14 9-14 9V3z",
    title: "Récords de velocidad y altitud",
    facts: [
      { label: "Avión más rápido tripulado (absoluto)", value: "NASA X-15 · Mach 6.72 · 7.274 km/h · 3 oct 1967 · William Knight" },
      { label: "Avión militar más rápido operativo", value: "SR-71 Blackbird · Mach 3.3 · >3.500 km/h · 85.000 pies de techo" },
      { label: "Concorde: velocidad de crucero", value: "Mach 2.04 · Cruza el Atlántico NY-Londres en ~3h 30min vs 7-8h convencional" },
      { label: "Mach 1 a nivel del mar", value: "~1.225 km/h a 15°C · A 12.000m baja a ~1.062 km/h (depende de temperatura)" },
      { label: "Temperatura exterior a 12.000m", value: "-56°C · Por eso los aviones tienen presurización y calefacción de cabina" },
      { label: "Aeropuerto más alto del mundo", value: "Daocheng Yading (China) · 4.411 m sobre el nivel del mar" },
      { label: "Pista más larga del mundo", value: "Qamdo Bamda (Tíbet) · 5.500 metros · necesaria por altitud de 4.334 m" },
    ]
  },
  {
    icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z",
    title: "Aeronaves icónicas — datos clave",
    facts: [
      { label: "Avión más producido de la historia", value: "Cessna 172 Skyhawk · +44.000 unidades desde 1956 · sigue fabricándose" },
      { label: "Boeing 737: el más vendido en comercial", value: "+10.500 pedidos · en producción desde 1967 · versión actual: 737 MAX" },
      { label: "Airbus A380: capacidad máxima", value: "853 pasajeros en config. máxima densidad · 4 motores · doble cubierta completa" },
      { label: "A380: consumo de combustible", value: "~10.000 litros/hora · pero solo ~2,75 L/100km por pasajero" },
      { label: "Boeing 747: partes individuales", value: "~6 millones de piezas · fabricadas por +4.500 proveedores de 70 países" },
      { label: "Boeing 747: peso vacío y máximo", value: "~178 ton vacío · hasta 412 ton al máximo de despegue" },
      { label: "F-15 Eagle: récord invicto", value: "104 victorias aéreas · 0 derrotas en dogfight · el único con récord perfecto en combate" },
      { label: "Avión militar más caro por unidad", value: "B-2 Spirit · ~USD 2.100 millones · solo 21 ejemplares construidos" },
      { label: "Spitfire: ala elíptica", value: "Considerado el avión más bello de la historia · diseñado por R.J. Mitchell" },
    ]
  },
  {
    icon: "M12 2a10 10 0 100 20 10 10 0 000-20zm0 0v10m0 0l4-4m-4 4l-4-4",
    title: "Conceptos técnicos esenciales",
    facts: [
      { label: "VFR vs IFR", value: "VFR = Visual Flight Rules (vuelo a vista) · IFR = Instrument Flight Rules (vuelo por instrumentos, sin visibilidad)" },
      { label: "ILS", value: "Instrument Landing System · guía automática para aterrizaje con baja visibilidad usando señales de radio" },
      { label: "ETOPS-330", value: "El avión puede alejarse 330 min de un aeropuerto con un motor inactivo · permite rutas transoceánicas directas" },
      { label: "Turbofan vs turbohélice", value: "Turbohélice: hélice exterior visible · Turbofan: fan interno — más eficiente a alta velocidad" },
      { label: "Cajas negras: ¿de qué color son?", value: "NARANJA brillante (no negras) · para localizarlas · resisten 3.400 G y 1.100°C" },
      { label: "Boeing 787: motor Rolls-Royce Trent 1000", value: "~4.800 kg de peso · empuje 250-340 kN · uno de los más eficientes del mundo" },
      { label: "Tráfico aéreo global", value: "+100.000 vuelos/día · récord: 134.386 vuelos en un solo día (2023) · ~15.000 en el aire simultáneamente" },
    ]
  },
  {
    icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
    title: "Licencias de piloto (ANAC / ICAO)",
    facts: [
      { label: "PPL (Piloto Privado de Avión)", value: "Mínimo 40 horas · 17 años · Examen médico clase 2 · No se puede cobrar por volar" },
      { label: "CPL (Piloto Comercial)", value: "Mínimo 200 horas totales · 18 años · Examen médico clase 1 · Puede ejercer como instructora o taxi aéreo" },
      { label: "ATPL (Línea Aérea)", value: "Mínimo 1.500 horas (ICAO) · 21 años · Requerida para ser comandante de aerolínea" },
      { label: "Costo estimado PPL en Argentina", value: "USD 8.000–12.000 (escuela + horas de vuelo + certificaciones)" },
      { label: "Vuelo inaugural del Boeing 747", value: "Pan Am · 22 ene 1970 · Nueva York – Londres · inicio de la era de vuelos masivos" },
      { label: "Pirmer A380 en servicio comercial", value: "Singapore Airlines · octubre 2007 · vuelo inaugural en 2005 en Toulouse" },
    ]
  },
];
const SAVE_KEY = "wq";
const TIMER_SECS = 30;

export default function QuizPage() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECS);

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

  // Persist progress
  useEffect(() => {
    try {
      if (phase === "intro") { sessionStorage.removeItem(SAVE_KEY); return; }
      sessionStorage.setItem(SAVE_KEY, JSON.stringify({ phase, current, score }));
    } catch {}
  }, [phase, current, score]);

  // Reset timer when question changes
  useEffect(() => {
    if (phase === "playing") setTimeLeft(TIMER_SECS);
  }, [current, phase]);

  // Countdown timer
  useEffect(() => {
    if (phase !== "playing" || answered) return;
    if (timeLeft <= 0) {
      setAnswered(true);
      setSelected(-1);
      return;
    }
    const id = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timeLeft, phase, answered]);

  const q = questions[current];
  const progress = (current / questions.length) * 100;
  const finalProgress = ((current + 1) / questions.length) * 100;
  const timerPct = (timeLeft / TIMER_SECS) * 100;
  const timerColor = timeLeft > 10 ? "var(--sky)" : "#f87171";

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
    if (pct === 1) return { title: "PERFECTO — Sos un experto en aviación", sub: "Conocimiento de piloto de pruebas. Impresionante." };
    if (pct >= 0.8) return { title: "Excelente — Casi perfecto", sub: "Tenés un conocimiento serio de aviación." };
    if (pct >= 0.6) return { title: "Muy bien — Buen conocimiento", sub: "Sabés bastante de aviación. Seguí aprendiendo." };
    if (pct >= 0.4) return { title: "Bien — Vas por buen camino", sub: "Tenés una base sólida. WikiAir puede ayudarte a mejorar." };
    return { title: "A seguir aprendiendo", sub: "La enciclopedia WikiAir tiene todo lo que necesitás para mejorar tu puntaje." };
  }

  if (phase === "study") {
    return (
      <main className="page">
        <section className="container hero compactHero">
          <a className="back" onClick={() => setPhase("intro")} href="#" style={{ cursor: "pointer" }}>← Volver al inicio</a>
          <p className="gold">WIKIAIR · QUIZ · GUÍA DE ESTUDIO</p>
          <h1>Estudiá antes de jugar</h1>
          <p>Todos los temas que cubre el quiz. Leé, incorporá y después comprobá cuánto recordás.</p>
        </section>
        <section className="container" style={{ paddingBottom: 80 }}>
          {studySections.map((sec) => (
            <div key={sec.title} style={{ marginBottom: 48 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--sky-dim)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="var(--sky)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d={sec.icon} />
                  </svg>
                </div>
                <h2 style={{ fontSize: "clamp(18px, 3vw, 24px)", fontWeight: 800, letterSpacing: "-0.5px" }}>{sec.title}</h2>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {sec.facts.map((f) => (
                  <div key={f.label} style={{ background: "var(--glass)", border: "1px solid var(--border)", borderRadius: 12, padding: "14px 18px", display: "flex", flexDirection: "column", gap: 4 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "var(--sky)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{f.label}</span>
                    <span style={{ fontSize: 14, color: "var(--text)", lineHeight: 1.55 }}>{f.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div style={{ textAlign: "center", paddingTop: 16 }}>
            <button onClick={() => setPhase("playing")} className="btnPrimary" style={{ fontSize: 16, padding: "14px 40px" }}>
              Ya estudié — empezar el Quiz
            </button>
          </div>
        </section>
      </main>
    );
  }

  if (phase === "intro") {
    return (
      <main className="page">
        <section className="container hero compactHero">
          <button className="back" onClick={() => window.history.back()} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, font: "inherit", color: "inherit" }}>← Volver</button>
          <p className="gold">WIKIAIR · QUIZ</p>
          <h1>Quiz de Aviación</h1>
          <p>{questions.length} preguntas sobre aviones, récords, historia y curiosidades. Tenés 30 segundos por pregunta.</p>
        </section>
        <section className="container" style={{ paddingBottom: 60 }}>
          <div className="quizWrap">
            <div className="statsGrid" style={{ marginBottom: 40 }}>
              <div className="statBox"><h3>{questions.length}</h3><p>Preguntas</p></div>
              <div className="statBox"><h3>30s</h3><p>Por pregunta</p></div>
              <div className="statBox"><h3>5</h3><p>Temas de aviación</p></div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "center" }}>
              <button onClick={() => setPhase("study")} className="btnPrimary" style={{ fontSize: 16, padding: "14px 40px", width: "100%", maxWidth: 400 }}>
                📖 Estudiar antes del Quiz
              </button>
              <button onClick={() => setPhase("playing")} className="btnOutline" style={{ fontSize: 15, padding: "12px 40px", width: "100%", maxWidth: 400 }}>
                Ir directo al Quiz
              </button>
              <p style={{ fontSize: 12, color: "var(--muted2)", marginTop: 4 }}>
                Recomendamos estudiar si es tu primera vez
              </p>
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
          <button className="back" onClick={() => window.history.back()} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, font: "inherit", color: "inherit" }}>← Volver</button>
          <p className="gold">WIKIAIR · QUIZ</p>
          <h1>Resultado</h1>
        </section>
        <section className="container" style={{ paddingBottom: 60 }}>
          <div className="quizWrap" style={{ textAlign: "center" }}>
            <h2 style={{ fontSize: "clamp(20px, 5vw, 38px)", margin: "16px 0 8px" }}>{msg.title}</h2>
            <p style={{ color: "var(--muted2)", fontSize: 16, marginBottom: 32 }}>{msg.sub}</p>
            <div style={{ display: "flex", justifyContent: "center", gap: 24, marginBottom: 40 }}>
              <div className="statBox" style={{ minWidth: 130 }}>
                <h3 style={{ fontSize: 52 }}>{score}</h3>
                <p>correctas de {questions.length}</p>
              </div>
              <div className="statBox" style={{ minWidth: 130 }}>
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
        <button className="back" onClick={() => window.history.back()} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, font: "inherit", color: "inherit" }}>← Volver</button>
        <p className="gold">WIKIAIR · QUIZ · Pregunta {current + 1} de {questions.length}</p>
        <div className="quizProgress">
          <div className="quizBar" style={{ width: `${answered ? finalProgress : progress}%` }} />
        </div>
      </section>

      <section className="container" style={{ paddingBottom: 60 }}>
        <div className="quizWrap">
          <div className="quizBox">
            {/* Timer bar */}
            <div style={{ height: 3, background: "rgba(255,255,255,0.07)", borderRadius: 2, marginBottom: 18, overflow: "hidden" }}>
              <div style={{
                height: "100%", width: `${timerPct}%`,
                background: timerColor, borderRadius: 2,
                transition: answered ? "none" : "width 1s linear, background 0.3s",
              }} />
            </div>

            {/* Question + timer */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 20 }}>
              <p className="quizQuestion" style={{ margin: 0 }}>{q.question}</p>
              <span style={{
                fontSize: 22, fontWeight: 900, color: timerColor,
                minWidth: 44, textAlign: "right", transition: "color 0.3s",
                letterSpacing: -1, lineHeight: 1,
              }}>
                {answered ? "" : `${timeLeft}s`}
              </span>
            </div>

            <div className="quizOptions">
              {q.options.map((opt, idx) => {
                let cls = "quizOption";
                if (answered) {
                  if (idx === q.correct) cls += " quizCorrect";
                  else if (idx === selected && selected !== q.correct) cls += " quizWrong";
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
                <p style={{ color: (selected === q.correct) ? "#4ade80" : "#f87171", fontWeight: 800, marginBottom: 6 }}>
                  {selected === -1
                    ? `Tiempo agotado — era la opción ${["A", "B", "C", "D"][q.correct]}`
                    : selected === q.correct
                      ? "Correcto"
                      : `Incorrecto — era la opción ${["A", "B", "C", "D"][q.correct]}`}
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
