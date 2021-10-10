var video = document.getElementById("my-video");
var mediaSource = new MediaSource();
mediaSource.addEventListener('sourceopen', onSourceOpen.bind(this, video));
video.src = window.URL.createObjectURL(mediaSource);
var file = getQueryVariable('id');
var np = false;

function onSourceOpen(videoTag, e) {
  var mediaSource = e.target;
  // 不要な状況でsourceopenイベントが発生するときを省く。sourceBufferが必要。
  if (mediaSource.sourceBuffers.length > 0)
    return;
  // メディアソースにaddSourceBufferメソッドを用いてsourceBufferを作る。印字はコーデック情報である。
  // サンプルコードでsourceBufferはwebmコーデックでエンコードされたデータが取得できるようになる。
  fetch('https://api.clover-midori.net/video_info?id=' + file, { method: 'GET' })
    .then(response => response.json())
    .then(info => {
      var sourceBuffer = mediaSource.addSourceBuffer(`${info.formats[0].mimeType}; codecs="${info.formats[0].codecs}"`);
      var initSegment = GetInitializationSegment();
      mediaSource.endOfStream("network");
      sourceBuffer.appendBuffer(initSegment);
      document.getElementById("play-text").innerHTML = "Play";
    })
}

function GetInitializationSegment() {
  fetch('https://api.clover-midori.net/get_video?id=' + file, { method: 'GET' })
    .then(response => response.arrayBuffer())
    .then(buffer => {
      return buffer;
    })
    .catch(err => {
      console.error(err);
    });
}

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