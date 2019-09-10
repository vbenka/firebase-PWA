const staticCache = 'static-pwa-v2';
const dynamicCache = 'dynamic-pwa-v2';
const assets = [
  './',
  './index.html',
  './favicon.ico',
  './css/style.css',
  './css/bootstrap.min.css',
  './js/jquery-3.3.1.slim.min.js',
  './js/bootstrap.min.js',
  './js/db.js',
  './js/ui.js',
  './js/main.js',
  './pages/fallback.html',
  './images/noimage-250.png',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(staticCache).then(cache => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener('activate', e => {
  caches.keys().then(keys => {
    return Promise.all(keys
      .filter(key => key !== staticCache && key !== dynamicCache)
      .map(key => caches.delete(key))
    )
  });
});

self.addEventListener('fetch', e => {
  if(!e.request.url.includes('firestore.googleapis.com')) {    
    e.respondWith(
      caches.match(e.request).then(cacheRes => {
        return cacheRes || fetch(e.request).then(fetchRes => {
          if(fetchRes.clone().status === 404) {
            if(e.request.url.includes('.html')) {
              return caches.match('./pages/fallback.html');
            } else if(e.request.url.includes('.png') || e.request.url.includes('.jpg')) {
              return caches.match('./images/noimage-250.png');
            }
          } 
          return caches.open(dynamicCache).then(cache => {
            cache.put(e.request.url, fetchRes.clone());
            return fetchRes;
          }); 
        });
      }).catch(() => {
        console.log(e.request.url)
        if(e.request.url.includes('.html')) {
          return caches.match('./pages/fallback.html');
        }else if(e.request.url.includes('.png') || e.request.url.includes('.jpg')) {
          return caches.match('./images/noimage-250.png');
        }
      })
    );
  }
});

// self.addEventListener('notificationclose', function(e) {
//   var notification = e.notification;
//   var primaryKey = notification.data.primaryKey;
//   var action = e.action;

//   if (action === 'close') {
//     notification.close();
//   } else {
//     clients.openWindow('http://www.google.com');
//     notification.close();
//   }
// });
