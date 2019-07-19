
import React, { Component } from 'react';
import { Button } from 'antd';

class Uploader extends Component {
  constructor() {
    super();
    this.reader = new FileReader();
  }
  handleUpload = () => {
    const { state, reader } = this;
    const preview = new Audio();
    const file = this.el.files[0];
    if (file) {
      reader.readAsDataURL(file);
    } else {
      preview.src = "";
    }
    reader.onloadend = () => {
      this.props.onUploadSuccess({ name: file.name, src: reader.result });
    }
  }
  render() {
    const { props } = this;
    return (
      <React.Fragment>
        <Button
          size='small'
          shape='circle'
          icon='upload'
          onClick={() => this.el.click()}
        />
        <input
          accept='audio/*'
          ref={el => this.el = el} type="file" style={{ display: 'none' }}
          onChange={() => this.handleUpload()}
        />
      </React.Fragment>
    )
  }
}

export { Uploader }