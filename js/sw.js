// ============================================================
// SERVICE WORKER - Caché eficiente
// ============================================================

const CACHE_NAME = 'livecoffee-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles/main.css',
    '/scripts/main.js',
    '/images/coffee.webp',
    '/images/coffee.jpg'
];

// Instalación: cachear recursos estáticos
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache abierto');
                return cache.addAll(urlsToCache);
            })
    );
});

// Activación: limpiar caches antiguos
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Eliminando cache antiguo:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Intercepción de solicitudes: estrategia Cache First
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - devolver respuesta
                if (response) {
                    return response;
                }
                
                // Clonar la solicitud para hacer fetch
                const fetchRequest = event.request.clone();
                
                return fetch(fetchRequest).then(response => {
                    // Verificar si es una respuesta válida
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }
                    
                    // Clonar la respuesta para cachear
                    const responseToCache = response.clone();
                    
                    caches.open(CACHE_NAME)
                        .then(cache => {
                            cache.put(event.request, responseToCache);
                        });
                    
                    return response;
                });
            })
    );
});
