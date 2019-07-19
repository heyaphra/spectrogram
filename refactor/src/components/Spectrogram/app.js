class Spectrogram {
  constructor() {}
  init() {
    console.log('Hello world!')
  }
  setSize(width, height) {
    this.width = width;
    this.height = height;
    this.paint();
  }
  paint() {
    console.log(`Painting with dimensions ${this.width} x ${this.height}`)
  }
}

export { Spectrogram }