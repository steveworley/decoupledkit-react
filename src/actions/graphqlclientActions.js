import gql from 'graphql-tag'

import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

export const BEGIN_GRAPHQL = 'BEGIN_GRAPHQL'
export const RECEIVE_GRAPHQL = 'RECEIVE_GRAPHQL'

const client = new ApolloClient({
  link: new HttpLink({uri: 'http://localhost:8082/graphql'}),
  cache: new InMemoryCache()
})

const query = gql`
  query {
    villains {
      id
      title
      nid
      image
      description
      nemesis
    }
  }
`

const beginFetch = () => {
  return { type: BEGIN_GRAPHQL, data: []}
}

const receiveFetch = (data) => {
  return { type: RECEIVE_GRAPHQL, data }
}

export function fetchData() {
  return dispatch => {
    dispatch(beginFetch())
    return client.query({ query }).then(graphql => {
        console.log('data ===>', graphql);
        const { data: { villains }} = graphql
        dispatch(receiveFetch(villains))
      })
      .catch(err => console.log(err))
  }
}
