class Spectrogram {
  init(ctx, canvas, width, height) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.width = width;
    this.height = height;
    this.paint();
  }
  setSize(width, height) {
    this.ctx.clearRect(0, 0, width, height);
    this.height = height;
    this.width = width;
    this.paint()
  }
  paint() {
    const { ctx } = this;
    ctx.beginPath();
    ctx.arc(this.width / 2, this.height / 2, 50, 0, 2 * Math.PI);
    ctx.stroke();
  }
}

export { Spectrogram }