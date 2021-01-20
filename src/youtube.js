var video = document.getElementById('video');
var movie_url = "https://clover-service.online/youtube?url=watch?v=QW28YKqdxe0";

video.src = movie_url;
video.load();
video.play();