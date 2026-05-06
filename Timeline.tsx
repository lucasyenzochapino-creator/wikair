import type { TimelineEvent } from "@/lib/types";

export function Timeline({ events }: { events: TimelineEvent[] }) {
  return (
    <section className="relative space-y-5 before:absolute before:left-4 before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-gradient-to-b before:from-cyan-200 before:via-white/20 before:to-amber-200 md:before:left-1/2">
      {events.map((event, index) => (
        <article key={`${event.year}-${event.title}`} className={`relative grid gap-5 md:grid-cols-2 ${index % 2 === 0 ? "" : "md:[&>div]:col-start-2"}`}>
          <div className="luxury-panel ml-10 rounded-[1.7rem] p-6 md:ml-0">
            <span className="absolute left-[11px] top-7 h-3 w-3 rounded-full bg-cyan-200 shadow-[0_0_22px_rgba(103,232,249,0.8)] md:left-1/2 md:-translate-x-1/2" />
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-amber-100">{event.year}</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">{event.title}</h2>
            <p className="mt-3 text-white/62 leading-7">{event.description}</p>
          </div>
        </article>
      ))}
    </section>
  );
}
