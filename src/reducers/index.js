import { combineReducers } from 'redux';

import drupalLoadReducer from './drupalLoadReducer'
import graphqlMultiReducer from './graphqlMulti'
import graphqlSingle from './graphqlclientReducer'
import graphqlMockReducer from './graphqlMockReducer'

const rootReducer = combineReducers({
  drupalLoadReducer,
  graphqlMultiReducer,
  graphqlSingle,
  graphqlMockReducer
});

export default rootReducer;
