import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import '../styles/apidatafailover.scss';
import * as actions from '../actions/drupalAPIActions'

import Node from './Node'

/*eslint-disable no-console */

class APIDataFailoverApp extends Component {

  constructor(props, store) {
    super(props, store);

    this.onLocalStorageClick = this.onLocalStorageClick.bind(this)
    this.onIndexedDbClick = this.onIndexedDbClick.bind(this)
    this.onCacheClick = this.onCacheClick.bind(this)

    this.state = {
      canCache: ('caches' in window),
      canLocalStorage: ('localStorage' in window),
      canIndexedDb: ('indexedDB' in window)
    }
  }

  onCacheClick(event) {
    this.props.actions.loadSingleCache()
  }

  onIndexedDbClick(event) {
    this.props.actions.loadSingleIndexedDB()
  }

  onLocalStorageClick(event) {
    this.props.actions.loadSingleLocalStorage()
  }

  render() {
    const { canCache, canIndexedDb, canLocalStorage } = this.state
    const { caches, localStorage, indexedDb } = this.props
    let Caches, LocalStorage, IndexedDb = ''

    if (caches) {
      Caches = (<Node onChangeHandler={() => {}} {...caches.attributes} />)
    }

    if (localStorage) {
      // Unsure why Object spread wasn't working for this object.
      LocalStorage = (<Node onChangeHandler={() => {}}
        nid={localStorage.attributes.nid}
        title={localStorage.attributes.title}
        body={localStorage.attributes.body}
        field_history_and_background={localStorage.attributes.field_history_and_background}
        image=''
      />)
    }

    if (indexedDb) {
      IndexedDb = (<Node onChangeHandler={() => {}} {...indexedDb.attributes} />)
    }

    return (

      <div className="holder">

        <h4>Methods of API Failover</h4>

        <p>
          <b>Story:</b> As a developer, I want to understand common tools and techniques for scenarios in which my application depends on an API(s) which is unavailable.
        </p>

        <ul>
          <li>Setup a common data schema as a single content types in Drupal using the Headless Lightning distro located at https://github.com/acquia-pso/javascript-ps-starter-headlessdrupal</li>
          <li>Using a custom .env variable or toggling a react props boolean, emulate an API being unreachable or hitting common scenarios with rate limits.</li>
          <li>Exhibit a method to store the last reachable version of an API with in-memory storage</li>
          <li>Exhibit a method to store the last reachable version of an API using a MongoDB storage point</li>
          <li>Exhibit methods to handle common error codes when dealing with APIs (200, rate limits, etc) </li>
        </ul>


        <div className="buttons">
          {canCache ? (<input type="button" onClick={this.onCacheClick} value={"Load from cache"} />) : <span>Cache API is unavailable use a newer browser.</span>}
          {canIndexedDb ? (<input type="button" onClick={this.onIndexedDbClick} value={"Load from IndexedDB"} />) : <span>IndexedDB API is unavailable use a newer browser.</span>}
          {canLocalStorage ? (<input type="button" onClick={this.onLocalStorageClick} value={"Load from LocalStorage"} />) : <span>LocalStorage API is unavailable use a newer browser.</span>}
        </div>

        <div className={"node-rows"}>

          {Caches ? (<div><h3>Loaded with Cache API</h3>{Caches}</div>) : '' }
          {LocalStorage ? (<div><h3>Loaded with LocalStorage API</h3>{LocalStorage}</div>) : '' }
          {IndexedDb ? (<div><h3>Loaded with IndexedDb API</h3>{IndexedDb}</div>) : '' }

        </div>

      </div>

    );
  }
}

export function mapStateToProps(state) {
  const { drupalLoadReducer: { caches, localStorage, indexedDb } } = state || { drupalLoadReducer: { caches: {}, localStorage: {}, indexedDb: {}} }
  return {caches, localStorage, indexedDb}
}

export function MapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, MapDispatchToProps)(APIDataFailoverApp);
