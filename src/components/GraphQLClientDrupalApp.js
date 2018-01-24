import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import '../styles/graphqlclientdrupal.scss';
import * as actions from '../actions/graphqlclientActions';

/*eslint-disable no-console */

class GraphQLClientDrupal extends React.Component {

  constructor(props, store) {
    super(props, store);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      graphql_data: [],
      show_villains: false,
      filter_villain_id: '',
      id_error: false,
      query_display: false,
    };
  }

  componentDidMount() {
  }


  handleClick(event) {
    //let value = event.target.value;
  }

  handleChange(event) {
    // let value = event.target.value;
  }

  render() {

    //    const graphql_data = this.props.graphql.data;

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
      </div>

    );
  }
}

export function mapStateToProps(state) {
  return {
    graphql: state.graphql
  };
}

export function MapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, MapDispatchToProps)(GraphQLClientDrupal);
