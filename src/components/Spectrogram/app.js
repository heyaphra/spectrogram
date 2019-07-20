import React, { Component } from 'react';

class Spectrogram extends Component {
  constructor() {
    super();
    console.log(this)
  }
  init(ctx, canvas, width, height) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.width = width;
    this.height = height;
    this.paintBg();
  }
  setSize(width, height) {
    this.ctx.clearRect(0, 0, width, height);
    this.height = height;
    this.width = width;
    this.paintBg();

  }
  paintBg() {
    const { ctx } = this;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, this.canvas.width, 2000)
    ctx.fill();
  }
  render() {
    return <span style={{ display: 'none' }}></span>
  }
}

export { Spectrogram }