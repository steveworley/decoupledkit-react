import * as types from '../actions/graphqlclientTypes';

export default function graphqlclientReducer(state = [], action) {
  switch (action.type) {
    case types.CREATE_GRAPHQL:
      return action.graphql;
    default:
      return state;
  }
}
