'use strict';

var express = require('express');
var router = express.Router();
var controllers = require('./../controllers/apicontrollers');
const BambooAPIUrl = 'https://8ad23b9ba5e48391131154b1f063c164b47ff0aa:x@api.bamboohr.com/api/gateway.php/velir/v1/time_off/requests/'




/* GET home page. */
/*
var getBambooTimeOffResult = function(){
     var request = require('request'); 
     request(BambooAPIUrl, function (error, response, body) {
          if (error)
          {
                  console.log(error);
          }
          if (!error && response.statusCode == 200) {
              var parseString = require('xml2js').parseString;
              var xml = body;
              parseString(xml,function(err, result){
                  console.log('first function is done');
                  var times = result.requests;
                  //console.log(times.count());
                  console.log("getting times of request");
                  var requestresults = result.requests.request;
                  console.log(requestresults.length);
                  for(var i=0; i< requestresults.length; i++){
                     console.log("Insert record: " + (i+1));
                     var output = timeoffrequest.mavenlinkAPIOut(requestresults[i])
                     insertToMavenLink(output)
                  }
                  
                  //var output = timeoffrequest.mavenlinkAPIOut(result.requests.request[0])
                  //console.log(output);
                  //insertToMavenLink(output);
                  
                  //console.log(times);
                  //return times;
              });
          }
    });
}
*/ 
/*
var insertToMavenLink = function(title){
     var request = require('request');
     //var url = 'https://velir.mavenlink.com/api/v1/stories.json';
     //var token = '&access_token=8704bcd242a8707ed94b896a19a597af60df03b0b7a2486791ca76fdd53ae3dc';
     //var totalurl = 'https://velir.mavenlink.com/api/v1/stories.json?story[title]=test100&story[workspace_id]=11785877&story[description]=test1333&story[story_type]=task&story[start_date]=2016-04-25&story[due_date]=2016-04-27&access_token=8704bcd242a8707ed94b896a19a597af60df03b0b7a2486791ca76fdd53ae3dc';
     console.log("Inserting into Mavinlink");
     var totalurl = 'https://velir.mavenlink.com/api/v1/stories.json?story[title]={TITLE}&story[workspace_id]=11785877&story[story_type]=task&access_token=8704bcd242a8707ed94b896a19a597af60df03b0b7a2486791ca76fdd53ae3dc';
     totalurl = totalurl.replace('{TITLE}', title); 
     console.log('title is' + totalurl);
     request.post(totalurl, function(error, response, body){
         //console.log(response);
         if (error){
              console.log(error);   
         }
         
         if (response.statusCode == 200)
         {
             console.log("Data inserted");
         }
     });
}
*/ 
var helloworldfunction = function() {
    var filehelper = require('./../helpers/filehelper.js');
   filehelper('./config/bambooapi.txt', function(result){
       console.log(result);
   });
}

helloworldfunction();   

router.get('/', function(req, res, next) {
   //controllers.getBambooTimeOffResult();
   res.render('index', { title: 'hello',body: 'bodytext'});
});





var CronJob = require('cron').CronJob;
var job = new CronJob({
  cronTime: '00 26 16 * * *',
  onTick: function() {
    /*
     * Runs every weekday (Monday through Friday)
     * at 11:30:00 AM. It does not run on Saturday
     * or Sunday.
     */
     controllers.getBambooTimeOffResult();
  },
  start: false,
  timeZone: 'America/New_York'
});
job.start();

module.exports = router;
