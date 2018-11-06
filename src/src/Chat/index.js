import React from "react";
import io from "socket.io-client";

import Message from './Message';
import Input from './Input';

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    };

    this.socket = io();

    this.socket.on('RECEIVE_MESSAGE', (data) => this.addMessage(data));
  }

  addMessage(data) {
    this.setState({
      messages: [...this.state.messages, data]
    });
  };

  render() {
    return (
      <div>
        { this.state.messages.map((message, id) => {
          return (
            <Message
              key={ id }
              date={ message.date }
              message={ message.message }
            />
          )
        }) }

        <Input socket={ this.socket } />
      </div>
    );
  }
}

export default Chat;
