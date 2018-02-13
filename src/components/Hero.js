import React, { Component } from 'react'
import PropTypes from 'prop-types'

import '../styles/hero.scss'

import Villain from './Villain';
import Comic from './Comic';

class Hero extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { name, image, description, comics } = this.props;

    const Comics = comics.map(comic => {
      return (
        <Comic
          key={comic.id}
          title={comic.title}
          image={comic.image}
          description={comic.description}
        />
      )
    })

    // const Villains = villains.map(villain => {
    //   return (
    //     <Villain
    //       key={villain.id}
    //       name={villain.title}
    //       image={villain.image}
    //       description={villain.description}
    //     />
    //   )
    // })

    return (
      <div className="hero">
        <h2>{name}<span className="api-source api-source-drupal">Drupal API</span></h2>
        <div className="col">
          <div className="row">
            <div className="label">{"Image"}</div>
            <div className="image"><img src={image} /></div>
          </div>
        </div>
        <div className="col">
          <div className="row">
            <div className="label">{"Name"}</div>
            <p>{name}</p>
          </div>
          <div className="row">
            <div className="label">{"Description"}</div>
            <p>{description}</p>
          </div>
          {/* @STEVE: hiding for now until we decide how to blend these */}
          {/*
          <div className="villains">
            <div className="label">{"Villains"}</div>
            {Villains}
          </div>
          */}
          <div className="comics">
            <div className="label"><span className="api-source api-source-marvel">Marvel API</span>{"Appearances"}</div>
            {Comics}
          </div>
        </div>
      </div>
    )
  }

}


export default Hero;
