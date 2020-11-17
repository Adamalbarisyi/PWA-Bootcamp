const staticCache = 'static-cache';
const dynamicCache = 'dynamic-cache';
const assets = [
    '/',
    '/index.html',
    '/js/app.js',
    '/js/ui.js',
    '/js/users.js',
    '/js/materialize.min.js',
    '/css/materialize.min.css',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://fonts.gstatic.com/s/materialicons/v47/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
    '/pages/fallback.html'
]
const limitCacheSize = (name, size) => {
    console.log('limit cache size')
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            console.log(keys)
            if (keys.length > size) {
                console.log('delete')
                cache.delete(keys[0]).then(limitCacheSize(name, size));

            }
        })
    })
}
const limitNumCache = (cacheName, num) => {
    caches.open(cacheName).then(cache => {
        cache.keys().then(keys => {
            if (keys.length > num) {
                cache.delete(keys[0]).then(limitNumCache(cacheName, num));

            }
        })
    })
}
// const limitNumCache = (cacheName, num) => {
//     caches.open(cacheName).then(cache => {
//         cache.keys().then(keys => {
//             if (keys.length > num) {
//                 cache.delete(keys[0]).then(limitNumCache(cacheName, num));
//             }
//         })
//     })
// }
//install processs

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(staticCache).then(cache => {
            cache.addAll(assets)
        })

    )

})

//activate
self.addEventListener('activate', e => {
    console.log('avtivate')
})

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(staticRes => {
            return staticRes || fetch(e.request).then(dynamicRes => {
                return caches.open(dynamicCache).then(cache => {
                    cache.put(e.request.url, dynamicRes.clone())
                    return dynamicRes
                })
            })
        }).catch(() => caches.match('/pages/fallback.html'))
    )


})

// self.addEventListener('fetch', e => {
//     console.log('fetch events', e)
//     if (e.request.url.indexOf('firestore.googleapis.com') === -1) {
//         //if not making the request from google, then can do caching
//         e.respondWith(
//             caches.match(e.request).then(cacheRes => {
//                 return cacheRes || fetch(e.request).then(fetchRes => {
//                     return caches.open(dynamicCache).then(cache => {
//                         cache.put(e.request.url, fetchRes.clone());
//                         limitCacheSize(dynamicCache, 3)
//                         return fetchRes
//                     })
//                 })
//             }).catch(() => {
//                 if (e.request.url.indexOf('.html') > -1) {
//                     return caches.match('/pages/fallback.html');

//                 }

//             })
//         )
//     }

// })

// network first
// self.addEventListener('fetch', e => {

//     e.respondWith(
//         fetch(e.request).then(fetchRes => {
//             return caches.open(dynamicCache).then(cache => {
//                 cache.put(e.request.url, fetchRes.clone());
//                 return fetchRes
//             })
//         }).catch(function () {
//             return caches.match(e.request);
//         })
//     )


// })
// self.addEventListener('fetch', evt => {
//     evt.respondWith(
//         fetch(evt.request).then(fetchRes => {
//             return caches.open(dynamicCacheName).then(cache => {
//                 cache.put(evt.request.url, fetchRes.clone());
//                 return fetchRes
//             })
//         })
//             .catch(function () {
//                 console.log(evt.request, 'match', caches.match(evt.request));
//                 return caches.match(evt.request);
//             })
//     )


// })
//cache only
// self.addEventListener('fetch', e => {

//     e.respondWith(
//         caches.match(e.request)
//     )


// })


