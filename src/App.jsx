import React, { Component } from 'react';
import './App.css';
import { streamMic } from './Mic';
import Spectrogram from './Spectrogram';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isPlaying: false, /* Is audio currently playing? (Boolean) */
      processor: null, /* Object containing processor name, callback, and menu item name */
      node: null, /* Current AudioWorkletNode (AudioWorkletNode)*/
      moduleLoaded: false, /* Has the selected AudioWorkletProcessor finished loading? (Boolean)*/
      status: null, /* Load status message (String) */
    }
    this.getStreamData = this.getStreamData.bind(this);
  }
  componentDidMount() {
    this.setProcessor('bypass-processor', streamMic);
  }
  setup() {
    try {
      navigator.getUserMedia = navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;
    } catch (e) {
      console.log("getUserMedia() is not supported in your browser");
    }
    if (!this.actx) {
      try {
        console.log('New context instantiated')
        this.actx = new (window.AudioContext || window.webkitAudioContext)();
      } catch (e) {
        console.log(`Sorry, but your browser doesn't support the Web Audio API!`, e);
      }
    }
  }
  async loadModule() {
    const { state, actx } = this;
    try {
      await actx.audioWorklet.addModule(`worklet/${state.processor.module}.js`);
      this.setState({ moduleLoaded: true, status: null })
      console.log(`loaded module ${state.processor.module}`);
    } catch (e) {
      this.setState({ moduleLoaded: false })
      console.log(`Failed to load module ${state.processor.module}`);
    }
  }
  setProcessor(name, cb) {
    if (this.state.isPlaying) return;
    this.setState({ processor: { module: name, cb }, moduleLoaded: false, status: 'Loading module, please wait...' }, () => {
      if (!this.actx) this.setup();
      this.loadModule();
    });
  }
  toggleNode() {
    this.actx.resume();
    const { state } = this;
    if (state.isPlaying) {
      console.log('stopping')
      state.audio.port.postMessage(false);
      cancelAnimationFrame(this.analyzerLoop);
      this.setState({streamData : null})
    } else {
      console.log('starting')
      const nodes = state.processor.cb(this);
      this.setState({
        audio: nodes.audio,
        analyser: nodes.analyser,
        streamData: nodes.streamData,
      }, () => this.getStreamData());
      nodes.audio.port.postMessage(true);
    }
    this.setState({ isPlaying: !state.isPlaying });
   
  }
  getStreamData() {
    const { state } = this;
    this.analyzerLoop = requestAnimationFrame(this.getStreamData);
    this.setState ({}, () => {
      state.analyser.getByteFrequencyData(state.streamData.freqData);
      state.analyser.getByteTimeDomainData(state.streamData.timeData);
    });
    // console.log(this.state)
  }
  render() {
    const { state } = this;
    const ActivateMic = (props) => {
      return (
        <div style={{color: 'black'}}>
          <button
          disabled={!state.moduleLoaded}
           onClick={() => this.toggleNode()}
           >Toggle Mic</button>
        </div>
      )
    };
    return (
      <div className="App">
        <header className="App-header">
          <ActivateMic />
          <Spectrogram streamData={this.state.streamData ? state.streamData : null} />
        </header>
      </div>
    );
  }
}

export default App;
