import { combineReducers } from 'redux';

import drupalLoadReducer from './drupalLoadReducer';

const rootReducer = combineReducers({
  drupalLoadReducer,
});

export default rootReducer;
