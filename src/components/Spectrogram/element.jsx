import React, { Component } from 'react';
import { Canvas } from '../Canvas';
class Spectrogram extends Component {
    constructor() {
        super();
    }
    init(ctx, canvas, width, height) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.slice = this.ctx.getImageData(0, 0, 1, this.canvas.height);
        this.draw()
    }
    setSize(width, height) {
        console.log('resizing', width, height)
        this.canvas.width = width;
        this.canvas.height = height;
        cancelAnimationFrame(this.animationLoop);
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.slice = this.ctx.getImageData(0, 0, 1, this.canvas.height);
        this.draw();
    }
    draw(x = 0, y = 0) {
        const { slice, ctx, canvas: { width, height }, props: { streamData, isPlaying, mic } } = this;
        this.animationLoop = requestAnimationFrame(() => {
            if (x > width) x = 0;
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
        isPlaying || mic ? x++ : x = 0;
        ctx.putImageData(slice, x, y);
    }
    scaleImageData(imageData, scale) {
        let scaled = this.ctx.createImageData(imageData.width * scale, imageData.height * scale);
        for (let row = 0; row < imageData.height; row++) {
            for (let col = 0; col < imageData.width; col++) {
                let sourcePixel = [
                    imageData.data[(row * imageData.width + col) * 4 + 0],
                    imageData.data[(row * imageData.width + col) * 4 + 1],
                    imageData.data[(row * imageData.width + col) * 4 + 2],
                    imageData.data[(row * imageData.width + col) * 4 + 3]
                ];
                for (let y = 0; y < scale; y++) {
                    let destRow = row * scale + y;
                    for (let x = 0; x < scale; x++) {
                        let destCol = col * scale + x;
                        for (let i = 0; i < 4; i++) {
                            scaled.data[(destRow * scaled.width + destCol) * 4 + i] =
                                sourcePixel[i];
                        }
                    }
                }
            }
        }
        return scaled;
    }
    render() {
        return (
            <Canvas style={{ transform: 'rotate(180deg) scaleX(-1)', ...this.props.style }} canvasRef={el => { this.canvas = el }} canvasApp={this} isPlaying={this.props.isPlaying} />
        )
    }
}




export { Spectrogram };