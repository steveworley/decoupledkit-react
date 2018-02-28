import { tokenStorage, fetchWithMiddleware, middleware } from 'fetch-oauth2'
import FormData from 'form-data'
import { URLSearchParams } from 'url'
import fetch from 'node-fetch'
import btoa from 'btoa'

// Import classes to assist with formatting the API response into a structure
// that represents the GraphQL Schema for the type in the graphql server.
import {
  Model as Character
} from '../types/character'


/**
 * @class DrupalApi
 */
class DrupalApi {

  /**
   * Build the Drupal API class instance.
   *
   * @function constructor
   */
  constructor() {
    const storage = tokenStorage({
      fetchToken: this.fetchToken,
      generateToken: this.generateToken
    })

    this.apiToken = null

    this.fetch = fetchWithMiddleware(
      this.addHostToUrl,
      this.addHeader('Content-Type', 'application/vnd.api+json'),
      this.addHeader('Accept', 'application/vnd.api+json'),
      middleware.setOAuth2Authorization(storage),
      middleware.authorisationChallengeHandler(storage)
    )
  }

  /**
   * Fetch middleware that adds the configured host to the request.
   * 
   * @param {Function} next 
   */
  addHostToUrl(next) {
    return config => {
      return next(config.then(config => {
        return config.updateUri(uri => { 
          uri = uri.startsWith('/') ? uri : `/${uri}`
          return process.env.DRUPAL_URL + 'jsonapi' + uri
        })
      }))
    }
  }

  /**
   * Fetch middleware to add headers to every request.
   * 
   * @param {String} header 
   * @param {String} value 
   */
  addHeader(header, value) {
    return next => config => {
      return next(config.then(config => config.setHeader(header, value)))
    }
  }

  /**
   * Return the generated token.
   */
  fetchToken() {
    return new Promise((resolve, reject) => {
      !! this.apiToken ? resolve(this.apiToken) : reject('Invalid token')
    })
  }
  
  /**
   * MNake a request to Drupal to generate a new API tokne.
   */
  generateToken() {
    const form = new FormData()

    form.append('grant_type', 'password')
    form.append('client_id', process.env.CLIENT_ID)
    form.append('client_secret', process.env.CLIENT_SECRET)
    form.append('username', process.env.DRUPAL_USER)
    form.append('password', process.env.DRUPAL_PASSWORD)

    const body = [
      'grant_type=password',
      'client_id=' + process.env.CLIENT_ID,
      'client_secret=' + process.env.CLIENT_SECRET,
      'username=' + process.env.DRUPAL_USER,
      'password=' + process.env.DRUPAL_PASSWORD,
    ];

    console.log('Making request to:', process.env.DRUPAL_URL + 'oauth/token')

    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: body.join('&'),
    }).then(res => res.json()).then(json => console.log(json))

    return fetch(process.env.DRUPAL_URL + '/oauth/token', {
      method: 'POST',
      body: body.join('&'),
    })
      .then(res => res.json())
      .then(json => {
        if (json.error) {
          throw new Error(json.message)
        }
        this.apiToken = json
        return json
      })
      .catch(err => console.error('Unable to generate token ==>', err))
  }

  /**
   * Generic error handler.
   *
   * This will log errors to the GraphQL console. This could be expanded to
   * log to a file that could the be ingested by a log parser for better
   * reporting.
   *
   * @function handleError
   */
  handleErrors(error) {
    console.error(error)
  }

  /**
   * Fetch a character list from Drupal.
   *
   * @function characters
   *
   * @param {Int} nid
   *   A valid node ID which will be queried for.
   *
   * @return {Promise}
   *   Returns a promise that resolves to new characters.
   */
  characters(nid = null) {
    return this.fetch('node/marvel_characters')
      .then(res => res.json())
      .then(json => json.data.map(i => new Character(i)))
      .catch(this.handleErrors)
  }

  /**
   * Create a character via the JSON API using configured creds.
   *
   * @function createCharacter
   *
   * @param {Object} character
   *   An object that matches the fields expected by JSON API.
   *
   * @return {Promise}
   *   Returns a fetch request that resolves to a single character.
   *
   * @todo Data validation on the JSON object that is given to ensure we have
   * the requried fields to create a node.
   */
  createCharacter(character) {
    const data = {
      data: {
        type: 'node--marvel_characters',
        attributes: character
      }
    }

    return fetch('node/marvel_characters', {
      method: 'POST',
      body: JSON.stringify(data)
    })
      .then(res => {
        if (res.status === 403) throw new Error('Forbidden')
        return res.json()
      })
      .then(json => new Character(json.data))
      .catch(this.handleErrors)
  }

}

export let api = new DrupalApi()
