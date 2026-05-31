"use client";

import { useCallback, useEffect, useState } from "react";

type FlightState = {
  icao24: string;
  callsign: string;
  country: string;
  altitude: number | null;
  velocity: number | null;
};

type Region = {
  label: string;
  lat: number;
  lon: number;
  zoom: number;
  name: string;
  description: string;
  airports: string;
  bbox: [number, number, number, number];
};

const regions: Region[] = [
  {
    label: "Argentina",
    lat: -34.6, lon: -58.4, zoom: 7,
    name: "Buenos Aires, Argentina",
    description: "El Aeroparque Jorge Newbery y el Aeropuerto Internacional Ministro Pistarini (Ezeiza) son los dos hubs principales de Argentina.",
    airports: "AEP (Aeroparque), EZE (Ezeiza), COR (Córdoba), MDZ (Mendoza), BRC (Bariloche)",
    bbox: [-55, -75, -20, -50],
  },
  {
    label: "Europa",
    lat: 51.5, lon: 0.0, zoom: 6,
    name: "Europa Central",
    description: "El espacio aéreo europeo es uno de los más densos del mundo. Heathrow (LHR) es el aeropuerto más transitado del continente.",
    airports: "LHR (Londres), CDG (París), FRA (Frankfurt), AMS (Amsterdam), MAD (Madrid)",
    bbox: [35, -15, 70, 40],
  },
  {
    label: "Estados Unidos",
    lat: 40.7, lon: -74.0, zoom: 5,
    name: "Costa Este de EE.UU.",
    description: "El espacio aéreo de EE.UU. es el más transitado del mundo. El centro de control de Atlanta maneja más vuelos que ningún otro.",
    airports: "JFK, LAX, ORD (Chicago), ATL (Atlanta), DFW (Dallas)",
    bbox: [24, -130, 50, -60],
  },
  {
    label: "Global",
    lat: 20.0, lon: 0.0, zoom: 3,
    name: "Vista global",
    description: "En un día normal, más de 100.000 vuelos se realizan en todo el mundo. En el momento pico hay 15.000 aviones simultáneamente en el aire.",
    airports: "DXB (Dubai), SIN (Singapore), HND (Tokyo), PEK (Beijing), LAX (Los Angeles)",
    bbox: [30, -30, 65, 55],
  },
];

async function fetchFlights(bbox: [number, number, number, number]) {
  const [lamin, lomin, lamax, lomax] = bbox;
  const res = await fetch(
    `https://opensky-network.org/api/states/all?lamin=${lamin}&lomin=${lomin}&lamax=${lamax}&lomax=${lomax}`
  );
  if (!res.ok) throw new Error(`${res.status}`);
  const data = await res.json();
  const all = (data.states || []) as any[][];
  const airborne = all.filter((s) => !s[8]);
  const flights: FlightState[] = airborne
    .filter((s) => s[1]?.trim())
    .slice(0, 12)
    .map((s) => ({
      icao24: s[0] || "",
      callsign: s[1].trim(),
      country: s[2] || "",
      altitude: s[7] != null ? Math.round(s[7]) : null,
      velocity: s[9] != null ? Math.round(s[9] * 3.6) : null,
    }));
  return { count: airborne.length, flights };
}

