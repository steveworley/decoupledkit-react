import { combineReducers } from 'redux';

import drupalLoadReducer from './drupalLoadReducer';
import graphqlSingle from './graphqlclientReducer'

const rootReducer = combineReducers({
  drupalLoadReducer,
  graphqlSingle
});

export default rootReducer;
