import { combineReducers } from 'redux';

import drupalLoadReducer from './drupalLoadReducer'
import graphqlMultiReducer from './graphqlMulti'
import graphqlSingle from './graphqlclientReducer'
import graphqlMockReducer from './graphqlMockReducer'
import failoverReducer from './failoverReducer'

const rootReducer = combineReducers({
  drupalLoadReducer,
  graphqlMultiReducer,
  graphqlSingle,
  graphqlMockReducer,
  failoverReducer
});

export default rootReducer;
