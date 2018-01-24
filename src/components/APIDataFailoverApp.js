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

        <h4>GraphQL Client Query Multi</h4>

        <p>
          [ ] TODO: updated core requirements <br />
          [ ] TODO: updated core requirements <br />
          [ ] TODO: updated core requirements <br />
        </p>
        <br />



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
