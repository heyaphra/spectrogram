/* APP
*  The main page.
*/
import React, { Component } from 'react';
import { Icon, Tooltip } from 'antd';
import { MdEmail } from 'react-icons/md'
import { Spectrogram, FileList, GridSystem } from './components';
import { AudioStream } from './AudioStream';
const { Grid, GridItem } = GridSystem;
let data = [
  {
    name: 'Animation study',
    author: {
      name: 'Orsolya Kaufmann',
      social: ''
    },
    source: 'https://www.youtube.com/watch?v=Hxx6Gqf1Q4w&feature=youtu.be',
    path: `${process.env.PUBLIC_URL}/data/animations.mp3`,
  },
  {
    name: 'Alien transmission',
    author: {
      name: 'Spectral Transmissions',
      social: ''
    },
    source: 'https://youtu.be/FnzIpAAzP3w',
    path: `${process.env.PUBLIC_URL}/data/hidden_transmission.mp3`,
  },
  {
    name: 'rhodes_motif.wav',
    author: {
      name: 'natalie',
      social: ''
    },
    source: 'https://youtu.be/FnzIpAAzP3w',
    path: `${process.env.PUBLIC_URL}/data/rhodes_motif.wav`,
  },
  {
    name: 'rediscovery.wav',
    author: {
      name: 'natalie',
      social: ''
    },
    source: 'https://youtu.be/FnzIpAAzP3w',
    path: `${process.env.PUBLIC_URL}/data/rediscovery.wav`,
  },

];
class App extends Component {
  constructor() {
    super();
    this.state = {
      mic: false,
      files: [],
      isPlaying: false,
    }
    this.AudioStream = new AudioStream();
    this.play = this.play.bind(this);
    this.stop = this.stop.bind(this);
    this.onUploadSuccess = this.onUploadSuccess.bind(this);
    this.handlePlayback = this.handlePlayback.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleStreamData = this.handleStreamData.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.handleCapture = this.handleCapture.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
  }
  componentDidMount() {
    this.loadSamples();
  }
  handleDownload() {
    let canvas = document.getElementsByTagName('canvas')[0];
    let link = document.createElement('a');
    link.download = `spectrogram-${Date.now()}.png`;
    link.href = canvas.toDataURL()
    link.click();
  }
  loadSamples() {
    let files = data.map((file, i) => {
      let audio = new Audio();
      audio.src = file.path;
      file.el = audio;
      file.index = i;
      this.AudioStream.fromFile(file);
      return file;
    });
    this.setState({ files, selectedFile: files[0] });
  }
  onUploadSuccess(file) {
    let incoming = { ...file, index: this.state.files.length };
    let files = this.state.files.concat({ ...incoming });
    let selectedFile = this.state.selectedFile ? this.state.selectedFile : incoming;
    this.setState({ files, selectedFile }, () => {
      this.AudioStream.fromFile(file);
      this.handleSelect(incoming);
    });
  }
  handleSelect(file) {
    if (this.state.isPlaying) this.stop();
    this.setState({ selectedFile: file, isPlaying: false });
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
  handleCapture() {
    this.setState({ mic: !this.state.mic }, () => {
      if (!this.state.mic) {
        cancelAnimationFrame(this.analyserLoop)
        this.AudioStream.stopMic();
      } else {
        this.AudioStream.fromMic();
        this.handleStreamData('mic');
      }
    });
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
  handleStreamData(index) {
    const { AudioStream, handleStreamData } = this;
    this.setState({ streamData: AudioStream.getStreamData(index) });
    this.analyserLoop = requestAnimationFrame(() => handleStreamData(index));
  }
  render() {
    return (
      <Grid cols={8} rows={3}>
        <GridItem style={{ width: '95vw', margin: '0 auto', marginTop: '6vh', padding: '1% 1%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '10vw', margin: '0 auto' }}>
            <Tooltip placement='bottom' title='instagram'>
              <Icon type='instagram' onClick={() => window.open('https://instagram.com/bloom.510')} />
            </Tooltip>
          </div>
          <div style={{ textAlign: 'center', marginTop: '1%' }}>
            <p> Hello, world! I'm Aphra, and this is a spectrogram. </p>
            <p>You can observe spectral content from audio files or your microphone.</p>
            <p>If you think its really pretty, you have the option to download the canvas. </p>
            <p>Ready? Scroll down!</p>
          </div>
        </GridItem>
        <GridItem style={{ backgroundColor: 'black', position: 'relative' }}>
          <Spectrogram style={{ position: 'absolute', bottom: 0 }} streamData={this.state.streamData} isPlaying={this.state.isPlaying} mic={this.state.mic} />
        </GridItem>
        <GridItem>
          <FileList
            handleDownload={this.handleDownload}
            mic={this.state.mic}
            selectedFile={this.state.selectedFile}
            onUploadSuccess={this.onUploadSuccess}
            handlePlayback={this.handlePlayback}
            handleSelect={this.handleSelect}
            handleCapture={this.handleCapture}
            isPlaying={this.state.isPlaying}
            dataSource={this.state.files}
          />
        </GridItem>

      </Grid>
    );
  }
}

export default App;

