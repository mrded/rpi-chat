import React from "react";
import ReactDOM from 'react-dom';

import PropTypes from 'prop-types';

class Input extends React.Component {
  submitMessage(e) {
    e.preventDefault();

    this.props.db.post({
      date: new Date(),
      text: ReactDOM.findDOMNode(this.refs.msg).value
    });

    ReactDOM.findDOMNode(this.refs.msg).value = "";
  }

  render() {
    return (
      <form className="input-group" onSubmit={ e => this.submitMessage(e) }>
        <input type="text" className="form-control" placeholder="Message" ref="msg"/>

        <div className="input-group-append">
          <input type="submit" className="btn btn-outline-secondary" value="Send"/>
        </div>
      </form> 
    );
  }
}

Input.propTypes = {
  db: PropTypes.shape({
    post: PropTypes.func.isRequired,
  }).isRequired,
}

export default Input;
