import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Villain from './Villain';
import Comic from './Comic';

class Hero extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { name, image, description, comics, villains } = this.props;

    const Comics = comics.map(comic => {
      return (
        <Comic
          title={comic.title}
          image={comic.image}
          description={comic.description}
        />
      )
    })

    const Villains = villains.map(villain => {
      return (
        <Villain
          name={villain.name}
          image={villain.image}
          description={villain.description}
        />
      )
    })

    return (
      <div className="hero">
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
          <img src={image} />
        </div>
        <div className="comics">
          {Comics}
        </div>
        <div className="villains">
          {Villains}
        </div>
      </div>
    )
  }

}


export default Hero;
