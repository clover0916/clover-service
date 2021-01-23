var express = require('express');
var router = express.Router();

const ytdl = require('ytdl-core');

/* GET users listing. */
router.get('/get_video', async function(req, res, next) {
  var url = req.query.url;
  var URL = 'https://www.youtube.com/' + url 
  
  const video = ytdl(url,{filter: (format) => format.container === 'mp4' });

  video.pipe(res);
  
  video.on('end', () => {
    //DLしたYoutube動画の情報
    ytdl.getInfo(URL, (err, info) => {
      if (err) throw err;
      var title = encodeURIComponent(video.player_response.videoDetails.title + '.mp4')
      
      res.header('Content-Disposition', 'attachment; filename*=UTF-8\'\'' + title);
    });
  });
});

module.exports = router;