export default function RadarPage() {
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [count, setCount] = useState<number | null>(null);
  const [flights, setFlights] = useState<FlightState[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const region = regions[active];
  const fr24url = `https://www.flightradar24.com/${region.lat},${region.lon}/${region.zoom}`;
  const adsburl = `https://globe.adsbexchange.com/?lat=${region.lat}&lon=${region.lon}&zoom=${region.zoom}`;

  const load = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const result = await fetchFlights(region.bbox);
      setCount(result.count);
      setFlights(result.flights);
      setLastUpdated(new Date());
    } catch {
      setError(true);
      setCount(null);
      setFlights([]);
    } finally {
      setLoading(false);
    }
  }, [region.bbox]);

  useEffect(() => {
    setCount(null);
    setFlights([]);
    setError(false);
    load();
    const id = setInterval(load, 60000);
    return () => clearInterval(id);
  }, [load]);

  const colStyle = { fontSize: 10, fontWeight: 700, color: "var(--muted)" as const, letterSpacing: "0.08em" as const };

  return (
    <main className="page">
      <section className="container hero compactHero">
        <a className="back" href="/">← Volver</a>
        <p className="gold">WIKIAIR · RADAR EN VIVO</p>
        <h1>Radar aéreo global</h1>
        <p>Datos ADS-B en tiempo real via OpenSky Network. Seleccioná la región para ver vuelos activos ahora mismo.</p>
      </section>

      {/* Region tabs */}
      <nav className="categoryNav">
        <div className="categoryNavInner">
          {regions.map((r, i) => (
            <button key={i} onClick={() => setActive(i)} className={active === i ? "tabActive" : "tabButton"}>
              {r.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Live panel */}
      <section className="container" style={{ paddingTop: 32, paddingBottom: 16 }}>
        <div style={{
          background: "var(--glass)", border: "1px solid var(--border)",
          borderRadius: "var(--rXL)", overflow: "hidden", backdropFilter: "blur(12px)",
        }}>
          {/* Panel header */}
          <div style={{
            padding: "20px 28px", borderBottom: "1px solid var(--border)",
            display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12,
          }}>
            <div>
              <p className="gold" style={{ fontSize: 11, marginBottom: 4 }}>VUELOS EN VIVO</p>
              <h2 style={{ fontSize: "clamp(17px, 3vw, 24px)", letterSpacing: -0.5 }}>{region.name}</h2>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {lastUpdated && (
                <span style={{ fontSize: 12, color: "var(--muted2)" }}>
                  {lastUpdated.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                </span>
              )}
              <button
                onClick={load}
                disabled={loading}
                style={{
                  padding: "8px 18px", borderRadius: 8, fontSize: 13, fontWeight: 600,
                  background: "var(--sky-dim)", border: "1px solid var(--border-a)", color: "var(--sky)",
                  cursor: loading ? "wait" : "pointer", opacity: loading ? 0.6 : 1, transition: "opacity 0.2s",
                }}
              >
                {loading ? "Actualizando…" : "Actualizar"}
              </button>
            </div>
          </div>

          {/* Live count */}
          {count !== null && (
            <div style={{
              padding: "14px 28px", borderBottom: "1px solid var(--border)",
              display: "flex", alignItems: "center", gap: 14,
            }}>
              <span style={{
                width: 10, height: 10, borderRadius: "50%", display: "inline-block",
                background: "#22c55e", boxShadow: "0 0 8px #22c55e",
              }} />
              <span style={{ fontSize: 26, fontWeight: 900, color: "var(--sky)", letterSpacing: -1 }}>
                {count.toLocaleString("es-AR")}
              </span>
              <span style={{ color: "var(--muted2)", fontSize: 14 }}>
                vuelos airborne en {region.label} ahora
              </span>
            </div>
          )}

          {/* Loading placeholder */}
          {loading && count === null && (
            <div style={{ padding: "40px 28px", textAlign: "center", color: "var(--muted2)", fontSize: 14 }}>
              Conectando con OpenSky Network…
            </div>
          )}

          {/* Error fallback */}
          {error && (
            <div style={{ padding: "28px", textAlign: "center" }}>
              <p style={{ color: "var(--muted2)", marginBottom: 16, fontSize: 14 }}>
                OpenSky no disponible ahora (puede estar en pausa nocturna). Abrí el mapa directamente:
              </p>
              <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                <a className="radarLink" href={fr24url} target="_blank" rel="noreferrer">Flightradar24</a>
                <a className="radarLink" href={adsburl} target="_blank" rel="noreferrer">ADS-B Exchange</a>
              </div>
            </div>
          )}

          {/* Flight table */}
          {flights.length > 0 && (
            <div>
              <div style={{
                display: "grid", gridTemplateColumns: "1.2fr 1.4fr 1fr 1fr",
                padding: "10px 28px", borderBottom: "1px solid var(--border)",
              }}>
                {["VUELO", "PAÍS", "ALTITUD", "VELOCIDAD"].map((h) => (
                  <span key={h} style={colStyle}>{h}</span>
                ))}
              </div>
              {flights.map((f, i) => (
                <div key={f.icao24 + i} style={{
                  display: "grid", gridTemplateColumns: "1.2fr 1.4fr 1fr 1fr",
                  padding: "11px 28px",
                  borderBottom: i < flights.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                  alignItems: "center",
                }}>
                  <span style={{ fontWeight: 700, fontSize: 14, color: "var(--sky)", fontFamily: "monospace" }}>
                    {f.callsign}
                  </span>
                  <span style={{ fontSize: 13, color: "var(--muted2)" }}>{f.country}</span>
                  <span style={{ fontSize: 13, color: "var(--text)" }}>
                    {f.altitude != null ? `${(f.altitude / 1000).toFixed(1)} km` : "—"}
                  </span>
                  <span style={{ fontSize: 13, color: "var(--text)" }}>
                    {f.velocity != null ? `${f.velocity} km/h` : "—"}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* External links */}
          <div style={{
            padding: "14px 28px", borderTop: "1px solid var(--border)",
            display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center",
          }}>
            <span style={{ fontSize: 12, color: "var(--muted)", marginRight: 4 }}>Ver mapa completo:</span>
            <a className="radarLink" href={fr24url} target="_blank" rel="noreferrer" style={{ padding: "6px 14px", fontSize: 12 }}>
              Flightradar24
            </a>
            <a className="radarLink" href={adsburl} target="_blank" rel="noreferrer" style={{ padding: "6px 14px", fontSize: 12 }}>
              ADS-B Exchange
            </a>
            <a className="radarLink" href="https://opensky-network.org/network/explorer" target="_blank" rel="noreferrer" style={{ padding: "6px 14px", fontSize: 12 }}>
              OpenSky
            </a>
          </div>
        </div>
      </section>

      {/* Region info */}
      <section className="container" style={{ paddingBottom: 16 }}>
        <div style={{ background: "var(--glass)", border: "1px solid var(--border)", borderRadius: "var(--rXL)", padding: "20px 28px", backdropFilter: "blur(10px)" }}>
          <p style={{ color: "var(--muted2)", marginBottom: 8, lineHeight: 1.6 }}>{region.description}</p>
          <p style={{ color: "var(--muted)", fontSize: 13 }}>Aeropuertos clave: {region.airports}</p>
        </div>
      </section>

      {/* ADS-B explanation */}
      <section className="container" style={{ paddingTop: 32, paddingBottom: 16 }}>
        <p className="gold">COMO FUNCIONA EL RADAR</p>
        <h2 style={{ fontSize: "clamp(24px, 5vw, 40px)", margin: "8px 0 24px", letterSpacing: -1 }}>La tecnología ADS-B explicada</h2>
        <div className="statsGrid">
          <div className="recordCard">
            <span className="recordBadge">ADS-B</span>
            <h3>Qué es ADS-B</h3>
            <p style={{ color: "var(--muted2)", fontSize: 14, marginTop: 8 }}>
              ADS-B (Automatic Dependent Surveillance–Broadcast) es un sistema donde cada avión transmite su posición GPS, altitud, velocidad e identificación automáticamente cada segundo.
            </p>
          </div>
          <div className="recordCard">
            <span className="recordBadge">POSICIONAMIENTO</span>
            <h3>GPS y satélites</h3>
            <p style={{ color: "var(--muted2)", fontSize: 14, marginTop: 8 }}>
              El avión determina su posición exacta usando GPS y la transmite en 1090 MHz. Las antenas en tierra (y satélites Starlink para zonas oceánicas) la reciben.
            </p>
          </div>
          <div className="recordCard">
            <span className="recordBadge">COBERTURA</span>
            <h3>Red colaborativa</h3>
            <p style={{ color: "var(--muted2)", fontSize: 14, marginTop: 8 }}>
              Flightradar24 y ADS-B Exchange tienen miles de antenas receptoras operadas por voluntarios que envían datos en tiempo real a servidores centrales.
            </p>
          </div>
          <div className="recordCard">
            <span className="recordBadge">CIFRAS</span>
            <h3>Números globales</h3>
            <p style={{ color: "var(--muted2)", fontSize: 14, marginTop: 8 }}>
              En un día normal hay <strong style={{ color: "var(--sky)" }}>100.000+ vuelos</strong> y <strong style={{ color: "var(--sky)" }}>15.000 aviones simultáneos</strong> en el aire.
            </p>
          </div>
          <div className="recordCard">
            <span className="recordBadge">LIMITACIONES</span>
            <h3>Zonas sin cobertura</h3>
            <p style={{ color: "var(--muted2)", fontSize: 14, marginTop: 8 }}>
              Sobre los océanos no hay antenas ADS-B en tierra. Para esas rutas se usan satélites o el sistema ACARS de reportes posicionales cada 30 minutos.
            </p>
          </div>
          <div className="recordCard">
            <span className="recordBadge">MILITAR</span>
            <h3>Aviones militares</h3>
            <p style={{ color: "var(--muted2)", fontSize: 14, marginTop: 8 }}>
              Los aviones militares pueden apagar sus transponders ADS-B durante misiones sensibles. El SR-71 y el B-2 nunca aparecen en radares civiles.
            </p>
          </div>
        </div>
      </section>

      <section className="container" style={{ paddingBottom: 60 }}>
        <p className="gold">TRÁFICO AÉREO MUNDIAL</p>
        <h2 style={{ fontSize: "clamp(22px, 4vw, 38px)", margin: "8px 0 24px", letterSpacing: -1 }}>El mundo desde el cielo</h2>
        <div className="statsGrid">
          <div className="statBox"><h3>100k+</h3><p>vuelos diarios en el mundo</p></div>
          <div className="statBox"><h3>15k</h3><p>aviones en el aire simultáneamente</p></div>
          <div className="statBox"><h3>4.5B</h3><p>pasajeros por año (2019)</p></div>
          <div className="statBox"><h3>1090</h3><p>MHz: frecuencia ADS-B</p></div>
        </div>
      </section>
    </main>
  );
}
