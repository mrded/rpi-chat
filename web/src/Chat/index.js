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

    const couch_host = process.env.REACT_APP_COUCH_HOST || 'http://localhost:5984';

    this.db = new PouchDB(couch_host + '/rpi-chat');

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
        <ul className="list-group list-group-flush">
          { this.state.messages.map(message => {
            return (
              <Message
                key={ message._id }
                date={ message.date }
                text={ message.text }
              />
            )
          }) }
        </ul>

        <div className="card-footer text-muted">
          <Input db={ this.db } />
        </div>
      </div>
    );
  }
}

export default Chat;
