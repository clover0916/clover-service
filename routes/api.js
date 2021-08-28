const { request } = require('express');
var express = require('express');
var router = express.Router();
const { createProxyMiddleware } = require('http-proxy-middleware');
var multer = require('multer');
const ytdl = require('ytdl-core');

router.use('/proxy', createProxyMiddleware({ target: 'https://www.youtube.com', pathRewrite: {'^/proxy' : ''}}));
/* GET users listing. */
router.get('/get_video', async function(req, res, next) {
  try {
    var url = req.query.id;
    var URL = 'https://www.youtube.com/watch?v=' + url 
    const video = ytdl(url,{filter: (format) => format.container === 'mp4' });
    const info = await ytdl.getInfo(URL);
    var title = encodeURIComponent(info.videoDetails.title + '.mp4')    
    res.header('Content-Disposition', 'attachment; filename*=UTF-8\'' + title + '\'');
    video.pipe(res);
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

router.post('/img2webp', multer({ dest: '../public/assets/uploads/' }).array('files', 1), async function(req, res, next) {
  console.log('--- req.files ---')
  console.log(req.files)
  res.send(req.file.originalname + 'ファイルのアップロードが完了しました。');
});

module.exports = router;