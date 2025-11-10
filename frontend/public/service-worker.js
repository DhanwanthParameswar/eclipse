const CACHE_NAME = "iris-cache-v1";
// Add the paths to all the files your app needs to run offline
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icon-192x192.png",
  "/icon-512x512.png",
  // Vite will generate JS and CSS files with hashes.
  // For a real build, you'd use a tool (like VitePWA) to inject those file names here.
  // For now, this is a good start.
];

// Install event: open cache and add core files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event: serve from cache if available, otherwise fetch from network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response; // Serve from cache
      }
      return fetch(event.request); // Fetch from network
    })
  );
});
