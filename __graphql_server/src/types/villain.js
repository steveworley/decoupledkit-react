import { api as DrupalApi } from '../helper/DrupalApi';

const schema = `
  type Villain @cacheControl(maxAge: 30) {
    id: ID!
    title: String
    description: String
    image: String
    nemesis: [String]
    nid: Int
  }
`;

export const queries = `
  villains: [Villain],
  villain(nid: Int!): Villain,
`

export class Model {
  constructor({ id, attributes }) {
    this.id = id;
    this.title = attributes.title;
    this.description = attributes.field_description.value;
    this.image = attributes.field_image_reference;
    this.nemesis = attributes.field_nemesis;
    this.nid = attributes.nid;
  }
}
const villains = () => DrupalApi.characters();
const villain = (_, { nid }) => villains().then(json => { // TODO: review syntax
  return json.find(villain => villain.nid === nid);
});

const resolvers = {
  queries: {
    villains,
    villain
  }
}

export default () => ({
  schema,
  Model,
  queries,
  resolvers,
});
