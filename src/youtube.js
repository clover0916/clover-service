//const fs = require('fs');
const ytdl = require('ytdl-core');

const videoTag = document.getElementById("video");
const myMediaSource = new MediaSource();
const url = URL.createObjectURL(myMediaSource);
videoTag.src = url;

// 1. add source buffers

const audioSourceBuffer = myMediaSource
  .addSourceBuffer('audio/mp4; codecs="mp4a.40.2"');
const videoSourceBuffer = myMediaSource
  .addSourceBuffer('video/mp4; codecs="avc1.64001e"');

// 2. download and add our audio/video to the SourceBuffers

// for the audio SourceBuffer
ytdl('https://youtu.be/QW28YKqdxe0', { filter: format => format.container === 'mp4' })/*.pipe(fs.createWriteStream('video.mp4'))*/.then(function(audioData) {
  audioSourceBuffer.appendBuffer(audioData);
});

// the same for the video SourceBuffer
ytdl('https://youtu.be/QW28YKqdxe0', { filter: format => format.container === 'mp4' })/*.pipe(fs.createWriteStream('video.mp4'))*/.then(function(videoData) {
  videoSourceBuffer.appendBuffer(videoData);
});

video.load()

video.play()

