"use client";

import { useState } from "react";

type Region = {
  label: string;
  lat: number;
  lon: number;
  zoom: number;
  name: string;
  description: string;
  airports: string;
};

const regions: Region[] = [
  {
    label: "Argentina",
    lat: -34.6,
    lon: -58.4,
    zoom: 7,
    name: "Buenos Aires, Argentina",
    description: "El Aeroparque Jorge Newbery y el Aeropuerto Internacional Ministro Pistarini (Ezeiza) son los dos hubs principales de Argentina.",
    airports: "AEP (Aeroparque), EZE (Ezeiza), COR (Córdoba), MDZ (Mendoza), BRC (Bariloche)"
  },
  {
    label: "Europa",
    lat: 51.5,
    lon: 0.0,
    zoom: 6,
    name: "Europa Central",
    description: "El espacio aéreo europeo es uno de los más densos del mundo. Heathrow (LHR) es el aeropuerto más transitado del continente.",
    airports: "LHR (Londres), CDG (París), FRA (Frankfurt), AMS (Amsterdam), MAD (Madrid)"
  },
  {
    label: "Estados Unidos",
    lat: 40.7,
    lon: -74.0,
    zoom: 5,
    name: "Costa Este de EE.UU.",
    description: "El espacio aéreo de EE.UU. es el más transitado del mundo. El centro de control de Atlanta maneja más vuelos que ningún otro.",
    airports: "JFK, LAX, ORD (Chicago), ATL (Atlanta), DFW (Dallas)"
  },
  {
    label: "Global",
    lat: 20.0,
    lon: 0.0,
    zoom: 3,
    name: "Vista global",
    description: "En un día normal, más de 100.000 vuelos se realizan en todo el mundo. En el momento pico hay 15.000 aviones simultáneamente en el aire.",
    airports: "DXB (Dubai), SIN (Singapore), HND (Tokyo), PEK (Beijing), LAX (Los Angeles)"
  }
];

