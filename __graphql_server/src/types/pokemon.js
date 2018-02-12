import { api as PokemonApi } from '../helper/PokemonApi';
// import ability from './pokemon_ability';

const schema = `
  type Pokemon {
    id: ID!
    nid: Int
    title: String
    pokemon_id: Int
    back_shiny_sprite: String
    front_shiny_sprite: String
    height_pokemon: Int
    weight_pokemon: Int
    abilities: [Ability]
    ref_types: [Ref_Type]
  }
`;

export const queries = `
  pokemons: [Pokemon],
  pokemon(nid: Int!): Pokemon,
`

export class Model {
  constructor({ id, attributes }) {
    this.id = id;
    this.nid = attributes.nid;
    this.title = attributes.title;
    this.pokemon_id = attributes.field_pokemon_id;
    this.back_shiny_sprite = attributes.field_back_shiny_sprite;
    this.front_shiny_sprite = attributes.field_front_shiny_sprite;
    this.height_pokemon = attributes.field_height_pokemon;
    this.weight_pokemon = attributes.field_weight_pokemon;
    this.abilities = [];
    this.types = [];
  }
}
const pokemons = () => PokemonApi.pokemons();
const pokemon = (_, { nid }) => pokemons().then(json => {
  return json.find(pokemon => pokemon.nid === nid);
});

const resolvers = {
  queries: {
    pokemons,
    pokemon
  },
  Pokemon: {
    abilities: ({ id }) => PokemonApi.abilities(id),
    ref_types: ({ id }) => PokemonApi.ref_types(id)
  }
}

export default () => ({
  schema,
  Model,
  queries,
  resolvers
});

/*

query reference //

{
  pokemons {
    id
    nid
    pokemon_id
    title
    back_shiny_sprite
    front_shiny_sprite
    height_pokemon
    weight_pokemon
    abilities {
      id
      type
      name
      description
    }
    ref_types {
      id
      type
      name
      description
    }
  }
}

*/
