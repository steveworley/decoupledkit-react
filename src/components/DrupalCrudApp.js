import React from 'react'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as actions from '../actions/drupalAPIActions'
import Node from './node';

import '../styles/drupalcrud.scss'


class DrupalCrudApp extends React.Component {
  componentDidMount() {
    this.props.actions.doLoadDrupalData();
  }

  onChange(item, field, val) {
    this.props.actions.updateContent(item, field, val);
  }

  render() {
    const data = {...this.props.data};
    const nodeList = Object.keys(data).map(key => {
      const item = data[key];
      return (
        <Node key={key} {...item.attributes} image={item.image} onChangeHandler={this.onChange.bind(this) } />
      );
    })

    return (
      <div>
        <h4>Drupal CRUD Component</h4>
        <p>
          <b>Story:</b> As a developer, I want to understand common CRUD operations when interacting with the Drupal JSON API endpoints.
        </p>

        <ul>
          <li>Setup a common data schema as a single content types in Drupal using the Headless Lightning distro located at https://github.com/acquia-pso/javascript-ps-starter-headlessdrupal</li>
          <li>Show the ability to create a new node of that content type (create)</li>
          <li>Show a list of the available nodes to choose from. (read)</li>
          <li>Show the ability to update an existing node of that content type (update)</li>
          <li>Show the ability to delete a node of that content type (delete)</li>
        </ul>
        <div className={"node-rows"}>
          {nodeList}
        </div>
      </div>
    );
  }
}

DrupalCrudApp.propTypes = {
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state, newState) {
  const { drupalLoadReducer: { data } } = state || { drupalLoadReducer: {data: {}}};
  return { data };
}

function MapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, MapDispatchToProps)(DrupalCrudApp);
