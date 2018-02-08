import gql from 'graphql-tag'
import { createApolloFetch } from 'apollo-fetch'

export const BEGIN_GRAPHQL_MULTI = 'BEGIN_GRAPHQL_MULTI'
export const END_GRAPHQL_MULTI = 'END_GRAPHQL_MULTI'
export const UPDATE_START_GRAPHQL_MULTI = 'UPDATE_START_GRAPHQL_MULTI'
export const UPDATE_END_GRAPHQL_MULTI = 'UPDATE_END_GRAPHQL_MULTI'
export const MESSAGE_GRAPHQL_MULTI = 'MESSAGE_GRAPHQL_MULTI';
export const MESSAGE_CLEAR_GRAPHQL_MULTI = 'MESSAGE_CLEAR_GRAPHQL_MULTI';

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
            id
            title
            description
            image
            nemesis
          }
          comics {
            id
            title
            description
            image
          }
        }
      }
    `
  }
}

const update = () => {
  return gql`
    mutation UpdateHero($id: Int! $input: HeroName!) {
      updateHero(id: $id input: $input) {
        title
      }
    }
  `
}

const create = () => {
  return gql`
    mutation CreateHero($input: HeroName!) {
      createHero(input: $input) {
        id
        name
        description
        image
        villains {
          id
          title
          description
          image
          nemesis
        }
        comics {
          id
          title
          description
          image
        }
      }
    }
  `
}

function beginAction() {
  return { type: BEGIN_GRAPHQL_MULTI, data: [] }
}

function endAction(data) {
  return { type: END_GRAPHQL_MULTI, data }
}

function beginUpdate() {
  return { type: UPDATE_START_GRAPHQL_MULTI, updated: []}
}

function endUpdate() {
  return { type: UPDATE_END_GRAPHQL_MULTI, updated: []}
}

function sendMessage(message) {
  return { type: MESSAGE_GRAPHQL_MULTI, message }
}

function clearMessage() {
  return { type: MESSAGE_CLEAR_GRAPHQL_MULTI, message: '' }
}

export function fetchGraphql() {
  return dispatch => {
    dispatch(sendMessage('Fetching data from the server!'))
    return fetch(query())
      .then(graphql => {
        const { data: { heroes } } = graphql
        dispatch(clearMessage())
        dispatch(endAction(heroes))
      })
      .catch(err => console.log(err))
  }
}

export function updateGrpahql(id, name) {
  return dispatch => {
    dispatch(beginUpdate());
    dispatch(sendMessage(`Preparing to update ${id}'s name to ${name}`))
    const variables = { id, input: { name }  }
    const query = update()
    return fetch({ query, variables })
      .then(graphql => {
        const { data: { createHero } } = graphql
        dispatch(endUpdate(createHero))
        dispatch(fetchGraphql())
      })
      .catch(err => console.log(err))
  }
}

export function createGraphql(name) {
  return dispatch => {
    const variables = { input: { name }}
    const query = create()
    dispatch(sendMessage(`Preparing to add ${name}`))
    return fetch({ query, variables })
      .then(graphql => {
        dispatch(sendMessage(`Successfully added ${name} refreshing data from the server`))
        dispatch(fetchGraphql())
      })
      .catch(err => console.log(err))
  }
}
