const videoTag = document.getElementById("my-video");
const myMediaSource = new MediaSource();
const url = URL.createObjectURL(myMediaSource);
videoTag.src = url;

const file = 'QW28YKqdxe0'

// 1. add source buffers

//const videoSourceBuffer = myMediaSource
  //.addSourceBuffer('video/mp4; codecs="avc1.64001e"');

// 2. download and add our audio/video to the SourceBuffers

// for the audio SourceBuffer
fetch('https://api.clover-service.online/video_info?id=' + file, { method: 'GET' })
  .then(response => console.log(response))
  .catch(err => {
    console.error(err);
  });
  //.then(data => console.log(data.formats))
  //.then(function(audioData) {
  //audioSourceBuffer.appendBuffer(audioData);
//});

// the same for the video SourceBuffer
fetch("https://api.clover-service.online/get_video?id=" + file).then(function(response) {
  // The data has to be a JavaScript ArrayBuffer
  return response.arrayBuffer();
}).then(function(videoData) {
  videoSourceBuffer.appendBuffer(videoData);
});