import React, { Component } from 'react';
import { Spectrogram, Uploader, Downloader, PlaybackCtrl, FileList } from './components';
import { Layout, List, Typography, Avatar, Button } from 'antd';
const { Header, Content, Footer } = Layout;
const SpectrogramStyles = {
  width: '95vw',
  height: '50vh',
  border: '1px solid #ccc',
  margin: '0 auto'
};
class App extends Component {
  constructor() {
    super();
    this.state = {
      files: [],
      playing: false
    }
    this.onUploadSuccess = this.onUploadSuccess.bind(this);
    this.handlePlayback = this.handlePlayback.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }
  onUploadSuccess(file) {
    this.setState({ files: this.state.files.concat(file) }, () => console.log(this.state.files));
  }
  handlePlayback() {
    this.setState({ playing: !this.state.playing });
  }
  handleSelect(file) {
    this.setState({ selectedFile: file.name }, () => console.log(this.state));
  }
  render() {
    // TODO; GRID LAYOUT FOR CONTENT, FLEX LAYOUT FOR DISTRIBUTING BUTTONS
    return (
      <div style={{ padding: '1% 2%', backgroundColor: '#f5f5f5', height: '100vh' }}>
        <Spectrogram style={SpectrogramStyles} />
        <div style={{ backgroundColor: 'white', width: '95vw', margin: '0 auto' }}>
          <FileList
            selectedFile={this.state.selectedFile}
            onUploadSuccess={this.onUploadSuccess}
            handlePlayback={this.handlePlayback}
            handleSelect={this.handleSelect}
            isPlaying={this.state.playing}
            selected={this.state.selected}
            dataSource={this.state.files}
          />
        </div>
      </div>
    );
  }
}

export default App;