export default function RadarPage() {
  const [active, setActive] = useState(0);
  const region = regions[active];
  const fr24url = `https://www.flightradar24.com/${region.lat},${region.lon}/${region.zoom}`;
  const adsburl = `https://globe.adsbexchange.com/?lat=${region.lat}&lon=${region.lon}&zoom=${region.zoom}`;

  return (
    <main className="page">
      <section className="container hero compactHero">
        <a className="back" href="/">← Volver</a>
        <p className="gold">WIKIAIR · RADAR EN VIVO</p>
        <h1>Radar aéreo global</h1>
        <p>
          Tráfico aéreo en tiempo real usando tecnología ADS-B. Seleccioná la región y abrí el radar externo para ver vuelos, matrículas y altitudes en vivo.
        </p>
      </section>

      <section className="container categoryNav" style={{ marginBottom: 24 }}>
        {regions.map((r, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={active === i ? "tabActive" : "tabButton"}
          >
            {r.label}
          </button>
        ))}
      </section>

      <section className="container radarPanel" style={{ marginBottom: 40 }}>
        <div className="radarMap">
          <div>
            <p className="gold" style={{ marginBottom: 8 }}>Región seleccionada</p>
            <h2>{region.name}</h2>
            <p style={{ color: "#cfcfcf", maxWidth: 620, margin: "12px auto", lineHeight: 1.6 }}>
              {region.description}
            </p>
            <p style={{ color: "#8a8a8a", fontSize: 14, marginBottom: 20 }}>
              Aeropuertos clave: {region.airports}
            </p>
            <div className="radarActions" style={{ justifyContent: "center" }}>
              <a className="radarLink" href={fr24url} target="_blank" rel="noreferrer">
                Abrir Flightradar24
              </a>
              <a className="radarLink" href={adsburl} target="_blank" rel="noreferrer">
                Abrir ADS-B Exchange
              </a>
              <a className="radarLink" href="https://opensky-network.org/network/explorer" target="_blank" rel="noreferrer">
                Abrir OpenSky
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="container" style={{ paddingBottom: 32 }}>
        <p className="gold">COMO FUNCIONA EL RADAR</p>
        <h2 style={{ fontSize: "clamp(26px, 5vw, 44px)", margin: "8px 0 24px", letterSpacing: -1 }}>La tecnología ADS-B explicada</h2>
        <div className="statsGrid" style={{ marginTop: 0 }}>
          <div className="recordCard">
            <span className="recordBadge">ADS-B</span>
            <h3>Qué es ADS-B</h3>
            <p style={{ color: "#bdbdbd", fontSize: 14, marginTop: 8 }}>
              ADS-B (Automatic Dependent Surveillance–Broadcast) es un sistema donde cada avión transmite su posición GPS, altitud, velocidad e identificación de forma automática cada segundo.
            </p>
          </div>
          <div className="recordCard">
            <span className="recordBadge">POSICIONAMIENTO</span>
            <h3>GPS y satélites</h3>
            <p style={{ color: "#bdbdbd", fontSize: 14, marginTop: 8 }}>
              El avión determina su posición exacta usando GPS y la transmite en 1090 MHz. Las antenas en tierra (y satélites Starlink para zonas oceánicas) la reciben.
            </p>
          </div>
          <div className="recordCard">
            <span className="recordBadge">COBERTURA</span>
            <h3>Red colaborativa</h3>
            <p style={{ color: "#bdbdbd", fontSize: 14, marginTop: 8 }}>
              Flightradar24 y ADS-B Exchange tienen miles de antenas receptoras operadas por voluntarios en todo el mundo que envían los datos en tiempo real a servidores centrales.
            </p>
          </div>
          <div className="recordCard">
            <span className="recordBadge">CIFRAS</span>
            <h3>Números globales</h3>
            <p style={{ color: "#bdbdbd", fontSize: 14, marginTop: 8 }}>
              En un día normal hay <strong style={{ color: "#d4af37" }}>100.000+ vuelos</strong> y <strong style={{ color: "#d4af37" }}>15.000 aviones simultáneos</strong> en el aire. El espacio aéreo de EE.UU. es el más transitado.
            </p>
          </div>
          <div className="recordCard">
            <span className="recordBadge">LIMITACIONES</span>
            <h3>Zonas sin cobertura</h3>
            <p style={{ color: "#bdbdbd", fontSize: 14, marginTop: 8 }}>
              Sobre los océanos y zonas remotas no hay antenas ADS-B en tierra. Para esas rutas se usan satélites o el sistema ACARS de reportes posicionales cada 30 minutos.
            </p>
          </div>
          <div className="recordCard">
            <span className="recordBadge">MILITAR</span>
            <h3>Aviones militares</h3>
            <p style={{ color: "#bdbdbd", fontSize: 14, marginTop: 8 }}>
              Los aviones militares pueden apagar sus transponders ADS-B durante misiones sensibles. El SR-71 y el B-2 nunca aparecen en radares civiles.
            </p>
          </div>
        </div>
      </section>

      <section className="container" style={{ paddingBottom: 60 }}>
        <p className="gold">TRÁFICO AÉREO MUNDIAL</p>
        <h2 style={{ fontSize: "clamp(24px, 4vw, 40px)", margin: "8px 0 24px", letterSpacing: -1 }}>El mundo desde el cielo</h2>
        <div className="statsGrid" style={{ marginTop: 0 }}>
          <div className="statBox"><h3>100k+</h3><p>vuelos diarios en el mundo</p></div>
          <div className="statBox"><h3>15k</h3><p>aviones en el aire simultáneamente</p></div>
          <div className="statBox"><h3>4.5B</h3><p>pasajeros por año (2019)</p></div>
          <div className="statBox"><h3>1090</h3><p>MHz: frecuencia ADS-B</p></div>
        </div>
      </section>
    </main>
  );
}
