import * as types from '../actions/starwarsTypes';

export default function starwarsReducer(state = [], action) {
  switch (action.type) {
    case types.LOAD_STARWARS_SUCCESS:
      return action.starwars;
    default:
      return state;
  }
}
