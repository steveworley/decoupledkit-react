import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import '../styles/graphqlclientdrupal.scss';
import * as actions from '../actions/graphqlclientActions';

// Should have called this module character :( haha...  :)
import Villain from './Villain'

/*eslint-disable no-console */

class GraphqlClientDrupal extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.actions.fetchData();
  }

  render() {

    const { data } = this.props;
    const Villains = data.map((villain, i) => {

      return (
        <Villain key={i}
          name={villain.title}
          description={`${villain.description}`}
          image={villain.image}
          nemesis={villain.nemesis}
          comics={[]}
          villains={[]}
        />
      )
    })

    return (

      <div className="holder">

        <h4>Using GraphQL to query a Headless Drupal Instance</h4>

        <p>
          <b>Story:</b> As a developer, I would like to understand the usefullness of utilizing a GraphQL server when retrieving data from a Drupal JSON API source.
        </p>

        <ul>
          <li>Setup a common data schema as a single content types in Drupal using the Headless Lightning distro located at https://github.com/acquia-pso/javascript-ps-starter-headlessdrupal</li>
          <li>Using the sample GraphQL server application in "__graphql_server", set up the proper types and schema definitions to display this data.</li>
          <li>Using this GraphQL server, illustrates the benefits of consolidating multiple API data points within the type definitions and/or schemas.</li>
          <li>Using this React application, show how to retrieve the designated queries from the GraphQL server.</li>
        </ul>


      {/* TODO // Show Query examples in UI */}

        {Villains}


      </div>
    );
  }
}

export function mapStateToProps(state) {
  const { graphqlSingle: { data } } = state
  return { data }
}

export function MapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, MapDispatchToProps)(GraphqlClientDrupal);
