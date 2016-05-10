﻿'use strict';

var express = require('express');
var router = express.Router();
var multer = require('multer');
var clientCode = "8c2bed3570eab61d3271a9e5c02cd26960c5bd07b46455c0179106ba92d96bbc";
var callbackUrl = encodeURIComponent("http://mavenlink.sol.velir.com/bulk.htm");
var secret = "46ce07310cc2ac54c9563e391fd622cdb3599e9620a3ca3e9cc760e32b567e2b";
var upload = multer({dest: 'uploads/'});

var Converter = require("csvtojson");
var converter = new Converter.Converter({});
var responseObj = {
    successful: false,
    content: 'error'
};
router.post('/csv', upload.single('cvsfile'), function (req, res, next) {
    converter.fromFile(req.file.path, function (err, result) {
        console.log(result);
        responseObj.successful = true;
        responseObj.content = result;
        res.send(JSON.stringify(responseObj));
   });
    
    
});

router.get('/auth/:code', function (req, res, next) {
    var authUrl = "https://app.mavenlink.com/oauth/token?client_id=" + clientCode +
             "&client_secret=" + secret +
             "&grant_type=authorization_code" +
             "&code=" + req.params.code +
           "&redirect_uri=" + callbackUrl;
     
    var request = require('request');
    request.post(authUrl, function (error, response, body) {
        authResponse(error, response, body, res);
    });
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


module.exports = router;
