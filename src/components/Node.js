import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';


class Node extends Component {
  constructor(props) {
    super(props);
    this.state = {...props};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRemoveNode = this.handleRemoveNode.bind(this);
  }

  handleChange(event) {
    let state = {};
    state[event.target.name] = event.target.value;
    this.setState(state);
  }

  handleSubmit(event) {
    const { onChangeHandler } = this.props;
    const { target: { attributes } } = event;
    onChangeHandler(this.props, attributes.forelement.value, this.state[attributes.forelement.value]);
  }

  handleRemoveNode(event) {
    const { onRemoveHandler } = this.props;
    const { uuid } = this.state;
    onRemoveHandler(uuid);
  }

  render() {
    const { nid, title, body, field_history_and_background, image } = this.state;
    return (
      <div className="row">
        <div className="nid">
          <div className="label">{"NID"}</div>
          {nid}
        </div>
        <div className="title">
          <div className="label">{"Title"}</div>
          <input type={"text"} name="title" value={title} onChange={this.handleChange}/>
          <input type="submit" className="btn" forelement="title" onClick={this.handleSubmit} value={"Update"} />
        </div>
        <div className="body">
          <div className="label">{"Body"}</div>
          {ReactHtmlParser(body.value)}
        </div>
        <div className="history-and-background">
          <div className="label">{"History and background"}</div>
          {!!field_history_and_background ? ReactHtmlParser(field_history_and_background.value) : ''}
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
