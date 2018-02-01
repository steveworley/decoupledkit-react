import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Comic extends Component {
  render() {
    const { title, description, image } = this.props;
    return (
      <div className="comic">
        <div className="row">
          <div className="label">{"Title"}</div>
          {title}
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

export default Comic;
