import drupalAPI from '../api/drupalAPI';

// This should probably be an environment variable.
export const DRUPAL_API_LOC = 'http://local.decoupledkit.com/jsonapi/node/dogs';

export const LOAD_DRUPAL_DATA = 'LOAD_DRUPAL_DATA';
export const RECEIVE_DRUPAL_DATA = 'RECEIVE_DRUPAL_DATA';
export const LOAD_DRUPAL_IMAGES = 'LOAD_DRUPAL_IMAGES';
export const RECEIVE_DRUPAL_IMAGES = 'RECEIVE_DRUPAL_IMAGES';
export const DRUPAL_CRUD_MESSAGE_SEND = 'DRUPAL_CRUD_MESSAGE_SEND';
export const DRUPAL_CRUD_MESSAGE_CLEAR = 'DRUPAL_CRUD_MESSAGE_CLEAR';
export const RECEIVE_DRUPAL_SINGLE_CACHE = 'RECEIVE_DRUPAL_SINGLE_CACHE'
export const RECEIVE_DRUPAL_SINGLE_LOCAL_STORAGE = 'RECEIVE_DRUPAL_SINGLE_LOCAL_STORAGE'
export const RECEIVE_DRUPAL_SINGLE_INDEXEDDB = 'RECEIVE_DRUPAL_SINGLE_INDEXEDDB'

export function loadDrupalData() {
  return { type: LOAD_DRUPAL_DATA, data: {} };
}

export function receiveDrupalData(data) {
  return { type: RECEIVE_DRUPAL_DATA, data };
}

export function receiveDrupalImages(images) {
  return { type: RECEIVE_DRUPAL_IMAGES, images };
}

export function sendMessage(message) {
  return { type: DRUPAL_CRUD_MESSAGE_SEND, message };
}

export function clearMessage() {
  return { type: DRUPAL_CRUD_MESSAGE_CLEAR, message: null }
}

export function loadSingleCache() {
  return dispatch => {
    drupalAPI.loadCache(`${DRUPAL_API_LOC}/bc2153d4-3426-4983-a33e-d57934dec3fa`)
      .then(response => {
        const { data } = response
        dispatch({type: RECEIVE_DRUPAL_SINGLE_CACHE, caches: data})
      })
  }
}

export function clearClientCaches() {
  return dispatch => {
    drupalAPI.clearCaches()
    dispatch(sendMessage('Caches cleared'))
    dispatch({type: RECEIVE_DRUPAL_SINGLE_LOCAL_STORAGE, localStorage: null})
    dispatch({type: RECEIVE_DRUPAL_SINGLE_CACHE, caches: null})
    dispatch({type: RECEIVE_DRUPAL_SINGLE_INDEXEDDB, indexedDb: null})
    setTimeout(() => { dispatch(clearMessage()) }, 3000)    
  }
}

export function loadSingleLocalStorage() {
  return dispatch => {
    drupalAPI.loadLocalStorage(`${DRUPAL_API_LOC}/4d78bc0a-7e3c-4bd6-ad21-788278381540`)
      .then(response => {
        const { data } = response
        dispatch({type: RECEIVE_DRUPAL_SINGLE_LOCAL_STORAGE, localStorage: data})
      })
  }
}

export function loadSingleIndexedDB() {
  return dispatch => {
    drupalAPI.loadIndexedDB(`${DRUPAL_API_LOC}/4ca316a9-14cd-4e52-89a7-26a93e4b7c84`)
      .then(response => {
        const { data } = response
        dispatch({type: RECEIVE_DRUPAL_SINGLE_INDEXEDDB, indexedDb: data})
      })
  }
}


export function updateContent(uuid, attr) {
  const fields = JSON.parse(JSON.stringify(attr));
  return dispatch => {
    const body = {
      "data": {
        "id": uuid,
        "attributes": {
          'title': fields['title'],
          'body': fields['body'],
          'field_history_and_background': fields['field_history_and_background'],
        }
      }
    }

    if (attr.uploadedFiles) {
      const { image, name } = attr.uploadedFiles
      dispatch(sendMessage(`Uploading files for ${uuid}`))
      drupalAPI.uploadImages('http://local.decoupledkit.com/jsonapi/file/image', image, name)
        .then(file => {
          if (file.errors) {
            dispatch(sendMessage(file.errors[0].detail))
            setTimeout(() => { dispatch(clearMessage()) }, 3000)
            return
          }

          const { data: { type, attributes }} = file;
          dispatch(sendMessage(`Files uploaded successfully, updating referneces.`))

          body.data.relationships = {
            field_dog_picture: {
              data: {
                type: type,
                id: attributes.uuid
              }
            }
          }

          drupalAPI.updateDrupal(`${DRUPAL_API_LOC}/${uuid}`, body).then(res => {
            dispatch(doLoadDrupalData())
            dispatch(sendMessage(`Successfull updated ${uuid}`))
            setTimeout(() => { dispatch(clearMessage()) }, 3000)
          })
        })
    }
    else {
      dispatch(sendMessage(`Sending a content update for ${uuid}`));
      drupalAPI.updateDrupal(`${DRUPAL_API_LOC}/${uuid}`, body).then((res) => {
        dispatch(doLoadDrupalData());
        dispatch(sendMessage(`Succesfully updated ${uuid}`));
        setTimeout(() => { dispatch(clearMessage()) }, 3000);
      });
    }
  }
}

