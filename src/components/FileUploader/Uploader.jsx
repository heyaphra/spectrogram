
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
    const { props, reader } = this;
    this.setState({ loading: true });
    const el = new Audio();
    const file = this.el.files[0];
    if (file) {
      reader.readAsDataURL(file);
    } else {
      el.src = "";
    }
    reader.onloadend = () => {
      el.src = reader.result;
      props.onUploadSuccess({ name: file.name, el });
      this.setState({ loading: false });
    }
  }
  render() {
    const { state } = this;
    return (
      <React.Fragment>
        <Tooltip title='upload audio'>
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