import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as userActions from '../actions/userActions';
import UserAppForm from './UserAppForm';
import '../styles/userapp.scss';

/*eslint-disable no-console */

class UserApp extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.onNameChange = this.onNameChange.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
    this.state = {
      user: {
        name: null,
        title: null
      }
    };
  }

  onNameChange(event) {
    const user = this.state.user;
    user.name = event.target.value;
    this.setState({
      user
    });
  }

  onTitleChange(event) {
    const user = this.state.user;
    user.title = event.target.value;
    this.setState({
      user
    });
  }

  onClickSave(event) {
    event.preventDefault();
    if ((this.state.user.name != null) && (this.state.user.title != null)) {
      this.props.actions.createUser(this.state.user);
    }
    else {
      console.log('You need both fields filled out.');
    }
  }

  userRow(user, index) {
    return <div key={index}>name: {user.name} <br /> title: {user.title}</div>;
  }

  render() {
    if (this.props.users.length) {
      // console.log('Render() for this.props.users', this.props.users);
    }
    return (
      <UserAppForm
        onNameChange={this.onNameChange}
        Name={this.props.users.name}
        onTitleChange={this.onTitleChange}
        Title={this.props.users.title}
        onClickSave={this.onClickSave}
        UserRow={this.props.users.map(this.userRow)}
      />
    );
  }
}

UserApp.propTypes = {
  users: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    users: state.users
  };
}

function MapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, MapDispatchToProps)(UserApp);
