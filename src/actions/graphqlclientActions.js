import gql from 'graphql-tag'
import { createApolloFetch } from 'apollo-fetch'

export const BEGIN_GRAPHQL = 'BEGIN_GRAPHQL'
export const RECEIVE_GRAPHQL = 'RECEIVE_GRAPHQL'

const fetch = createApolloFetch({
  uri: 'http://localhost:8082/graphql',
});

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
    return fetch({ query }).then(graphql => {
        // console.log('data ===>', graphql);
        const { data: { villains }} = graphql
        dispatch(receiveFetch(villains))
      })
      .catch(err => console.log(err))
  }
}
