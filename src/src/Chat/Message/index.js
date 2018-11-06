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

export default Message;
