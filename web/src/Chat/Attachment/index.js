import React from "react";
import ReactDOM from 'react-dom';

import PropTypes from 'prop-types';

const getBase64 = (file) => {
  const reader = new window.FileReader();

  return new Promise((resolve, reject) => {
    reader.onload = (x) => { resolve(x.target.result.split(',')[1]) };
    reader.onerror = () => { reject(new Error('Error')) };
    reader.onabort = () => { reject(new Error('Aborted')) };

    reader.readAsDataURL(file);
  });
}

class Attachment extends React.Component {
  async onChange(e) {
    const file = e.target.files[0];

    const doc = {
      date: new Date(),
      _attachments: {
        'image': {
          content_type: file.type,
          data: await getBase64(file)
        } 
      }
    };

    this.props.db.post(doc);
  }

  render() {
    return (
      <div className="custom-file" >
        <input className="custom-file-input" 
          id="attachment"
          type="file" 
          onChange={ this.onChange.bind(this) }
        />

        <label className="custom-file-label" 
          htmlFor="attachment" 
          accept="image/*"
          capture
          multiple={ false }
        >
          Choose image
        </label>
      </div>
    );
  }
}

Attachment.propTypes = {
  db: PropTypes.shape({
    post: PropTypes.func.isRequired,
  }).isRequired,
}

export default Attachment;
