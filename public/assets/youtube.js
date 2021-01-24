const videoTag = document.getElementById("my-video");
const myMediaSource = new MediaSource();
const url = URL.createObjectURL(myMediaSource);
videoTag.src = url;

const file = 'QW28YKqdxe0'//getParam('id')

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
        
        videoTag.load()
        videoTag.play()
      });
  })
  .catch(err => {
    console.error(err);
  });
  
document.getElementById('go').addEventListener('click', function() {
  document.getElementById("url").value = document.getElementById("video_url").value.replace('https://www.youtube.com/watch?v=', '')
  if (!document.getElementById("url").value) {
    return;
  }
  //submit()でフォームの内容を送信
  document.myform.submit();
})

function getParam(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}