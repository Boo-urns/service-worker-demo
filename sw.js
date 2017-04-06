self.addEventListener('install', event => {
  console.log('SW v1 installing...');

  event.waitUntil(
    caches.open('sitecache-v1').then( cache => {
      cache.addAll([
        '/index.html',
        '/dist/css/styles.min.css',
        'https://fonts.googleapis.com/css?family=Roboto',
        '/assets/img/moss-typing.gif'
      ])
    })
  );
});


self.addEventListener('activate', event => {
  console.log('SW READY')
});


self.addEventListener('fetch', event => {
  console.log('handling fetch event for: ', event.request.url);

  event.respondWith( // takes a promise or response obj
      caches.match(event.request).then( response => {
        if(response) {
          console.log('Found response in cache', response);

          return response;
        }
        console.log('No response found in cache...fetching from network')

        return fetch(event.request).then( response => {
          console.log('Response from network: ', response);

          return response;
        }).catch( error => {
          console.error('FETCHING FAILED: ', error);

          throw error;
        })
      })
      // caches.open('sitecache-v1').then( cache => {
      //   return cache.match(event.request);
      // })
  )
});
