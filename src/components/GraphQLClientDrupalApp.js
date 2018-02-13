import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import '../styles/graphqlclientdrupal.scss';
import * as actions from '../actions/graphqlclientActions';
import '../styles/pokemon.scss';

// Should have called this module character :( haha...  :)
import Pokemon from './Pokemon'

/*eslint-disable no-console */

class GraphqlClientDrupal extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.actions.fetchData();
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
    })

    console.log('actions', );

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

        <h5>Retrieving information from GraphQL</h5>

        <p>
          The following component illustrates the retrieval of data from the GraphQL endpoint which can be tested at
          <a target="_blank" href="http://localhost:8082/graphiql">http://localhost:8082/graphiql</a>.
           The schemas have been constructed within the GraphQL server to accommodate queries in order to retrieve information which can be cached and stored to minimize roundtrips to the Drupal API endpoint(s).
          </p>

        <div className="docs-refs clearfix">
          <div className="query-display">
            <span>Query sent to GraphQL server</span>
            {actions.query.loc.source.body}
          </div>
          <img className="architecture-img" src={require('../img/graphql-single-chart.png?1')} />
        </div>

        {Pokemons}

        {/* - - - - - - - - - - - - - - - - - - - - - - - - */}

        {/* TODO: add different query for data comparision */}


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
