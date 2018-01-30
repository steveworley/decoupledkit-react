import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions/drupalAPIActions';

import '../styles/drupalcrud.scss';
import ReactHtmlParser from 'react-html-parser'; // , { processNodes, convertNodeToElement, htmlparser2 }


class DrupalCrudApp extends React.Component {

  props: {
    data: Object,
  }

  constructor(props) {
    super(props);
    this.state = { data: {}, images: {} }
  }

  componentDidMount() {
    this.props.actions.doLoadDrupalData();
  }

  nodeRows(el = {}, images = {}) {
    const inner = Object.keys(el).map((key, i) => {
      const item = el[key];
      const imageUrl = !!images[key] ? images[key] : '';
      return (
        <div className="row" key={i}>

          <div className="edit-node">
            edit
          <form className="nid">
              {/* <input type="text" name="title" /> */}
              {item.id}

              <div>
                <label>Title</label>
                <input className="title" type="text" value={this.state.value} />
              </div>

              <input className="button" type="submit" value="Submit" />
            </form>
          </div>

          <div className="nid">
            <div className="label">NID</div>
            {item.attributes.nid}
          </div>
          <div className="title">
            <div className="label">Title</div>
            {item.attributes.title}
          </div>
          <div className="body">
            <div className="label">Description</div>
            {ReactHtmlParser(item.attributes.body.value)}
          </div>
          <div className="history_and_background">
            <div className="label">History and Background</div>
            {ReactHtmlParser(item.attributes.field_history_and_background.value)}
          </div>
          <div className="dog_picture">
            <div className="label">Picture</div>
            <img src={imageUrl} />
          </div>
        </div>
      );
    })

    return (
      <div className="node-rows">
        {inner}
      </div>
    );
  }

  render() {
    const data = Object.assign({}, this.props.data);
    const images = Object.assign({}, this.props.images);
    const nodeRows = this.nodeRows(data, images);

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

        {nodeRows}

      </div>
    );
  }
}

DrupalCrudApp.propTypes = {
  actions: PropTypes.object.isRequired
};

export function mapStateToProps(state) {
  const { drupalLoadReducer: { data, images } } = state;
  return { data, images };
}

export function MapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, MapDispatchToProps)(DrupalCrudApp);
