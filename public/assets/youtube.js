const videoTag = document.getElementById("my-video");
const myMediaSource = new MediaSource();
const url = URL.createObjectURL(myMediaSource);
videoTag.src = url;

document.getElementById('go').addEventListener('click', function() {
  document.getElementById("url").value = document.getElementById("url").value.replace('https://www.youtube.com/watch?v=', '')
  if (!document.getElementById("video_url").value) {
    return;
  }
  //submit()でフォームの内容を送信
  get_video(document.getElementById("url").value)
})

// 1. add source buffers

// for the audio SourceBuffer
function get_video(file) {
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
}