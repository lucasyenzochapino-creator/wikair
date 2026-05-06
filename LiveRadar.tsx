"use client";

import { useEffect, useMemo, useState } from "react";
import { RefreshCw, Radar, SatelliteDish } from "lucide-react";

type OpenSkyState = {
  icao24: string;
  callsign: string | null;
  originCountry: string;
  longitude: number | null;
  latitude: number | null;
  altitudeMeters: number | null;
  velocityMs: number | null;
  headingDegrees: number | null;
};

type Props = {
  lat?: number;
  lon?: number;
  zoom?: number;
  height?: number;
};

const defaultBounds = {
  lamin: -32.6,
  lamax: -30.7,
  lomin: -61.9,
  lomax: -59.0
};

export function LiveRadar({ lat = -31.7, lon = -60.5, zoom = 8, height = 620 }: Props) {
  const [states, setStates] = useState<OpenSkyState[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const iframeUrl = useMemo(() => {
    const params = new URLSearchParams({
      lat: String(lat),
      lon: String(lon),
      z: String(zoom),
      label1: "callsign",
      label2: "altspeed",
      label3: "tofrom",
      size: "auto"
    });
    return `https://www.flightradar24.com/simple_index.php?${params.toString()}`;
  }, [lat, lon, zoom]);

  async function loadOpenSky() {
    try {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams(Object.entries(defaultBounds).map(([key, value]) => [key, String(value)]));
      const response = await fetch(`/api/opensky?${params.toString()}`, { cache: "no-store" });
      if (!response.ok) throw new Error("No se pudieron cargar los datos ADS-B.");
      const payload = (await response.json()) as { states: OpenSkyState[] };
      setStates(payload.states ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado al consultar OpenSky.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOpenSky();
  }, []);

  return (
    <section className="space-y-6">
      <div className="luxury-panel overflow-hidden rounded-[2rem]">
        <div className="flex flex-col gap-4 border-b border-white/10 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.32em] text-cyan-100/70">
              <Radar size={16} /> Radar en Vivo
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">Tráfico aéreo actual</h1>
          </div>
          <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/55">
            Centro: {lat}, {lon} · zoom {zoom}
          </div>
        </div>

        <iframe
          title="WikiAir Radar en Vivo"
          src={iframeUrl}
          width="100%"
          height={height}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="block w-full border-0 bg-black"
        />
      </div>

      <div className="luxury-panel rounded-[2rem] p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.32em] text-amber-100/70">
              <SatelliteDish size={16} /> OpenSky Network
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Datos crudos cercanos</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/55">
              Consulta opcional a ADS-B mediante una ruta API interna. La tabla usa un bounding box aproximado para la zona configurada.
            </p>
          </div>
          <button
            onClick={loadOpenSky}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-cyan-200/25 bg-cyan-200/10 px-5 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-200/18 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            Actualizar
          </button>
        </div>

        {error && <p className="mt-5 rounded-2xl border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-100">{error}</p>}

        <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-white/7 text-xs uppercase tracking-[0.22em] text-white/45">
                <tr>
                  <th className="px-4 py-3">Callsign</th>
                  <th className="px-4 py-3">ICAO24</th>
                  <th className="px-4 py-3">País</th>
                  <th className="px-4 py-3">Lat/Lon</th>
                  <th className="px-4 py-3">Altitud</th>
                  <th className="px-4 py-3">Velocidad</th>
                  <th className="px-4 py-3">Rumbo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {states.slice(0, 12).map((state) => (
                  <tr key={state.icao24} className="text-white/68">
                    <td className="px-4 py-3 font-semibold text-white">{state.callsign?.trim() || "—"}</td>
                    <td className="px-4 py-3">{state.icao24}</td>
                    <td className="px-4 py-3">{state.originCountry}</td>
                    <td className="px-4 py-3">
                      {state.latitude?.toFixed(3) ?? "—"}, {state.longitude?.toFixed(3) ?? "—"}
                    </td>
                    <td className="px-4 py-3">{state.altitudeMeters ? `${Math.round(state.altitudeMeters).toLocaleString("es-AR")} m` : "—"}</td>
                    <td className="px-4 py-3">{state.velocityMs ? `${Math.round(state.velocityMs * 3.6).toLocaleString("es-AR")} km/h` : "—"}</td>
                    <td className="px-4 py-3">{state.headingDegrees ? `${Math.round(state.headingDegrees)}°` : "—"}</td>
                  </tr>
                ))}
                {!loading && states.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-white/45">
                      Sin vuelos disponibles para esta zona o límite temporal alcanzado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
