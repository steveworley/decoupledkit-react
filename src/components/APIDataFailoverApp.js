import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import '../styles/apidatafailover.scss';
import * as actions from '../actions/graphqlclientActions';

/*eslint-disable no-console */

class APIDataFailoverApp extends React.Component {

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

        <h4>Methods of API Failover</h4>

        <p>
          <b>Story:</b> As a developer, I want to understand common tools and techniques for scenarios in which my application depends on an API(s) which is unavailable.
        </p>

        <ul>
          <li>Setup a common data schema as a single content types in Drupal using the Headless Lightning distro located at https://github.com/acquia-pso/javascript-ps-starter-headlessdrupal</li>
          <li>Using a custom .env variable or toggling a react props boolean, emulate an API being unreachable or hitting common scenarios with rate limits.</li>
          <li>Exhibit a method to store the last reachable version of an API with in-memory storage</li>
          <li>Exhibit a method to store the last reachable version of an API using a MongoDB storage point</li>
          <li>Exhibit methods to handle common error codes when dealing with APIs (200, rate limits, etc) </li>
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

export default connect(mapStateToProps, MapDispatchToProps)(APIDataFailoverApp);
