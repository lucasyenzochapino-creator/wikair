import { NextRequest, NextResponse } from "next/server";

const OPEN_SKY_URL = "https://opensky-network.org/api/states/all";

function param(searchParams: URLSearchParams, name: string, fallback: number) {
  const value = Number(searchParams.get(name));
  return Number.isFinite(value) ? value : fallback;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lamin = param(searchParams, "lamin", -32.6);
  const lamax = param(searchParams, "lamax", -30.7);
  const lomin = param(searchParams, "lomin", -61.9);
  const lomax = param(searchParams, "lomax", -59.0);

  const url = new URL(OPEN_SKY_URL);
  url.searchParams.set("lamin", String(lamin));
  url.searchParams.set("lamax", String(lamax));
  url.searchParams.set("lomin", String(lomin));
  url.searchParams.set("lomax", String(lomax));

  const headers: HeadersInit = {};
  if (process.env.OPENSKY_BEARER_TOKEN) {
    headers.Authorization = `Bearer ${process.env.OPENSKY_BEARER_TOKEN}`;
  }

  try {
    const response = await fetch(url, {
      headers,
      next: { revalidate: 30 }
    });

    if (!response.ok) {
      return NextResponse.json({ error: "OpenSky no respondió correctamente." }, { status: response.status });
    }

    const data = await response.json();
    const states = Array.isArray(data.states)
      ? data.states.map((state: unknown[]) => ({
          icao24: state[0],
          callsign: state[1],
          originCountry: state[2],
          longitude: state[5],
          latitude: state[6],
          altitudeMeters: state[7],
          velocityMs: state[9],
          headingDegrees: state[10]
        }))
      : [];

    return NextResponse.json({ time: data.time, states });
  } catch {
    return NextResponse.json({ error: "No se pudo conectar con OpenSky." }, { status: 502 });
  }
}
