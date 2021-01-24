var express = require('express');
var router = express.Router();

const ytdl = require('ytdl-core');

/* GET users listing. */
router.get('/get_video', async function(req, res, next) {
  var url = req.query.id;
  var URL = 'https://www.youtube.com/watch?v=' + url 
  
  const video = ytdl(url,{filter: (format) => format.container === 'mp4' });
  
  const info = await ytdl.getInfo(URL);

  var title = encodeURIComponent(info.videoDetails.title + '.mp4')
      
  res.header('Content-Disposition', 'attachment; filename*=UTF-8\'\'' + title);
  video.pipe(res);
});

router.get('/video_info', async function(req, res, next) {
  var id = req.query.id;
  var URL = 'https://www.youtube.com/watch?v=' + id
  console.log('Connected!!!')
  try {
    const info = await ytdl.getInfo(URL);
    res.json(info)
  } catch (err) {
    res.json({ "error_message": err})
  }
});

module.exports = router;