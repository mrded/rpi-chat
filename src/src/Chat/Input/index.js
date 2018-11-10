import React from "react";
import ReactDOM from 'react-dom';

import PropTypes from 'prop-types';

class Input extends React.Component {
  submitMessage(e) {
    e.preventDefault();

    this.props.socket.emit('SEND_MESSAGE', {
      date: new Date(),
      message: ReactDOM.findDOMNode(this.refs.msg).value
    });

    ReactDOM.findDOMNode(this.refs.msg).value = "";
  }

  render() {
    return (
      <form className="input" onSubmit={ e => this.submitMessage(e) }>
        <input type="text" ref="msg" />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

Input.propTypes = {
  socket: PropTypes.shape({
    emit: PropTypes.func.isRequired,
  }).isRequired,
}

export default Input;
