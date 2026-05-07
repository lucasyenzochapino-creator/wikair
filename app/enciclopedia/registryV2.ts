import type { Aircraft, AircraftGroup } from "./types";

type RawRegistryAircraft = {
  id: string;
  nombre: string;
  fabricante: string;
  pais_origen: string;
  primer_vuelo: number;
  tipo: string;
  categoria: string;
  propulsion: string;
  estado: string;
  produccion_aprox: number;
  notas: string;
};

const rawRegistryV2: RawRegistryAircraft[] = [{"id":"AV-00001","nombre":"Wright Flyer","fabricante":"Wright Brothers","pais_origen":"EEUU","primer_vuelo":1903,"tipo":"experimental","categoria":"pionero","propulsion":"helice_piston","estado":"historico","produccion_aprox":1,"notas":"Primer vuelo motorizado controlado de la historia"},{"id":"AV-00002","nombre":"Bleriot XI","fabricante":"Bleriot Aeronautique","pais_origen":"Francia","primer_vuelo":1909,"tipo":"civil","categoria":"pionero","propulsion":"helice_piston","estado":"historico","produccion_aprox":900,"notas":"Primera travesia del Canal de la Mancha en 1909"}];

function titleCase(value: string) {
  return value.replaceAll("_", " ").replace(/\s+/g, " ").trim().replace(/\b\w/g, (char) => char.toUpperCase());
}

function groupFor(item: RawRegistryAircraft): AircraftGroup {
  const cat = item.categoria.toLowerCase();
  const tipo = item.tipo.toLowerCase();
  if (cat.includes("planeador") || cat.includes("motorglider")) return "Planeadores";
  if (cat.includes("autogiro")) return "Autogiros";
  if (cat.includes("dirigible") || cat.includes("globo")) return "Dirigibles / Globos";
  if (cat.includes("ultraligero") || cat.includes("lsa") || cat.includes("deportivo") || cat.includes("acrobatico")) return "Deportivos / Ultraligeros";
  if (cat.includes("hidro") || cat.includes("anfibio")) return "Hidroaviones";
  if (cat.includes("helicoptero")) return "Helicópteros";
  if (cat.includes("entrenador")) return "Entrenamiento";
  if (cat.includes("transporte") && tipo === "militar") return "Carga";
  if (tipo === "militar") return "Militar";
  if (tipo === "comercial") return "Comercial";
  if (tipo === "experimental") return "Experimental";
  return "Privada / General";
}

function licenseFor(item: RawRegistryAircraft) {
  const cat = item.categoria.toLowerCase();
  const tipo = item.tipo.toLowerCase();
  if (tipo === "militar") return "Uso militar / estatal según país";
  if (tipo === "comercial") return "Licencia profesional comercial y certificación de línea aérea";
  if (cat.includes("planeador")) return "Licencia de planeador / vuelo a vela según país";
  if (cat.includes("autogiro")) return "Licencia de autogiro / deportiva según país";
  if (cat.includes("ultraligero")) return "Licencia ultraligero / deportiva según país";
  if (cat.includes("lsa")) return "Light Sport / licencia deportiva según país";
  if (cat.includes("deportivo")) return "Experimental, deportiva o PPL según país";
  if (cat.includes("globo")) return "Licencia de globo / aerostato según país";
  if (cat.includes("dirigible")) return "Licencia de aerostato / dirigible según autoridad";
  return "PPL, CPL o certificación equivalente según uso y país";
}

function propulsionLabel(value: string) {
  const labels: Record<string, string> = { helice_piston: "Hélice con motor a pistón", turbohelice: "Turbohélice", turbojet: "Turborreactor", turbofan: "Turbofán", turboeje: "Turboeje", cohete: "Cohete", electrico: "Eléctrico", electrico_solar: "Eléctrico solar", sin_motor: "Sin motor" };
  return labels[value] || titleCase(value);
}

function capacityFor(item: RawRegistryAircraft) {
  const cat = item.categoria.toLowerCase();
  const tipo = item.tipo.toLowerCase();
  if (cat.includes("caza") || cat.includes("interceptor") || cat.includes("ataque")) return "1-2 tripulantes según versión";
  if (cat.includes("entrenador")) return "1-2 tripulantes / alumnos según versión";
  if (cat.includes("planeador") || cat.includes("lsa") || cat.includes("ultraligero") || cat.includes("deportivo")) return "1-2 personas en la mayoría de versiones";
  if (cat.includes("globo")) return "Variable según cesta y modelo";
  if (cat.includes("dirigible")) return "Variable según configuración";
  if (cat.includes("helicoptero")) return "Variable según versión civil/militar";
  if (tipo === "comercial") return "Pasajeros/carga según variante";
  return "Variable según configuración";
}

