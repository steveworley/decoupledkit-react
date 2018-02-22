import React, { Component } from 'react'
import { connect } from 'react-redux'

export class ChatBotPage extends Component {
  render() {
    return (
      <div className="boxy float-left clearfix">
        <h4>Chatbot integrations</h4>
        <p><strong>Story:</strong> As a developer I want to expose Drupal content to a ChatBot so that the content team can easily manage content.</p>
        <div style={{textAlign: "center"}}>
          <iframe
            width="80%"
            height="430"
            border="0"
            style={{border: "1px solid #ccc", boxShadow: "0px 0px 15px rgba(0,0,0,.3)"}}
            src="https://console.dialogflow.com/api-client/demo/embedded/4aff1f9e-5dd4-4f55-89a5-603117b2159a"></iframe>
          </div>
      </div>
    )
  }
}

export default connect()(ChatBotPage)