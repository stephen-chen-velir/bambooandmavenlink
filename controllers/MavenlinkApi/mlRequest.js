module.exports = function() {
    var mlRequest = {};

    var urlRequest = function(method, token, url, oncompleted) {
        var request = require('request');
        request({
            method: method,
            url: url
        }, function(error, response, body) { oncompleted(error, response) }).auth(null, null, true, token);
    };

    mlRequest.put = function (token, url, oncompleted) {
        urlRequest('PUT', token, url, oncompleted);
    };

    mlRequest.get = function(token, url, oncompleted) {
        urlRequest('GET', token, url, oncompleted);
    };

    return mlRequest;
}();