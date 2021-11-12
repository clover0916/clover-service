var video = document.getElementById("my-video");
var id = getQueryVariable('id');
var np;
fetch('https://api.clover-midori.net/video_info?id=' + id, { method: 'GET' })
  .then(response => response.json())
  .then(info => {
    if(info.error_message) return alert(JSON.stringify(info.error_message));
    var mimeCodec = `${info.formats[0].mimeType}; codecs="${info.formats[0].codecs}"`

    if ('MediaSource' in window && MediaSource.isTypeSupported(mimeCodec)) {
      var mediaSource = new MediaSource;
      console.log(mediaSource.readyState); // closed
      mediaSource.addEventListener('sourceopen', sourceOpen);
    } else {
      document.getElementById("play-text").innerHTML = "Not Supported";
      document.getElementById("play-button").disabled = true;
    }
    function sourceOpen(_) {
      //console.log(this.readyState); // open
      var mediaSource = this;
      var sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);
      fetch('https://api.clover-midori.net/get_video?id=' + id, { method: 'GET' })
        .then(response => response.arrayBuffer())
        .then(buffer => {
          sourceBuffer.addEventListener('updateend', function(_) {
            mediaSource.endOfStream();
            //console.log(mediaSource.readyState); // ended
          });
          sourceBuffer.appendBuffer(buffer);
        });
    };
  })
  .catch(err => {
    alert('エラーが発生しました:' + err)
  })

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
    video.play()
    document.getElementById("play-text").innerHTML = "Stop";
    np = true;
  } else {
    video.pause()
    document.getElementById("play-text").innerHTML = "Play";
    np = false;
  }
};

document.getElementById('fullscreen').onclick = function() {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.webkitRequestFullscreen) {
    /* Safari */
    video.webkitRequestFullscreen();
  } else if (video.msRequestFullscreen) {
    /* IE11 */
    video.msRequestFullscreen();
  }
}