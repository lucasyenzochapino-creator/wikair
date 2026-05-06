
export type AircraftCategory = "militar" | "comercial" | "privada" | "historica";

export type AircraftClass =
  | "caza"
  | "bombardero"
  | "transporte"
  | "narrow-body"
  | "wide-body"
  | "privada"
  | "historica";

export type PilotLicense =
  | "PPL"
  | "CPL"
  | "ATPL"
  | "Type Rating"
  | "Militar"
  | "Experimental/Histórica";

export interface AircraftSpec {
  id: string;
  slug: string;
  name: string;
  manufacturer: string;
  category: AircraftCategory;
  class: AircraftClass;
  countryOfOrigin: string;
  maxSpeedKmh: number;
  rangeKm: number;
  serviceCeilingM: number;
  engines: string;
  passengerOrCargoCapacity: string;
  countryWithMostOperationalUnits: string;
  requiredPilotLicense: PilotLicense[];
  firstFlightYear: number;
  description: string;
  imageUrl?: string;
  tags: string[];
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}
