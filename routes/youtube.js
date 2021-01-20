var express = require('express');
var router = express.Router();

const ytdl = require('ytdl-core');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var videoUrl = req.query.videoUrl;
  
  var videoReadableStream = ytdl(videoUrl);
  
  ytdl.getInfo(videoUrl, function(err, info) {
    var videoName = info.title.replace('|', '').toString('ascii');
  
    var videoWritableStream = fs.createWriteStream('..' + '/public' + videoName + '.mp4');
  
    var stream = videoReadableStream.pipe(videoWritableStream);
  
    stream.on('finish', function() {
      res.writeHead(204);
      res.end();
    });
  });
});

module.exports = router;
