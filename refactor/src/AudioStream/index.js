class AudioStream {
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
            this.source = actx.createMediaElementSource(el);
            this.analyser.connect(actx.destination);
            this.source.connect(this.analyser);

            this.analyser.fftSize = 16384;
            this.bufferLength = this.analyser.frequencyBinCount;
            this.dataArray = new Uint8Array(this.bufferLength);

            console.log('Success!', this.dataArray);
        } catch (e) {
            console.log('Failed to make stream: ', e);
        }
    }
    fromMic() {
        this.checkContext();
    }
    play(el) {
        el.play();
    }
    stop(el) {
        el.pause();
        el.currentTime = 0;
    }
}

export { AudioStream }