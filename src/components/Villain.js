import React, { Component } from 'react'
import ReactHtmlParser from 'react-html-parser'
// import PropTypes from 'prop-types'

import '../styles/villain.scss'

class Villain extends Component {
  constructor(props) {
    super(props)
    //this.state = { showinfo: false }
  }
  showInfo(e) {
    e.preventDefault();
    // this.setState({showinfo: !this.state.showinfo })
  }
  render() {

    const { name, description, image, nemesis } = this.props
    //const classes = this.state.showinfo ? 'show' : 'hide'
    const nemesisList = (nemesis) ? nemesis.join(", ") : '';

    return (
      <div className="villain clearfix">
        <span className="api-source-drupal">Drupal API</span>
        <h4><a href="#" onClick={this.showInfo.bind(this)} >{name} </a></h4>
        <div className="villain-container clearfix"> {/* className={classes} */}
          <div className="row row-img">
            <div className="label">Image</div>
            <p style={{ textAlign: "center" }}> <img src={image} /></p>
          </div>
          <div className="row">
            <div className="label">Name</div>
            {name}
          </div>
          <div className="row">
            <div className="label">Description</div>
            {ReactHtmlParser(description)}
          </div>
          {nemesisList && (
            <div className="row">
              <div className="label">Nemesis</div>
              <p> {nemesisList} </p>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default Villain;
