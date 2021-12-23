const { request } = require('express');
var express = require('express');
var router = express.Router();
var multer = require('multer');
const ytdl = require('ytdl-core');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

/* GET users listing. */
router.get('/get_video', async function(req, res, next) {
  try {
    var url = req.query.id;
    var URL = 'https://www.youtube.com/watch?v=' + url
    ytdl(url, { filter: (format) => format.container === 'mp4' }).pipe(res)
  } catch (err) {
    res.end(`{"error": ${err}}`)
    return;
  }
});

router.get('/video_info', async function(req, res, next) {
  var id = req.query.id;
  var URL = 'https://www.youtube.com/watch?v=' + id
  try {
    const info = await ytdl.getInfo(URL);
    res.json(info)
  } catch (err) {
    res.end(`{"error": ${err}}`)
    return;
  }
});

router.post('/img2webp', multer({ dest: 'img2webp/original/' }).array('files', 1), async function(req, res, next) {
  console.log('--- req.body --')
  console.log(req.body)
  console.log('--- req.files ---')
  console.log(req.files)

  const imgName = req.files[0].originalname.split('.')[0];
  sharp(req.files[0].path)
    .webp({
      quality: 100
    })
    .toFile(path.resolve(`routes/img2webp/webp/${imgName}.webp`), async (err) => {
      if (err) console.error(err);
      fs.unlinkSync(req.files[0].path);
      const fileName = encodeURIComponent(`${imgName}.webp`);
      res.set({ 'Content-Disposition': `attachment; filename=${fileName}` });
      var filestream = fs.createReadStream(path.resolve(`routes/img2webp/webp/${imgName}.webp`));
      filestream.pipe(res);
    });

});

module.exports = router;