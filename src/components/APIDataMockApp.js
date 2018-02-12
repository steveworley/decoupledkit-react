import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import '../styles/apidatamock.scss';
import * as actions from '../actions/graphqlclientActions';

/*eslint-disable no-console */

class APIDataMockApp extends React.Component {

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

  render() {
    return (

      <div className="holder">

        <h4>Mocking APIs for local development</h4>
        <p>
          <b>Story:</b> As a developer, I want understand the usefulness of using a Mock API when developing API-reliant applications in React.
        </p>

        <ul>
          <li>Setup a common data schema as a single content types in Drupal using the Headless Lightning distro located at https://github.com/acquia-pso/javascript-ps-starter-headlessdrupal</li>
          <li>After the content type has been create, emulate the API schema for that content type to mirror.</li>
          <li>Setup a local Mock API server in the application that only runs for development build tasks.</li>
          <li>Show a comparison of the Mock API and the correct API to communicate the parity when developing an application.</li>
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

export default connect(mapStateToProps, MapDispatchToProps)(APIDataMockApp);
