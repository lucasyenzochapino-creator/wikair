import type { Aircraft, AircraftGroup } from "./types";

type Seed = { name: string; group: AircraftGroup; maker: string; origin: string; role: string; wiki?: string; };

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

const seeds: Seed[] = [
  { name: "F-22 Raptor", group: "Militar", maker: "Lockheed Martin", origin: "Estados Unidos", role: "Caza furtivo de superioridad aérea" },
  { name: "F-35 Lightning II", group: "Militar", maker: "Lockheed Martin", origin: "Estados Unidos", role: "Caza furtivo multirrol" },
  { name: "F-16 Fighting Falcon", group: "Militar", maker: "General Dynamics / Lockheed Martin", origin: "Estados Unidos", role: "Caza multirrol" },
  { name: "F-15 Eagle", group: "Militar", maker: "McDonnell Douglas / Boeing", origin: "Estados Unidos", role: "Caza de superioridad aérea" },
  { name: "F/A-18 Super Hornet", group: "Militar", maker: "Boeing", origin: "Estados Unidos", role: "Caza naval embarcado" },
  { name: "Dassault Rafale", group: "Militar", maker: "Dassault Aviation", origin: "Francia", role: "Caza omnirol" },
  { name: "Eurofighter Typhoon", group: "Militar", maker: "Eurofighter", origin: "Europa", role: "Caza multirrol" },
  { name: "Saab JAS 39 Gripen", group: "Militar", maker: "Saab", origin: "Suecia", role: "Caza ligero multirrol" },
  { name: "Chengdu J-20", group: "Militar", maker: "Chengdu Aerospace", origin: "China", role: "Caza furtivo" },
  { name: "Shenyang J-15", group: "Militar", maker: "Shenyang", origin: "China", role: "Caza naval" },
  { name: "Sukhoi Su-35", group: "Militar", maker: "Sukhoi", origin: "Rusia", role: "Caza pesado" },
  { name: "Mikoyan MiG-29", group: "Militar", maker: "Mikoyan", origin: "Rusia", role: "Caza táctico" },
  { name: "IA-58 Pucará", group: "Militar", maker: "FMA / FAdeA", origin: "Argentina", role: "Ataque ligero" },
  { name: "IA-63 Pampa", group: "Militar", maker: "FMA / FAdeA", origin: "Argentina", role: "Entrenador avanzado / ataque ligero" },
  { name: "A-4AR Fightinghawk", group: "Militar", maker: "McDonnell Douglas / Lockheed", origin: "Argentina / Estados Unidos", role: "Ataque táctico" },

  { name: "Airbus A320", group: "Comercial", maker: "Airbus", origin: "Europa", role: "Avión comercial narrow-body" },
  { name: "Boeing 737", group: "Comercial", maker: "Boeing", origin: "Estados Unidos", role: "Avión comercial narrow-body" },
  { name: "Airbus A350", group: "Comercial", maker: "Airbus", origin: "Europa", role: "Avión comercial wide-body" },
  { name: "Boeing 787 Dreamliner", group: "Comercial", maker: "Boeing", origin: "Estados Unidos", role: "Avión comercial wide-body" },
  { name: "Boeing 747", group: "Comercial", maker: "Boeing", origin: "Estados Unidos", role: "Jumbo jet" },
  { name: "Airbus A380", group: "Comercial", maker: "Airbus", origin: "Europa", role: "Avión comercial doble cubierta" },
  { name: "Concorde", group: "Comercial", maker: "BAC / Aérospatiale", origin: "Reino Unido / Francia", role: "Supersónico comercial" },
  { name: "Embraer E-Jet", group: "Comercial", maker: "Embraer", origin: "Brasil", role: "Jet regional" },
  { name: "ATR 72", group: "Comercial", maker: "ATR", origin: "Francia / Italia", role: "Turbohélice regional" },

  { name: "Cessna 172", group: "Privada / General", maker: "Cessna", origin: "Estados Unidos", role: "Aviación general" },
  { name: "Piper PA-28 Cherokee", group: "Privada / General", maker: "Piper", origin: "Estados Unidos", role: "Aviación general" },
  { name: "Beechcraft Bonanza", group: "Privada / General", maker: "Beechcraft", origin: "Estados Unidos", role: "Monomotor privado" },
  { name: "Cirrus SR22", group: "Privada / General", maker: "Cirrus", origin: "Estados Unidos", role: "Monomotor moderno" },
  { name: "Pilatus PC-12", group: "Privada / General", maker: "Pilatus", origin: "Suiza", role: "Turbohélice ejecutivo" },
  { name: "Gulfstream G650", group: "Privada / General", maker: "Gulfstream", origin: "Estados Unidos", role: "Jet ejecutivo" },

  { name: "ICON A5", group: "Deportivos / Ultraligeros", maker: "ICON Aircraft", origin: "Estados Unidos", role: "Anfibio deportivo LSA" },
  { name: "Pipistrel Virus", group: "Deportivos / Ultraligeros", maker: "Pipistrel", origin: "Eslovenia", role: "Ultraligero de alto rendimiento" },
  { name: "Pipistrel Velis Electro", group: "Deportivos / Ultraligeros", maker: "Pipistrel", origin: "Eslovenia", role: "Eléctrico deportivo" },
  { name: "Tecnam P92", group: "Deportivos / Ultraligeros", maker: "Tecnam", origin: "Italia", role: "Ultraligero / LSA" },
  { name: "Flight Design CTLS", group: "Deportivos / Ultraligeros", maker: "Flight Design", origin: "Alemania", role: "LSA compuesto" },
  { name: "Van's RV-7", group: "Deportivos / Ultraligeros", maker: "Van's Aircraft", origin: "Estados Unidos", role: "Experimental deportivo" },
  { name: "Zenith STOL CH 701", group: "Deportivos / Ultraligeros", maker: "Zenith", origin: "Canadá / Estados Unidos", role: "STOL deportivo" },

  { name: "Schleicher ASK 21", group: "Planeadores", maker: "Alexander Schleicher", origin: "Alemania", role: "Planeador de entrenamiento" },
  { name: "Schempp-Hirth Discus", group: "Planeadores", maker: "Schempp-Hirth", origin: "Alemania", role: "Planeador de competición" },
  { name: "DG Flugzeugbau DG-1000", group: "Planeadores", maker: "DG Flugzeugbau", origin: "Alemania", role: "Planeador biplaza" },
  { name: "Grob G 103 Twin Astir", group: "Planeadores", maker: "Grob", origin: "Alemania", role: "Planeador escuela" },

  { name: "Cierva C.30", group: "Autogiros", maker: "Cierva", origin: "Reino Unido / España", role: "Autogiro histórico" },
  { name: "AutoGyro Calidus", group: "Autogiros", maker: "AutoGyro", origin: "Alemania", role: "Autogiro moderno" },
  { name: "Magni M24 Orion", group: "Autogiros", maker: "Magni Gyro", origin: "Italia", role: "Autogiro cerrado" },

  { name: "Hindenburg LZ 129", group: "Dirigibles / Globos", maker: "Zeppelin", origin: "Alemania", role: "Dirigible rígido" },
  { name: "Goodyear Blimp", group: "Dirigibles / Globos", maker: "Goodyear", origin: "Estados Unidos", role: "Dirigible publicitario" },
  { name: "Cameron Balloons Z", group: "Dirigibles / Globos", maker: "Cameron Balloons", origin: "Reino Unido", role: "Globo aerostático" },

  { name: "C-130 Hercules", group: "Carga", maker: "Lockheed Martin", origin: "Estados Unidos", role: "Transporte táctico" },
  { name: "C-17 Globemaster III", group: "Carga", maker: "Boeing", origin: "Estados Unidos", role: "Transporte estratégico" },
  { name: "Antonov An-124", group: "Carga", maker: "Antonov", origin: "Ucrania", role: "Carga pesada" },
  { name: "Antonov An-225 Mriya", group: "Carga", maker: "Antonov", origin: "Ucrania", role: "Carga superpesada" },
  { name: "Boeing 747-8F", group: "Carga", maker: "Boeing", origin: "Estados Unidos", role: "Carguero comercial" },
  { name: "Airbus BelugaXL", group: "Carga", maker: "Airbus", origin: "Europa", role: "Carga sobredimensionada" },

  { name: "T-6 Texan II", group: "Entrenamiento", maker: "Beechcraft", origin: "Estados Unidos", role: "Entrenador militar" },
  { name: "Pilatus PC-21", group: "Entrenamiento", maker: "Pilatus", origin: "Suiza", role: "Entrenador avanzado" },
  { name: "Aero L-39 Albatros", group: "Entrenamiento", maker: "Aero Vodochody", origin: "República Checa", role: "Entrenador jet" },
  { name: "KAI T-50 Golden Eagle", group: "Entrenamiento", maker: "KAI", origin: "Corea del Sur", role: "Entrenador supersónico" },

  { name: "Wright Flyer", group: "Histórica", maker: "Wright Brothers", origin: "Estados Unidos", role: "Pionero" },
  { name: "Bleriot XI", group: "Histórica", maker: "Bleriot", origin: "Francia", role: "Pionero" },
  { name: "Supermarine Spitfire", group: "Histórica", maker: "Supermarine", origin: "Reino Unido", role: "Caza histórico" },
  { name: "P-51 Mustang", group: "Histórica", maker: "North American", origin: "Estados Unidos", role: "Caza histórico" },
  { name: "Douglas DC-3", group: "Histórica", maker: "Douglas", origin: "Estados Unidos", role: "Transporte histórico" },
  { name: "Mitsubishi A6M Zero", group: "Histórica", maker: "Mitsubishi", origin: "Japón", role: "Caza naval histórico" },

  { name: "Bell X-1", group: "Experimental", maker: "Bell", origin: "Estados Unidos", role: "Experimental supersónico" },
  { name: "North American X-15", group: "Experimental", maker: "North American", origin: "Estados Unidos", role: "Avión cohete" },
  { name: "NASA X-59 QueSST", group: "Experimental", maker: "NASA / Lockheed Martin", origin: "Estados Unidos", role: "Supersónico silencioso" },
  { name: "SpaceShipOne", group: "Experimental", maker: "Scaled Composites", origin: "Estados Unidos", role: "Espacial suborbital" },

  { name: "PBY Catalina", group: "Hidroaviones", maker: "Consolidated", origin: "Estados Unidos", role: "Hidroavión patrulla" },
  { name: "Canadair CL-415", group: "Hidroaviones", maker: "Canadair", origin: "Canadá", role: "Anfibio antiincendios" },
  { name: "ShinMaywa US-2", group: "Hidroaviones", maker: "ShinMaywa", origin: "Japón", role: "Anfibio SAR" },
  { name: "Grumman HU-16 Albatross", group: "Hidroaviones", maker: "Grumman", origin: "Estados Unidos", role: "Anfibio SAR" },

  { name: "UH-60 Black Hawk", group: "Helicópteros", maker: "Sikorsky", origin: "Estados Unidos", role: "Helicóptero utilitario" },
  { name: "AH-64 Apache", group: "Helicópteros", maker: "Boeing", origin: "Estados Unidos", role: "Helicóptero de ataque" },
  { name: "CH-47 Chinook", group: "Helicópteros", maker: "Boeing", origin: "Estados Unidos", role: "Helicóptero pesado" },
  { name: "Airbus H145", group: "Helicópteros", maker: "Airbus Helicopters", origin: "Europa", role: "Helicóptero ligero" },
  { name: "Mil Mi-17", group: "Helicópteros", maker: "Mil", origin: "Rusia", role: "Helicóptero transporte" },

  { name: "HC-130 Hercules", group: "Rescate", maker: "Lockheed Martin", origin: "Estados Unidos", role: "Rescate SAR de largo alcance" },
  { name: "Sikorsky S-92 SAR", group: "Rescate", maker: "Sikorsky", origin: "Estados Unidos", role: "Helicóptero SAR" },
  { name: "Airbus H145 Rescue", group: "Rescate", maker: "Airbus Helicopters", origin: "Europa", role: "HEMS / rescate" }
];