function rangeFor(item: RawRegistryAircraft) {
  const cat = item.categoria.toLowerCase();
  if (cat.includes("planeador")) return "Depende de térmicas, meteorología y eficiencia de planeo";
  if (cat.includes("ultraligero") || cat.includes("lsa") || cat.includes("deportivo")) return "Vuelo local o travesía ligera según motor y combustible";
  if (cat.includes("autogiro")) return "Vuelo local/regional según combustible";
  if (cat.includes("globo")) return "Depende del viento, combustible y perfil de vuelo";
  return "No especificado en registro v2";
}

function speedFor(item: RawRegistryAircraft) {
  const cat = item.categoria.toLowerCase();
  if (cat.includes("planeador")) return "Velocidad variable según clase y meteorología";
  if (cat.includes("ultraligero")) return "Baja/media, según reglamentación y motor";
  if (cat.includes("lsa")) return "Limitada por categoría LSA según país";
  if (cat.includes("globo")) return "Deriva con el viento";
  return "No especificada en registro v2";
}

function interiorFor(item: RawRegistryAircraft) {
  const cat = item.categoria.toLowerCase();
  if (cat.includes("caza")) return "Cabina militar orientada a combate, sensores y supervivencia.";
  if (cat.includes("bombardero")) return "Cabina militar de misión, navegación y sistemas de armas.";
  if (cat.includes("helicoptero")) return "Cabina variable según rescate, transporte, ataque, entrenamiento o uso civil.";
  if (cat.includes("planeador")) return "Cabina ligera de vuelo a vela, normalmente monoplaza o biplaza.";
  if (cat.includes("ultraligero") || cat.includes("lsa") || cat.includes("deportivo")) return "Cabina ligera, simple y enfocada en vuelo recreativo/deportivo.";
  if (cat.includes("globo")) return "Canasta o barquilla para piloto y pasajeros.";
  if (cat.includes("dirigible")) return "Cabina/góndola para tripulación y pasajeros según diseño.";
  return "Interior variable según versión, operador y época.";
}

function missionFor(item: RawRegistryAircraft) {
  const cat = item.categoria.toLowerCase();
  if (cat.includes("caza")) return "Defensa aérea, superioridad aérea, escolta o ataque según versión.";
  if (cat.includes("bombardero")) return "Ataque táctico o estratégico según época y configuración.";
  if (cat.includes("transporte")) return "Transporte de pasajeros, carga, tropas o logística según uso.";
  if (cat.includes("entrenador")) return "Formación de pilotos y transición a aeronaves más complejas.";
  if (cat.includes("helicoptero")) return "Transporte, rescate, ataque, observación o trabajo aéreo según versión.";
  if (cat.includes("planeador")) return "Vuelo a vela, entrenamiento, competición y récords.";
  if (cat.includes("ultraligero") || cat.includes("lsa") || cat.includes("deportivo")) return "Vuelo recreativo, deportivo, travesía ligera o construcción amateur.";
  if (cat.includes("autogiro")) return "Vuelo recreativo, observación y operación de baja velocidad.";
  if (cat.includes("globo") || cat.includes("dirigible")) return "Vuelo recreativo, turístico, publicitario o histórico según modelo.";
  return item.notas;
}

export const registryV2Total = rawRegistryV2.length;

export const registryAircraft: Aircraft[] = rawRegistryV2.map((item) => {
  const category = titleCase(item.categoria);
  return {
    name: item.nombre,
    wiki: item.nombre,
    group: groupFor(item),
    role: category,
    maker: item.fabricante,
    origin: item.pais_origen,
    firstFlight: String(item.primer_vuelo),
    status: item.estado,
    license: licenseFor(item),
    engine: propulsionLabel(item.propulsion),
    capacity: capacityFor(item),
    speed: speedFor(item),
    range: rangeFor(item),
    operators: item.tipo === "militar" ? "Fuerzas armadas / operadores estatales según país" : "Operadores civiles, comerciales, clubes, escuelas o privados según modelo",
    history: item.notas,
    interior: interiorFor(item),
    mission: missionFor(item),
    registryId: item.id,
    registryType: item.tipo,
    registryCategory: item.categoria,
    propulsion: item.propulsion,
    productionApprox: item.produccion_aprox,
    registryNotes: item.notas
  };
});
