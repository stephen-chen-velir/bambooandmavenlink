module.exports = function() {
    'use strict';

    var express = require('express');
    var router = express.Router();
    var multer = require('multer');
    var clientCode = "8c2bed3570eab61d3271a9e5c02cd26960c5bd07b46455c0179106ba92d96bbc";
    var callbackUrl = encodeURIComponent("http://mavenlink.sol.velir.com/bulk.htm");
    var secret = "46ce07310cc2ac54c9563e391fd622cdb3599e9620a3ca3e9cc760e32b567e2b";
    var upload = multer({ dest: 'uploads/' });
    var mavenlinkapi = require('../controllers/MavenlinkApi/mavenlinkapi.js');
    
    var responseObj = {
        successful: false,
        content: 'error'
    };
    router.post('/csv', upload.single('cvsfile'), function(req, res, next) {
        var dataimporter = require('../controllers/dataImporter/dataimporter.js');
        var r = 'done';
        console.log(typeof (mavenlinkapi.customFields.getChoices));
        mavenlinkapi.customFields.getChoices(req.body.accessToken, '95357', function (error, result) { res.send( result) });
        //dataimporter.csv.processCSVLines(req.body.accessToken, req.file.path, function (result) {console.log(result) });
    });

    router.get('/auth/:code', function(req, res, next) {
        var authUrl = "https://app.mavenlink.com/oauth/token?client_id=" + clientCode +
            "&client_secret=" + secret +
            "&grant_type=authorization_code" +
            "&code=" + req.params.code +
            "&redirect_uri=" + callbackUrl;

        var request = require('request');
        request.post(authUrl, function(error, response, body) {
            authResponse(error, response, body, res);
        });
    });

    router.get('/customchoices/:id', function(req, res, next) {
        
    });

    router.get('/search/:accessKey/:term', function (req, res, next) {
        var search = require('../controllers/MavenlinkApi/searchcontroller.js');

        var resultCb = function(error, response, body) {
            res.send(JSON.stringify(body));
        }
        search.search(req.params.accessKey, [req.params.term, 'velir', 'bayer'], resultCb);
    });

    var authResponse = function(error, response, body, res) {
        if (error) {
            res.send(JSON.stringify(responseObj));
        } else if (response.statusCode === 200) {
            responseObj.successful = true;
            responseObj.content = JSON.parse(body);
            res.send(JSON.stringify(responseObj));
        } else {
            responseObj.content = response.statusCode;
            res.send(JSON.stringify(responseObj));
        }
    };

    return router;
}();