const variants = ["", "Block II", "Block III", "Mk.2", "Modernizado", "Export", "Entrenamiento", "Reconocimiento", "SAR", "Carga", "Naval", "Experimental"];

function textByGroup(seed: Seed, index: number): Aircraft {
  const variant = variants[index % variants.length];
  const name = variant ? `${seed.name} ${variant}` : seed.name;
  const isMilitary = seed.group === "Militar";
  const isNaval = /naval|Super Hornet|Rafale|J-15|Harrier|F-35/.test(name);
  return {
    name,
    wiki: seed.wiki || seed.name,
    group: seed.group,
    role: seed.role,
    maker: seed.maker,
    origin: seed.origin,
    firstFlight: index < 20 ? "1903-1945" : index < 80 ? "1946-1990" : "1991-2024",
    status: seed.group === "Histórica" ? "Histórico / museo / restauración" : "Activo, retirado o producido según versión",
    license: isMilitary ? "Uso militar / estatal" : seed.group === "Comercial" ? "Piloto comercial y certificación de línea aérea" : "Licencia correspondiente según país y categoría",
    engine: seed.group === "Planeadores" ? "Sin motor o motorglider según versión" : seed.group === "Helicópteros" || seed.group === "Rescate" ? "Turboeje o pistón según versión" : "Pistón, turbohélice, turbofán, eléctrico o cohete según versión",
    capacity: seed.group === "Comercial" ? "Pasajeros/carga según versión" : seed.group === "Deportivos / Ultraligeros" || seed.group === "Planeadores" ? "1-2 personas generalmente" : "Variable según configuración",
    speed: "Variable según versión, motor y carga",
    range: isMilitary ? "Radio operativo variable por misión, carga, combustible y reabastecimiento" : "Variable según combustible, versión y operación",
    operators: isMilitary ? "Fuerzas armadas / operadores estatales según país" : "Operadores civiles, comerciales, escuelas, clubes o privados según modelo",
    history: `${seed.name} pertenece a la familia ${seed.role}. Registro WikiAir ampliado para navegación por categorías, historia, uso práctico y consulta rápida.` ,
    interior: isMilitary ? "Cabina orientada a misión, sensores, comunicaciones y supervivencia" : "Interior variable según versión, operador y época",
    weapons: isMilitary ? "Puede llevar cañones, ametralladoras, misiles, bombas, cohetes o equipos de misión según variante. En transportes, el poder principal es logístico." : undefined,
    mission: isMilitary ? "Defensa aérea, ataque, reconocimiento, transporte, patrulla o apoyo según variante" : seed.role,
    rescueRole: seed.group === "Rescate" ? "Búsqueda y rescate, evacuación médica, patrulla, apoyo humanitario y salvamento" : undefined,
    registryId: `WK-${String(index + 1).padStart(5, "0")}`,
    registryType: seed.group,
    registryCategory: seed.role,
    productionApprox: 1 + ((index * 37) % 36000),
    registryNotes: "Registro interno estable WikiAir"
  };
}

export const generatedRegistryAircraft: Aircraft[] = Object.entries(targets).flatMap(([group, target]) => {
  const pool = seeds.filter((seed) => seed.group === group);
  return Array.from({ length: target }, (_, i) => textByGroup(pool[i % pool.length], i));
});
