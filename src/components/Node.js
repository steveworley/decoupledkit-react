import React from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';

const Node = ({ nid, title, body, field_history_and_background, image}) => (
  <div className="row">
    <div className="nid">
      <div className="label">{"NID"}</div>
      {nid}
    </div>
    <div className="title">
      <div className="label">{"Title"}</div>
      {title}
    </div>
    <div className="body">
      <div className="body">{"Body"}</div>
      {ReactHtmlParser(body.value)}
    </div>
    <div className="history-and-background">
      <div className="label">{"History and background"}</div>
      {ReactHtmlParser(field_history_and_background.value)}
    </div>
    <div className="dog-picture">
      <div className="label">{"Picture"}</div>
      <img src={image} />
    </div>
  </div>
)

Node.propTypes = {
  nid: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.shape({
    value: PropTypes.string.isRequired
  }),
  field_history_and_background: PropTypes.shape({
    value: PropTypes.string.isRequired
  }),
  image: PropTypes.string
}

export default Node;
