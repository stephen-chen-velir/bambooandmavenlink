module.exports = function() {

    function generateOAuthUrl(secret, code, clientCode, callbackUrl) {
        var authUrl = "https://app.mavenlink.com/oauth/token?client_id=" + clientCode +
            "&client_secret=" + secret +
            "&grant_type=authorization_code" +
            "&code=" + code +
            "&redirect_uri=" + callbackUrl;
        return authUrl;
    }

    var auth = function (secret, code, clientCode, callbackUrl, oncompleted) {
        var url = generateOAuthUrl(secret, code, clientCode, callbackUrl);
        var request = require('request');
        request.post(url, function (error, response, body) {
            oncompleted(error, response, body);
        });
    };

    return auth;
}();