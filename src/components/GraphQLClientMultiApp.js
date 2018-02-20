import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import '../styles/graphqlclientdrupal.scss'
import * as actions from '../actions/graphqlMulti'

import Hero from './Hero'
import CreateHeroForm from './CreateHeroForm'

/*eslint-disable no-console */

class GraphQLClientMulti extends React.Component {

  constructor(props, store) {
    super(props, store);
  }

  componentDidMount() {
    this.props.actions.fetchGraphql()
    this.props.actions.lookahead()
  }

  handleClick(event) {
    this.props.actions.updateGrpahql('1009220', 'Captain was America');
  }

  handleSubmit(hero) {
    this.props.actions.createGraphql(hero);
  }

  render() {
    const { data, message, lookahead } = this.props
    let messages = ''

    const Heroes = data.map(hero => {
      return (
        <Hero
          key={hero.id}
          name={hero.name}
          description={hero.description}
          image={hero.image}
          comics={hero.comics}
          villains={hero.villains}
        />
      )
    })

    if (!!message) {
      messages = (<div className="messages"><div className="message-inner">{message}</div></div>)
    }

    return (

      <div className="holder">

        <h4>Using GraphQL to query a data from both a Headless Drupal source and external non-Drupal API.</h4>

        <p>
          <b>Story:</b> As a developer, I would like to understand the usefullness of utilizing a GraphQL server combine data from multiple API endpoints. I would like to understand how to setup the proper types and schema defintions to display this data. Using the GraphQL server we can demonstrate accessing information from different systems and exposing the data through a single interface for attached clients (this React application).
        </p>

        <div className="docs-refs clearfix">
          <div className="query-display">
            <span>Query sent to GraphQL server</span>
            {actions.fetchAll.loc.source.body}
          </div>
          <div className="query-display">
            <span>Mutation sent to GraphQL server</span>
            {actions.create.loc.source.body}
          </div>
          <img style={{ maxHeight: '420px' }} className="architecture-img" src={require('../img/graphql-multi-backend.svg?1')} />
        </div>

        <div className="comic-form-wrapper">
          <h4>Proxying data with GraphQL</h4>
          <p>The below form shows how to send a mutation to the GraphQL server. Mutations are a pattern defined by GraphQL to allow data updates to be sent and handled by the GraphQL server. This example showcases using data from one of the other attached systems and replicating the data in Drupal.</p>
          <CreateHeroForm
            handleSubmit={this.handleSubmit.bind(this)}
            lookahead={lookahead}
          />
        </div>

        <br />
        <hr />

        <h4>List of Marvel Characters</h4>

        <div className="herolisting-wrapper">
          {Heroes}
          {messages}
        </div>

      </div>

    );
  }
}

export function mapStateToProps(state) {
  const { graphqlMultiReducer: { data, message, lookahead } } = state
  return { data, message, lookahead };
}

export function MapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, MapDispatchToProps)(GraphQLClientMulti);
