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
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
        this.draw();
    }
    draw(x = 0) {
        const { ctx, canvas, props } = this;
        requestAnimationFrame(() => {
            if (x > canvas.width) x = 0;
            x += 1;
            this.draw(x);
        });
        const slice = ctx.getImageData(0, 0, 1, canvas.height);
        let sliceData = slice.data;
        for (let i = 0; i < sliceData.length; i += 4) {
            if(props.data){
                sliceData[i] =  props.data[i];   
                sliceData[i + 1] = props.data[i + 1]; 
                sliceData[i + 2] = props.data[i + 2]; 
            } else {
                sliceData[i] = 0;
                sliceData[i + 1] = 0;
                sliceData[i + 2] = 0;
            }
        }
        ctx.putImageData(slice, x, 0);
    }
    render() {
        return (
            <div>
                <canvas 
                ref='canvas' 
                width={window.innerWidth} 
                height='500' 
                style={{ border: '1px solid', marginTop: '2%', transform: 'rotate(180deg) scaleX(-1)'}}></canvas>
            </div>
        )
    }
}