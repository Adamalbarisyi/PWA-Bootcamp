const staticCache = 'static-cache';
const dynamicCache = 'dynamic-cache';
const assets = [
    '/',
    '/index.html',
    '/js/app.js',
    '/js/ui.js',
    '/js/materialize.min.js',
    '/css/materialize.min.css',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    '/pages/fallback.html'
]

const limitNumberCache = (cacheName, num) => {
        caches.open(cacheName).then(cache => {
            cache.keys().then(keys => {
                if (keys.length > num) {
                    cache.delete(keys[0]).then(limitNumberCache(cacheName, num))
                }
            })
        })
    }
    //install process 
self.addEventListener('install', e => {
    // console.log('sw is installed') 
    e.waitUntil(
        caches.open(staticCache).then(cache => {
            cache.addAll(assets)
        })
    )
})

//activate process
self.addEventListener('activate', e => {
    console.log('sw is activated')
})

self.addEventListener('fetch', e => {
    // console.log('sw fetch event', e)
    if (e.request.url.indexOf('firestore.googleapis.com') === -1) {
        e.respondWith(
            caches.match(e.request).then(staticRes => {
                return staticRes || fetch(e.request).then(dynamicRes => {
                    return caches.open(dynamicCache).then(cache => {
                        cache.put(e.request.url, dynamicRes.clone())
                        limitNumberCache(dynamicCache, 2)
                        return dynamicRes
                    })
                })
            }).catch(() => caches.match('/pages/fallback.html'))
        )
    }

})