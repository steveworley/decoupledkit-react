import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions/drupalAPIActions';
import * as actiontypes from '../actions/drupalAPITypes';

import '../styles/drupalcrud.scss';
import ReactHtmlParser from 'react-html-parser'; // , { processNodes, convertNodeToElement, htmlparser2 }


class DrupalCrudApp extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.onAPIChange = this.onAPIChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      value: '',
      drupal_nodes: {
        api_endpoint: actiontypes.DRUPAL_API_LOC || null,
        api_path: null,
        api_data: null,
        node_id: null
      },
      drupal_api_load_img: {},
      drupal_node_build: null,
      fetch_dispatch: false,
    };
  }

  fetchAPIData(local_action, endpoint) {
    //console.log('fetchAPIData');
    return local_action.loadDrupal(endpoint);
  }

  fetchAPIDataImg(local_action, endpoint) {
    //console.log('fetchAPIDataImg');
    return local_action.loadDrupalImg(endpoint);
  }

  updateAPIData(local_action, endpoint) {
    return local_action.updateDrupal(endpoint);
  }


  componentWillMount() {

    const mount_actions = this.props.actions;
    //console.log('mount_actions', mount_actions);
    const drupal_nodes = this.state.drupal_nodes;
    const dogs_endpoint = '/node/dogs';
    const nodes = {};
    const t = this; // mark top scope

    t.fetchAPIData(mount_actions, drupal_nodes.api_endpoint + dogs_endpoint).then((response) => {
      nodes.api_endpoint = actiontypes.DRUPAL_API_LOC;
      nodes.api_path = nodes.api_endpoint + dogs_endpoint;
      nodes.api_data = response.drupal_api_load.data;
      nodes.node_id = response.drupal_api_load.data.map(function (i) {
        return i['id'];
      });

      this.setState({
        drupal_nodes: nodes
      });

      return Object.assign({}, nodes);

      /**
       ***********************************
       */

    }).then((nodes) => {  // add absolute picture paths
      console.log('response __', nodes.api_data);

      const nodelist = nodes.node_id; // console.log('nodelist', nodelist);

      // var imageList = {};
      nodelist.forEach(function (uuid) {
        console.log('nodelist ==>', uuid);
        t.fetchAPIDataImg(mount_actions, 'http://local.decoupledkit.com/jsonapi/node/dogs/' + uuid + '/field_dog_picture').then((response) => {
          if (response.type == 'LOAD_DRUPAL_IMG_SUCCESS') {
            let img_path = t.state.drupal_nodes.api_endpoint.replace('/jsonapi', '') + response.drupal_api_load_img.data.attributes.url;
            // [{ [uuid]: uuid }, { 'img_path': img_path }]   why can I do this here but not in render
            t.setState({ drupal_api_load_img: [...t.state.drupal_api_load_img, ...[img_path]] }); // TODO: update structure by UUID
            // console.log('img_path', img_path);

            /**
             * I want to update the existing object "drupal_nodes" the image field reference in this loop.
             * Just nested like this: https://screencast.com/t/0SGdMJpgnL2t
            */
            // let currNodes = [...t.state.drupal_nodes.api_data];
            // currNodes[0]['freakin_picture'] = 'test';
            // console.log('currNodes ====>',currNodes);

            console.log('t.state', t.state);
          }

          t.setState({
            fetch_dispatch: true
          });

        });

      });

    }).then(() => {

      // console.log('completed fetch on componentDidMount()');
      // console.log('this.state --> 1 ', this.state);
      // this.setState({
      //   fetch_dispatch: true
      // });

      // this.setState({ drupal_api_load_img: [...t.state.drupal_api_load_img, ...[{ 'id': curr_node, 'img_path': img_path }]] });
      // console.log('this.state --> 2 ', this.state);

    }).catch(error => {
      throw (error);
    });

  }

  onAPIChange(event) {
    // const mount_actions = this.props.actions;
    // const sw = this.state.sw;
    // sw.api_selected = event.target.value;
    // mount_actions.loadStarWars(sw.api_selected).then(function (obj) {
    //   return obj;
    // }).then((response) => {
    //   sw.api_results = response.starwars;
    //   this.setState({
    //     sw
    //   });
    // }).catch(error => {
    //   throw (error);
    // });
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
    // const props_actions = this.props.actions;
    // this.setState({ filter_villain_id: value });
    // if ((value > 0) && (value < 11)) {
    //   let query_markup = actions.match_queries('filter_by_id', value).query.loc.source.body;
    //   this.setState({ graphql_data: this.fetchGraphQLData(props_actions, 'filter_by_id', value) });
    //   this.setState({
    //     id_error: false,
    //     show_villains: true,
    //     query_display: query_markup,
    //   });
    // }
    // else {
    //   this.setState({
    //     id_error: true,
    //     show_villains: false,
    //     query_display: false
    //   });
    // }
  }


  // handleChange(event) {
  //   let e = event.target.value;
  //   this.setState({
  //     marker: e,
  //   });
  // }

  handleSubmit(event) {
    console.log('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }


  nodeRows(el, img) {

    let nodeswithImgs = Object.assign({}, el);

    // nodeswithImgs[0].attributes["d"] = 'd';


    console.log('updateIMG', nodeswithImgs);

    return (

      <div className="node-rows">
        {
          el.map((item, index) => (
            <div className="row" key={index}>

              <div className="edit-node">
                edit
              <form className="nid" onSubmit={this.handleSubmit}>
                  {/* <input type="text" name="title" /> */}
                  {item.id}

                  <div>
                    <label>Title</label>
                    <input className="title" type="text" value={this.state.value} onChange={this.handleChange} />
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
                {/*
                TODO: group by UUID after updating structure in t.setState = drupal_api_load_img in line 87
                */}
                <img src={img[index]} />
              </div>
            </div>
          ))
        }
      </div>
    );
  }


  render() {

    console.log('this.state ======> ', this.state);
    console.log('this.props ======> ', this.props);

    if (this.state.fetch_dispatch == true) {
      // let nodes = this.state.drupal_api_load;
      // let img = .drupal_api_load_img;

      console.log('this.props ======> ', this.props);

    }

    const nodeRows = (this.state.fetch_dispatch == true) ? this.nodeRows(this.state.drupal_nodes.api_data, this.state.drupal_api_load_img) : ' ';


    //console.log('nodeRows', nodeRows);

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

        {/* <form>
          <input type="text" placeholder="Search" value={this.state.filterText} onChange={this.handleChange} />
          <p>
            {this.state.postText ? 'Your selection is: ' + this.state.filterText : ''}
          </p>
        </form> */}
      </div>
    );
  }
}



DrupalCrudApp.propTypes = {
  actions: PropTypes.object.isRequired
};

export function mapStateToProps(state) {
  return {
    drupal_api_load: state.drupal_api_load,
    drupal_api_load_img: state.drupal_api_load_img,
    // drupal_api_update: state.drupal_api_update
  };
}

export function MapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, MapDispatchToProps)(DrupalCrudApp);
