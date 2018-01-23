import { combineReducers } from 'redux';
import users from './userReducer';
import number from './incrementReducer';
import starwars from './starwarsReducer';
import graphql from './graphqlclientReducer';

const rootReducer = combineReducers({
  users,
  number,
  starwars,
  graphql
});

export default rootReducer;
