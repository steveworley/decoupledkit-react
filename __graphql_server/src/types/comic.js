import comicSale from './comicSale'

const schema = `
  type Comic @cacheControl(maxAge: 30) {
    id: ID!
    title: String!
    issueNumber: Int
    description: String
    image: String
    sales: [ComicSale]
  }
`;

const resolvers = {
  Comic: {
    sales: (({title}) => {
      return fetch('https://comichron-data.github.io/api/titles.json')
        .then(res => res.json)
        .then((json) => {
          const issue = json.find((el) => {
            return el.title.indexOf(title) > -1
          })

          if (issue.length === 0) {
            // We haven't found the title in the JSON.
            return issue
          }

          return fetch(`https://comichron-data.github.io/api/titles/${issue.id}/by-issue.json`)
            .then(res => res.json)
            .then(json => json.records)
        })
    })
  }
}

/**
 * --- CLASS MODEL ---
 *
 * A model can be used to massage the data received from a remote source (db,
 * api, etc.) into the schema known by GraphQL.
 */
export class Model {
  constructor({ id, title, issueNumber, description, thumbnail }) {
    this.id = id;
    this.title = title;
    this.issueNumber = issueNumber,
    this.description = description;
    this.image = `${thumbnail.path}.${thumbnail.extension}`;
  }
}
/** ---- */

export default () => ({
  schema,
  modules: [comicSale]
});
