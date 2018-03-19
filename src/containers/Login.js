import React, { Component } from 'react'
import { connect } from 'react-redux'

import LoginForm from '../components/LoginForm'

export class Login extends Component {
  render() {
    return (
      <div>
        <LoginForm />
      </div>
    )
  }
}

export default connect()(Login)