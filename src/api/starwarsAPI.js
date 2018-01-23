import * as types from '../actions/starwarsTypes';

class starwarsAPI {
  static getAllStarWars(API_LOC = types.STARWARS_API_LOC) {
    return fetch(API_LOC).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }
}

export default starwarsAPI;
