import { notFound } from "next/navigation";
import Link from "next/link";
import { TechnicalSpecCard } from "@/components/TechnicalSpecCard";
import { aircraft, getAircraftBySlug } from "@/lib/aircraft";

export function generateStaticParams() {
  return aircraft.map((item) => ({ slug: item.slug }));
}

export default async function AircraftDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getAircraftBySlug(slug);
  if (!item) notFound();

  return (
    <div className="space-y-6">
      <Link href="/enciclopedia" className="text-sm font-semibold text-cyan-100 hover:text-cyan-50">
        ← Volver a la enciclopedia
      </Link>
      <TechnicalSpecCard aircraft={item} />
    </div>
  );
}
