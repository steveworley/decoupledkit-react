import { LOAD_DRUPAL_DATA, RECEIVE_DRUPAL_DATA } from '../actions/drupalAPIActions';

const initialState = {
  data: {},
  images: {},
}

export default function drupalLoadReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_DRUPAL_DATA:
      return Object.assign({}, state, {
        fetching: true,
      });

    case RECEIVE_DRUPAL_DATA:
      return Object.assign({}, state,  { data: action.data });

    case 'RECEIVE_IMAGES':
      return Object.assign({}, state, { images: action.images });

    default:
      return state;
  }
}
