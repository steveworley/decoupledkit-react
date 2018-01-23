import React from 'react';
import { connect } from 'react-redux';
import * as StarWarsApp from './StarWarsApp';

class StarWarsExternalApp extends React.Component {
  constructor(props, store) {
    super(props, store);
  }

  starwarsKeys(el) {
    return (
      <div>
        {
          el.map((item, index) => (
            <div key={index}>
              <div className="headline">{item['name']}{item['title']}</div>
              <div className="stringfied"><pre>{JSON.stringify(item, null, 3)}</pre></div>
            </div>
          ))
        }
      </div>
    );
  }

  render() {
    const api_results = this.props.starwars.results;
    const api_rows = (api_results) ? this.starwarsKeys(api_results) : ' ';
    return (
      <div className="sw-component">
        <h4>API Redux Component Shared Data (Star Wars pt. 2)</h4>
        <p>Application showing the Redux store data being updated from the Star Wars (pt 1) component and reacting on change.
          The purpose of this component is to illustrate the accessing of stored state data from a sibling component.
          It uses the data pulled from the redux functions which are then passed to super(props, store), and manipulates in an alternative way as a pure render component.
          </p>
        <div className="external-starwars-data">
          {api_rows}
        </div>
      </div>
    );
  }
}

export default connect(StarWarsApp.mapStateToProps)(StarWarsExternalApp);
