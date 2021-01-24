const videoTag = document.getElementById("my-video");
const myMediaSource = new MediaSource();
const url = URL.createObjectURL(myMediaSource);
videoTag.src = url;

const file = 'QW28YKqdxe0'

var video;
// 1. add source buffers

// for the audio SourceBuffer
fetch('https://api.clover-service.online/video_info?id=' + file, { method: 'GET' })
  .then(response => response.json())
  .then(data => console.log(data.formats[0]))
  .catch(err => {
    console.error(err);
  });
  //.then(function(audioData) {
  //audioSourceBuffer.appendBuffer(audioData);
//});

const videoSourceBuffer = myMediaSource.addSourceBuffer(`${video.formats[0].mimetype}video/mp4; codecs="${video.formats[0].codecs}"`);

// 2. download and add our audio/video to the SourceBuffers

// the same for the video SourceBuffer
fetch("https://api.clover-service.online/get_video?id=" + file).then(function(response) {
  // The data has to be a JavaScript ArrayBuffer
  return response.arrayBuffer();
}).then(function(videoData) {
  videoSourceBuffer.appendBuffer(videoData);
});