export type AircraftGroup = "Militar" | "Comercial" | "Privada / General" | "Carga" | "Entrenamiento" | "Histórica" | "Experimental";

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
  interior: string;
};

export const groups: AircraftGroup[] = [
  "Militar",
  "Comercial",
  "Privada / General",
  "Carga",
  "Entrenamiento",
  "Histórica",
  "Experimental"
];
