import type { ComponentType } from "react";
import type { AircraftSpec } from "@/lib/types";
import { BadgeCheck, Gauge, Globe2, Plane, Rocket, Shield, Users } from "lucide-react";

const formatter = new Intl.NumberFormat("es-AR");

function Stat({ label, value, icon: Icon }: { label: string; value: string; icon: ComponentType<{ size?: number; className?: string }> }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/25 p-4 transition hover:border-cyan-300/35 hover:bg-cyan-300/5">
      <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-white/45">
        <Icon size={16} className="text-cyan-200" />
        {label}
      </div>
      <p className="text-base font-medium leading-relaxed text-white sm:text-lg">{value}</p>
    </div>
  );
}

export function TechnicalSpecCard({ aircraft }: { aircraft: AircraftSpec }) {
  return (
    <article className="luxury-panel overflow-hidden rounded-[2rem]">
      <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="p-6 sm:p-8 lg:p-10">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-amber-200/30 bg-amber-200/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-amber-100">
              {aircraft.category} · {aircraft.class}
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-white/60">
              Primer vuelo: {aircraft.firstFlightYear}
            </span>
          </div>

          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">{aircraft.name}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-white/68">{aircraft.description}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Stat label="Fabricante" value={aircraft.manufacturer} icon={BadgeCheck} />
            <Stat label="Origen" value={aircraft.countryOfOrigin} icon={Globe2} />
            <Stat label="Velocidad máx." value={`${formatter.format(aircraft.maxSpeedKmh)} km/h`} icon={Gauge} />
            <Stat label="Alcance" value={`${formatter.format(aircraft.rangeKm)} km`} icon={Plane} />
            <Stat label="Techo de vuelo" value={`${formatter.format(aircraft.serviceCeilingM)} m`} icon={Rocket} />
            <Stat label="Motores" value={aircraft.engines} icon={Shield} />
          </div>
        </section>

        <aside className="border-t border-white/10 bg-black/30 p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
          <div className="rounded-[1.7rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.03] p-6">
            <p className="text-xs uppercase tracking-[0.34em] text-cyan-100/70">Capacidad</p>
            <div className="mt-5 flex items-start gap-4">
              <div className="rounded-2xl border border-cyan-200/25 bg-cyan-200/10 p-3 text-cyan-100">
                <Users size={28} />
              </div>
              <p className="text-2xl font-semibold leading-snug text-white">{aircraft.passengerOrCargoCapacity}</p>
            </div>
          </div>

          <div className="mt-5 rounded-[1.7rem] border border-white/10 bg-black/35 p-6">
            <p className="text-xs uppercase tracking-[0.34em] text-white/45">País con más unidades operativas</p>
            <p className="mt-3 text-2xl font-semibold text-amber-100">{aircraft.countryWithMostOperationalUnits}</p>
          </div>

          <div className="mt-5 rounded-[1.7rem] border border-white/10 bg-black/35 p-6">
            <p className="text-xs uppercase tracking-[0.34em] text-white/45">Licencia requerida</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {aircraft.requiredPilotLicense.map((license) => (
                <span key={license} className="rounded-full border border-cyan-200/20 bg-cyan-200/10 px-3 py-1.5 text-sm font-medium text-cyan-100">
                  {license}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {aircraft.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-white/7 px-3 py-1 text-xs text-white/50">
                #{tag}
              </span>
            ))}
          </div>
        </aside>
      </div>
    </article>
  );
}
