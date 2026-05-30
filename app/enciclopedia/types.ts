export type AircraftGroup = "Militar" | "Comercial" | "Privada / General" | "Carga" | "Entrenamiento" | "Histórica" | "Experimental" | "Hidroaviones" | "Helicópteros" | "Rescate" | "Deportivos / Ultraligeros" | "Planeadores" | "Autogiros" | "Dirigibles / Globos";

export type Aircraft = {
  name: string;
  wiki: string;
  group: AircraftGroup;
  role: string;
  maker: string;
  origin: string;
  firstFlight: string;
  status: string;
  license: string;
  engine: string;
  capacity: string;
  speed: string;
  range: string;
  operators: string;
  history: string;
  interior?: string;
  weapons?: string;
  mission?: string;
  rescueRole?: string;
  registryId?: string;
  registryType?: string;
  registryCategory?: string;
  propulsion?: string;
  productionApprox?: number;
  registryNotes?: string;
};

export const groups: AircraftGroup[] = [
  "Militar",
  "Comercial",
  "Privada / General",
  "Deportivos / Ultraligeros",
  "Planeadores",
  "Autogiros",
  "Dirigibles / Globos",
  "Carga",
  "Entrenamiento",
  "Histórica",
  "Experimental",
  "Hidroaviones",
  "Helicópteros",
  "Rescate"
];