import React, { Component } from 'react';
import { Spectrogram, FileList, GridSystem } from './components';
import { AudioStream as Streamer } from './AudioStream';
const AudioStream = new Streamer();
const { Grid, GridItem } = GridSystem;
class App extends Component {
  constructor() {
    super();
    this.state = {
      files: [],
      isPlaying: false
    }
    this.onUploadSuccess = this.onUploadSuccess.bind(this);
    this.handlePlayback = this.handlePlayback.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }
  onUploadSuccess(file) {
    this.setState({ 
      files: this.state.files.concat({ ...file, index: this.state.files.length }) 
    }, () => AudioStream.fromElement(file.el));
  }
  handlePlayback() {
    const { isPlaying } = this.state;
    this.setState({ isPlaying: !this.state.isPlaying }, () => {
      if(isPlaying) {
        AudioStream.stop(this.state.selectedFile.el);
      } else {
        AudioStream.play(this.state.selectedFile.el);        
      }
    });
  }
  handleSelect(file) {
    this.setState({ selectedFile: file });
  }
  render() {
    return (
      <Grid cols={8} rows={2} style={{ width: '100vw', height: '100vh' }}>
        <GridItem>
          <Spectrogram
            // exportImage={this.exportImage}
            style={{ height: '100%' }}
          />
        </GridItem>
        <GridItem>
          <FileList
            style={{ height: '100%' }}
            selectedFile={this.state.selectedFile}
            onUploadSuccess={this.onUploadSuccess}
            handlePlayback={this.handlePlayback}
            handleSelect={this.handleSelect}
            isPlaying={this.state.isPlaying}
            dataSource={this.state.files}
          />
        </GridItem>
      </Grid>
    );
  }
}

export default App;

