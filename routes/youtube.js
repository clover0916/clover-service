var express = require('express');
var router = express.Router();

const ytdl = require('ytdl-core');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.set('Content-Type', 'video/mp4');
  
  var videoUrl = req.query.videoUrl;
  var videoName;
  
  ytdl.getInfo(videoUrl, function(err, info) {
    videoName = info.title.replace('|', '').toString('ascii');
    res.set('Content-Disposition', 'attachment; filename=' + videoName + '.mp4');
  });
  
  var videoWritableStream = fs.createWriteStream('..' + '/public' + videoName); // some path on my computer (exists!)
  var videoReadableStream = ytdl(videoUrl);
  
  var stream = videoReadableStream.pipe(videoWritableStream);
});

module.exports = router;
