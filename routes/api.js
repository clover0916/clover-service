const { request } = require('express');
var express = require('express');
var router = express.Router();

const ytdl = require('youtube-dl');

/* GET users listing. */
router.get('/get_video', async function(req, res, next) {
  try {
    var url = req.query.id;
    var URL = 'https://www.youtube.com/watch?v=' + url 
    const video = ytdl(url, ['-f bestvideo+bestaudio']);

    video.on('info', function(info) {
      var title = encodeURIComponent(info.title + '.mp4')
      res.header('Content-Disposition', 'attachment; filename*=UTF-8\'\'' + title);
      video.pipe(res);
    })
  } catch (err) {
    res.send("Too many request.")
  }
});

router.get('/video_info', async function(req, res, next) {
  var id = req.query.id;
  var URL = 'https://www.youtube.com/watch?v=' + id
  try {
    const info = await ytdl.getInfo(URL);
    res.json(info)
  } catch (err) {
    res.json({ "error_message": err})
  }
});

module.exports = router;