import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Villain extends Component {
  render() {
    const { name, description, image } = this.props;
    return (
      <div className="villain">
        <div className="row">
          <div className="label">{"Name"}</div>
          {name}
        </div>
        <div className="row">
          <div className="label">{"Description"}</div>
          {description}
        </div>
        <div className="row">
          <div className="label">{"Image"}</div>
          {image}
        </div>
      </div>
    )
  }
}

export default Villain;
