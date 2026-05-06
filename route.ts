import { NextResponse } from "next/server";

type StateVector = [
  string,
  string | null,
  string,
  number | null,
  number | null,
  number | null,
  number | null,
  number | null,
  boolean,
  number | null,
  number | null,
  number | null,
  number[] | null,
  number | null,
  string | null,
  boolean,
  number
];

export async function GET() {
  const bounds = {
    lamin: -35.5,
    lamax: -27.5,
    lomin: -66.5,
    lomax: -54.5
  };

  const url = new URL("https://opensky-network.org/api/states/all");
  url.searchParams.set("lamin", String(bounds.lamin));
  url.searchParams.set("lamax", String(bounds.lamax));
  url.searchParams.set("lomin", String(bounds.lomin));
  url.searchParams.set("lomax", String(bounds.lomax));

  try {
    const response = await fetch(url, {
      cache: "no-store",
      headers: {
        "User-Agent": "WikiAir/3.0 live radar"
      }
    });

    if (!response.ok) {
      return NextResponse.json({
        ok: false,
        error: `OpenSky respondió ${response.status}`,
        flights: [],
        bounds
      });
    }

    const data = await response.json();
    const states = (data.states || []) as StateVector[];

    const flights = states
      .filter((state) => state[5] !== null && state[6] !== null)
      .slice(0, 60)
      .map((state) => ({
        icao24: state[0],
        callsign: (state[1] || "SIN IDENTIFICAR").trim(),
        originCountry: state[2],
        longitude: state[5],
        latitude: state[6],
        altitude: state[7],
        velocity: state[9],
        heading: state[10]
      }));

    return NextResponse.json({
      ok: true,
      updated: data.time,
      flights,
      bounds
    }, {
      headers: {
        "Cache-Control": "no-store"
      }
    });
  } catch {
    return NextResponse.json({
      ok: false,
      error: "No se pudo conectar con OpenSky en este momento.",
      flights: [],
      bounds
    });
  }
}
