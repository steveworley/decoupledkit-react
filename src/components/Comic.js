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
    const containerClass = this.state.showinfo ? 'comic active' : 'comic'
    return (
      <div className={containerClass}>
        <p><a href="#" onClick={this.onClick.bind(this)}>{title}</a></p>
        <div className={classes}>
          <div className="col">
            <p><strong>{"Image"}</strong></p>
            <p style={{textAlign:"center"}}><img src={image} /></p>
          </div>
          <div class="col">
            <p><strong>{"Title"}</strong> <span className="api-source api-source-marvel">Marvel API</span></p>
            {title}
            <p><strong>{"Description"}</strong></p>
            {description}
          </div>
        </div>
      </div>
    )
  }
}

export default Comic;
