import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createToolbarPlugin from 'draft-js-static-toolbar-plugin';
import editorStyles from '../styles/editorStyles.scss';
import { stateToHTML } from 'draft-js-export-html';

const staticToolbarPlugin = createToolbarPlugin();
const { Toolbar } = staticToolbarPlugin;
const plugins = [staticToolbarPlugin];
// @STEVE https://github.com/draft-js-plugins/draft-js-plugins/blob/master/FAQ.md#can-i-use-the-same-plugin-for-multiple-plugin-editors

class Node extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRemoveNode = this.handleRemoveNode.bind(this);
    this._handleEditorChange = this._handleEditorChange.bind(this);
    this.toggleUpdate = this.toggleUpdate.bind(this);

    this.state = {
      ...props,
      show_update_form: false,
    }

    this.fieldList().forEach((field) => {
      this.state[`editorState_${field}`] = this.createRichEditorState(field)
    })
  }

  toggleUpdate() {
    const { show_update_form } = this.state;
    this.setState({
      show_update_form: !show_update_form,
    });
  }

  handleChange(event) {
    let state = {};
    state[event.target.name] = event.target.value;
    this.setState(state);
  }

  handleSubmit(event) {
    const { onChangeHandler } = this.props;
    onChangeHandler(this.state.uuid, { ...this.state });
    event.preventDefault();
  }

  handleRemoveNode(event) {
    const { onRemoveHandler } = this.props;
    const { uuid } = this.state;
    onRemoveHandler(uuid);
  }

  _handleEditorChange(event, name) {
    this.setState({
      [`editorState_${name}`]: event,
      [name]: stateToHTML(event.getCurrentContent())
    })
  }

  fieldList() {
    // Manage a list of fields that we want to use a rich editor for.
    return ['body', 'field_history_and_background']
  }

  createToolbarPlugins() {
    const toolbarPlugin = createToolbarPlugin()
    const { Toolbar } = toolbarPlugin

    // Usage: const { Toolbar, plugins } = createToolbarPlugins()
    return { Toolbar, plugins: [toolbarPlugin] }
  }

  createRichEditorState(field) {
    const blocks = convertFromHTML(this.props[field].value)
    const state = ContentState.createFromBlockArray(
      blocks.contentBlocks,
      blocks.entityMap
    )

    return EditorState.createWithContent(state)
  }

  render() {
    const { show_update_form, nid, title, body, field_history_and_background, image } = this.state;

    return (
      <div className="row">

        {/* -------------------------------------- */}

        <input type="button" className="remove-node-btn float-right" onClick={this.handleRemoveNode} value={"Remove Node"} />
        <input type="button" className="update-node-btn float-right" onClick={this.toggleUpdate} value={"Update Node"} />

        {/* -------------------------------------- */}

        {show_update_form && (
          <div className="update-node">
            <form onSubmit={this.handleSubmit}>
              <input type={"text"} name="title" value={title} onChange={this.handleChange} />

              {this.fieldList().map((field) => {
                // Create a new instance of the toolbar and plugins for each
                // field that we have on the Node.
                const { Toolbar, plugins } = this.createToolbarPlugins()
                return (
                  <div className={editorStyles.editor} key={field}>
                    <Editor
                      placeholder="Type"
                      plugins={plugins}
                      editorState={this.state[`editorState_${field}`]}
                      onChange={(e) => this._handleEditorChange(e, field)}
                    />
                    <Toolbar editorState={this.state[`editorState_${field}`]} />
                  </div>
                )
              })}
              <input type="submit" value="update api" />
            </form>
          </div>
        )}

        {/* -------------------------------------- */}

        <hr className="separator" />

        <div className="existing-node clearfix">

          <h5>Current Node</h5>

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
            {(body.value) ? ReactHtmlParser(body.value) : ReactHtmlParser(body)}
          </div>
          <div className="history-and-background">
            <div className="label">{"History and background"}</div>
            {(field_history_and_background.value) ? ReactHtmlParser(field_history_and_background.value) : ReactHtmlParser(field_history_and_background)}
          </div>

          {image && (
            <div className="dog-picture">
              <div className="label">{"Picture"}</div>
              <img src={image} />
            </div>
          )}

        </div>

        {/* -------------------------------------- */}

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
