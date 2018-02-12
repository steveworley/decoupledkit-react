import gql from 'graphql-tag'
import { createApolloFetch } from 'apollo-fetch'

export const BEGIN_GRAPHQL = 'BEGIN_GRAPHQL'
export const RECEIVE_GRAPHQL = 'RECEIVE_GRAPHQL'

const fetch = createApolloFetch({
  uri: 'http://localhost:8082/graphql',
});

const query = gql`
  query {
    pokemons {
      id
      nid
      pokemon_id
      title
      back_shiny_sprite
      front_shiny_sprite
      height_pokemon
      weight_pokemon
    }
  }
`;

const beginFetch = () => {
  return { type: BEGIN_GRAPHQL, data: [] }
}

const receiveFetch = (data) => {
  return { type: RECEIVE_GRAPHQL, data }
}

export function fetchData() {
  return dispatch => {
    dispatch(beginFetch())
    return fetch({ query }).then(graphql => {
      const { data: { pokemons } } = graphql
      dispatch(receiveFetch(pokemons))
    })
      .catch(err => console.log(err))
  }
}
