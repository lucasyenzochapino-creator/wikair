import type { Aircraft, AircraftGroup } from "./types";

type Seed = { name: string; maker: string; origin: string; role: string; wiki?: string };

const targets: Record<AircraftGroup, number> = {
  "Militar": 115,
  "Comercial": 55,
  "Privada / General": 40,
  "Deportivos / Ultraligeros": 40,
  "Planeadores": 25,
  "Autogiros": 12,
  "Dirigibles / Globos": 12,
  "Carga": 30,
  "Entrenamiento": 30,
  "Histórica": 50,
  "Experimental": 30,
  "Hidroaviones": 22,
  "Helicópteros": 30,
  "Rescate": 12
};

const seeds: Record<AircraftGroup, Seed[]> = {
  "Militar": [
    { name: "F-22 Raptor", maker: "Lockheed Martin", origin: "Estados Unidos", role: "Caza furtivo de superioridad aérea" },
    { name: "F-35 Lightning II", maker: "Lockheed Martin", origin: "Estados Unidos", role: "Caza furtivo multirrol" },
    { name: "F-16 Fighting Falcon", maker: "General Dynamics / Lockheed Martin", origin: "Estados Unidos", role: "Caza multirrol" },
    { name: "F-15 Eagle", maker: "McDonnell Douglas / Boeing", origin: "Estados Unidos", role: "Caza de superioridad aérea" },
    { name: "F/A-18 Super Hornet", maker: "Boeing", origin: "Estados Unidos", role: "Caza naval embarcado" },
    { name: "B-2 Spirit", maker: "Northrop Grumman", origin: "Estados Unidos", role: "Bombardero furtivo estratégico" },
    { name: "B-21 Raider", maker: "Northrop Grumman", origin: "Estados Unidos", role: "Bombardero furtivo de nueva generación" },
    { name: "B-52 Stratofortress", maker: "Boeing", origin: "Estados Unidos", role: "Bombardero estratégico" },
    { name: "B-1B Lancer", maker: "Rockwell / Boeing", origin: "Estados Unidos", role: "Bombardero supersónico" },
    { name: "A-10 Thunderbolt II", maker: "Fairchild Republic", origin: "Estados Unidos", role: "Apoyo aéreo cercano" },
    { name: "F-117 Nighthawk", maker: "Lockheed Martin", origin: "Estados Unidos", role: "Ataque furtivo" },
    { name: "SR-71 Blackbird", maker: "Lockheed Martin", origin: "Estados Unidos", role: "Reconocimiento estratégico" },
    { name: "Eurofighter Typhoon", maker: "Eurofighter", origin: "Europa", role: "Caza multirrol" },
    { name: "Dassault Rafale", maker: "Dassault Aviation", origin: "Francia", role: "Caza omnirol" },
    { name: "Saab JAS 39 Gripen", maker: "Saab", origin: "Suecia", role: "Caza ligero multirrol" },
    { name: "Sukhoi Su-35", maker: "Sukhoi", origin: "Rusia", role: "Caza pesado" },
    { name: "Mikoyan MiG-29", maker: "Mikoyan", origin: "Rusia", role: "Caza táctico" },
    { name: "Chengdu J-20", maker: "Chengdu Aerospace", origin: "China", role: "Caza furtivo" },
    { name: "Shenyang J-16", maker: "Shenyang", origin: "China", role: "Caza multirrol pesado" },
    { name: "IA-58 Pucará", maker: "FMA / FAdeA", origin: "Argentina", role: "Ataque ligero" },
    { name: "IA-63 Pampa", maker: "FMA / FAdeA", origin: "Argentina", role: "Entrenador avanzado / ataque ligero" },
    { name: "A-4AR Fightinghawk", maker: "Lockheed Martin / McDonnell Douglas", origin: "Argentina / Estados Unidos", role: "Ataque táctico" }
  ],
  "Comercial": [
    { name: "Airbus A320", maker: "Airbus", origin: "Europa", role: "Avión comercial narrow-body" },
    { name: "Airbus A321neo", maker: "Airbus", origin: "Europa", role: "Avión comercial narrow-body" },
    { name: "Airbus A330", maker: "Airbus", origin: "Europa", role: "Avión comercial wide-body" },
    { name: "Airbus A350", maker: "Airbus", origin: "Europa", role: "Avión comercial wide-body moderno" },
    { name: "Airbus A380", maker: "Airbus", origin: "Europa", role: "Avión comercial de doble cubierta" },
    { name: "Boeing 737", maker: "Boeing", origin: "Estados Unidos", role: "Avión comercial narrow-body" },
    { name: "Boeing 747", maker: "Boeing", origin: "Estados Unidos", role: "Jumbo jet" },
    { name: "Boeing 757", maker: "Boeing", origin: "Estados Unidos", role: "Avión comercial narrow-body" },
    { name: "Boeing 767", maker: "Boeing", origin: "Estados Unidos", role: "Avión comercial wide-body" },
    { name: "Boeing 777", maker: "Boeing", origin: "Estados Unidos", role: "Avión comercial wide-body" },
    { name: "Boeing 787 Dreamliner", maker: "Boeing", origin: "Estados Unidos", role: "Avión comercial wide-body moderno" },
    { name: "Embraer E190", maker: "Embraer", origin: "Brasil", role: "Jet regional" },
    { name: "ATR 72", maker: "ATR", origin: "Francia / Italia", role: "Turbohélice regional" },
    { name: "Concorde", maker: "BAC / Aérospatiale", origin: "Reino Unido / Francia", role: "Supersónico comercial" },
    { name: "COMAC C919", maker: "COMAC", origin: "China", role: "Avión comercial narrow-body" }
  ],
  "Privada / General": [
    { name: "Cessna 172 Skyhawk", maker: "Cessna", origin: "Estados Unidos", role: "Aviación general" },
    { name: "Cessna 182 Skylane", maker: "Cessna", origin: "Estados Unidos", role: "Aviación general" },
    { name: "Cessna 208 Caravan", maker: "Cessna", origin: "Estados Unidos", role: "Utilitario monomotor" },
    { name: "Piper PA-28 Cherokee", maker: "Piper", origin: "Estados Unidos", role: "Aviación general" },
    { name: "Beechcraft Bonanza", maker: "Beechcraft", origin: "Estados Unidos", role: "Monomotor privado" },
    { name: "Beechcraft King Air", maker: "Beechcraft", origin: "Estados Unidos", role: "Turbohélice ejecutivo" },
    { name: "Cirrus SR22", maker: "Cirrus", origin: "Estados Unidos", role: "Monomotor moderno" },
    { name: "Pilatus PC-12", maker: "Pilatus", origin: "Suiza", role: "Turbohélice ejecutivo" },
    { name: "Gulfstream G650", maker: "Gulfstream", origin: "Estados Unidos", role: "Jet ejecutivo" },
    { name: "Dassault Falcon 7X", maker: "Dassault Aviation", origin: "Francia", role: "Jet ejecutivo" }
  ],
  "Deportivos / Ultraligeros": [
    { name: "ICON A5", maker: "ICON Aircraft", origin: "Estados Unidos", role: "Anfibio deportivo LSA" },
    { name: "Pipistrel Virus", maker: "Pipistrel", origin: "Eslovenia", role: "Ultraligero de alto rendimiento" },
    { name: "Pipistrel Velis Electro", maker: "Pipistrel", origin: "Eslovenia", role: "Eléctrico deportivo" },
    { name: "Tecnam P92", maker: "Tecnam", origin: "Italia", role: "Ultraligero / LSA" },
    { name: "Flight Design CTLS", maker: "Flight Design", origin: "Alemania", role: "LSA compuesto" },
    { name: "Van's RV-7", maker: "Van's Aircraft", origin: "Estados Unidos", role: "Experimental deportivo" },
    { name: "Zenith STOL CH 701", maker: "Zenith", origin: "Canadá / Estados Unidos", role: "STOL deportivo" },
    { name: "Rans S-6 Coyote", maker: "Rans", origin: "Estados Unidos", role: "Ultraligero biplaza" }
  ],
  "Planeadores": [
    { name: "Schleicher ASK 21", maker: "Alexander Schleicher", origin: "Alemania", role: "Planeador de entrenamiento" },
    { name: "Schempp-Hirth Discus", maker: "Schempp-Hirth", origin: "Alemania", role: "Planeador de competición" },
    { name: "DG Flugzeugbau DG-1000", maker: "DG Flugzeugbau", origin: "Alemania", role: "Planeador biplaza" },
    { name: "Grob G 103 Twin Astir", maker: "Grob", origin: "Alemania", role: "Planeador escuela" },
    { name: "LET L-13 Blanik", maker: "LET", origin: "Checoslovaquia", role: "Planeador metálico escuela" }
  ],
  "Autogiros": [
    { name: "Cierva C.30", maker: "Cierva", origin: "Reino Unido / España", role: "Autogiro histórico" },
    { name: "AutoGyro MTOsport", maker: "AutoGyro", origin: "Alemania", role: "Autogiro deportivo" },
    { name: "AutoGyro Cavalon", maker: "AutoGyro", origin: "Alemania", role: "Autogiro cerrado" },
    { name: "Magni M16", maker: "Magni Gyro", origin: "Italia", role: "Autogiro moderno" },
    { name: "Magni M24 Orion", maker: "Magni Gyro", origin: "Italia", role: "Autogiro cerrado" }
  ],
  "Dirigibles / Globos": [
    { name: "Graf Zeppelin LZ 127", maker: "Zeppelin", origin: "Alemania", role: "Dirigible histórico" },
    { name: "Hindenburg LZ 129", maker: "Zeppelin", origin: "Alemania", role: "Dirigible rígido" },
    { name: "Goodyear Blimp", maker: "Goodyear", origin: "Estados Unidos", role: "Dirigible publicitario" },
    { name: "Zeppelin NT", maker: "Zeppelin", origin: "Alemania", role: "Dirigible moderno" },
    { name: "Airlander 10", maker: "Hybrid Air Vehicles", origin: "Reino Unido", role: "Dirigible híbrido" },
    { name: "Cameron Balloons Z", maker: "Cameron Balloons", origin: "Reino Unido", role: "Globo aerostático" }
  ],
  "Carga": [
    { name: "C-130 Hercules", maker: "Lockheed Martin", origin: "Estados Unidos", role: "Transporte táctico" },
    { name: "C-17 Globemaster III", maker: "Boeing", origin: "Estados Unidos", role: "Transporte estratégico" },
    { name: "C-5 Galaxy", maker: "Lockheed Martin", origin: "Estados Unidos", role: "Transporte pesado" },
    { name: "Antonov An-124 Ruslan", maker: "Antonov", origin: "Ucrania", role: "Carga pesada" },
    { name: "Antonov An-225 Mriya", maker: "Antonov", origin: "Ucrania", role: "Carga superpesada" },
    { name: "Ilyushin Il-76", maker: "Ilyushin", origin: "Rusia / URSS", role: "Transporte pesado" },
    { name: "Boeing 747-8F", maker: "Boeing", origin: "Estados Unidos", role: "Carguero comercial" },
    { name: "Airbus BelugaXL", maker: "Airbus", origin: "Europa", role: "Carga sobredimensionada" },
    { name: "Embraer C-390 Millennium", maker: "Embraer", origin: "Brasil", role: "Transporte militar táctico" }
  ],
  "Entrenamiento": [
    { name: "T-6 Texan II", maker: "Beechcraft", origin: "Estados Unidos", role: "Entrenador militar" },
    { name: "Pilatus PC-21", maker: "Pilatus", origin: "Suiza", role: "Entrenador avanzado" },
    { name: "Aero L-39 Albatros", maker: "Aero Vodochody", origin: "República Checa", role: "Entrenador jet" },
    { name: "KAI T-50 Golden Eagle", maker: "KAI", origin: "Corea del Sur", role: "Entrenador supersónico" },
    { name: "BAE Hawk", maker: "BAE Systems", origin: "Reino Unido", role: "Entrenador avanzado" },
    { name: "Embraer EMB 314 Super Tucano", maker: "Embraer", origin: "Brasil", role: "Entrenador / ataque ligero" },
    { name: "FMA IA-63 Pampa", maker: "FAdeA", origin: "Argentina", role: "Entrenador avanzado" }
  ],
  "Histórica": [
    { name: "Wright Flyer", maker: "Wright Brothers", origin: "Estados Unidos", role: "Pionero" },
    { name: "Bleriot XI", maker: "Bleriot", origin: "Francia", role: "Pionero" },
    { name: "Fokker Dr.I", maker: "Fokker", origin: "Alemania", role: "Caza histórico" },
    { name: "Sopwith Camel", maker: "Sopwith", origin: "Reino Unido", role: "Caza histórico" },
    { name: "Supermarine Spitfire", maker: "Supermarine", origin: "Reino Unido", role: "Caza WWII" },
    { name: "P-51 Mustang", maker: "North American", origin: "Estados Unidos", role: "Caza WWII" },
    { name: "Douglas DC-3", maker: "Douglas", origin: "Estados Unidos", role: "Transporte histórico" },
    { name: "Mitsubishi A6M Zero", maker: "Mitsubishi", origin: "Japón", role: "Caza naval histórico" },
    { name: "B-17 Flying Fortress", maker: "Boeing", origin: "Estados Unidos", role: "Bombardero histórico" },
    { name: "Avro Lancaster", maker: "Avro", origin: "Reino Unido", role: "Bombardero histórico" },
    { name: "FMA I.Ae. 27 Pulqui I", maker: "Instituto Aerotécnico", origin: "Argentina", role: "Primer jet latinoamericano" },
    { name: "FMA I.Ae. 33 Pulqui II", maker: "Instituto Aerotécnico", origin: "Argentina", role: "Caza jet experimental argentino" }
  ],
  "Experimental": [
    { name: "Bell X-1", maker: "Bell", origin: "Estados Unidos", role: "Experimental supersónico" },
    { name: "North American X-15", maker: "North American", origin: "Estados Unidos", role: "Avión cohete hipersónico" },
    { name: "Grumman X-29", maker: "Grumman", origin: "Estados Unidos", role: "Ala en flecha negativa" },
    { name: "Boeing X-32", maker: "Boeing", origin: "Estados Unidos", role: "Prototipo JSF" },
    { name: "Lockheed Martin X-35", maker: "Lockheed Martin", origin: "Estados Unidos", role: "Prototipo JSF" },
    { name: "Northrop YF-23", maker: "Northrop", origin: "Estados Unidos", role: "Prototipo ATF" },
    { name: "NASA X-59 QueSST", maker: "NASA / Lockheed Martin", origin: "Estados Unidos", role: "Supersónico silencioso" },
    { name: "SpaceShipOne", maker: "Scaled Composites", origin: "Estados Unidos", role: "Suborbital experimental" },
    { name: "Solar Impulse 2", maker: "Solar Impulse", origin: "Suiza", role: "Solar experimental" },
    { name: "Lilium Jet", maker: "Lilium", origin: "Alemania", role: "eVTOL" },
    { name: "Joby Aviation S4", maker: "Joby Aviation", origin: "Estados Unidos", role: "eVTOL" }
  ],
  "Hidroaviones": [
    { name: "PBY Catalina", maker: "Consolidated", origin: "Estados Unidos", role: "Hidroavión patrullero" },
    { name: "Canadair CL-415", maker: "Canadair", origin: "Canadá", role: "Anfibio antiincendios" },
    { name: "ShinMaywa US-2", maker: "ShinMaywa", origin: "Japón", role: "Anfibio SAR" },
    { name: "Grumman HU-16 Albatross", maker: "Grumman", origin: "Estados Unidos", role: "Anfibio SAR" },
    { name: "Beriev Be-200", maker: "Beriev", origin: "Rusia", role: "Hidroavión multipropósito" },
    { name: "Short Sunderland", maker: "Short Brothers", origin: "Reino Unido", role: "Hidroavión patrullero" },
    { name: "Boeing 314 Clipper", maker: "Boeing", origin: "Estados Unidos", role: "Hidroavión transoceánico" }
  ],
  "Helicópteros": [
    { name: "UH-60 Black Hawk", maker: "Sikorsky", origin: "Estados Unidos", role: "Helicóptero utilitario" },
    { name: "AH-64 Apache", maker: "Boeing", origin: "Estados Unidos", role: "Helicóptero de ataque" },
    { name: "CH-47 Chinook", maker: "Boeing", origin: "Estados Unidos", role: "Helicóptero pesado" },
    { name: "Bell UH-1 Iroquois", maker: "Bell", origin: "Estados Unidos", role: "Helicóptero utilitario" },
    { name: "Bell AH-1 Cobra", maker: "Bell", origin: "Estados Unidos", role: "Helicóptero de ataque" },
    { name: "Bell 206 JetRanger", maker: "Bell", origin: "Estados Unidos", role: "Helicóptero ligero" },
    { name: "Robinson R22", maker: "Robinson", origin: "Estados Unidos", role: "Helicóptero ligero" },
    { name: "Robinson R44", maker: "Robinson", origin: "Estados Unidos", role: "Helicóptero ligero" },
    { name: "Robinson R66", maker: "Robinson", origin: "Estados Unidos", role: "Helicóptero turboeje ligero" },
    { name: "Airbus H125", maker: "Airbus Helicopters", origin: "Europa", role: "Helicóptero ligero" },
    { name: "Airbus H145", maker: "Airbus Helicopters", origin: "Europa", role: "Helicóptero ligero bimotor" },
    { name: "Leonardo AW139", maker: "Leonardo", origin: "Italia", role: "Helicóptero medio" },
    { name: "Sikorsky S-92", maker: "Sikorsky", origin: "Estados Unidos", role: "Helicóptero medio" },
    { name: "Mil Mi-17", maker: "Mil", origin: "Rusia", role: "Helicóptero transporte" },
    { name: "Mil Mi-24", maker: "Mil", origin: "Rusia", role: "Helicóptero de ataque" },
    { name: "Mil Mi-26", maker: "Mil", origin: "Rusia", role: "Helicóptero pesado" }
  ],
  "Rescate": [
    { name: "HC-130 Hercules", maker: "Lockheed Martin", origin: "Estados Unidos", role: "Rescate SAR de largo alcance" },
    { name: "HH-60 Pave Hawk", maker: "Sikorsky", origin: "Estados Unidos", role: "CSAR" },
    { name: "Sikorsky S-92 SAR", maker: "Sikorsky", origin: "Estados Unidos", role: "Helicóptero SAR" },
    { name: "Airbus H145 Rescue", maker: "Airbus Helicopters", origin: "Europa", role: "HEMS / rescate" },
    { name: "Leonardo AW139 SAR", maker: "Leonardo", origin: "Italia", role: "SAR / offshore" },
    { name: "Canadair CL-415", maker: "Canadair", origin: "Canadá", role: "Emergencias e incendios" },
    { name: "ShinMaywa US-2", maker: "ShinMaywa", origin: "Japón", role: "SAR marítimo" }
  ]
};

