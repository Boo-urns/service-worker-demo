const CACHE_NAME = 'sw-test-cache-v1';
const urlsToCache = [
  '/',
  '/dist/css/styles.min.css',
  '/assets/img/moss-typing.gif',
  'https://fonts.googleapis.com/css?family=Roboto'
]

self.addEventListener('install', event => {
  console.log('SW v1 installing...');

  event.waitUntil(
    caches.open(CACHE_NAME).then( cache => {
        cache.addAll(urlsToCache);
    })
  );
});


self.addEventListener('activate', event => {
  console.log('SW READY')
});


self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then( response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
