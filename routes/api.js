var express = require('express');
var router = express.Router();

const ytdl = require('ytdl-core');

/* GET users listing. */
router.get('/get_video', async function(req, res, next) {
  var url = req.query.url;
  var URL = 'https://www.youtube.com/' + url 
  
  const video = ytdl(url,{filter: (format) => format.container === 'mp4' });

  var title = encodeURIComponent(info.player_response.videoDetails.title + '.mp4')
  res.header('Content-Disposition', 'attachment; filename*=UTF-8\'\'' + title);
  video.pipe(res);
});

module.exports = router;