import React, { Component } from 'react';

export default class Spectrogram extends Component {
    constructor() {
        super();
        this.draw = this.draw.bind(this);
    }
    componentDidMount() {
        const { props } = this;
        this.canvas = this.refs.canvas;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.canvas.width, 2000)
        
        this.draw();
    }
    draw(x = 0, y = 0) {
        const { ctx, canvas, props } = this;
        const { streamData } = props;
        const PHI = (1 + Math.sqrt(5)) / 2;
        requestAnimationFrame(() => {
            if (x > canvas.width) x = 0;
            x += 1;
            this.draw(x, y);
        });
        const slice = ctx.getImageData(0, 0, 1, canvas.height);
        let sliceData = slice.data;
        for (let i = 0; i < sliceData.length; i += 4) {
            if (props.streamData) {
                // Main
                sliceData[i] = 1.25 * streamData.freqData[i] 
                sliceData[i + 1] = 1.25 * streamData.freqData[i + 1] 
                sliceData[i + 2] = 1.25 * streamData.freqData[i + 2]
                
            } else {
                // Standby
                sliceData[i] = 0;
                sliceData[i + 1] = 0;
                sliceData[i + 2] = 0;
            }
        }
        ctx.rotate((Math.PI * PHI) * .5);
        ctx.putImageData(slice, x, y);
    }
    render() {
        return (
            <div>
                <canvas
                    ref='canvas'
                    width={window.innerWidth}
                    height={480}
                    style={{
                        transform: 'rotate(180deg) scaleX(-1)'
                    }}></canvas>
            </div>
        )
    }
}