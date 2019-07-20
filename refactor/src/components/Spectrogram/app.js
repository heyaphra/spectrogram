class Spectrogram {
  constructor(AudioStream) {
    if (AudioStream) {
      this.AudioStream = AudioStream;
      AudioStream.getStreamData();
    }
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
}

export { Spectrogram }