import type { AircraftSpec, TimelineEvent } from "@/lib/types";
import aircraftSeed from "@/data/aircraft.seed.json";

export const aircraft: AircraftSpec[] = aircraftSeed as AircraftSpec[];

export function getAircraftBySlug(slug: string) {
  return aircraft.find((item) => item.slug === slug);
}

export const timeline: TimelineEvent[] = [
  {
    year: "1903",
    title: "Primer vuelo controlado",
    description: "Los hermanos Wright logran un vuelo motorizado, controlado y sostenido en Kitty Hawk."
  },
  {
    year: "1914–1918",
    title: "La aviación entra en guerra",
    description: "La Primera Guerra Mundial acelera el desarrollo de cazas, reconocimiento aéreo y motores más fiables."
  },
  {
    year: "1939–1945",
    title: "Era del Spitfire, Mustang y bombarderos pesados",
    description: "La Segunda Guerra Mundial consolida el poder aéreo estratégico y táctico."
  },
  {
    year: "1947",
    title: "Ruptura de la barrera del sonido",
    description: "El Bell X-1 demuestra el vuelo supersónico controlado."
  },
  {
    year: "1958–1969",
    title: "Aviación comercial a reacción y carrera espacial",
    description: "Los reactores comerciales transforman los viajes y el programa Apolo culmina con el alunizaje."
  },
  {
    year: "1970–2005",
    title: "Jumbo jets, fly-by-wire y mega-aeronaves",
    description: "Boeing 747, Airbus A320 y A380 redefinen capacidad, seguridad y eficiencia operativa."
  },
  {
    year: "Actualidad",
    title: "Stealth, drones y movilidad aérea avanzada",
    description: "Los sistemas no tripulados, aeronaves furtivas y nuevos combustibles marcan la siguiente etapa."
  }
];
