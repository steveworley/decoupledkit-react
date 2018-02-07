


if ('caches' in window) {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
    navigator.serviceWorker.ready.then(() => console.debug('Service worker is ready'))
  }
}
