import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Villain extends Component {
  constructor(props) {
    super(props)
    this.state = { showinfo: false }
  }
  showInfo(e) {
    e.preventDefault();
    this.setState({showinfo: !this.state.showinfo })
  }
  render() {
    const { name, description, image } = this.props
    const classes = this.state.showinfo ? 'show' : 'hide'

    return (
      <div className="villain">
        <h4><a href="#" onClick={this.showInfo.bind(this)}>{name}</a></h4>
        <div className={classes}>
          <div className="row">
            <p><strong>{"Name"}</strong></p>
            {name}
          </div>
          <div className="row">
            <p><strong>{"Description"}</strong></p>
            {description}
          </div>
          <div className="row">
            <p><strong>{"Image"}</strong></p>
            <p style={{textAlign: "center"}}><img src={image} /></p>
          </div>
        </div>
      </div>
    )
  }
}

export default Villain;
