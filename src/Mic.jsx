export const streamMic = (App) => {
  const { actx } = App;
  const bypasserNode = new AudioWorkletNode(actx, 'bypass-processor');
  const analyser = actx.createAnalyser();
  analyser.fftSize = 4096;
  analyser.minDecibels = -120;
  analyser.maxDecibels = 0;
  //Also get time data
  const timeData = new Uint8Array(analyser.fftSize);
  const freqData = new Uint8Array(analyser.frequencyBinCount);
  navigator.getUserMedia({ audio: true }, (stream) => {
    const microphone = actx.createMediaStreamSource(stream);
    microphone.connect(analyser)
      .connect(bypasserNode)
      .connect(actx.destination);
  }, (e) => console.log(e));
  return {
    audio: bypasserNode, analyser, streamData: { freqData, timeData }
  }
}