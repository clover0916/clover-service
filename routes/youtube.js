var express = require('express');
var router = express.Router();

const ytdl = require('ytdl-core');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  var url = req.query.url;
  var URL = 'https://www.youtube.com/' + url 
  
  let info = await ytdl.getInfo(URL);
  let format = ytdl.chooseFormat(info.formats, { quality: '134' });
  console.log('Format found!', format);

  format.on('info', (info) => {
    var title = encodeURIComponent(info.player_response.videoDetails.title + '.mp4')
    res.header('Content-Disposition', 'attachment; filename*=UTF-8\'\'' + title);
    format.pipe(res);
  });
});

module.exports = router;