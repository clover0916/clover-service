var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/invite', function(req, res, next) {
  res.redirect('https://discord.com/api/oauth2/authorize?client_id=726804663059480653&permissions=2147483639&scope=bot');
});

module.exports = router;