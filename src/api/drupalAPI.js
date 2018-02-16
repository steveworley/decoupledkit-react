import * as types from '../actions/drupalAPITypes';

import Dexie from 'dexie'

const headers = {
  'Accept': 'application/vnd.api+json',
  'Content-Type': 'application/vnd.api+json',
  'Authorization': 'Basic ' + btoa('apitest:apitest') // username:password from http://local.decoupledkit.com/admin/access/users
}

function handleErrors(response) { // todo: implement better 500 errors for missing images
  if (!response.ok) { throw Error('response.statusText', response.statusText); }
  return response;
}

class drupalAPI {

  /**
   * Fetch all nodes from a given type.
   *
   * The caches API stores a request in cache ready to be served the next time
   * the browser requests the URL. It can store either a URL or a Request object
   * (which is what fetch builds) so that it can replay the request.
   *
   * If the request is not found in the cache, we will build a Request object
   * add it to the cache and then return the known promise.
   *
   * @param {String} API_LOC
   *   The API URL.
   *
   * @return {Promise}
   */
  static getAllDrupal(API_LOC = types.DRUPAL_API_LOC) {
    return fetch(API_LOC, { headers }).then(res => res.json()).catch(err => console.log(err))
  }

  /**
   * Perform a request to fetch Drupal images.
   *
   * @param {String} API_LOC
   *
   * @return {Promise}
   */
  static getAllDrupalImg(API_LOC = types.DRUPAL_API_LOC) {
    return fetch(API_LOC, { headers }).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  /**
   * Perform a request to create a Drupal node.
   *
   * @param {String} API_LOC
   *
   * @return {Promise}
   */
  static createNode(API_LOC = types.DRUPAL_API_LOC, data = {}) {
    return fetch(API_LOC, { method: 'POST', body: JSON.stringify(data), headers })
      .then(res => res.json())
      .catch(err => console.log(err))
  }

  /**
   * Perform a request to delete a Drupal node.
   *
   * @param {String} API_LOC
   *
   * @return {Promise}
   */
  static deleteNode(API_LOC = types.DRUPAL_API_LOC) {
    return fetch(API_LOC, { method: 'DELETE', headers })
      .then(res => res.json())
      .catch(err => console.log(err))
  }


  /**
   * Perform a request to update a Drupal node.
   *
   * @param {String} API_LOC
   *
   * @return {Promise}
   */
  static updateDrupal(API_LOC = types.DRUPAL_API_LOC, data) {
    return fetch(API_LOC, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers
    }).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }


  /**
   * Perform a request to upload an image to Drupal.
   *
   * This requires jsonapi_file to be enabled in Drupal. This module allows us
   * to send base64encoded representations of the file directly to the json
   * api and have the unencoded and stored.
   *
   * @see https://www.drupal.org/project/jsonapi_file
   *
   * @param {String} API_LOC
   *
   * @return {Promise}
   */
  static uploadImages(API_LOC = types.DRUPAL_API_LOC, filebin, name) {
    // FileReader creats a base64encoded string that decorates with the file
    // type and method and will look like data:image/jpeg;base64 this is
    // typically followed by , and then the base64encoded string of the asset.
    // We will attempt to locate the base64encoded string without the initial
    // decorator.
    filebin = filebin.split(',').slice(-1)[0]

    const body = {
      data: {
        type: 'file--image',
        attributes: {
          data: filebin,
          uri: `public://${name ? name : 'api-uploaded'}.jpg`
        }
      }
    }

    return fetch(API_LOC, {
      method: 'POST',
      body: JSON.stringify(body),
      headers
    }).then(response => {
      return response.json()
    }).catch(error => console.log(error))
  }

  /**
   * Load data from the browsers cache.
   *
   * This attempts to load the given API_LOC from the browsers cache. If
   * the cache does not exist it will open the cache bin and store the
   * request there ready for the next request.
   *
   * @param {String} API_LOC
   *   The API location.
   *
   * @see service-worker.js
   */
  static loadCache(API_LOC = types.DRUPAL_API_LOC) {
    return caches.match(API_LOC)
      .then(response => {
        if (!response) {
          const request = fetch(API_LOC, { headers })
          caches.open('window-cache-v2').then(cache => {
            cache.add(API_LOC).then(() => console.log('cache added'))
          })
          return request.then(res => res.json())
        }
        return response.json()
      })
  }

  /**
   * Load data from local storage.
   *
   * This attempts to load the given API_LOC form local storage, if there is
   * an entry found in the browsers storage it will be returned via a promise
   * (so the action can be chained with .then()). If the API_LOC is not found
   * in the local storage object, it will perform a request to the json api
   * server to fetch the data and then store that information in local storage.
   *
   * Local storage can store simple key:value pairs and the value cannot be
   * complex objects, so we have to JSON.stringify before inserting.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
   * @see https://developers.google.com/web/tools/chrome-devtools/manage-data/local-storage
   *
   * @param {String} API_LOC
   *   The API url to request.
   *
   * @return {Promise}
   *   A promise that will resolve to the result of the fetch request.
   */
  static loadLocalStorage(API_LOC) {
    if (localStorage.getItem(API_LOC)) {
      // Expecting a promise - localStorage is synchronous so it will return the
      // data as it sees it in the store. We wrap this in a simple promise so
      // have a unified way to handle this call.
      return new Promise((resolve, reject) => {
        const json = JSON.parse(localStorage.getItem(API_LOC))
        resolve(json)
      })
    }

    return fetch(API_LOC, { headers })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem(API_LOC, JSON.stringify(json))
        return new Promise((resolve) => resolve(json))
      })
  }


  /**
   * Cache example that relies on IndexedDB to store the result.
   *
   * We have opted to use the Dexie package here as this wraps the indexeddb
   * api in Promises so we have consistency with how these methods return
   * data to the actions.
   *
   * This method handles creating the indexeddb database if it doesn't
   * exist and loading from the cache if the path is recognised. As with
   * local storage indexeddb doesn't store complex objects types. It can
   * however store JSON objects unlike local storage so we are able to
   * insert the response directly into the table.
   *
   * Both Google and Mozilla suggest the indexedDB API is complicated and
   * suggest abstracting it with various recommended packages.
   *
   * @see http://dexie.org/
   * @see https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
   * @see https://developers.google.com/web/ilt/pwa/working-with-indexeddb
   *
   * @param {String} API_LOC
   *   The
   */
  static loadIndexedDB(API_LOC) {
    // Create the indexedDB.
    const db = new Dexie('test-db')
    db.version(1).stores({
    	requests: 'path, data'
    });

    db.open().catch(err => console.error('UNABLE TO OPEN DB', err))

    return db.table('requests').where('path').equals(API_LOC)
      .first(response => {
        return new Promise(resolve => resolve(response.data))
      })
      .catch(err => {
        return fetch(API_LOC, { headers })
          .then(res => res.json())
          .then(json => {
            db.table('requests').add({path: API_LOC, data: json})
            return new Promise(resolve => resolve(json))
          })
      })
  }

  static clearCaches() {
    // Clear the caches.
    caches.keys().then(cacheNames => {
      cacheNames.map(cacheName => {
        caches.delete(cacheName)
      })
    })
    localStorage.clear()
    Dexie.delete('test-db')
  }

}

export default drupalAPI;
