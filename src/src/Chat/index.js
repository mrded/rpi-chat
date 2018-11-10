import React from "react";
import io from "socket.io-client";

import Message from './Message';
import Input from './Input';

import PouchDB from 'pouchdb-browser';

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    };

    this.socket = io();
    this.db = new PouchDB('http://localhost:5984/rpi-chat');

    this.socket.on('RECEIVE_MESSAGE', (data) => this.addMessage(data));
  }

  async componentDidMount() {
    const messages = this.state.messages.slice(0);

    const result = await this.db.allDocs({
      include_docs: true,
      attachments: true
    });

    for (let row of result.rows) {
      messages.push(row.doc);
    }

    this.setState({ messages });
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

        <Input socket={ this.socket } db={ this.db } />
      </div>
    );
  }
}

export default Chat;
