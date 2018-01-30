import { combineReducers } from 'redux';

import drupalLoadReducer from './drupalLoadReducer';
import drupal_api_load_img from './drupalLoadImgReducer';
import drupal_api_update from './drupalUpdateReducer';

const rootReducer = combineReducers({
  drupalLoadReducer,
  drupal_api_load_img,
  drupal_api_update
});

export default rootReducer;
