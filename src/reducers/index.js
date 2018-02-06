import { combineReducers } from 'redux';

import drupalLoadReducer from './drupalLoadReducer'
import graphqlMultiReducer from './graphqlMulti'
import graphqlSingle from './graphqlclientReducer'

const rootReducer = combineReducers({
  drupalLoadReducer,
  graphqlMultiReducer,
  graphqlSingle
});

export default rootReducer;
