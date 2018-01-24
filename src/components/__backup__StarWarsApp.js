import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions/starwarsActions';
import * as actiontypes from '../actions/starwarsTypes';
import '../styles/starwars.scss';
/*eslint-disable no-console */

class StarWarsApp extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.onAPIChange = this.onAPIChange.bind(this);
    this.state = {
      sw: {
        api_base: actiontypes.STARWARS_API_LOC || null,
        api_base_data: null,
        api_selected: null,
        api_results: null,
      }
    };
  }

  componentDidMount() {
    const mount_actions = this.props.actions;
    const sw = this.state.sw;
    mount_actions.loadStarWars(sw.api_base).then(function (obj) {
      return obj;
    }).then((response) => {
      sw.api_base_data = response.starwars;
      this.setState({
        sw
      });
    }).catch(error => {
      throw (error);
    });
  }

  onAPIChange(event) {
    const mount_actions = this.props.actions;
    const sw = this.state.sw;
    sw.api_selected = event.target.value;
    mount_actions.loadStarWars(sw.api_selected).then(function (obj) {
      return obj;
    }).then((response) => {
      sw.api_results = response.starwars;
      this.setState({
        sw
      });
    }).catch(error => {
      throw (error);
    });
  }

  starwarsRows(el) {
    return (
      <div>
        {
          el.map((item, index) => (
            <div key={index}>
              <div className="headline">{item['name']}{item['title']}</div>
            </div>
          ))
        }
      </div>
    );
  }

  render() {
    if (this.state.sw.api_base_data !== null) {
      const api_list = this.state.sw.api_base_data;
      const api_selects = Object.keys(api_list).map(function (k, i) {
        return <option key={i} value={api_list[k]}>{k}</option>;
      });
      const api_results = this.props.starwars.results;
      const api_rows = (api_results) ? this.starwarsRows(api_results) : ' ';
      return (
        <div>
          <h4>API Redux Component (Star Wars pt. 1)</h4>
          <p>A sample application showing the use of Redux when fetching external API data from a Star Wars webservice.
            This fetches and displays API information based on choices pulled from the API. Tthis component intends to illustrate the use of promises and fetch within a state-aware redux workflow.
            The associated redux files are located and namespace in actions and reducers, but also includes a src/api/starwarsAPI.js file which is called from the loadStarWars() load function.
            </p>
          <select onChange={this.onAPIChange}>
            <option value="na">Choose API endpoint</option>
            {api_selects}
          </select>
          <div>
            {this.props.starwars.count ?
              <div className="count-results">
                <strong>Number of results: </strong>
                <span>{this.props.starwars.count}</span>
              </div>
              :
              <span>&nbsp;</span>
            }
            {api_rows}
          </div>
        </div>
      );
    }
    else {
      return null;
    }

  }
}

StarWarsApp.propTypes = {
  // starwars: PropTypes.object,
  actions: PropTypes.object.isRequired
};

export function mapStateToProps(state) {
  return {
    starwars: state.starwars
  };
}

export function MapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, MapDispatchToProps)(StarWarsApp);
