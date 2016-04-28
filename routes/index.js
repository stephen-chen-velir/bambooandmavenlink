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
  cronTime: '00 00 16 * * *',
  onTick: function() {
    /*
     * Runs every day
     * at 10:30:00 AM. It does not run on Saturday
     * or Sunday.
     */
     controllers.getBambooTimeOffResult();
  },
  start: false,
  timeZone: 'America/New_York'
});
job.start();

module.exports = router;
