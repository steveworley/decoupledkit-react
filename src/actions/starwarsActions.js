import * as types from './starwarsTypes';
import starwarsAPI from '../api/starwarsAPI';

export function loadStarWarsSuccess(starwars) {
  return { type: types.LOAD_STARWARS_SUCCESS, starwars };
}

export function loadStarWars(API_LOC = types.STARWARS_API_LOC) {
  return function (dispatch) {
    return starwarsAPI.getAllStarWars(API_LOC).then(starwars => {
      return dispatch(loadStarWarsSuccess(starwars));
    }).catch(error => {
      throw (error);
    });
  };
}
