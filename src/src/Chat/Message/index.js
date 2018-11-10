import React from "react";

import PropTypes from 'prop-types';

class Message extends React.Component {
  render() {
    return (
      <div className="card bg-light mb-3">
        <div className="card-body">
          { this.props.text }
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
