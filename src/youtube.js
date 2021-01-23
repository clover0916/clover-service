var ms = new MediaSource();
var sb, type;

function initVideo() {
  var video = document.getElementsByTagName('my-video')[0];
  ms.addEventListener('sourceopen', initSourceBuffer, false);
  if ('srcObject' in video)
    video.srcObject = ms;
  else
    video.src = URL.createObjectURL(ms);
}

function initSourceBuffer() {
  sb = ms.addSourceBuffer(type);
  sb.addEventListener('updateend', appendMediaSegment, false);
  appendInitSegment();
}

var mpd;

function getDescription(file) {
  var xhr = new XMLHttpRequset();
  xhr.open('GET', 'https://api.clover-service.online/video_info?url=' + file);
  xhr.onload = function() {
    mpd = JSON.parse(xhr.response);
    var representation = mpd;
    //var codecs = representation.getAttribute('codecs');
    //type = mimeType + '; codecs="' + codecs + '"';
    initVideo();
  }
}

getDescription('watch?v=QW28YKqdxe0');