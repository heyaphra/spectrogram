class AudioStream {
    constructor() {
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
    fromElement(el) {
        this.checkContext();
        const { actx } = this;
        try {
            this.analyser = actx.createAnalyser();
            this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
            this.source = actx.createMediaElementSource(el);

            const { analyser, source } = this;
            analyser.fftSize = 16384;
            analyser.minDecibels = -120;
            analyser.maxDecibels = -15;

            analyser.connect(actx.destination);
            source.connect(this.analyser);

            return this.source;
        } catch (e) {
            console.log('Failed to make stream: ', e);
        }
    }
    play(el) {
        el.play();
        this.getStreamData();
    }
    getStreamData() {
        this.analyserLoop = requestAnimationFrame(this.getStreamData);
        this.analyser.getByteFrequencyData(this.dataArray)
        return this.dataArray;
    }
    stop(el) {
        el.pause();
        el.currentTime = 0;
        cancelAnimationFrame(this.analyserLoop);
    }
}

export { AudioStream }