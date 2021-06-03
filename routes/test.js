var express = require('express');
var router = express.Router();
var path = require('path');

/* GET users listing. */
router.use(express.static(path.join(__dirname, '..', 'test')));

module.exports = router;