import React, { Component } from 'react';
import { Canvas } from '../Canvas';
// import { Spectrogram as Sonogram } from './app';



class Spectrogram extends Component {
    constructor() {
        super();
    }
    shouldComponentUpdate(nextProps) {
        if (nextProps.streamData) {
            return true;
        } else {
            return false;
        }
    }
    init(ctx, canvas, width, height) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.slice = this.ctx.getImageData(0, 0, 1, this.canvas.height);
        this.draw();
    }
    setSize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
        cancelAnimationFrame(this.animationLoop);
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);      
        this.slice = this.ctx.getImageData(0, 0, 1, this.canvas.height);
        this.draw(this.x, this.y);
    }
    scaleImageData(imageData, scale) {
        var scaled = this.ctx.createImageData(imageData.width * scale, imageData.height * scale);
        for (var row = 0; row < imageData.height; row++) {
            for (var col = 0; col < imageData.width; col++) {
                var sourcePixel = [
                    imageData.data[(row * imageData.width + col) * 4 + 0],
                    imageData.data[(row * imageData.width + col) * 4 + 1],
                    imageData.data[(row * imageData.width + col) * 4 + 2],
                    imageData.data[(row * imageData.width + col) * 4 + 3]
                ];
                for (var y = 0; y < scale; y++) {
                    var destRow = row * scale + y;
                    for (var x = 0; x < scale; x++) {
                        var destCol = col * scale + x;
                        for (var i = 0; i < 4; i++) {
                            scaled.data[(destRow * scaled.width + destCol) * 4 + i] =
                                sourcePixel[i];
                        }
                    }
                }
            }
        }

        return scaled;
    }
    draw(x = 0, y = 0) {
        const { ctx, props, canvas, slice } = this;
        const { width, height } = canvas;
        const { streamData } = props;
        this.animationLoop = requestAnimationFrame(() => {
            if (x > width) x = 0;
            this.x = x;
            this.y = y;
            x = x + 1;
            this.draw(x, y);
        });
        let sliceData = slice.data;
        for (let i = 0; i < sliceData.length; i += 4) {
            if (streamData) {
                // Main
                sliceData[i] = streamData[i]
                sliceData[i + 1] = streamData[i + 1]
                sliceData[i + 2] = streamData[i + 2]

            } else {
                // Standby
                sliceData[i] = 0;
                sliceData[i + 1] = 0;
                sliceData[i + 2] = 0;
            }
        }
        ctx.putImageData(this.scaleImageData(slice, 2), x, y, 0, 0, canvas.width, canvas.height);
    }
    render() {
        return (
            <Canvas style={{ transform: 'rotate(180deg) scaleX(-1)' }} canvasRef={el => { this.canvas = el }} canvasApp={this} />
        )
    }
}




export { Spectrogram };