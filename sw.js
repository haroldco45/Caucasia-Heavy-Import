/**
 * Service Worker - Caucasia Heavy-Import
 * Desarrollado por: Vibras Positivas HM
 * Fecha: 20 de abril de 2026
 */

const CACHE_NAME = 'vibras-positivas-hc-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/styles.css',
    '/app.js',
    '/manifest.json'
];

// Instalación del Service Worker y almacenamiento en caché
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Cache abierto - Vibras Positivas HM');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// Activación y limpieza de cachés antiguos
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Estrategia: Primero buscar en Cache, si no hay, ir a la Red
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
