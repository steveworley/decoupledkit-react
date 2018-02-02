import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
// import RichTextEditor from 'react-rte';
import { Editor, EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js';

class Node extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRemoveNode = this.handleRemoveNode.bind(this);
    this._handleEditorChange = this._handleEditorChange.bind(this);

    console.log('props', props);

    const blocksHistory = convertFromHTML(props.field_history_and_background.value);
    const stateHistory = ContentState.createFromBlockArray(
      blocksHistory.contentBlocks,
      blocksHistory.entityMap
    );

    const blocksBody = convertFromHTML(props.body.value);
    const stateBody = ContentState.createFromBlockArray(
      blocksBody.contentBlocks,
      blocksBody.entityMap
    );

    this.state = {
      ...props,
      editorState_body: EditorState.createWithContent(stateBody),
      editorState_history: EditorState.createWithContent(stateHistory)
    };


  }

  // state = {

  // }

  handleChange(event) {
    let state = {};
    state[event.target.name] = event.target.value;
    this.setState(state);
    // console.log('state ==>', state);
  }

  handleSubmit(event) {
    const { onChangeHandler } = this.props;
    console.log('this.state ---==>', this.state);
    onChangeHandler(this.state.uuid, { ...this.state });
    event.preventDefault();
  }

  handleRemoveNode(event) {
    const { onRemoveHandler } = this.props;
    const { uuid } = this.state;
    onRemoveHandler(uuid);
  }

  _handleEditorChange(event, name) {
    let convertMarkup = convertToRaw(event.getCurrentContent()),
      matchHtmlString = '';
    for (const el of convertMarkup.blocks) {
      if (el.type == 'unstyled') {
        matchHtmlString += `<p>${el.text}<p>`
      }
      else {
        matchHtmlString += el.text;
      }
    }

    // Set states
    if (name == 'body') { this.setState({ editorState_body: event }); }
    if (name == 'field_history_and_background') { this.setState({ editorState_history: event }); }
    this.setState({ [name]: matchHtmlString });

  }


  render() {
    const { nid, title, body, field_history_and_background, image } = this.state;

    console.log('this.state ==>', this.state);

    return (
      <div className="row">

        {/* update div */}
        <div className="update-node">
          {/* { console.log(body.value) } */}
          <form onSubmit={this.handleSubmit}>
            <input type={"text"} name="title" value={title} onChange={this.handleChange} />
            {/* <textarea name="body" onChange={this.handleChange} value={body.value} /> */}
            <Editor placeholder="Type" editorState={this.state.editorState_body}
              onChange={(e) => this._handleEditorChange(e, 'body')}
            />
            {/* <textarea name="field_history_and_background" onChange={this.handleChange} defaultValue={field_history_and_background.value} /> */}
            <Editor placeholder="Type" editorState={this.state.editorState_history}
              onChange={(e) => this._handleEditorChange(e, 'field_history_and_background')}
            />
            <input type="submit" value="update" />
          </form>
          <hr />
        </div>

        <div className="nid">
          <div className="label">{"NID"}</div>
          {nid}
        </div>

        <div className="title">
          <div className="label">{"Title"}</div>
          {title}
        </div>
        <div className="body">
          <div className="label">{"Body"}</div>
          {ReactHtmlParser(body.value)}
        </div>
        <div className="history-and-background">
          <div className="label">{"History and background"}</div>
          {!field_history_and_background ? ReactHtmlParser(field_history_and_background.value) : ''}
        </div>
        <div className="dog-picture">
          <div className="label">{"Picture"}</div>
          <img src={image} />
        </div>


        <div className="remove">
          <input type="button" onClick={this.handleRemoveNode} value={"Remove"} />
        </div>
      </div>
    )
  }
}

Node.propTypes = {
  onChangeHandler: PropTypes.func.isRequired,
  nid: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.shape({
    value: PropTypes.string.isRequired
  }),
  image: PropTypes.string
}

export default Node;
