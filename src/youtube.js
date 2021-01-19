const ytdl = require('ytdl-core');

var video = document.getElementById('video');
var source = document.createElement('source');

video.setAttribute('src', ytdl('https://www.youtube.com/embed/QW28YKqdxe0'));

video.appendChild(source);
video.play();