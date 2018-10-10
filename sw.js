//asignar un nombre y versión al cache
const CACHE_NAME = 'v1_cache_victor_robles';

// Ficheros a cachear en la aplicación
urlsToCache = [
    './',
    './style.css',
    './main.js',
    './img/1.png',
    './img/2.png',
    './img/3.png',
    './img/4.png',
    './img/5.png',
    './img/6.png',
    './img/icon-128x128.png',
    './img/icon-144x144.png',
    './img/icon-152x152.png',
    './img/icon-192x192.png',
    './img/icon-384x384.png',
    './img/icon-512x512.png',
    './img/icon-72x72.png',
    './img/icon-96x96.png',
    './img/facebook.png',
    './img/instagram.png',
    './img/twitter.png'
];

//durante la fase de instalación, generalmente se almacena en caché los activos estáticos
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            return cache.addAll(urlsToCache)
                .then(() => self.skipWaiting())
        })
        .catch(err => console.log('Falló registro de cache', err))
    )
})

//una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener('activate', e => {
    const cacheWhitelist = [CACHE_NAME]

    e.waitUntil(
        caches.keys()
        .then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    //Eliminamos lo que ya no se necesita en cache
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName)
                    }
                })
            )
        })
        // Le indica al SW activar el cache actual
        .then(() => self.clients.claim())
    )
})

//cuando el navegador recupera una url

addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            if (response) {
                return response; // if valid response is found in cache return it
            } else {
                return fetch(event.request) //fetch from internet
                    .then(function(res) {
                        return caches.open(CACHE_NAME)
                            .then(function(cache) {
                                cache.put(event.request.url, res.clone()); //save the response for future
                                return res; // return the fetched data
                            })
                    })
                    .catch(function(err) { // fallback mechanism
                        return caches.open(CACHE_CONTAINING_ERROR_MESSAGES)
                            .then(function(cache) {
                                return cache.match('/offline.html');
                            });
                    });
            }
        })
    );
});