const ytdl = require('ytdl-core');

var video = document.getElementById('video');

video.src = ytdl('https://youtu.be/QW28YKqdxe0').pipe(fs.createWriteStream('video.mp4'));

video.load()

video.play()