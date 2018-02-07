const CACHE_VERSION = 1
const CURRENT_CACHES = {
  prefetch: `window-cache-v${CACHE_VERSION}`
}

console.debug('self', self)

self.addEventListener('install', event => {
  const prefetchUrls = [
    'http://local.decoupledkit.com/jsonapi/node/dogs',
    'http://local.decoupledkit.com/jsonapi/node/dogs/bc2153d4-3426-4983-a33e-d57934dec3fa'
  ] // Prefetch the URLs

  event.waitUntil(
    caches.open(CURRENT_CACHES.prefetch).then((cache) => {
      return cache.addAll(prefetchUrls).then(() => {
        console.log('All resources have been fetched and cached')
        self.skipWaiting()
      }).catch((error) => {
        console.error('Pre-fetch failed:', error)
      })
    })
  )
})

self.addEventListener('activate', (event) => {
  self.clients.claim()
  const expectedCacheNames = Object.keys(CURRENT_CACHES).map((key) => CURRENT_CACHES[key])
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (expectedCacheNames.indexOf(cacheName) === -1) {
            console.log('Deleting out of date cache:', cacheName)
          }
        })
      )
    })
  )
})
