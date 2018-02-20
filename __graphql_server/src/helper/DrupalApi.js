import fetch from 'node-fetch'
import btoa from 'btoa'

// Import classes to assist with formatting the API response into a structure
// that represents the GraphQL Schema for the type in the graphql server.
import {
  Model as Character
} from '../types/hero'


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
    this.url = process.env.DRUPAL_URL
    this.headers = {
      'Accept': 'applicatoin/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      'Authorization': 'Basic ' + btoa(process.env.DRUPAL_USER + ':' + process.env.DRUPAL_PASSWORD)
    }
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
    const url = this.url + 'node/marvel_characters/'
    return fetch(url, { headers: this.headers })
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

    return fetch(`${this.url}node/marvel_characters`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data)
    })
      .then(res => { 
        if (res.status === 403) {
          console.log(JSON.stringify(data))
          throw new Error('Forbidden')
        }
        return res.json()
      })
      .then(json => new Character(json.data))
      .catch(this.handleErrors)
  }

}

export let api = new DrupalApi()
