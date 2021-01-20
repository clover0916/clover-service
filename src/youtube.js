var video = document.getElementById('video');
var movie_url = "http://127.0.0.1:3000/youtube?url=watch?v=QW28YKqdxe0";

video.src = movie_url;
video.load();
video.play();