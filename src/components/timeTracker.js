import React from 'react';
import PropTypes from 'prop-types';

function FormattedDate(props) {
  // console.log(props.date);
  return <span>{props.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>;
}

class TimeTracker extends React.Component { // https://reactjs.org/docs/components-and-props.html#functional-and-class-components
  constructor(props) { // https://reactjs.org/docs/react-component.html#constructor
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() { // https://reactjs.org/docs/react-component.html#componentdidmount
    //console.log('* * componentDidMount * * * * ');
    this.timerID = setInterval(
      () => this.tick(), // called locally within class with 'this.'
      9000
    );
  }

  componentWillUnmount() { // https://reactjs.org/docs/react-component.html#componentwillunmount
    //console.log('* * componentWillUnmount * * * * ');
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({ // https://reactjs.org/docs/react-component.html#setstate
      date: new Date()
    });
  }

  render() {
    return (
      <div className="datetime text-right bold">
        <FormattedDate date={this.state.date} />
      </div>
    );
  }
}

TimeTracker.propTypes = {
  date: PropTypes.string
};

export default TimeTracker;
