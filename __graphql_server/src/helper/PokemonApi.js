import fetch from 'node-fetch'

// Import classes to assist with formatting the API response into a structure
// that represents the GraphQL Schema for the type in the graphql server.
import {
  Model as Pokemon
} from '../types/pokemon'

class PokemonApi {

  constructor() {
    const drupal_url = process.env.DRUPAL_URL;

    this.url = drupal_url;
    this._cache = {
      pokemons: {}
    };
  }

  handleErrors(error) {
    console.error(error);
  }

  pokemons(nid = null) {
    const url = this.url + 'node/pokemon/';
    return fetch(url)
      .then(res => res.json())
      .then(json => {
        return json;
      }).then(json => {
        const pokemonList = json.data.map(i => new Pokemon(i));
        this._cache.pokemons = pokemonList; // store in cache
        return pokemonList;
      })
      .catch(this.handleErrors);
  }

}

// This is the singleton pattern for NodeJS - this will allow all types to use
// the same instance of MarvelApi.
export let api = new PokemonApi();
