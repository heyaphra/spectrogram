import React, { Component } from 'react';
import { Provider } from './context';
import { Spectrogram, FileList, GridSystem } from './components';
import { AudioStream as Streamer } from './AudioStream';
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
    this.handleStreamData = this.handleStreamData.bind(this);
  }
  onUploadSuccess(file) {
    this.setState({
      files: this.state.files.concat({ ...file, index: this.state.files.length }),
      selectedFile: this.state.selectedFile ? this.state.selectedFile : file
    }, () => {
      if (this.state.AudioStream && this.state.isPlaying) {
        this.AudioStream.stop(this.state.selectedFile.el);
        this.setState({ isPlaying: false });
      } else {
        const AudioStream = new Streamer();
        this.setState({ AudioStream }, () => {
          this.state.AudioStream.fromElement(file.el);
        })
      }
    });
  }
  handlePlayback() {
    const { AudioStream } = this.state;
    const { isPlaying, selectedFile } = this.state;
    this.setState({ isPlaying: !this.state.isPlaying }, () => {
      if (isPlaying) {
        cancelAnimationFrame(this.analyserLoop);
        AudioStream.stop(selectedFile.el);
      } else {
        this.handleStreamData();
        AudioStream.play(selectedFile.el)
      }
    });
  }
  handleStreamData() {
    this.setState({ streamData: this.state.AudioStream.getStreamData() });
    this.analyserLoop = requestAnimationFrame(this.handleStreamData);
  }
  handleSelect(file) {
    if (this.state.selectedFile && this.state.selectedFile.name !== file.name) {
      this.state.AudioStream.stop(this.state.selectedFile.el);
      file.el.removeEventListener('pause', () => cancelAnimationFrame(this.analyserLoop))
    }
    this.setState({ selectedFile: file, isPlaying: false });
    file.el.addEventListener('pause', () => cancelAnimationFrame(this.analyserLoop))
  }
  render() {
    return (
      <Grid cols={8} rows={2}>
        <GridItem style={{ height: '50vh' }}>
          <Spectrogram streamData={this.state.streamData} isPlaying={this.state.isPlaying} />
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

