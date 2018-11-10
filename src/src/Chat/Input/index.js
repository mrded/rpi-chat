import React from "react";
import ReactDOM from 'react-dom';

import PropTypes from 'prop-types';

class Input extends React.Component {
  submitMessage(e) {
    e.preventDefault();

    const data = {
      date: new Date(),
      message: ReactDOM.findDOMNode(this.refs.msg).value
    };

    this.props.db.post(data);
    this.props.socket.emit('SEND_MESSAGE', data);

    ReactDOM.findDOMNode(this.refs.msg).value = "";
  }

  render() {
    const style = {
      position: 'absolute',
      bottom: 0
    };

    return (
      <div className="container" style={ style }>
        <form className="input-group" onSubmit={ e => this.submitMessage(e) }>
          <input type="text" className="form-control" placeholder="Message" ref="msg"/>

          <div className="input-group-append">
            <input type="submit" className="btn btn-outline-secondary" value="Send"/>
          </div>
        </form> 
      </div>
    );
  }
}

Input.propTypes = {
  socket: PropTypes.shape({
    emit: PropTypes.func.isRequired,
  }).isRequired,
}

export default Input;
