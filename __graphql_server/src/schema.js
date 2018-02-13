import { bundle } from 'graphql-modules'
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools'

import heroes from './types/hero'
import villains from './types/villain'
import comics from './types/comic'
import users from './types/user'

import mocks from './mocks'

const modules = [heroes, villains, comics, users]

const schema = makeExecutableSchema(bundle(modules))

if (process.env.MOCK) {
  addMockFunctionsToSchema({
    schema,
    mocks,
    preserveResolvers: true
  })
}

export default schema;
