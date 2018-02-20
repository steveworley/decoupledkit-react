/**
 * @file
 * Included by the served applicaton this reigsters our service-worker.js with the client.
 */

if ('caches' in window) {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
    /**
     * When the service worker has registered and any events have completed the
     * ready event is triggered. This is typically where you begin the
     * application.
     * 
     * To keep the example simple we're relying on manually triggering cache loads
     * rather than initalising the react application from this event.
     */
    navigator.serviceWorker.ready.then(() => console.debug('Service worker is ready'))
  }
}
