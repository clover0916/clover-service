const { request } = require('express');
var express = require('express');
var router = express.Router();

const youtubedl = require('youtube-dl');
const ytdl = require('ytdl-core');

/* GET users listing. */
router.get('/get_video', async function(req, res, next) {
  try {
    var url = req.query.id;
    var URL = 'https://www.youtube.com/watch?v=' + url 
    youtubedl.getInfo(URL ,function(err, info) {
      if (err) throw err
      console.log(info)
      var title = encodeURIComponent(info.title + '.mp4')
      res.header('Content-Disposition', 'attachment; filename*=UTF-8\'\'' + title);
      const video = ytdl(URL)
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