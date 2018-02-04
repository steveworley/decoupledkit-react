import * as types from '../actions/drupalAPITypes';

const headers = {
  'Accept': 'application/vnd.api+json',
  'Content-Type': 'application/vnd.api+json',
  'Authorization': 'Basic ' + btoa('api-dog-admin:test')
}

function handleErrors(response) { // todo: implement better 500 errors for missing images
  if (!response.ok) { throw Error('response.statusText', response.statusText); } // console.log('response ----->', response);
  return response;
}

class drupalAPI {

  static getAllDrupal(API_LOC = types.DRUPAL_API_LOC) {
    return fetch(API_LOC, { headers }).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
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

}


export default drupalAPI;
