import React from 'react';
import SearchApp from './SearchApp';
import TimeTracker from './timeTracker';
import UserApp from './UserApp';
import StarWarsApp from './StarWarsApp';
import StarWarsExternalApp from './StarWarsExternalApp';
import IncrementApp from './IncrementApp';
import GraphqlClientApp from './GraphqlClientApp';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:8082/graphql',
  }),
  cache: new InMemoryCache()
});

function SampleApp() {

  return (

    <div className="sample-app">

      <TimeTracker />

      <h2>Collection of Sample Components</h2>

      <div className="boxy float-left clearfix">
        <SearchApp />
      </div>

      <div className="boxy float-left clearfix">
        <IncrementApp />
      </div>

      <div className="boxy float-left clearfix">
        <UserApp />
      </div>

      <div className="boxy float-left clearfix">
        <StarWarsApp />
      </div>

      <div className="boxy float-left clearfix">
        <StarWarsExternalApp />
      </div>

      <ApolloProvider client={client}>
        <GraphqlClientApp />
      </ApolloProvider>

    </div>
  );
}

export default SampleApp;
