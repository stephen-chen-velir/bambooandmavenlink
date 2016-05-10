
module.exports = function() {
    'use strict';
    var search = {};
    var mlUrl = "https://api.mavenlink.com/api/v1/workspaces.json?search=";
    var _callback;
    var _accessToken = "";
    
    var callCallback = function (error, response, body) {
        if (typeof(_callback) === "function") {
            _callback(error, response, body);
        }    
    }

    var singleSearch = function(workspaceName) {
        var searchUrl = mlUrl + encodeURI(workspaceName);
        var request = require('request');
        request.get(searchUrl, function (error, response, body) {
            callCallback(error, response, body);
        }).auth(null, null, true, _accessToken);
    };
    

    var mutliSearch = function(workspaceNames) {
        
    }

    search.search = function (accessToken, workspaceName, callback) {
        _callback = callback;
        _accessToken = accessToken;

        if (Array.isArray(workspaceName)) {
            mutliSearch();
        } else if (typeof(workspaceName) === "string") {
            singleSearch(workspaceName);
        }
    }

    return search;
}();