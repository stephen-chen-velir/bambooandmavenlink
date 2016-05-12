
module.exports = function() {
    'use strict';
    var search = {};
    var mlUrl = "https://api.mavenlink.com/api/v1/workspaces.json?include_archived=true&search=";
    var _callback;
    var _accessToken = "";
    
    var callCallback = function (error, response, body) {
        if (typeof(_callback) === "function") {
            _callback(error, response, body);
        }    
    }

    var recursiveSearch = function (error, response, body,workspaceNames, data) {
        if (!Array.isArray(data)) {
            data = [];
        }
        data.push(body);
        if (workspaceNames.length > 0) {
            var searchUrl = mlUrl + encodeURI(workspaceNames[0]);
            var request = require('request');
            request.get(searchUrl, function (error, response, body) {
                workspaceNames.splice(0, 1);
                recursiveSearch(error, response, body, workspaceNames, data);
            }).auth(null, null, true, _accessToken);
        } else {
            _callback(error, response, data);
        }
    }

    var singleSearch = function(workspaceName) {
        var searchUrl = mlUrl + encodeURI(workspaceName);
        var request = require('request');
        request.get(searchUrl, function (error, response, body) {
            callCallback(error, response, body);
        }).auth(null, null, true, _accessToken);
    };
    

    var mutliSearch = function (workspaceNames) {
        var searchUrl = mlUrl + encodeURI(workspaceNames[0]);
        var request = require('request');
        request.get(searchUrl, function (error, response, body) {
            
            recursiveSearch(error, response, body, workspaceNames, []);
        }).auth(null, null, true, _accessToken);
    }

    search.search = function (accessToken, workspaceName, callback) {
        _callback = callback;
        _accessToken = accessToken;

        if (Array.isArray(workspaceName)) {
            mutliSearch(workspaceName);
        } else if (typeof(workspaceName) === "string") {
            singleSearch(workspaceName);
        }
    }

    return search;
}();