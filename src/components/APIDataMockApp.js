import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import '../styles/apidatamock.scss';
import * as actions from '../actions/graphqlMockActions';

/*eslint-disable no-console */

class APIDataMockApp extends React.Component {

  componentDidMount() {
    this.props.actions.fetchUsersAction()
  }

  render() {
    const { data } = this.props
    const Users = data.map(user => {
      return (
        <div className="user-container">
          <div className="label">Name</div>
          <p>{user.name}</p>
          <div className="label">Email</div>
          <p>{user.email}</p>
        </div>
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

        { Users }

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
