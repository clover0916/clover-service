var ms = new MediaSource();
var sb, type;

function initVideo() {
  var video = document.getElementsByTagName('video')[0];
  ms.addEventListener('sourceopen', initSourceBuffer, false);
  if('srcObject' in video)
    video.srcObject = ms;
  else
    video.src = URL.createObjectURL(ms);
}

function initSourceBuffer() {
  sb = ms.addSourceBuffer(type);
  sb.addEventListener('updateend', appendMediaSegment, false);
  appendInitSegment();
}