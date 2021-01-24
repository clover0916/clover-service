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
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.clover-service.online/video_info?id=' + file);
  xhr.onload = function() {
    mpd = JSON.parse(xhr.response);
    var representation = mpd;
    var codecs = representation.formats[0].codecs;
    var mimeType = representation.formats[0].mimeType
    type = mimeType + '; codecs="' + codecs + '"';
    initVideo();
  }
}

getDescription('QW28YKqdxe0');

var mediaAppended = false;

function appendSegment(event) {
  sb.appendBuffer(event.target.response);
  if (mediaAppended)
    sb.removeEventListener('updateend', appendMediaSegment);
}

function appendMediaSegment() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.clover-service.online/video_info?id=' + mpd.videoDetails.videoId);
  xhr.responseType = 'arraybuffer';
  xhr.onload = appendSegment;
  mediaAppended = true;
  xhr.send(null);
}

function appendInitSegment() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.clover-service.online/video_info?id=' + mpd.videoDetails.videoId);
  xhr.responseType = 'arraybuffer';
  xhr.onload = appendSegment;
  xhr.send(null);
}