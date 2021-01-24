const videoTag = document.getElementById("my-video");
const myMediaSource = new MediaSource();
const url = URL.createObjectURL(myMediaSource);
videoTag.src = url;

const file = getQueryVariable('id')

// 1. add source buffers

// for the audio SourceBuffer
fetch('https://api.clover-service.online/video_info?id=' + file, { method: 'GET' })
  .then(response => response.json())
  .then(data => {
    const videoSourceBuffer = myMediaSource.addSourceBuffer(`${data.formats[0].mimeType}; codecs="${data.formats[0].codecs}"`);

    // 2. download and add our audio/video to the SourceBuffers

    // the same for the video SourceBuffer
    fetch("https://api.clover-service.online/get_video?id=" + file, { method: 'GET' })
      .then(response => response.arrayBuffer())
      .then(videoData => {
        videoSourceBuffer.appendBuffer(videoData);

        videoTag.play()
      });
  })
  .catch(err => {
    console.error(err);
  });
  
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    //alert('Query Variable ' + variable + ' not found');
}