import fetch from 'node-fetch'

// Import classes to assist with formatting the API response into a structure
// that represents the GraphQL Schema for the type in the graphql server.
import {
  Model as Character
} from '../types/villain'

class DrupalApi {

  constructor() {
    const drupal_url = process.env.DRUPAL_URL;

    this.url = drupal_url;
    this._cache = {
      characters: {},
      comics: {}
    };
  }

  handleErrors(error) {
    console.error(error);
  }

  characters(nid = null) {
    const url = this.url + 'node/marvel_characters/';
    return fetch(url)
      .then(res => res.json())
      .then(json => {
        return json;
      }).then(json => {
        const characterList = json.data.map(i => new Character(i));
        this._cache.characters = characterList; // store in cache
        return characterList;
      })
      .catch(this.handleErrors);
  }

}

// This is the singleton pattern for NodeJS - this will allow all types to use
// the same instance of MarvelApi.
export let api = new DrupalApi();
