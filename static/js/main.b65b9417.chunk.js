(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{110:function(e,t,a){e.exports=a(187)},187:function(e,t,a){"use strict";a.r(t);var n=a(1),i=a.n(n),s=a(7),r=a.n(s),c=a(17),l=a(14),o=a(15),h=a(24),d=a(22),u=a(12),m=a(23),p=a(107),y=function(e){return parseFloat(e)||0},f=function(e){if(e===window||e===document.body)return[window.innerWidth,window.innerHeight];var t=!1;!e.parentNode&&document.body&&(t=!0,document.body.appendChild(e));var a=e.getBoundingClientRect(),n=getComputedStyle(e),i=(0|a.height)+y(n.getPropertyValue("margin-top"))+y(n.getPropertyValue("margin-bottom")),s=(0|a.width)+y(n.getPropertyValue("margin-left"))+y(n.getPropertyValue("margin-right"));return t&&document.body&&document.body.removeChild(e),[s,i]},v=void 0,g=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(h.a)(this,Object(d.a)(t).call(this))).handleResize=function(){var t=Object(u.a)(e),a=(t.ctx,t.canvas,e.state),n=a.width,i=a.height;e.setState(Object(c.a)({},e.setSize()),function(){e.props.canvasApp.setSize(n,i)})},e.setSize=function(){var t=e.canvas.parentElement;if(t){var a=f(t),n=Object(p.a)(a,2);return{width:n[0],height:n[1]}}},e.setRef=function(t){if(t){var a=e.props.createRef;e.canvas=t,"function"===typeof canvasRef&&a(t)}},e.state={width:0,height:0},e}return Object(m.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.setState(Object(c.a)({},this.setSize()),function(){window.addEventListener("resize",e.handleResize,!1),e.ctx=e.canvas.getContext("2d");var t=e.ctx,a=e.canvas,n=e.state,i=n.width,s=n.height;e.props.canvasApp.init(t,a,i,s)})}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.handleResize,!1)}},{key:"render",value:function(){var e=window.devicePixelRatio||1,t=this.state,a=t.width,n=t.height;return i.a.createElement("canvas",{ref:this.setRef,width:a*e,height:n*e,style:Object(c.a)({width:a,height:n},this.props.style,{border:"1px solid"})})}}]),t}(n.Component),b=function(e){return i.a.createElement(g,{style:Object(c.a)({},e.style),canvasRef:function(e){v.canvas=e},canvasApp:e.canvasApp,isPlaying:e.isPlaying})},w=function(e){function t(){return Object(l.a)(this,t),Object(h.a)(this,Object(d.a)(t).call(this))}return Object(m.a)(t,e),Object(o.a)(t,[{key:"init",value:function(e,t,a,n){this.ctx=e,this.canvas=t,this.canvas.width=a,this.canvas.height=n,this.ctx.fillStyle="black",this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height),this.slice=this.ctx.getImageData(0,0,1,this.canvas.height),this.draw()}},{key:"setSize",value:function(e,t){console.log("resizing",e,t),this.canvas.width=e,this.canvas.height=t,cancelAnimationFrame(this.animationLoop),this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height),this.slice=this.ctx.getImageData(0,0,1,this.canvas.height),this.draw()}},{key:"draw",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=this.slice,i=this.ctx,s=this.canvas,r=s.width,c=(s.height,this.props),l=c.streamData,o=c.isPlaying,h=c.mic;this.animationLoop=requestAnimationFrame(function(){t>r&&(t=0),e.draw(t,a)});for(var d=n.data,u=0;u<d.length;u+=4)l?(d[u]=l[u],d[u+1]=l[u+1],d[u+2]=l[u+2]):(d[u]=0,d[u+1]=0,d[u+2]=0);o||h?t++:t=0,i.putImageData(n,t,a)}},{key:"scaleImageData",value:function(e,t){for(var a=this.ctx.createImageData(e.width*t,e.height*t),n=0;n<e.height;n++)for(var i=0;i<e.width;i++)for(var s=[e.data[4*(n*e.width+i)+0],e.data[4*(n*e.width+i)+1],e.data[4*(n*e.width+i)+2],e.data[4*(n*e.width+i)+3]],r=0;r<t;r++)for(var c=n*t+r,l=0;l<t;l++)for(var o=i*t+l,h=0;h<4;h++)a.data[4*(c*a.width+o)+h]=s[h];return a}},{key:"render",value:function(){var e=this;return i.a.createElement(b,{style:{transform:"rotate(180deg) scaleX(-1)"},canvasRef:function(t){e.canvas=t},canvasApp:this,isPlaying:this.props.isPlaying})}}]),t}(n.Component),S=a(189),k=a(190),j=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(h.a)(this,Object(d.a)(t).call(this))).handleUpload=function(){var t=Object(u.a)(e),a=t.props,n=t.reader;e.setState({loading:!0});var i=new Audio,s=e.el.files[0];s?n.readAsDataURL(s):i.src="",n.onloadend=function(){i.src=n.result,a.onUploadSuccess({name:s.name,el:i}),e.setState({loading:!1})}},e.state={loading:!1},e.reader=new FileReader,e}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this,t=this.state;return i.a.createElement(i.a.Fragment,null,i.a.createElement(S.a,{title:"upload audio"},i.a.createElement(k.a,{size:"small",shape:"circle",icon:"upload",loading:t.loading,onClick:function(){return e.el.click()}})),i.a.createElement("input",{accept:"audio/*",ref:function(t){return e.el=t},type:"file",style:{display:"none"},onChange:function(){return e.handleUpload()}}))}}]),t}(n.Component),E=function(e){return i.a.createElement(S.a,{title:"download image"},i.a.createElement(k.a,Object.assign({},e,{size:"small",shape:"circle",icon:"download"})))},O=function(e){return i.a.createElement(S.a,{title:e.isPlaying?"pause":"play"},i.a.createElement(k.a,Object.assign({},e,{size:"small",shape:"circle",icon:e.isPlaying?"pause-circle":"play-circle",onClick:e.handlePlayback})))},x=a(188),A=a(13),C=function(e){var t=e.onUploadSuccess,a=e.handleSelect,n=e.handlePlayback,s=e.handleCapture,r=e.isPlaying,c=e.selectedFile,l=e.dataSource,o=e.mic;return i.a.createElement(x.a,{style:e.style,header:i.a.createElement("div",null,i.a.createElement("div",{style:{display:"flex",justifyContent:"space-evenly"}},i.a.createElement(j,{onUploadSuccess:t}),i.a.createElement(E,null),i.a.createElement(O,{disabled:!c||o,handlePlayback:n,isPlaying:r}),i.a.createElement(R,{mic:o,isPlaying:r,handleCapture:s}),c?i.a.createElement("span",{style:{textAlign:"center"}},i.a.createElement(A.a,{type:"sound"})," ",o?"Microphone":c.name):null)),bordered:!0,dataSource:l,renderItem:function(e){return i.a.createElement(x.a.Item,null,i.a.createElement(k.a,{disabled:o,block:!0,style:{margin:"0 auto"},onClick:function(){return a(e)}},i.a.createElement(x.a.Item.Meta,{avatar:i.a.createElement("img",{width:25,height:25,src:"https://www.svgrepo.com/show/8210/musical-notes.svg"}),title:e.name})))}})},P=function(e){var t=Object(c.a)({display:"grid",gridTemplateColumns:"repeat(".concat(e.cols,", 1fr)"),gridTemplateRows:"repeat(".concat(e.rows,", 1fr)")},e.style),a=e.rows,n=e.cols;return i.a.createElement("div",{className:"grid",style:t},i.a.Children.map(e.children,function(e,t){return i.a.cloneElement(e,{id:t+1,rows:a+1,cols:n+1})}))},D=function(e){var t=Object(c.a)({},e.rowStart?{gridRowStart:e.rowStart}:{gridRowStart:e.id},e.rowEnd?{gridRowEnd:e.rowEnd+1}:null,e.colStart?{gridColumnStart:e.colStart}:{gridColumnStart:1},e.colEnd?{gridColumnEnd:e.colEnd+1}:{gridColumnEnd:e.cols},e.style);return i.a.createElement("div",{style:t},e.children)},F=a(106),R=function(e){function t(){return Object(l.a)(this,t),Object(h.a)(this,Object(d.a)(t).call(this))}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this.props;return i.a.createElement(i.a.Fragment,null,i.a.createElement(S.a,{title:"connect mic"},i.a.createElement(k.a,{disabled:e.isPlaying,style:{display:"flex",justifyContent:"space-evenly"},onClick:e.handleCapture,size:"small",shape:"circle",icon:e.mic?null:"audio"},e.mic?i.a.createElement(F.a,null):null)))}}]),t}(n.Component),z=a(52),M=a.n(z),U=a(77),I=function(){function e(){Object(l.a)(this,e),this.microphone={},this.files=[],this.play=this.play.bind(this),this.getStreamData=this.getStreamData.bind(this)}return Object(o.a)(e,[{key:"loadModule",value:function(){var e=Object(U.a)(M.a.mark(function e(){var t;return M.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=this.actx,e.prev=1,e.next=4,t.audioWorklet.addModule("".concat("/spectrogram","/worklet/bypass-processor.js"));case 4:return this.bypassNode=new AudioWorkletNode(t,"bypass-processor"),console.log("loaded module "),e.abrupt("return",!0);case 9:return e.prev=9,e.t0=e.catch(1),console.log("Failed to load module"),e.abrupt("return",!1);case 13:case"end":return e.stop()}},e,this,[[1,9]])}));return function(){return e.apply(this,arguments)}}()},{key:"checkContext",value:function(){var e=Object(U.a)(M.a.mark(function e(){return M.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(this.actx){e.next=11;break}return e.prev=1,console.log("New context instantiated"),this.actx=new(window.AudioContext||window.webkitAudioContext),e.next=6,this.loadModule();case 6:e.next=11;break;case 8:e.prev=8,e.t0=e.catch(1),console.log("Sorry, but your browser doesn't support the Web Audio API!",e.t0);case 11:case"end":return e.stop()}},e,this,[[1,8]])}));return function(){return e.apply(this,arguments)}}()},{key:"fromFile",value:function(e){this.checkContext();var t=this.actx;try{this.analyser=t.createAnalyser(),this.dataArray=new Uint8Array(this.analyser.frequencyBinCount),this.source=t.createMediaElementSource(e.el);var a=this.analyser,n=this.source,i=this.dataArray;a.fftSize=2048,a.minDecibels=-100,a.maxDecibels=-15,a.connect(t.destination),n.connect(this.analyser),this.files.push({file:e,analyser:a,source:n,dataArray:i})}catch(s){console.log("Failed to make stream: ",s)}}},{key:"fromMic",value:function(){var e=this;this.checkContext();var t=this.actx,a=this.bypassNode;this.microphone.analyser=t.createAnalyser();var n=this.microphone.analyser;n.fftSize=4096,n.minDecibels=-120,n.maxDecibels=-15,this.microphone.dataArray=new Uint8Array(n.frequencyBinCount),navigator.getUserMedia({audio:!0},function(i){e.microphone.source=t.createMediaStreamSource(i),e.microphone.recorder=new MediaRecorder(i),e.microphone.source.connect(n).connect(a).connect(t.destination)},function(e){return console.log(e)})}},{key:"stopMic",value:function(){this.microphone.recorder.stream.getAudioTracks().forEach(function(e){return console.log(e)})}},{key:"play",value:function(e){this.actx.resume(),this.files[e].file.el.play(),this.getStreamData(e)}},{key:"stop",value:function(e){this.files[e].file.el.pause(),this.files[e].file.el.currentTime=0}},{key:"getStreamData",value:function(e){return"mic"===e?(this.microphone.analyser.getByteFrequencyData(this.microphone.dataArray),this.microphone.dataArray):(this.files[e].analyser.getByteFrequencyData(this.files[e].dataArray),this.files[e].dataArray)}}]),e}(),L=P,q=D,B=[{name:"Hidden transmission",path:"".concat("/spectrogram","/data/hidden_transmission.mp3")},{name:"Aphex twin song",path:"".concat("/spectrogram","/data/AphexTwin.mp3")}],N=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(h.a)(this,Object(d.a)(t).call(this))).state={mic:!1,files:[],isPlaying:!1},e.AudioStream=new I,e.play=e.play.bind(Object(u.a)(e)),e.stop=e.stop.bind(Object(u.a)(e)),e.onUploadSuccess=e.onUploadSuccess.bind(Object(u.a)(e)),e.handlePlayback=e.handlePlayback.bind(Object(u.a)(e)),e.handleSelect=e.handleSelect.bind(Object(u.a)(e)),e.handleStreamData=e.handleStreamData.bind(Object(u.a)(e)),e.loadSamples=e.loadSamples.bind(Object(u.a)(e)),e.handleCapture=e.handleCapture.bind(Object(u.a)(e)),e}return Object(m.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){this.loadSamples()}},{key:"loadSamples",value:function(){var e=this,t=B.map(function(t,a){var n=new Audio;return n.src=t.path,t.el=n,t.index=a,e.AudioStream.fromFile(t),t});this.setState({files:t,selectedFile:t[0]})}},{key:"onUploadSuccess",value:function(e){var t=this,a=Object(c.a)({},e,{index:this.state.files.length}),n=this.state.files.concat(Object(c.a)({},a)),i=this.state.selectedFile?this.state.selectedFile:a;this.setState({files:n,selectedFile:i},function(){t.AudioStream.fromFile(e),t.handleSelect(a)})}},{key:"handleSelect",value:function(e){this.state.isPlaying&&this.stop(),this.setState({selectedFile:e,isPlaying:!1})}},{key:"handlePlayback",value:function(){var e=this.play,t=this.stop,a=this.state.isPlaying;this.setState({isPlaying:!a},function(){a?t():e()})}},{key:"handleCapture",value:function(){var e=this;this.setState({mic:!this.state.mic},function(){e.state.mic?(e.AudioStream.fromMic(),e.handleStreamData("mic")):(cancelAnimationFrame(e.analyserLoop),e.AudioStream.stopMic())})}},{key:"play",value:function(){var e=this.AudioStream,t=this.handleStreamData,a=this.state.selectedFile;t(a.index),e.play(a.index)}},{key:"stop",value:function(){var e=this.AudioStream,t=this.state.selectedFile,a=this.analyserLoop;cancelAnimationFrame(a),e.stop(t.index),this.setState({streamData:[]})}},{key:"handleStreamData",value:function(e){var t=this.AudioStream,a=this.handleStreamData;this.setState({streamData:t.getStreamData(e)}),this.analyserLoop=requestAnimationFrame(function(){return a(e)})}},{key:"render",value:function(){return i.a.createElement(L,{cols:8,rows:3},i.a.createElement(q,{style:{height:"170px"}},i.a.createElement(w,{streamData:this.state.streamData,isPlaying:this.state.isPlaying,mic:this.state.mic})),i.a.createElement(q,{rowStart:2},i.a.createElement(C,{mic:this.state.mic,selectedFile:this.state.selectedFile,onUploadSuccess:this.onUploadSuccess,handlePlayback:this.handlePlayback,handleSelect:this.handleSelect,handleCapture:this.handleCapture,isPlaying:this.state.isPlaying,dataSource:this.state.files})))}}]),t}(n.Component);a(185),a(186);r.a.render(i.a.createElement(N,null),document.getElementById("root"))}},[[110,1,2]]]);
//# sourceMappingURL=main.b65b9417.chunk.js.map