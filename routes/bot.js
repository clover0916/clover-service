var express = require('express');
var router = express.Router();
var path = require('path');

/* GET users listing. */
router.use(express.static(path.join(__dirname, '..', 'bot')));

router.get('/invite', function(req, res, next) {
  res.redirect('https://discord.com/api/oauth2/authorize?client_id=726804663059480653&permissions=536870911991&scope=applications.commands%20bot');
});

module.exports = router;