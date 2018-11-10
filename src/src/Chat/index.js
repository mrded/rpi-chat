import React from "react";

import Message from './Message';
import Input from './Input';

import PouchDB from 'pouchdb-browser';

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    };

    this.db = new PouchDB('http://localhost:5984/rpi-chat');

    this.db.changes({ since: 'now', live: true, include_docs: true })
      .on('change', change => this.addMessage(change.doc))
  }

  async componentDidMount() {
    const result = await this.db.allDocs({
      include_docs: true,
      attachments: true
    });

    result.rows.map(row => this.addMessage(row.doc));
  }

  addMessage(data) {
    this.setState({
      messages: [...this.state.messages, data]
    });
  };

  render() {
    return (
      <div className="card">
        <div className="card-body">
          { this.state.messages.map(message => {
            return (
              <Message
                key={ message._id }
                date={ message.date }
                text={ message.text }
              />
            )
          }) }
        </div>

        <div className="card-footer text-muted">
          <Input db={ this.db } />
        </div>
      </div>
    );
  }
}

export default Chat;
