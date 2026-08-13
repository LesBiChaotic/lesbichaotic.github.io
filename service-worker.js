const CACHE_VERSION = "pwa-20260813-3";
const CACHE_PREFIX = "lesbichaotic-";
const SHELL_CACHE = `${CACHE_PREFIX}shell-${CACHE_VERSION}`;
const NETWORK_CACHE = `${CACHE_PREFIX}network-${CACHE_VERSION}`;
const ASSET_CACHE = `${CACHE_PREFIX}assets-${CACHE_VERSION}`;
const APP_ROOT = new URL("./", self.location.href);

const PRECACHE_PATHS = [
  "./",
  "./index.html",
  "./offline.html",
  "./about.html",
  "./books.html",
  "./diary.html",
  "./gallery.html",
  "./games.html",
  "./hobby.html",
  "./illustrated-shelf.html",
  "./inspiration.html",
  "./play-help.html",
  "./playlist.html",
  "./project-template.html",
  "./recommended-creators.html",
  "./requests.html",
  "./resources.html",
  "./scenarios.html",
  "./screening-room.html",
  "./tutorials.html",
  "./updates.html",
  "./worksheets.html",
  "./youtube.html",
  "./manifest.webmanifest",
  "./style.css?v=pwa-20260813-3",
  "./app.js?v=pwa-20260813-3",
  "./worksheets.js?v=pwa-20260813-3",
  "./assets/lesbichaotic-emblem.webp?v=draft6",
  "./assets/fonts/dm-serif-display-regular.woff2",
  "./assets/fonts/dm-serif-display-italic.woff2",
  "./assets/fonts/nunito-sans-regular.woff2",
  "./assets/fonts/nunito-sans-italic.woff2",
  "./assets/fonts/nunito-sans-bold.woff2",
  "./assets/fonts/nunito-sans-black.woff2",
  "./assets/pwa/icon-192.png",
  "./assets/pwa/icon-512.png",
  "./assets/pwa/icon-maskable-512.png",
  "./assets/pwa/apple-touch-icon.png",
  "./assets/hobby-icons/demon-cat-five-rating.webp",
  "./assets/menu-icons/home.webp",
  "./assets/menu-icons/home.png",
  "./assets/menu-icons/about.webp",
  "./assets/menu-icons/about.png",
  "./assets/menu-icons/scenarios.webp",
  "./assets/menu-icons/scenarios.png",
  "./assets/menu-icons/tutorials.webp",
  "./assets/menu-icons/tutorials.png",
  "./assets/menu-icons/diary.webp",
  "./assets/menu-icons/diary.png",
  "./assets/menu-icons/gallery.webp",
  "./assets/menu-icons/gallery.png",
  "./assets/menu-icons/help.webp",
  "./assets/menu-icons/help.png",
  "./assets/menu-icons/updates.webp",
  "./assets/menu-icons/updates.png",
  "./assets/menu-icons/resources.webp",
  "./assets/menu-icons/resources.png",
  "./assets/menu-icons/requests.webp",
  "./assets/menu-icons/requests.png",
  "./assets/hobby-icons/hobby.webp",
  "./assets/hobby-icons/hobby.png",
  "./assets/hobby-icons/playlist.webp",
  "./assets/hobby-icons/playlist.png",
  "./assets/hobby-icons/books.webp",
  "./assets/hobby-icons/books.png",
  "./assets/hobby-icons/games.webp",
  "./assets/hobby-icons/games.png",
  "./assets/hobby-icons/youtube.webp",
  "./assets/hobby-icons/youtube.png",
  "./assets/hobby-icons/inspiration.webp",
  "./assets/hobby-icons/inspiration.png"
];

const precacheUrls = PRECACHE_PATHS.map(path => new URL(path, APP_ROOT).href);
const offlineUrl = new URL("./offline.html", APP_ROOT).href;

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(SHELL_CACHE)
      .then(cache => cache.addAll(precacheUrls))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  const currentCaches = new Set([SHELL_CACHE, NETWORK_CACHE, ASSET_CACHE]);
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key.startsWith(CACHE_PREFIX) && !currentCaches.has(key))
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

async function networkFirst(request) {
  const cache = await caches.open(NETWORK_CACHE);
  let response;
  try {
    response = await fetch(request);
  } catch (error) {
    const cached = await cache.match(request);
    if (cached) return cached;
    const shellCache = await caches.open(SHELL_CACHE);
    const shellFallback = await shellCache.match(request, { ignoreSearch: request.mode === "navigate" });
    if (shellFallback) return shellFallback;
    if (request.mode === "navigate") {
      const fallback = await shellCache.match(offlineUrl);
      if (fallback) return fallback;
    }
    throw error;
  }

  if (response.ok) await cache.put(request, response.clone()).catch(() => {});
  return response;
}

async function cacheFirst(request) {
  const cached = await caches.match(request, { ignoreSearch: true });
  if (cached) return cached;

  const response = await fetch(request);
  if (response.ok) {
    const cache = await caches.open(ASSET_CACHE);
    await cache.put(request, response.clone()).catch(() => {});
  }
  return response;
}

self.addEventListener("fetch", event => {
  const { request } = event;
  if (request.method !== "GET") return;

  const requestUrl = new URL(request.url);
  const sameOrigin = requestUrl.origin === APP_ROOT.origin;
  if (!sameOrigin) return;

  const extension = requestUrl.pathname.split(".").pop().toLowerCase();
  const isChangingResource = request.mode === "navigate"
    || request.destination === "document"
    || request.destination === "script"
    || request.destination === "style"
    || ["html", "js", "css", "json", "webmanifest"].includes(extension);

  if (isChangingResource) {
    event.respondWith(networkFirst(request));
    return;
  }

  const isStableAsset = request.destination === "image"
    || request.destination === "font"
    || ["png", "webp", "jpg", "jpeg", "gif", "svg", "woff", "woff2"].includes(extension);

  if (isStableAsset) event.respondWith(cacheFirst(request));
});

self.addEventListener("message", event => {
  if (event.data === "SKIP_WAITING") self.skipWaiting();
});
