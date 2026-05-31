import { NextRequest, NextResponse } from "next/server";

const BAD = ["flag", "map", "diagram", "icon", "logo", "badge", "emblem",
             "coat", "seal", "blank", "silhouette", ".svg"];

function isGoodImg(url: string) {
  const low = url.toLowerCase();
  return !BAD.some((b) => low.includes(b));
}

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q") ?? "";
  if (!q) return NextResponse.json([], { status: 400 });

  try {
    const encoded = encodeURIComponent(q.replace(/ /g, "_"));

    const [summaryRes, mediaRes] = await Promise.allSettled([
      fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encoded}`, {
        headers: { "User-Agent": "WikiAir/3.0 (educational app)" },
        next: { revalidate: 3600 },
      }),
      fetch(`https://en.wikipedia.org/api/rest_v1/page/media-list/${encoded}`, {
        headers: { "User-Agent": "WikiAir/3.0 (educational app)" },
        next: { revalidate: 3600 },
      }),
    ]);

    const imgs: string[] = [];

    // Main image from summary
    if (summaryRes.status === "fulfilled" && summaryRes.value.ok) {
      const d = await summaryRes.value.json();
      const main: string =
        d?.originalimage?.source || d?.thumbnail?.source || "";
      if (main && isGoodImg(main)) imgs.push(main);
    }

    // Gallery images from media-list
    if (mediaRes.status === "fulfilled" && mediaRes.value.ok) {
      const d = await mediaRes.value.json();
      for (const item of (d?.items ?? []) as any[]) {
        if (item.type !== "image") continue;
        const srcset: any[] = item.srcset ?? [];
        const raw =
          srcset[srcset.length - 1]?.src ||
          srcset[0]?.src ||
          item.thumbnail?.source ||
          "";
        const url = raw.startsWith("//") ? `https:${raw}` : raw;
        if (url && isGoodImg(url) && !imgs.includes(url)) imgs.push(url);
        if (imgs.length >= 10) break;
      }
    }

    return NextResponse.json(imgs, {
      headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" },
    });
  } catch {
    return NextResponse.json([]);
  }
}
