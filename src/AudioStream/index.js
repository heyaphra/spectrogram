/* AUDIOSTREAM
*  API for audio playback and analysis.
*/

class AudioStream {
    constructor() {
        this.files = [];
        this.play = this.play.bind(this);
        this.getStreamData = this.getStreamData.bind(this)
    }
    checkContext() {
        if (!this.actx) {
            try {
                console.log('New context instantiated')
                this.actx = new (window.AudioContext || window.webkitAudioContext)();
            } catch (e) {
                console.log(`Sorry, but your browser doesn't support the Web Audio API!`, e);
            }
        }
    }
    fromFile(file) {
        this.checkContext();
        const { actx } = this;
        try {
            this.analyser = actx.createAnalyser();
            this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
            this.source = actx.createMediaElementSource(file.el);
            const { analyser, source, dataArray } = this;
            analyser.fftSize = 16384;
            analyser.minDecibels = -120;
            analyser.maxDecibels = -15;
            analyser.connect(actx.destination);
            source.connect(this.analyser);
            this.files.push({ file, analyser, source, dataArray })
        } catch (e) {
            console.log('Failed to make stream: ', e);
        }
    }
    play(index) {
        this.files[index].file.el.play();
        this.getStreamData(index);
    }
    getStreamData(index) {
        this.files[index].analyser.getByteFrequencyData(this.files[index].dataArray)
        return this.files[index].dataArray
    }
    stop(index) {
        this.files[index].file.el.pause();
        this.files[index].file.el.currentTime = 0;
    }
}

export { AudioStream }