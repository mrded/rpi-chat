import React from "react";

import PropTypes from 'prop-types';
import Moment from 'moment';

class Message extends React.Component {
  render() {
    return (
      <div className="card bg-light mb-3">
        <div className="card-body">
          <small className="text-muted">
            { Moment(this.props.date).fromNow() }
          </small>

          <p>{ this.props.text }</p>
        </div>
      </div>
    );
  }
}

Message.propTypes = {
  date: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}

export default Message;
