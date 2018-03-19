import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as actions from '../actions/drupalLogin'

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = { username: '', password: '' }
    this.handleSubmit.bind(this)
    this.handleChange.bind(this)
  }

  handleSubmit(el) {
    this.props.actions.doLogin(this.state)
  }

  handleChange(name) {
    return (el) => {
      this.setState({name: el.value})
    }
  }

  render() {
    const { username, password } = this.state
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.handleChange('username')} value={username} />
          <input type="password"onChange={this.handleChange('password')} value={password} />
          <input type="submit" />
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { user } = state
  return { user }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)