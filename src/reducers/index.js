import { combineReducers } from 'redux';

import drupal_api_load from './drupalLoadReducer';
import drupal_api_load_img from './drupalLoadImgReducer';
import drupal_api_update from './drupalUpdateReducer';
import graphqlMultiReducer from './graphqlMulti'
import drupalLoadReducer from './drupalLoadReducer';

const rootReducer = combineReducers({
  drupal_api_load,
  drupal_api_load_img,
  drupal_api_update,
  drupalLoadReducer,
  graphqlMultiReducer
});

export default rootReducer;
