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
      // ビデオオブジェクトの必要に応じてバッファーを提供する必要があり、ハンドラーをかける。
      videoTag.addEventListener('seeking', onSeeking.bind(videoTag, mediaSource));
      videoTag.addEventListener('progress', onProgress.bind(videoTag, mediaSource));
      // アプリケーションコードで初期化セグメントを取得する。 もちろんこの過程は非同期作業だが...
      // 初期画面のメディアセグメントはajax要請時に応答タイプを"arrayBuffer"で受ける。
      var initSegment = GetInitializationSegment();
      if (initSegment == null) {
        // 初期化セグメントが持てなければ、再生できない。
        // mediaSource.endOfstreamメソッドでストリームを終了する。このメソッドは正常にストリームが終了した時も呼び出され
        // エラーによる終了日の際も原因を印字で渡して終了する。"network" or "decode"
        mediaSource.endOfStream("network");
        return;
      }
      // 初期化セグメントをsourceBufferに提供する。
      // firstAppendHandlerの初期化セグメントが正常にsourceBufferに入ってから1回実行され、イベントハンドラーから除去される。
      // 初期化セグメントが入ってから、メディアセグメントに切り替えるために使用される関数である。
      var firstAppendHandler = function(e) {
        var sourceBuffer = e.target;
        sourceBuffer.removeEventListener('updateend', firstAppendHandler);
        // 下記の関数で本格的にメディアバッファをSourceBufferに提供する段階に移る。
        appendNextMediaSegment(mediaSource);
      };
      // sourceBuferはメディアデータを受けると当該データをデコードする作業を行うが
      // update はジョブが成功裏に終了したとき、updateendは成功/失敗に関係なく終了したときに発生する。
      // ここでは初期化セグメントを提供し、メディアセグメントを提供するために使用される。
      sourceBuffer.addEventListener('updateend', firstAppendHandler);
      sourceBuffer.appendBuffer(initSegment);
    })
}

// 初期化セグメントが提供されてからメディアセグメントを提供する関数
// 初回実行以降はビデオオブジェクトのプログレスイベントによって実行される。
function appendNextMediaSegment(mediaSource) {
  // MediaSource.readyStateは"open", "closed", "ended"の3つのステータスを持つ。
  // "open"は現在のメディアデータを処理中であり、"ended"は待機状態、
  // "closed"はこれ以上のメディアストリームは受け付けない。
  if (mediaSource.readyState == "closed")
    return;
  // アプリケーションコードでこれ以上提供するメディアセグメントがなければ、endOfStreamでストリーミングを終了する。
  if (!HaveMoreMediaSegments()) {
    mediaSource.endOfStream();
    return;
  }
  // 動画バッファを提供する過程はデータをデコードする過程を経るため、時間とCPU費用がかかる。
  // 常にsourceBufferがupdating状態であるかをチェックし、新しいバッファを提供しなければならない。
  // updatingがtrueの場合、以前のメディアデータの処理中である。
  if (mediaSource.sourceBuffers[0].updating)
    return;
  // アプリケーションコードである次のメディアセグメントを受け取る。
  var mediaSegment = GetNextMediaSegment();
  if (!mediaSegment) {
    // なければエラー
    mediaSource.endOfStream("network");
    return;
  }
  // メディアデータをsourceBufferに提供する。
  // MediaSource.readyStateが"ended"または"open"なら
  // sourceopenイベントにかかっているonSourceOpenハンドラーが再実行されるので対処が必要。
  mediaSource.sourceBuffers[0].appendBuffer(mediaSegment);
}
 // seekingイベントハンドラーでシーキングされた当該位置のメディアデータを提供する作業を行う。
  function onSeeking(mediaSource, e) {
    var video = e.target;
    // sourceBufferで処理されているバッファがあれば取り消す。
    if (mediaSource.readyState == "open") {
      mediaSource.sourceBuffers[0].abort();
    }
    // アプリケーションコードからビデオオブジェクトで現在の動画再生位置を読み込み、当該メディアセグメントを用意する。
    SeekToMediaSegmentAt(video.currentTime);
    // MediaSourceに変更されたバッファーを提供する。
    appendNextMediaSegment(mediaSource);
  }
  // progressイベントハンドラーで再生されるセグメントのデータを準備し、SourceBufferに提供する。
  function onProgress(mediaSource, e) {
    appendNextMediaSegment(mediaSource);
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