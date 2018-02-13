/**
 * @file
 * Define the user schema object for our server.
 */

const schema = `
  type User @cacheControl(maxAge: 30) {
    id: ID!
    name: String!
    email: String!
    accountNumber: Int!
  }
`

const queries = `
  users: [User]
  user(id: ID!): Hero
`

export default () => ({ schema, queries })
