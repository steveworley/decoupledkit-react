import drupalApi from '../api/drupalAPI'

export const FETCH_CACHE = 'FETCH_CACHE'
export const FETCH_LOCAL_STORAGE = 'FETCH_LOCAL_STORAGE'
export const FETCH_INDEXEDDB = 'FETCH_INDEXEDDB'

const DRUPAL_API_LOC = 'http://local.decoupledkit.com/jsonapi/node/client'

export const fetchCache = () => {
  const id = "b25a5693-3bb8-4498-9e43-2f5e9940705d"
  return dispatch => {
    return drupalApi.loadCache(`${DRUPAL_API_LOC}/${id}`)
      .then(json => {
        const { data } = json
        return dispatch({ type: FETCH_CACHE, data })
      })
      .catch(err => console.log(err))      
  }
}

export const fetchLocalStorage = () => {
  const id = "565b3ef8-9f10-4f59-8870-d9d5f685f253"
  return dispatch => {
    return drupalApi.loadLocalStorage(`${DRUPAL_API_LOC}/${id}`)
      .then(json => {
        const { data } = json
        return dispatch({ type: FETCH_LOCAL_STORAGE, data })
      })
      .catch(err => console.log(err))
  }
}

export const fetchIndexedDb = () => {
  const id = "9cb8d6b3-6754-4fd3-89ca-2a6c08e91ed1"
  return dispatch => {
    return drupalApi.loadIndexedDB(`${DRUPAL_API_LOC}/${id}`)
      .then(json => {
        const { data } = json
        return dispatch({ type: FETCH_INDEXEDDB, data })
      })
      .catch(err => console.log(err))      
  }
}

export const clearCaches = () => { 
  const keys = [FETCH_CACHE, FETCH_LOCAL_STORAGE, FETCH_INDEXEDDB]
  return dispatch => {
    keys.forEach((type) => {
      dispatch({ type, data: null})
    })
  }
}