export function createContent(item) {
  return dispatch => {
    const { title, body, field_history_and_background, uploadedFile } = item;
    const requestBody = {
      "data": {
        "type": "node--dogs",
        "attributes": {
          title,
          body: {
            value: body, format: 'rich_text'
          },
          field_history_and_background: {
            value: field_history_and_background,
            format: 'rich_text'
          }
        }
      }
    }

    dispatch(sendMessage(`Creating a new node with title ${title}`));

    if (uploadedFile) {
      const { image, name } = uploadedFile
      drupalAPI.uploadImages('http://local.decoupledkit.com/jsonapi/file/image', image, name)
        .then(file => {
          if (file.errors) {
            dispatch(sendMessage(file.errors[0].detail))
            setTimeout(() => { dispatch(clearMessage()) }, 3000)
            return
          }

          const { data: { type, attributes }} = file;
          dispatch(sendMessage(`Files uploaded successfully, updating referneces.`))

          requestBody.data.relationships = {
            field_dog_picture: {
              data: {
                type: type,
                id: attributes.uuid
              }
            }
          }

          drupalAPI.createNode(`${DRUPAL_API_LOC}`, requestBody)
            .then(res => {
              dispatch(doLoadDrupalData());
              dispatch(sendMessage(`Successfully created the node!`));
              setTimeout(() => { dispatch(clearMessage()) }, 3000);
            });
        })
    } else {
      drupalAPI.createNode(`${DRUPAL_API_LOC}`, requestBody)
        .then(res => {
          dispatch(doLoadDrupalData());
          dispatch(sendMessage(`Successfully created the node!`));
          setTimeout(() => { dispatch(clearMessage()) }, 3000);
        });
    }
  }
}

export function deleteContent(uuid) {
  return dispatch => {
    dispatch(sendMessage(`Deleting node with ${uuid}`));
    return drupalAPI.deleteNode(`${DRUPAL_API_LOC}/${uuid}`)
      .then(res => {
        dispatch(sendMessage(`Successfully deleted ${uuid}`));
        dispatch(doLoadDrupalData());
        setTimeout(() => { dispatch(clearMessage()) }, 3000);
      });
  }
}

/**
 * Fetch the drupal data.
 *
 * This will initiate a state change via `dispatch` and will instruct the
 * component who is listening to the state of this action to trigger an update.
 * We will chain resolvers here as well, after the initial request for data has
 * completed we will trigger another request which we can `dispatch` back to
 * the component and trigger another state update to add images.
 */
export function doLoadDrupalData() {
  let result = {};
  return (dispatch) => {
    return drupalAPI.getAllDrupal(DRUPAL_API_LOC)
      .then(json => {
        const { data } = json;
        result = data.reduce((result, item) => {
          result[item.id] = item;
          return result;
        }, {});

        let initialReturn = JSON.parse(JSON.stringify(result));

        dispatch(receiveDrupalData(initialReturn));

        initialReturn = null; // GC.

        const imageRequests = [];
        Object.keys(result).forEach((uuid) => {
          imageRequests.push(drupalAPI.getAllDrupalImg(`${DRUPAL_API_LOC}/${uuid}/field_dog_picture`));
        });

        Promise.all(imageRequests).then(values => {
          values.forEach((item) => {
            if (item.hasOwnProperty('data')) { // validate it's not returning "" from 500
              const { data: { attributes }, links: { self } } = item;
              const uuid = self.split('/').splice(-2, 1)[0]; // has to be a better way to get the UUID.
              result[uuid].image = DRUPAL_API_LOC.replace('\/jsonapi\/node\/dogs', attributes.url);
            }
          });
          let imageResult = JSON.parse(JSON.stringify(result));
          return imageResult;
        }).then(function (imageResult) {
          dispatch(receiveDrupalData(imageResult));
        }).catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }
}
