import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import '../styles/apidatamock.scss';
import * as actions from '../actions/graphqlMockActions';

import Client from './Client'

/*eslint-disable no-console */

class APIDataMockApp extends React.Component {

  componentDidMount() {
    this.props.actions.fetchUsersAction()
  }

  render() {
    const { data } = this.props;

    const mockUsers = data.map((user, i) => {
      return (
        <Client key={i} firstName={user.first_name} lastName={user.last_name} email={user.email} country={user.country} uuid={i} />
      )
    })

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

        {mockUsers}

      </div>

    );
  }
}

export function mapStateToProps(state) {
  const { graphqlMockReducer: { data, msg } } = state
  return { data, msg }
}

export function MapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, MapDispatchToProps)(APIDataMockApp);
