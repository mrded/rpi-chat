import React from "react";

import PropTypes from 'prop-types';

import { MessageBox } from 'react-chat-elements';

class Message extends React.Component {
  render() {
    return (
      <MessageBox
        position={ 'left' }
        type={ 'text' }
        date={ new Date(this.props.date) }
        text={ this.props.message }
      />
    );
  }
}

Message.propTypes = {
  date: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}

export default Message;
