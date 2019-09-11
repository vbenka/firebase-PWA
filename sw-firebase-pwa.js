const staticCache = 'static-pwa-v2';
const dynamicCache = 'dynamic-pwa-v1';
const assets = [
  './',
  './index.html',
  './favicon.ico',
  './css/style.css',
  './js/db.js',
  './js/ui.js',
  './js/main.js',
  './pages/fallback.html',
  './images/noimage-250.png',
  'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css',
  'https://code.jquery.com/jquery-3.3.1.slim.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js',
  'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js'
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
