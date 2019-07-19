
import React, { Component } from 'react';
import { Button, Tooltip } from 'antd';

class Uploader extends Component {
  constructor() {
    super();
    this.state = {
      loading: false
    }
    this.reader = new FileReader();
  }
  handleUpload = () => {
    const { state, reader } = this;
    this.setState({ loading: true });
    const preview = new Audio();
    const file = this.el.files[0];
    if (file) {
      reader.readAsDataURL(file);
    } else {
      preview.src = "";
    }
    reader.onloadend = () => {
      this.props.onUploadSuccess({ name: file.name, src: reader.result });
      this.setState({ loading: false });
    }
  }
  render() {
    const { props, state } = this;
    return (
      <React.Fragment>
        <Tooltip title='upload audio' size='small'>
          <Button
            size='small'
            shape='circle'
            icon='upload'
            loading={state.loading}
            onClick={() => this.el.click()}
          />
        </Tooltip>
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