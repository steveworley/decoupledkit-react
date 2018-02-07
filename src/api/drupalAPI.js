import * as types from '../actions/drupalAPITypes';

import Dexie from 'dexie'

const headers = {
  'Accept': 'application/vnd.api+json',
  'Content-Type': 'application/vnd.api+json',
  'Authorization': 'Basic ' + btoa('api-dog-admin:test')
}

function handleErrors(response) { // todo: implement better 500 errors for missing images
  if (!response.ok) { throw Error('response.statusText', response.statusText); }
  return response;
}

class drupalAPI {
  static getAllDrupal(API_LOC = types.DRUPAL_API_LOC) {
    return caches.match(API_LOC)
      .then(response => {
        console.debug('MATCHING CACHE ===>', response)
        if (!response) {
          const request = fetch(API_LOC, { headers })
          return caches.add(request).then(response => response.json)
        }
        return response.json()
      })
  }

  static getAllDrupalImg(API_LOC = types.DRUPAL_API_LOC) {
    return fetch(API_LOC, { headers }).then(handleErrors).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static createNode(API_LOC = types.DRUPAL_API_LOC, data = {}) {
    return fetch(API_LOC, { method: 'POST', body: JSON.stringify(data), headers })
      .then(res => res.json())
      .catch(err => console.log(err))
  }

  static deleteNode(API_LOC = types.DRUPAL_API_LOC) {
    // console.log('DELETING NODE ==>', API_LOC)
    return fetch(API_LOC, { method: 'DELETE', headers })
      .then(res => res.json())
      .catch(err => console.log(err))
  }

  static updateDrupal(API_LOC = types.DRUPAL_API_LOC, data) {
    return fetch(API_LOC, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers
    }).then(response => {
      //console.log('this is response');
      return response.json();
    }).catch(error => {
      //console.log('this is error');
      return error;
    });
  }

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
        console.log(err)
        return fetch(API_LOC, { headers })
          .then(res => res.json())
          .then(json => {
            db.table('requests').add({path: API_LOC, data: json})
            return new Promise(resolve => resolve(json))
          })
      })
  }

}

export default drupalAPI;
