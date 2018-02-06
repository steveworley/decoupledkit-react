import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Comic extends Component {
  constructor(props) {
    super(props)
    this.state = { showinfo: false }
  }
  onClick(e) {
    e.preventDefault()
    this.setState({showinfo: !this.state.showinfo})
  }
  render() {
    const { title, description, image } = this.props
    const classes = this.state.showinfo ? 'row show' : 'row hide'
    return (
      <div className="comic">
        <p><a href="#" onClick={this.onClick.bind(this)}>{title}</a></p>
        <div className={classes}>
          <div className="row">
            <p><strong>{"Title"}</strong></p>
            {title}
          </div>
          <div className="row">
            <p><strong>{"Description"}</strong></p>
            {description}
          </div>
          <div className="row">
            <p><strong>{"Image"}</strong></p>
            <p style={{textAlign:"center"}}><img src={image} /></p>
          </div>
        </div>
      </div>
    )
  }
}

export default Comic;
