const videoTag = document.getElementById("my-video");
const myMediaSource = new MediaSource();
const url = URL.createObjectURL(myMediaSource);
videoTag.src = url;

// 1. add source buffers

const audioSourceBuffer = myMediaSource
  .addSourceBuffer('audio/mp4; codecs="mp4a.40.2"');
const videoSourceBuffer = myMediaSource
  .addSourceBuffer('video/mp4; codecs="avc1.64001e"');

// 2. download and add our audio/video to the SourceBuffers

// for the audio SourceBuffer
fetch("https://clover-service.online/youtube?url=watch?v=QW28YKqdxe0", {method: 'GET'}).then((res) => {
  alert(res)
  // The data has to be a JavaScript ArrayBuffer
  return res.arrayBuffer();
}).then(function(audioData) {
  audioSourceBuffer.appendBuffer(audioData);
});

// the same for the video SourceBuffer
fetch("https://clover-service.online/youtube?url=watch?v=QW28YKqdxe0", {method: 'GET'}).then((res) => {
  // The data has to be a JavaScript ArrayBuffer
  return res.arrayBuffer();
}).then(function(videoData) {
  videoSourceBuffer.appendBuffer(videoData);
});