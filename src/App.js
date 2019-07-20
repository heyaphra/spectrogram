/* APP
*  The main page.
*/
import React, { Component } from 'react';
import { Spectrogram, FileList, GridSystem } from './components';
import { AudioStream } from './AudioStream';
const { Grid, GridItem } = GridSystem;
class App extends Component {
  constructor() {
    super();
    this.state = {
      files: [],
      isPlaying: false
    }
    this.AudioStream = new AudioStream();
    this.play = this.play.bind(this);
    this.stop = this.stop.bind(this);
    this.onUploadSuccess = this.onUploadSuccess.bind(this);
    this.handlePlayback = this.handlePlayback.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleStreamData = this.handleStreamData.bind(this);
  }
  onUploadSuccess(file) {
    let incoming = { ...file, index: this.state.files.length };
    let files = this.state.files.concat({ ...incoming });
    let selectedFile = this.state.selectedFile ? this.state.selectedFile : incoming;
    this.setState({ files, selectedFile  }, () => this.AudioStream.fromFile(file));
  }
  play() {
    const { AudioStream, handleStreamData, state: { selectedFile } } = this;
    handleStreamData(selectedFile.index);
    AudioStream.play(selectedFile.index)
  }
  stop() {
    const { AudioStream, state: { selectedFile }, analyserLoop } = this;
    cancelAnimationFrame(analyserLoop);
    AudioStream.stop(selectedFile.index);
    this.setState({ streamData: [] })
  }
  handlePlayback() {
    const { play, stop, state: { isPlaying } } = this;
    this.setState({ isPlaying: !isPlaying }, () => {
      if (isPlaying) {
        stop();
      } else {
        play();
      }
    });
  }
  handleStreamData(index) {
    const { AudioStream, handleStreamData } = this;
    this.setState({ streamData: AudioStream.getStreamData(index) });
    this.analyserLoop = requestAnimationFrame(() => handleStreamData(index));
  }
  handleSelect(file) {
    this.setState({ selectedFile: file });
  }
  render() {
    return (
      <Grid cols={8} rows={2}>
        <GridItem style={{ height: '50vh' }}>
          <Spectrogram streamData={this.state.streamData} isPlaying={this.state.isPlaying} />
        </GridItem>
        <GridItem style={{ height: '50vh' }}>
          <FileList
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

