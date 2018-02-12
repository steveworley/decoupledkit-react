import React, { Component } from 'react'
import ReactHtmlParser from 'react-html-parser'
// import PropTypes from 'prop-types'

import '../styles/pokemon.scss';

class Pokemon extends Component {
  constructor(props) {
    super(props)
    //this.state = { showinfo: false }
  }
  showInfo(e) {
    e.preventDefault();
    // this.setState({showinfo: !this.state.showinfo })
  }


  taxonomies(title, el) {
    return (
      <div>
        {title}
        {
          el.map((item, index) => (
            <div className="rows-terms" key={index}>
              {item['name'] ? <div className="name">Name: {item['name']}</div> : null}
              {item['description'] ? <div className="description">Description: {ReactHtmlParser(item['description'])}</div> : null}
            </div>
          ))
        }
      </div>
    );
  }


  render() {

    const {
      id,
      nid,
      pokemon_id,
      title,
      back_shiny_sprite,
      front_shiny_sprite,
      height_pokemon,
      weight_pokemon,
      hp,
      attack,
      defense,
      special_attack,
      special_defense,
      speed,
      abilities,
      ref_types
    } = this.props

    const abilities_data = this.taxonomies('Abilities', abilities);
    const types_data = this.taxonomies('Types', ref_types);

    //const classes = this.state.showinfo ? 'show' : 'hide'
    // const nemesisList = (nemesis) ? nemesis.join(", ") : '';

    console.log('this.props ===>', this.props);

    return (
      <div className="pokemon clearfix">
        <span className="api-source-drupal">Drupal API</span>
        <h4><a href="#" onClick={this.showInfo.bind(this)} >{title} </a></h4>
        <div className="pokemon-container clearfix"> {/* className={classes} */}

          <div className="row row-img">
            <div className="label">Images</div>
            <img src={back_shiny_sprite} />
            <img src={front_shiny_sprite} />
          </div>


          <div className="row">
            <div className="label">Title</div>
            {title}
          </div>


          <div className="row">
            <div className="label">Pokemon ID</div>
            {pokemon_id}
          </div>

          <div className="row">
            <div className="label">Height</div>
            {height_pokemon}
          </div>

          <div className="row">
            <div className="label">Weight</div>
            {weight_pokemon}
          </div>

          <div className="row">
            {hp} <br />
            {attack}  <br />
            {defense}  <br />
            {special_attack}  <br />
            {special_defense}  <br />
            {speed}  <br />

            {abilities_data}

            {types_data}

          </div>


          {/* {ReactHtmlParser(description)} */}


          {/* {nemesisList && (
            <div className="row">
              <div className="label">Nemesis</div>
              <p> {nemesisList} </p>
            </div>
          )} */}
        </div>
      </div>
    )
  }
}

export default Pokemon;
