import React from "react";

import PropTypes from 'prop-types';
import Moment from 'moment';

class Message extends React.Component {
  render() {
    return (
      <li className="list-group-item">
        <small className="text-muted">
          { Moment(this.props.date).fromNow() }
        </small>

        <p>{ this.props.text }</p>
      </li>
    );
  }
}

Message.propTypes = {
  date: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}

export default Message;
