// ============================================================
// JavaScript NO BLOQUEANTE - Carga con defer
// ============================================================

// Mejora: Detectar y reportar Core Web Vitals
document.addEventListener('DOMContentLoaded', function() {
    console.log('LiveCoffee - Página optimizada para rendimiento');
    
    // Registrar métricas de rendimiento
    if ('performance' in window && 'getEntriesByType' in performance) {
        const paintEntries = performance.getEntriesByType('paint');
        paintEntries.forEach(entry => {
            console.log(`${entry.name}: ${entry.startTime}ms`);
        });
    }
    
    // Mejora: Lazy loading de imágenes con Intersection Observer
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });
        lazyImages.forEach(img => imageObserver.observe(img));
    }
});
