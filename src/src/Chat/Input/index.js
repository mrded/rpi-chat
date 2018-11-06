import React from "react";

import PropTypes from 'prop-types';

import { Input as ChatInput, Button } from 'react-chat-elements';

class Input extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
    };
  }

  sendMessage(ev) {
    ev.preventDefault();

    this.props.socket.emit('SEND_MESSAGE', {
      date: new Date(),
      message: this.state.message
    })

    this.setState({ message: '' });
  }

  render() {
    return (
      <ChatInput
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
    )
  }
}

Input.propTypes = {
  socket: PropTypes.shape({
    emit: PropTypes.func.isRequired,
  }).isRequired,
}

export default Input;
