var express = require('express');
var router = express.Router();

const ytdl = require('ytdl-core');

/* GET users listing. */
router.get('/get_video', function(req, res, next) {
  var url = req.query.url;
  var URL = 'https://www.youtube.com/' + url 
  var stream = ytdl(URL);
  stream.on('info', (info) => {
    var title = encodeURIComponent(info.player_response.videoDetails.title + '.mp4')
    res.header('Content-Disposition', 'attachment; filename*=UTF-8\'\'' + title);
    ytdl(URL, { filter: format => format.container === 'mp4' && format.quality === 'medium'})
      .pipe(res);
  });
  next()
});

router.get('/get_format', function(req, res, next) {
  var url = req.query.url;
  var URL = 'https://www.youtube.com/' + url 
  var stream = ytdl(URL);
  stream.on('info', (info) => {
    ytdl(URL, { filter: format => format.container === 'mp4' && format.quality === 'medium'})
      .pipe(res);
  });
  next()
});

module.exports = router;