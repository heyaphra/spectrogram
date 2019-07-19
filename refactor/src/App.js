import React, { Component } from 'react';
import { Spectrogram, FileList, GridSystem } from './components';
const { Grid, GridItem } = GridSystem;
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
    return (
      <Grid cols={8} rows={2} style={{ width: '100vw', height: '100vh' }}>
        <GridItem>
          <Spectrogram style={{ height: '100%' }} />
        </GridItem>
        <GridItem>
          <FileList
            style={{ height: '100%' }}
            selectedFile={this.state.selectedFile}
            onUploadSuccess={this.onUploadSuccess}
            handlePlayback={this.handlePlayback}
            handleSelect={this.handleSelect}
            isPlaying={this.state.playing}
            selected={this.state.selected}
            dataSource={this.state.files}
          />
        </GridItem>
      </Grid>
      // <div style={{ padding: '1% 2%', backgroundColor: '#f5f5f5', height: '100vh' }}>
      //   <Spectrogram style={SpectrogramStyles} />
      //   <div style={{ backgroundColor: 'white', width: '95vw', margin: '0 auto' }}>
      // <FileList
      //   selectedFile={this.state.selectedFile}
      //   onUploadSuccess={this.onUploadSuccess}
      //   handlePlayback={this.handlePlayback}
      //   handleSelect={this.handleSelect}
      //   isPlaying={this.state.playing}
      //   selected={this.state.selected}
      //   dataSource={this.state.files}
      // />
      //   </div>
      // </div>
    );
  }
}

export default App;

