import React from 'react';
import { Canvas } from '../Canvas';
import { Spectrogram as Sonogram } from './app';

const Spectrogram = (props) => (
    <Canvas
        {...props}
        canvasRef={el => { this.canvas = el }}
        canvasApp={new Sonogram()}
    />
);

export { Spectrogram };