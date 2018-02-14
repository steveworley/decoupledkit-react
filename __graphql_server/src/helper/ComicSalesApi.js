import fetch from 'node-fetch'

class ComicSalesApi {
  constructor() {
    this.url = 'https://comichron-data.github.io'
  }

  handleErrors(error) {
    console.log(error)
  }

  fetch(title) {
    // Fuzzy matching for illustrative purposes.
    title = title.replace(/[^a-zA-Z]/g, '').toLowerCase()

    return fetch(`${this.url}/api/titles.json`)
      .then(res => res.json())
      .then(json => {
        const issue = json.find((el) => el.title.toLowerCase().indexOf(title) > -1)

        if (!issue) return []

        return fetch(`${this.url}/api/titles/${issue.id}/by-issue.json`)
          .then(res => res.json())
          .then(json => json.records)
          .catch(this.handleErrors)
      })
      .catch(this.handleErrors)
  }

}

export let api = new ComicSalesApi()