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

    var authResponse = function (error, response, body, res) {
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

    router.post('/csv', upload.single('cvsfile'), function(req, res, next) {
        var dataimporter = require('../controllers/dataImporter/dataimporter.js');
        mavenlinkapi.customFields.getChoices(req.body.accessToken, '95357', function (error, result) { res.send( result) });
        //dataimporter.csv.processCSVLines(req.body.accessToken, req.file.path, function (result) {console.log(result) });
    });

    router.get('/auth/:code', function(req, res, next) {
        mavenlinkapi.authenticate(secret, req.params.code,  clientCode, callbackUrl,
            function (error, response, body) { authResponse(error, response, body, res); });
    });

    return router;
}();