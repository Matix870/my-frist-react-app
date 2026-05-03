const CACHE_NAME = 'my-todo-app-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/src/main.jsx',
  '/src/App.jsx',
  '/src/App.css',
  '/src/index.css'
];

// Instalacja - cache'owanie plików
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Cache opened');
      return cache.addAll(urlsToCache).catch(error => {
        console.log('Cache addAll error:', error);
        // Kontynuuj nawet jeśli nie wszystkie pliki się załadują
      });
    })
  );
  self.skipWaiting();
});

// Aktywacja - czyszczenie starych cache'i
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch - serwowanie z cache'a, fallback do sieci
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(response => {
      // Zwróć z cache jeśli istnieje
      if (response) {
        return response;
      }

      return fetch(event.request).then(response => {
        // Jeśli nie jest OK, zwróć jak jest
        if (!response || response.status !== 200 || response.type === 'error') {
          return response;
        }

        // Clone response
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache);
        });

        return response;
      }).catch(() => {
        // Offline fallback
        return caches.match(event.request);
      });
    })
  );
});
