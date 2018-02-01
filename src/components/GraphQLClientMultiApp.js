import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import '../styles/graphqlclientdrupal.scss';
import * as actions from '../actions/graphqlMulti';

import Hero from './Hero';

/*eslint-disable no-console */

class GraphQLClientMulti extends React.Component {

  constructor(props, store) {
    super(props, store);
  }

  componentDidMount() {
    this.props.actions.fetchGraphql()
  }

  render() {
    const { data } = this.props
    const Heroes = data.map(hero => {
      return (
        <Hero
          name={hero.name}
          description={hero.description}
          image={hero.image}
          comics={hero.comics}
          villains={hero.villains}
        />
      )
    })


    return (

      <div className="holder">

        <h4>Using GraphQL to query a data from both a Headless Drupal source and external non-Drupal API.</h4>

        <p>
          <b>Story:</b> As a developer, I would like to understand the usefullness of utilizing a GraphQL server combine data from multiple API endpoints.
        </p>

        <ul>
          <li>Setup a common data schema as a single content types in Drupal using the Headless Lightning distro located at https://github.com/acquia-pso/javascript-ps-starter-headlessdrupal</li>
          <li>Identify another non-Drupal API services to mirror the topic of the Drupal content type.</li>
          <li>Using the sample GraphQL server application in "__graphql_server", set up the proper types and schema definitions to display data from both the Drupal API and the non-Drupal API.</li>
          <li>Using this GraphQL server, illustrates the benefits of consolidating multiple API data points within the type definitions and/or schemas.</li>
          <li>Using this React application, show how to retrieve the designated queries from the GraphQL server.</li>
        </ul>

        {Heroes}

      </div>

    );
  }
}

export function mapStateToProps(state) {
  const { graphqlMultiReducer: { data } } = state
  console.log(state, 'state data');
  return { data };
}

export function MapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, MapDispatchToProps)(GraphQLClientMulti);
