module.exports = {
    getBambooTimeOffResult : function (){
        var filehelper = require('./../helpers/filehelper.js');
        filehelper('./config/bambooapi.txt', function(result){
            console.log(result);
            var BambooAPIUrl = 'https://{BAMBOOAPI}@api.bamboohr.com/api/gateway.php/velir/v1/time_off/requests/';
            BambooAPIUrl = BambooAPIUrl.replace('{BAMBOOAPI}', result);
            var request = require('request');
            request(BambooAPIUrl, function(error, response, body){
                getBambooTimeOffResponse(error, response, body);
            });
        });
    },
}

var getBambooTimeOffResponse = function (error, response, body) {
    if (error)
    {
          console.log(error);
    }
    if (!error && response.statusCode == 200) {
      var parseString = require('xml2js').parseString;
      var xml = body;
      parseString(xml,function(err, result){
          parseBambooResponse(err, result);
      });
    }
}

var parseBambooResponse = function (err, result){
    var timeoffrequest = require('./../models/timeoffrequest.js');
    console.log('first function is done');
    var times = result.requests;
    console.log("getting times of request");
    var requestresults = result.requests.request;
    processBamBooRespose(requestresults);
}

var processBamBooRespose = function (bamboomreponse){
    
    var filehelper = require('./../helpers/filehelper.js');
    filehelper('./config/mavenlink.txt', function(result){
        var timeoffrequest = require('./../models/timeoffrequest.js');
        var _ = require('lodash');
        var democounter = 0;
        _.forEach(bamboomreponse, function(value){
            if (democounter < 2){
                var output = timeoffrequest.mavenlinkAPIOut(value);
                insertToMavenLinkRequest(output,result);
            }
            democounter++;
        });
    });
}

var insertToMavenLinkRequest = function(title,apitoken){
    var request = require('request');
    var totalurl = 'https://velir.mavenlink.com/api/v1/stories.json?story[title]={TITLE}&story[workspace_id]=11785877&story[story_type]=task&story[parent_id]=132729587&access_token={MAVENLINK}';
    totalurl = totalurl.replace('{TITLE}', title).replace('{MAVENLINK}',apitoken); 
    console.log('title is' + totalurl);
    console.log("Inserting into Mavinlink");

    request.post(totalurl, function(error, response, body){
    insertToMavenLinkResponse(error, response, body);
    });
}

var insertToMavenLinkResponse = function(error, response, body){
     if (error){
          console.log(error);
     }
     if (response.statusCode == 200)
     {
         console.log("Data inserted");
     }
}


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