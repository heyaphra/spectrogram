import React, { Component } from 'react';
import { Canvas } from '../Canvas';
import { Spectrogram as Sonogram } from './app';

class Spectrogram extends Component {
    constructor() {
        super();
    }
    shouldComponentUpdate(nextProps) {
        if (nextProps.AudioStream !== this.props.AudioStream) {
            return true;
        } else {
            return false;
        }
    }
    render() {
        console.log('new canvas', this.props)
        return (
            <Canvas
                canvasRef={el => { this.canvas = el }}
                canvasApp={new Sonogram(this.props.AudioStream)}
            />
        );
    }
}


export { Spectrogram };