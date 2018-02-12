import fetch from 'node-fetch'

// Import classes to assist with formatting the API response into a structure
// that represents the GraphQL Schema for the type in the graphql server.
import {
  Model as Pokemon
} from '../types/pokemon'

import {
  Model as Ability
} from '../types/pokemon_ability'

import {
  Model as Types
} from '../types/pokemon_types'

class PokemonApi {

  constructor() {
    const drupal_url = process.env.DRUPAL_URL;
    this.url = drupal_url;
    this._cache = {
      pokemons: {},
      abilities: {},
      types: {}
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

  abilities(uuid) {
    const url = this.url + `node/pokemon/${uuid}/field_abilities`;
    return fetch(url)
      .then(res => res.json())
      .then(json => {
        const abilities = json.data.map(i => new Ability(i));
        this._cache.abilities[uuid] = abilities;
        return abilities;
      })
      .catch(this.handleErrors);
  }

  ref_types(uuid) {
    const url = this.url + `node/pokemon/${uuid}/field_type_pokemon_ref`;
    return fetch(url)
      .then(res => res.json())
      .then(json => {
        const types = json.data.map(i => new Types(i));
        this._cache.types[uuid] = types;
        return types;
      })
      .catch(this.handleErrors);
  }

}

export let api = new PokemonApi();
