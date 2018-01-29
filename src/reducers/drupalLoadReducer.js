import * as types from '../actions/drupalAPITypes';

export default function drupalLoadReducer(state = [], action) {
  switch (action.type) {
    case types.LOAD_DRUPAL_SUCCESS:
      console.log('action.drupal_api_load',action.drupal_api_load);
      return action.drupal_api_load;
      //return [{...state, action.drupal_api_load}];
      // return [
      //   ...state,
      //   { action.drupal_api_load }
      // ];
    default:
      return state;
  }
}
