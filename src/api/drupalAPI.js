import * as types from '../actions/drupalAPITypes';

const headers = {
  'Accept': 'application/vnd.api+json',
  'Content-Type': 'application/vnd.api+json',
  'Authorization': 'Basic ' + btoa('api-dog-admin:test')
}

class drupalAPI {

  static getAllDrupal(API_LOC = types.DRUPAL_API_LOC) {
    console.log('getAllDrupal()');
    return fetch(API_LOC, { headers }).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static getAllDrupalImg(API_LOC = types.DRUPAL_API_LOC) {
    console.log('getAllDrupalImg()');
    return fetch(API_LOC, { headers }).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static createNode(API_LOC = types.DRUPAL_API_LOC, data = {}) {
    console.log('CREATING NODE ==>', API_LOC);
    return fetch(API_LOC, {method: 'POST', body: JSON.stringify(data), headers})
      .then(res => res.json())
      .catch(err => console.log(err))
  }

  static deleteNode(API_LOC = types.DRUPAL_API_LOC) {
    console.log('DELETING NODE ==>', API_LOC)
    return fetch(API_LOC, {method: 'DELETE', headers})
      .then(res => res.json())
      .catch(err => console.log(err))
  }


  // var url = 'https://example.com/profile';
  // var data = {username: 'example'};

  // fetch(url, {
  //   method: 'POST', // or 'PUT'
  //   body: JSON.stringify(data),
  //   headers: new Headers({
  //     'Content-Type': 'application/json'
  //   })
  // }).then(res => res.json())
  // .catch(error => console.error('Error:', error))
  // .then(response => console.log('Success:', response));

  // {
  //   "errors": [{
  //     "title": "Forbidden",
  //     "status": 403,
  //     "detail": "The current user is not allowed to PATCH the selected resource.",
  //     "links": {
  //       "info": "http:\/\/www.w3.org\/Protocols\/rfc2616\/rfc2616-sec10.html#sec10.4.4"
  //     },
  //     "code": 0,
  //     "id": "\/node--dogs\/5de0fb4a-4057-4fa2-a808-5dbb6b96efe0",
  //     "source": {
  //       "pointer": "\/data"
  //     }
  //   }]
  // }

  /*
'Authorization' => 'Bearer ' . $token,
'Content-Type' => 'application/vnd.api+json'
 */

  static updateDrupal(API_LOC = types.DRUPAL_API_LOC, data) {
    // console.log('dataz ===>', JSON.stringify(data));
    console.log('URL ===> ', API_LOC);
    return fetch(API_LOC, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers
    }).then(response => {
      console.log('this is response');
      return response.json();
    }).catch(error => {
      console.log('this is error');
      return error;
    });
  }


}


// api-dog-admin

/*


curl --request POST \
--data "grant_type=password\
&client_id=9ed60e08-8eac-4bb3-b4c7-8fa3b9764622\
&client_secret=api-dog-admin\
&username=api-dog-admin\
&password=api-dog-admin"\
 http://local.decoupledkit.com/oauth/token

*/





// fetch(API_URL + API_PATH + 'tasks', {
//   headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json'
//   },
//   method: 'patch',
//   body: JSON.stringify( { task: task } )
// })

export default drupalAPI;
