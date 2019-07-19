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
            this.stream = actx.createMediaElementSource(el);
            this.stream.connect(actx.destination);
            console.log('Success! ', this.stream);
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