var express = require('express');
var router = express.Router();

const ytdl = require('ytdl-core');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var url = req.query.url.replace('https://www.youtube.com/', '').replace('https://youtu.be/', '');
  var URL = 'https://www.youtube.com/' + url 
  var stream = ytdl(URL);
  stream.on('info', (info) => {
    var title = encodeURIComponent(info.player_response.videoDetails.title + '.mp4')
    res.header('Content-Disposition', 'attachment; filename*=UTF-8\'\'' + title);
    ytdl(URL, {
      format: 'mp4'
    }).pipe(res);
  });
});

module.exports = router;
