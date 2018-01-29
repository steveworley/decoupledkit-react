import * as types from './drupalAPITypes';
import drupalAPI from '../api/drupalAPI';

export function loadDrupalSuccess(drupal_api_load) {
  return {
    type: types.LOAD_DRUPAL_SUCCESS,
    drupal_api_load
  };
}

export function loadDrupalImgSuccess(drupal_api_load_img) {
  return {
    type: types.LOAD_DRUPAL_IMG_SUCCESS,
    drupal_api_load_img
  };
}

export function updateDrupalSuccess(drupal_api_update) {
  return {
    type: types.UPDATE_DRUPAL_SUCCESS,
    drupal_api_update
  };
}

export function loadDrupal(API_LOC = types.DRUPAL_API_LOC) {
  return function (dispatch) {
    return drupalAPI.getAllDrupal(API_LOC).then(drupal_api_load => {
      console.log('loadDrupalSuccess(drupal_api_load))', loadDrupalSuccess(drupal_api_load));
      return dispatch(loadDrupalSuccess(drupal_api_load));
    }).catch(error => {
      throw (error);
    });
  };
}

export function loadDrupalImg(API_LOC = types.DRUPAL_API_LOC) {
  return function (dispatch) {

    return drupalAPI.getAllDrupalImg(API_LOC).then(drupal_api_load_img => {
      // console.log('loadDrupalImgSuccess(drupal_api_load_img)', loadDrupalImgSuccess(drupal_api_load_img));
      return dispatch(loadDrupalImgSuccess(drupal_api_load_img));
    }).catch(error => {
      throw (error);
    });
  };
}

export function updateDrupal(API_LOC = types.DRUPAL_API_LOC) {
  return function (dispatch) {
    return drupalAPI.updateDrupal(API_LOC, sample).then(drupal_api_update => {
      console.log('I am update ==>', updateDrupalSuccess(drupal_api_update));
      return dispatch(updateDrupalSuccess(drupal_api_update));
    }).catch(error => {
      throw (error);
    });
  };
}


let sample = {
  "data": {
    "id": "5de0fb4a-4057-4fa2-a808-5dbb6b96efe0",
    "type": 'node--dogs',
    "attributes": {
      "title": "XOXO",
      // 'body': {
      //   'value': "xo xo xo",
      //   'format': "rich_text",
      //   'summary': ""
      // },
      // 'field_history_and_background': {
      //   'value': "xo xo xo",
      //   'format': "rich_text",
      //   'summary': ""
      // },
      // 'field_physical_characteristics': {
      //   'value': "xo xo xo",
      //   'format': "rich_text",
      //   'summary': ""
      // }
    }
  }
}
