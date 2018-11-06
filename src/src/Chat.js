import React from "react";
import io from "socket.io-client";

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
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
      author: this.state.username,
      message: this.state.message
    })

    this.setState({ message: '' });
  }

  render(){
    return (
      <div>
        {this.state.messages.map((message, id) => {
          return (
            <div key={ id }>{ message.author }: { message.message }</div>
          )
        })}

        <div>
          <input type="text" placeholder="Username" 
            value={this.state.username} 
            onChange={ev => this.setState({ username: ev.target.value })} 
          />

          <br/>

          <input type="text" placeholder="Message" 
            value={ this.state.message } 
            onChange={ev => this.setState({ message: ev.target.value })}
          />

          <br/>

          <button onClick={ this.sendMessage.bind(this) }>Send</button>
        </div>
      </div>
    );
  }
}

export default Chat;
