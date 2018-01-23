import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as incrementActions from '../actions/incrementActions';

/*eslint-disable no-console */

class IncrementApp extends React.Component {

  constructor(props, store) {
    super(props, store);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      number: 0
    };
    this.props.actions.createNumber(this.state.number);
  }

  handleClick(event) {
    let e = event.target.value;
    // console.log('this.state -> ', this.state);
    if (e == '- 1') {
      this.setState({ number: --this.state.number });
    } else {
      this.setState({ number: ++this.state.number });
    }
    this.props.actions.createNumber(this.state.number); // update store
  }

  render() {
    return (
      <div>
        <h4>Increment Redux Component</h4>
        <p>This component serves as an example of Redux tracking previous and future counter markers and how these correlate in the state of the application.
        It utilizes a basic example of the Redux workflow with the tracking an integer. This component has namespace files "increment*"" for each of the workflow matching in actions, reducers to store and retrieve the state of the store.</p>
        <p>
          <input className="button" type="button" value="- 1" onClick={this.handleClick} />
          &nbsp;
        <input className="button" type="button" value="+ 1" onClick={this.handleClick} />
        </p>
        <p>Number: {this.props.number}</p>
      </div>
    );
  }
}

IncrementApp.propTypes = {
  // number: PropTypes.number.number,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    number: state.number
  };
}

function MapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(incrementActions, dispatch)
  };
}

export default connect(mapStateToProps, MapDispatchToProps)(IncrementApp);
