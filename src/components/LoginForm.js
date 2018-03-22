import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ReactHtmlParser from 'react-html-parser'
import PropTypes from 'prop-types'

import * as actions from '../actions/drupalLogin'

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = { username: '', password: '', scope: {} }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
  }

  handleSubmit(event) {
    this.props.actions.doLogin(this.state)
    event.preventDefault()
  }

  handleChange(name) {
    return (event) => {
      this.setState({[name]: event.target.value})
    }
  }

  handleToggle(name) {
    return () => {
      const scope = {...this.state.scope}
      scope[name] = scope[name] ? false : true
      this.setState({scope})
    }
  }

  render() {
    const { username, password, scope } = this.state
    const { tokenDebug, token, content } = this.props

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Username</label>
          <input type="text" name="username" onChange={this.handleChange('username')} value={username} />
          <label>Password</label>
          <input type="password" name="password" onChange={this.handleChange('password')} value={password} />
          <p>Scope</p>
          <p><small>OAuth scope is implemented using Drupal roles - the decoupled kit Drupal site has these roles created for demo purposes. The Simple OAuth module will not assign roles to users who have not been set up with them; for example if you sign in with <code>premium</code> and choose the administrator role your access token will not be assigned the administrator role as this user is not an administrator</small></p>
          <label>Premium <input type="checkbox" value={scope.premium} onChange={this.handleToggle('premium')} /></label>
          <label>Administrator <input type="checkbox" value={scope.administrator} onChange={this.handleToggle('administrator')} /></label>
          <input type="submit" value="Login" />
        </form>

        { 
          Object.keys(tokenDebug).length === 0 ? '' : (
            <div className="code-block">
              <p><strong>Drupal Roles</strong></p>
              <pre>{JSON.stringify(tokenDebug.roles, null, 2)}</pre>
            </div>
          ) 
        }


        { content && content.map((data) => (
          <div className="content">
            <h3>{ data.attributes.title }</h3>
            <div>{ ReactHtmlParser(data.attributes.body.value) }</div>
          </div>
        ) ) }

      </div>
    )
  }
}

function mapStateToProps(state) {
  const { userAccessReducer: { token, tokenDebug, content } } = state
  return { token, tokenDebug, content }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)