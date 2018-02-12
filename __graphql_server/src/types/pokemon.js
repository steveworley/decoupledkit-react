import { api as PokemonApi } from '../helper/PokemonApi';

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
  }
}

export default () => ({
  schema,
  Model,
  queries,
  resolvers,
});
