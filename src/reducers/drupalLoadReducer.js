import {
  LOAD_DRUPAL_DATA,
  RECEIVE_DRUPAL_DATA,
  RECEIVE_DRUPAL_IMAGES,
  DRUPAL_CRUD_MESSAGE_SEND,
  DRUPAL_CRUD_MESSAGE_CLEAR,
} from '../actions/drupalAPIActions';

const initialState = {
  data: {}
}

export default function drupalLoadReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_DRUPAL_DATA:
      return {...state, fetching: true }

    case RECEIVE_DRUPAL_DATA:
      return { ...state, data: action.data }

    case RECEIVE_DRUPAL_IMAGES:
      return { ...state, data: action.images }

    case DRUPAL_CRUD_MESSAGE_SEND:
    case DRUPAL_CRUD_MESSAGE_CLEAR:
      return { ...state, message: action.message }

    default:
      return state;
  }
}
