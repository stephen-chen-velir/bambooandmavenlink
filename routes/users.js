'use strict';

var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('you are here');
});

module.exports = router;
