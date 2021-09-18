const videoTag = document.getElementById("my-video");
const myMediaSource = new MediaSource();
const url = URL.createObjectURL(myMediaSource);
videoTag.src = url;
var np;

const file = getQueryVariable('id')

// 1. add source buffers

// for the audio SourceBuffer
fetch('https://api.clover-service.online/video_info?id=' + file, { method: 'GET' })
  .then(response => response.json())
  .then(data => {
    videoTag.poster = data.videoDetails.thumbnails[data.videoDetails.thumbnails.length - 1].url
    document.getElementById('video_title').innerHTML = data.videoDetails.title;
    document.getElementById('video_description').innerHTML = data.videoDetails.description;
    const videoSourceBuffer = myMediaSource.addSourceBuffer(`${data.formats[0].mimeType}; codecs="${data.formats[0].codecs}"`);

    data.formats.forEach((dat, index) => {
      var ui = document.getElementById('quality');
      var li = document.createElement("li");
      li.classList.add("mdc-deprecated-list-item")
      if (index === 0) li.setAttribute('tabindex', "0");
      ui.appendChild(li);
      var spam = document.createElement("spam");
      spam.classList.add('mdc-deprecated-list-item__ripple')
      li.appendChild(spam)
      var spam = document.createElement("spam");
      if(!dat.qualityLabel) return; 
      spam.innerHTML = dat.qualityLabel;
      spam.classList.add('mdc-deprecated-list-item__text');
      li.appendChild(spam);
    })
    // 2. download and add our audio/video to the SourceBuffers

    // the same for the video SourceBuffer
    fetch("https://api.clover-service.online/get_video?id=" + file, { method: 'GET' })
      .then(response => response.arrayBuffer())
      .then(videoData => {
        videoSourceBuffer.appendBuffer(videoData);
        if (!videoTag.canPlayType(data.formats[0].mimeType)) return document.getElementById("play-text").innerHTML = "Not Supported Codec";
        document.getElementById("play-text").innerHTML = "Play";
      });
  })
  .catch(err => {
    console.error(err);
  });

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  //alert('Query Variable ' + variable + ' not found');
}
document.getElementById("play-button").onclick = function() {
  if (!np) {
    videoTag.play()
    document.getElementById("play-text").innerHTML = "Stop";
    np = true;
  } else {
    videoTag.pause()
    document.getElementById("play-text").innerHTML = "Play";
    np = false;
  }
};

document.getElementById('fullscreen').onclick = function() {
  if (videoTag.requestFullscreen) {
    videoTag.requestFullscreen();
  } else if (videoTag.webkitRequestFullscreen) { /* Safari */
    videoTag.webkitRequestFullscreen();
  } else if (videoTag.msRequestFullscreen) { /* IE11 */
    videoTag.msRequestFullscreen();
  }
}