import React from "react";

import PropTypes from 'prop-types';
import Moment from 'moment';

class Message extends React.Component {
  render() {
    return (
      <li className="list-group-item">
        <blockquote className="blockquote mb-0">
          { this.props.attachments['image'] 
              ? (<img className="img-fluid img-thumbnail" alt="Responsive image"
                src={`data:${this.props.attachments['image'].content_type};base64,${this.props.attachments['image'].data}`} 
              />) : null }

          { this.props.text ? <p>{ this.props.text }</p> : null }

          <footer className="blockquote-footer text-right">
            { Moment(this.props.date).fromNow() }
          </footer>
        </blockquote>
        
      </li>
    );
  }
}

Message.propTypes = {
  date: PropTypes.string.isRequired,
  text: PropTypes.string,
  attachments: PropTypes.object,
}

export default Message;
