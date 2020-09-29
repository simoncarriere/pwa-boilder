const staticCacheName = "site-static-v1";
const dynamicCache = "site-dynamic-v1";
const assets = [
  // INCLUDE ALL YOUR MAIN ASSETS HERE
  "/",
  "/index.html",
  "/js/app.js",
  "js/ui.js",
  "/css/styles.css",
  "/pages/fallback.html",
];

// cache size limit function
const limitCacheSize = (name, size) => {
  caches.open(name).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

// install SW
self.addEventListener("install", (evt) => {
  // SHELL CACHING
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log("caching shell assets");
      cache.addAll(assets);
    })
  );
});

//Activate Event
self.addEventListener("activate", (evt) => {
  // Delete old cach versions
  evt.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName && key !== dynamicCache)
          .map((key) => caches.delete(key))
      );
    })
  );
});

// fetch event
self.addEventListener("fetch", (evt) => {
  evt.respondWith(
    //async promise
    caches
      .match(evt.request)
      .then((cacheRes) => {
        // looks for existing cach | OR | fetch it
        return (
          cacheRes ||
          fetch(evt.request).then((fetchRes) => {
            // New Cache
            return caches.open(dynamicCache).then((cache) => {
              cache.put(evt.request.url, fetchRes.clone());
              // Call cache size limit function
              limitCacheSize(dynamicCache, 15);
              return fetchRes;
            });
          })
        );
      })
      .catch(() => {
        if (evt.request.url.indexOf(".html") > -1)
          return caches.match("/pages/fallback.html");
      })
  );
});
