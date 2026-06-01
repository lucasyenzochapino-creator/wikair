import GlosarioClient from "./GlosarioClient";

async function getWikiImage(title: string) {
  try {
    const res = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`,
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data?.thumbnail?.source || data?.originalimage?.source || null;
  } catch {
    return null;
  }
}

export default async function GlosarioPage() {
  const heroImage = await getWikiImage("Aviation");
  return <GlosarioClient heroImage={heroImage} />;
}
