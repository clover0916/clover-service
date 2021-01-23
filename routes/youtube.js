var express = require('express');
var router = express.Router();

const ytdl = require('ytdl-core');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var url = req.query.url;
  var URL = 'https://www.youtube.com/' + url 
  var video = ytdl(URL, { format: 'mp4'});
  
  ytdl.getInfo(URL, (err, info) => {
    if (err) throw err;
    let format = ytdl.chooseFormat(info.formats, { quality: 'highest' })
    if (format) {
      console.log('Format found!', format);
    } else {
      console.log('Not Found...')
    }
  })
  stream.on('info', (info) => {
    var title = encodeURIComponent(info.player_response.videoDetails.title + '.mp4')
    res.header('Content-Disposition', 'attachment; filename*=UTF-8\'\'' + title);
    ytdl(URL)
      .pipe(res);
  });
});

module.exports = router;