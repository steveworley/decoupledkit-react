import gql from 'graphql-tag';
import * as types from './graphqlclientTypes';
const {
  createApolloFetch
} = require('apollo-fetch');

export function loadGraphQLSuccess(graphql) {
  return {
    type: types.CREATE_GRAPHQL,
    graphql
  };
}

const fetch = createApolloFetch({
  uri: 'http://localhost:8082/graphql',
});

function default_query() {
  return {
    query: gql`
      query {
        allVillains {
          id
          name
        }
      }`
  };
}

function full_query() {
  return {
    query: gql`
      query {
        allVillains {
          id
          name
          age
          weight
          image
          description
          powers
          first_appearance
        }
      }`
  };
}

function filter_by_id(id) {
  return {
    query: gql`
      query {
        villain(id: ${id}) {
          id
          name
          age
          weight
          image
          description
          powers
          first_appearance
        }
      }`
  };
}

function count_query() {
  return {
    query: gql`
      query {
        totalVillains
      }`
  };
}

export function match_queries(query, id = 0) {
  switch (query) {
    case 'total_villains':
      return count_query();
    case 'full_list':
      return full_query();
    case 'filter_by_id':
      return filter_by_id(id);
    case 'default':
      return default_query();
    default:
      return default_query();
  }
}

export function loadGraphQL(queries = 'default', id = 0) {
  return function (dispatch) {
    return fetch(match_queries(queries, id)).then(graphql => {
      // console.log('graphql.data ====> ', graphql.data);
      return dispatch(loadGraphQLSuccess(graphql));
    });
  };
}
