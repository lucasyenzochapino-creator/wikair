"use client";

import { useEffect, useState } from "react";

type Flight = {
  icao24: string;
  callsign: string;
  originCountry: string;
  longitude: number;
  latitude: number;
  altitude: number | null;
  velocity: number | null;
  heading: number | null;
};

type RadarResponse = {
  ok: boolean;
  error?: string;
  updated?: number;
  bounds: {
    lamin: number;
    lamax: number;
    lomin: number;
    lomax: number;
  };
  flights: Flight[];
};

export default function RadarLive() {
  const [data, setData] = useState<RadarResponse | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadRadar() {
    setLoading(true);
    try {
      const response = await fetch("/api/opensky", { cache: "no-store" });
      const json = await response.json();
      setData(json);
    } catch {
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRadar();
    const timer = setInterval(loadRadar, 60000);
    return () => clearInterval(timer);
  }, []);

  const bounds = data?.bounds || { lamin: -35.5, lamax: -27.5, lomin: -66.5, lomax: -54.5 };
  const flights = data?.flights || [];

  function position(flight: Flight) {
    const x = ((flight.longitude - bounds.lomin) / (bounds.lomax - bounds.lomin)) * 100;
    const y = 100 - ((flight.latitude - bounds.lamin) / (bounds.lamax - bounds.lamin)) * 100;
    return {
      left: `${Math.max(2, Math.min(98, x))}%`,
      top: `${Math.max(2, Math.min(98, y))}%`
    };
  }

  return (
    <section className="radar-panel">
      <div className="radar-screen">
        <div className="radar-line" />
        {flights.map((flight) => (
          <span
            className="radar-dot"
            key={flight.icao24}
            style={position(flight)}
            title={`${flight.callsign} · ${flight.originCountry}`}
          />
        ))}
        <div style={{ position: "absolute", left: 18, top: 18 }}>
          <span className="badge">OpenSky ADS-B</span>
        </div>
        <div style={{ position: "absolute", left: 18, bottom: 18, right: 18 }}>
          <div className="notice">
            {loading
              ? "Actualizando radar..."
              : data?.ok
                ? `Radar activo. Vuelos detectados en zona: ${flights.length}.`
                : `Radar sin datos ahora: ${data?.error || "conexión no disponible"}.`}
          </div>
        </div>
      </div>

      <div className="card card-pad radar-table">
        <h2>Tráfico detectado</h2>
        <p className="muted">
          Zona inicial: Entre Ríos, Santa Fe, Buenos Aires norte y Uruguay oeste. Se actualiza cada 60 segundos.
        </p>

        <div className="actions">
          <button className="btn btn-primary" onClick={loadRadar}>Actualizar</button>
          <a className="btn btn-cyan" href="https://www.flightradar24.com/-31.7,-60.5/8" target="_blank" rel="noreferrer">
            Abrir mapa externo
          </a>
        </div>

        {flights.length === 0 && (
          <div className="notice" style={{ marginTop: 16 }}>
            No hay vuelos devueltos por OpenSky para esta zona en este momento. Probá Actualizar o abrí el mapa externo.
          </div>
        )}

        {flights.map((flight) => (
          <div className="flight-row" key={flight.icao24}>
            <strong>{flight.callsign}</strong>
            <span className="muted">
              {flight.originCountry} · Altitud: {flight.altitude ? `${Math.round(flight.altitude)} m` : "N/D"} · Velocidad: {flight.velocity ? `${Math.round(flight.velocity * 3.6)} km/h` : "N/D"}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
