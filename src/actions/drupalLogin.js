import { drupalAPI } from '../api/drupalAPI'
import envVars from '../../tools/envVars'

export const DRUPAL_LOGIN_SEND = 'DRUPAL_LOGIN_SEND'
export const DRUPAL_LOGIN_RECEIVE = 'DRUPAL_LOGIN_RECEIVE'
export const DRUPAL_LOGIN_CHECK = 'DRUPAL_LOGIN_CHECK'
export const DRUPAL_LOGIN_INVALID = 'DRUPAL_LOGIN_INVALID'

const loginSend = () => {
  return { type: DRUPAL_LOGIN_SEND }
}

const loginReceive = (user) => {
  return { type: DRUPAL_LOGIN_RECEIVE, user }
}

const loginCheck = (user) => {
  return { type: DRUPAL_LOGIN_CHECK, user }
}

const loginInvalid = () => {
  return { type: DRUPAL_LOGIN_INVALID }
}

export async function doLogin({username, password}) {
  return dispatch => {
    const user = await drupalAPI.login(username, password)
    if (!user) return dispatch(loginInvalid())
    return dispatch(loginReceive(user))
  }
}

export function isLoggedIn() {

}