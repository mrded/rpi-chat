import React from "react";
import io from "socket.io-client";

import 'react-chat-elements/dist/main.css';
import { MessageBox, Input, Button } from 'react-chat-elements';

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      messages: []
    };

    this.socket = io('localhost:5000');

    this.socket.on('RECEIVE_MESSAGE', (data) => this.addMessage(data));
  }

  addMessage(data) {
    this.setState({
      messages: [...this.state.messages, data]
    });
  };

  sendMessage(ev) {
    ev.preventDefault();

    this.socket.emit('SEND_MESSAGE', {
      date: new Date(),
      message: this.state.message
    })

    this.setState({ message: '' });
  }

  render(){
    return (
      <div>
        {this.state.messages.map((message, id) => {
          console.log(message);

          return (
            <MessageBox
              key={ id }
              position={ 'left' }
              type={ 'text' }
              date={ new Date(message.date) }
              text={ message.message }
            />
          )
        })}

        <Input
          placeholder="Type here..."
          value={ this.state.message } 
          onChange={ev => this.setState({ message: ev.target.value })}
          multiline={ true }
          rightButtons={
            <Button
              color='white'
              backgroundColor='black'
              text='Send'
              onClick={ this.sendMessage.bind(this) }
            />
          }/>
      </div>
    );
  }
}

export default Chat;
