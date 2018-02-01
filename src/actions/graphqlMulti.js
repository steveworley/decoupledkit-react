import gql from 'graphql-tag'
import { createApolloFetch } from 'apollo-fetch'

export const BEGIN_GRAPHQL_MULTI = 'BEGIN_GRAPHQL_MULTI'
export const END_GRAPHQL_MULTI = 'END_GRAPHQL_MULTI'

const fetch = createApolloFetch({
  uri: 'http://localhost:8082/graphql'
})

function query() {
  return {
    query: gql`
      query {
        heroes {
          id
          name
          description
          image
          villains {
            name
            description
            image
          }
          comics {
            title
            description
            image
          }
        }
      }
    `
  }
}

function beginAction() {
  return { type: BEGIN_GRAPHQL_MULTI, data: [] }
}

function endAction(data) {
  return { type: END_GRAPHQL_MULTI, data }
}

export function fetchGraphql() {
  return dispatch => {
    return fetch(query())
      .then(graphql => {
        const { data: { heroes } } = graphql;
        dispatch(endAction(heroes));
      })
      .catch(err => console.log(err))
  }
}
