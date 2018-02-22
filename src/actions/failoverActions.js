import drupalApi from '../api/drupalAPI'

export const FETCH_CACHE = 'FETCH_CACHE'
export const FETCH_LOCAL_STORAGE = 'FETCH_LOCAL_STORAGE'
export const FETCH_INDEXEDDB = 'FETCH_INDEXEDDB'

const DRUPAL_API_LOC = 'http://local.decoupledkit.com/jsonapi/node/client'

export const fetchCache = () => {
  return dispatch => {
    drupalApi.getDrupalIDs(`${DRUPAL_API_LOC}`).then(IDs => {
      const ID = IDs[0]; // load first index to test
      return drupalApi.loadCache(`${DRUPAL_API_LOC}/${ID}`).then(json => {
        const { data } = json
        return dispatch({ type: FETCH_CACHE, data })
      })
    }).catch(err => console.log(err));
  }
}

export const fetchLocalStorage = () => {
  return dispatch => {
    drupalApi.getDrupalIDs(`${DRUPAL_API_LOC}`).then(IDs => {
      const ID = IDs[1]; // load second index to test
      return drupalApi.loadLocalStorage(`${DRUPAL_API_LOC}/${ID}`)
        .then(json => {
          const { data } = json
          return dispatch({ type: FETCH_LOCAL_STORAGE, data })
        });
    }).catch(err => console.log(err));
  }
}

export const fetchIndexedDb = () => {
  return dispatch => {
    drupalApi.getDrupalIDs(`${DRUPAL_API_LOC}`).then(IDs => {
      const ID = IDs[2]; // load third index to test
      return drupalApi.loadIndexedDB(`${DRUPAL_API_LOC}/${ID}`).then(json => {
        const { data } = json
        return dispatch({ type: FETCH_INDEXEDDB, data })
      });
    }).catch(err => console.log(err));
  }
}

export const clearCaches = () => {
  const keys = [FETCH_CACHE, FETCH_LOCAL_STORAGE, FETCH_INDEXEDDB]
  return dispatch => {
    keys.forEach((type) => {
      dispatch({ type, data: null })
    })
  }
}