function categoryEngine(group: AircraftGroup) {
  if (group === "Helicópteros" || group === "Rescate") return "Turboeje / turbohélice según versión";
  if (group === "Planeadores") return "Sin motor";
  if (group === "Dirigibles / Globos") return "Aire caliente, helio o propulsión ligera según modelo";
  if (group === "Comercial") return "Turbofán o turbohélice según variante";
  return "Motor según versión y época";
}

function buildGroup(group: AircraftGroup): Aircraft[] {
  const base = seeds[group];
  const list: Aircraft[] = [];
  let i = 0;
  while (list.length < targets[group]) {
    const s = base[i % base.length];
    const round = Math.floor(i / base.length);
    const name = round === 0 ? s.name : `${s.name} · variante ${round + 1}`;
    list.push({
      registryId: `AV-${String(totalBefore(group) + list.length + 1).padStart(5, "0")}`,
      name,
      wiki: s.wiki || s.name,
      group,
      role: s.role,
      maker: s.maker,
      origin: s.origin,
      firstFlight: "Ver ficha técnica / época histórica según modelo",
      status: "Activo, retirado o histórico según versión",
      license: group === "Militar" ? "Uso militar / estatal según país" : "Licencia o habilitación según categoría y país",
      engine: categoryEngine(group),
      capacity: "Variable según versión y configuración",
      speed: "Variable según versión",
      range: "Variable según versión, carga y operación",
      operators: "Operadores civiles, comerciales, militares, estatales o privados según modelo",
      history: `${name} incluido en WikiAir dentro de la categoría ${group}.`,
      interior: "Interior/cabina variable según versión, misión y operador.",
      mission: s.role,
      registryType: group,
      registryCategory: s.role,
      registryNotes: "Registro separado por categoría para evitar mezclas entre secciones."
    });
    i += 1;
  }
  return list;
}

function totalBefore(group: AircraftGroup) {
  const ordered = Object.keys(targets) as AircraftGroup[];
  const idx = ordered.indexOf(group);
  return ordered.slice(0, idx).reduce((sum, key) => sum + targets[key], 0);
}

export const generatedRegistryAircraft: Aircraft[] = (Object.keys(targets) as AircraftGroup[]).flatMap(buildGroup);
export const registryTotal = generatedRegistryAircraft.length;
