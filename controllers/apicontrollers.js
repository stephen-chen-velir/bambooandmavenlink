module.exports = {
    getBambooTimeOffResult : function (){
        var filehelper = require('./../helpers/filehelper.js');
        filehelper('./config/bambooapi.txt', function(result){
            var datehelper = require('./../helpers/datehelper.js');
            var BambooAPIUrl = 'https://{BAMBOOAPI}@api.bamboohr.com/api/gateway.php/velir/v1/time_off/requests/?start={DATE}&status=approved';
            BambooAPIUrl = BambooAPIUrl.replace('{BAMBOOAPI}', result)
                .replace('{DATE}',datehelper.getYesterday());
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
        var datehelper = require('./../helpers/datehelper.js');
        _.forEach(bamboomreponse, function(value){
            if (value.status[0].$.lastChanged == datehelper.getYesterday()){
                console.log(value.$.id);
                var output = timeoffrequest.mavenlinkAPIOut(value);
                insertToMavenLinkRequest(output,result);
                democounter++;
            }
        });
        console.log(democounter);
    });
}

var insertToMavenLinkRequest = function(title,apitoken){
    var request = require('request');
    var totalurl = 'https://velir.mavenlink.com/api/v1/stories.json?story[title]={TITLE}&story[workspace_id]=11785877&story[story_type]=task&story[parent_id]=132729587&access_token={MAVENLINK}';
    totalurl = totalurl.replace('{TITLE}', title).replace('{MAVENLINK}',apitoken); 
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
         console.log("Data inserted" + new Date());
     }
}
