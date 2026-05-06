import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "WikiAir",
    short_name: "WikiAir",
    description: "Enciclopedia premium de aviación con radar y fichas técnicas.",
    start_url: "/",
    display: "standalone",
    background_color: "#030405",
    theme_color: "#030405",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml"
      }
    ]
  };
}
