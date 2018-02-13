import { bundle } from 'graphql-modules'
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools'

import heroes from './types/hero'
import villains from './types/villain'
import comics from './types/comic'
import users from './types/user'
import pokemon from './types/pokemon';
import abilities from './types/pokemon_ability';
import types from './types/pokemon_types';

import mocks from './mocks'

const modules = [heroes, villains, comics, users, pokemon, abilities, types]

const schema = makeExecutableSchema(bundle(modules))

if (process.env.MOCK) {
  addMockFunctionsToSchema({
    schema,
    mocks,
    preserveResolvers: true
  })
}

export default schema;
