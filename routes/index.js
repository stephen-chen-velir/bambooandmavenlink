'use strict';

var express = require('express');
var router = express.Router();
var controllers = require('./../controllers/apicontrollers');

router.get('/', function(req, res, next) {
   //controllers.getBambooTimeOffResult();
   res.render('index', { title: 'hello',body: 'bodytext'});
});





var CronJob = require('cron').CronJob;
var job = new CronJob({
  cronTime: '00 26 16 * * *',
  onTick: function() {
     controllers.getBambooTimeOffResult();
  },
  start: false,
  timeZone: 'America/New_York'
});
job.start();

module.exports = router;
