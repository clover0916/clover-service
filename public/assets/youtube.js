const videoTag = document.getElementById("my-video");
const myMediaSource = new MediaSource();
const url = URL.createObjectURL(myMediaSource);
videoTag.src = url;

const file = 'QW28YKqdxe0'

// 1. add source buffers

// for the audio SourceBuffer
fetch('https://api.clover-service.online/video_info?id=' + file, { method: 'GET' })
  .then(response => response.json())
  .then(data => {
    const video = JSON.parse(data)
    
    const videoSourceBuffer = myMediaSource.addSourceBuffer(`${video.formats[0].mimeType}; codecs="${video.formats[0].codecs}"`);
    
    // 2. download and add our audio/video to the SourceBuffers
    
    // the same for the video SourceBuffer
    fetch("https://api.clover-service.online/get_video?id=" + file, { method: 'GET' })
      .then(response => response.arrayBuffer())
      .then(data => {
        videoSourceBuffer.appendBuffer(data);
      });
  })
  .catch(err => {
    console.error(err);
  });
  //.then(function(audioData) {
  //audioSourceBuffer.appendBuffer(audioData);
//});