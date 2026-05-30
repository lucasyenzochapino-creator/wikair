import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  ...(isGithubPages
    ? {
        output: "export",
        basePath: "/wikair",
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {
        async headers() {
          return [
            {
              source: "/(.*)",
              headers: [
                {
                  key: "Content-Security-Policy",
                  value: [
                    "default-src 'self'",
                    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
                    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
                    "font-src 'self' https://fonts.gstatic.com",
                    "img-src 'self' data: blob: https://upload.wikimedia.org https://*.wikimedia.org https://wikipedia.org https://*.wikipedia.org",
                    "connect-src 'self' https://en.wikipedia.org https://es.wikipedia.org https://commons.wikimedia.org https://www.flightradar24.com https://globe.adsbexchange.com https://opensky-network.org",
                    "frame-src 'self' https://www.flightradar24.com https://globe.adsbexchange.com https://opensky-network.org",
                  ].join("; "),
                },
              ],
            },
          ];
        },
      }),
};

export default nextConfig;
