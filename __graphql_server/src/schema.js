import { bundle } from 'graphql-modules';
import { makeExecutableSchema } from 'graphql-tools';

import heroes from './types/hero';
import villains from './types/villain';
import comics from './types/comic';
import pokemon from './types/pokemon';
import abilities from './types/pokemon_ability';
import types from './types/pokemon_types';

const modules = [heroes, villains, comics, pokemon, abilities, types];

export default makeExecutableSchema(bundle(modules));
