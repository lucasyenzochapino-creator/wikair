const CACHE = "wikair-v5";
const STATIC = ["/", "/enciclopedia", "/records", "/quiz", "/radar", "/historia", "/manifest.json"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(STATIC)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
      )
      .then(() =>
        // Forza reload de todas las ventanas abiertas al activar nueva versión
        self.clients.matchAll({ type: "window", includeUncontrolled: true })
      )
      .then((clients) => {
        clients.forEach((client) => {
          if ("navigate" in client) client.navigate(client.url);
        });
      })
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;
  // Network-first: intenta red, cae a caché si offline
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, clone));
        }
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
