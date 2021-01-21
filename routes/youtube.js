var express = require('express');
var router = express.Router();

const ytdl = require('ytdl-core');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var url = req.query.url;
  var URL = 'https://www.youtube.com/' + url 
  var stream = ytdl(URL);
  stream.on('info', (info) => {
    var title = info.player_response.videoDetails.title.replace(' ', '_').toString('utf8');
    res.header('Content-Disposition', `attachment; filename="${title}.mp4"`);
    ytdl(URL, {
      format: 'mp4'
    }).pipe(res);
  });
});

module.exports = router;
