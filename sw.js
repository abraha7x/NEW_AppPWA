//Save cache in memory

const CACHE_NAME = "v1_cache_app";

var urlsCache = [
    './',
    './style.css',
    './img/icon-128x128.png',
    './img/icon-144x144.png',
    './img/icon-152x152.png',
    './img/icon-192x192.png',
    './img/icon-384x384.png',
    './img/icon-512x512.png',
    './img/icon-72x72.png',
    './img/icon-96x96.png',
    './img/1.png',
    './img/2.png',
    './img/3.png',
    './img/4.png',
    './img/5.png',
    './img/6.png',
    './img/facebook.png',
    './img/instagram.png',
    './img/twitter.png'
];

//Install service worker and desk

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            return cache.addAll(urlsCache)
                .then(() => {
                    self.skipWaiting();
                })
        })

        .catch(err => {
            console.log('no se registra cache', err);
        })
    );

});

// Activate event

self.addEventListener('activate', e => {
    const cacheWhitelist = [CACHE_NAME];

    e.waitUntil(
        caches.keys()
        .then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            )
        })

        .then(() => {
            self.clients.claim();
        })
    );
});

//Fetch event

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
        .then(res => {
            if (res) {
                return res;
            }
            return fetch(e.request);
        })
    );
});