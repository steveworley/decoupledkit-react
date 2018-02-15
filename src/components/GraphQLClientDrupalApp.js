import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import '../styles/graphqlclientdrupal.scss';
import * as actions from '../actions/graphqlclientActions';
import '../styles/pokemon.scss';
import Pokemon from './Pokemon'

/*eslint-disable no-console */

class GraphqlClientDrupal extends Component {

  constructor(props) {
    super(props);
    this.handleClickStats = this.handleClickStats.bind(this);
    this.state = {
      compare_a: [],
      compare_b: [],
    };
  }

  componentDidMount() {
    this.props.actions.fetchData();
  }

  handleClickStats(event) {
    event.preventDefault();
    const { data } = this.props;
    const nid = event.target.getAttribute("data-nid");
    const group_option = event.target.getAttribute("data-option-group");
    let selectedPokemon = data.filter((data) => {
      return data.nid == nid;
    })

    console.log('event.classList', event);

    return (group_option == 'a') ? this.setState({ compare_a: selectedPokemon }) : this.setState({ compare_b: selectedPokemon });
  }

  render() {

    const { data } = this.props;
    const Pokemons = data.map((pokemon, i) => {
      return (
        <Pokemon key={i}
          id={pokemon.id}
          nid={pokemon.nid}
          pokemon_id={pokemon.pokemon_id}
          title={pokemon.title}
          back_shiny_sprite={pokemon.back_shiny_sprite}
          front_shiny_sprite={pokemon.front_shiny_sprite}
          height_pokemon={pokemon.height_pokemon}
          weight_pokemon={pokemon.weight_pokemon}
          hp={pokemon.hp}
          attack={pokemon.attack}
          defense={pokemon.defense}
          special_attack={pokemon.special_attack}
          special_defense={pokemon.special_defense}
          speed={pokemon.speed}
          abilities={pokemon.abilities}
          ref_types={pokemon.ref_types}
        />
      )
    });

    const pokemongroup_a = data.map((pokemon, i) => {
      const currentclass = ((this.state.compare_a[0] !== undefined) && (this.state.compare_a[0].nid == pokemon.nid)) ? 'active' : 'non';
      return (
        <img key={i} href="#" className={currentclass} onClick={this.handleClickStats} data-option-group="a" data-nid={pokemon.nid} src={pokemon.front_shiny_sprite} />
      )
    });

    const pokemongroup_b = data.map((pokemon, i) => {
      const currentclass = ((this.state.compare_b[0] !== undefined) && (this.state.compare_b[0].nid == pokemon.nid)) ? 'active' : 'non';
      return (
        <img key={i} href="#" className={currentclass} onClick={this.handleClickStats} data-option-group="b" data-nid={pokemon.nid} src={pokemon.front_shiny_sprite} />
      )
    });

    const displaystats = (el) => {
      let stats = el.map((pokemon, i) => {
        return (
          <div className="stats-items" data-nid={pokemon.nid} key={i}>
            <div className="title">{pokemon.title}</div>
            <div><span>HP</span> <span>{pokemon.hp}</span></div>
            <div><span>Attack</span> <span>{pokemon.attack}</span></div>
            <div><span>Defense</span> <span>{pokemon.defense}</span></div>
            <div><span>Special Attack</span> <span>{pokemon.special_attack}</span></div>
            <div><span>Special Defense</span> <span>{pokemon.special_defense}</span></div>
            <div><span>Speed</span> <span>{pokemon.speed}</span></div>
          </div>
        )
      });
      return stats;
    }

    const valueResults = (a, b, el) => {
      const option_a = a[0][el], option_b = b[0][el];
      if (option_a != option_b) {
        return (option_a > option_b) ? 'left' : 'right';
      } else {
        return 'middle';
      }
    }

    const comparingstats = (a, b) => {
      if ((a && b) === undefined) return;
      let obj = {
        hp: valueResults(a, b, 'hp'),
        attack: valueResults(a, b, 'attack'),
        defense: valueResults(a, b, 'defense'),
        special_attack: valueResults(a, b, 'special_attack'),
        special_defense: valueResults(a, b, 'special_defense'),
        speed: valueResults(a, b, 'speed'),
      }
      return obj;
    }

    const displayComparison = (el) => {
      if (el === undefined) return;
      let liftArray = [el];
      let stats = liftArray.map((el, i) => {
        return (
          <div className="comparing-results-row" data-nid={el.nid} key={i}>
            <div>&nbsp;</div>
            <div className={el.hp}>&nbsp;</div>
            <div className={el.attack}>&nbsp;</div>
            <div className={el.defense}>&nbsp;</div>
            <div className={el.special_attack}>&nbsp;</div>
            <div className={el.special_defense}>&nbsp;</div>
            <div className={el.speed}>&nbsp;</div>
          </div>
        )
      });
      return stats;
    }

    const compare_stats = (state) => {

      if (!state.compare_a.length || !state.compare_b.length) return;

      const a = state.compare_a;
      const b = state.compare_b;
      const displaystats_a = displaystats(a);
      const displaystats_b = displaystats(b);
      const compareResults = comparingstats(state.compare_a, state.compare_b);
      const compareRow = displayComparison(compareResults);

      if (displayComparison === undefined) return;

      if (a.length && b.length) {
        return (
          <div className="results-wrapper">
            <div className="leftside-group-a">
              {displaystats_a}
            </div>
            <div className="middleside-group">
              {compareRow}
            </div>
            <div className="leftside-group-b">
              {displaystats_b}
            </div>
          </div>
        )
      }
    };

    console.log('this.state ==>', this.state);
    console.log('this.props ==>', this.props);

    const displayStatsEl = compare_stats(this.state);

    return (

      <div className="holder">

        <h4>Using GraphQL with a Drupal JSON API</h4>

        <p>
          <b>Story:</b> As a developer, I would like to understand the usefulness of utilizing a GraphQL server when retrieving data from a Drupal JSON API source.
          I would like to understand how to set up the proper types and schema definitions to display this data. Using this GraphQL server,
          illustrates the benefits of consolidating multiple API data points within the type definitions and/or schemas.
          Using this React application, show how to retrieve the designated queries from the GraphQL server.
        </p>


        {/* - - - - - - - - - - - - - - - - - - - - - - - - */}

        <div className="compare-pokemon clearfix">
          <div className="inside">
            <div className="option-rows option-a">
              <div className="label">Group A</div>
              {pokemongroup_a}
            </div>
            <div className="option-rows option-b">
              <div className="label">Group B</div>
              {pokemongroup_b}
            </div>
            <div className="comparing-stats-row clearfix">
              {displayStatsEl}
            </div>
          </div>
        </div>


        {/* - - - - - - - - - - - - - - - - - - - - - - - - */}



        {/* - - - - - - - - - - - - - - - - - - - - - - - - */}

        <h5>Retrieving information from GraphQL</h5>

        <p>
          The following component illustrates the retrieval of data from the GraphQL endpoint which can be
           tested at <a target="_blank" href="http://localhost:8082/graphiql">http://localhost:8082/graphiql</a>.
           The schemas have been constructed within the GraphQL server to accommodate queries in order to retrieve information which can be
            cached and stored to minimize roundtrips to the Drupal API endpoint(s).
          </p>

        <div className="docs-refs clearfix">
          <div className="query-display">
            <span>Query sent to GraphQL server</span>
            {actions.query.loc.source.body}
          </div>
          <img className="architecture-img" src={require('../img/graphql-single-chart.png?1')} />
        </div>

        {Pokemons}


      </div>
    );
  }
}

export function mapStateToProps(state) {
  const { graphqlSingle: { data } } = state
  return { data }
}

export function MapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, MapDispatchToProps)(GraphqlClientDrupal);
