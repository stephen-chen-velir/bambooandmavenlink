module.exports = function () {
    'use strict';

    function generateChoicesUrl(id) {
        var url = 'https://api.mavenlink.com/api/v1/custom_fields.json?include=choices&only=' + id;
        return url;
    }

    var choices = function (token, customFieldId, oncompleted) {
        var url = generateChoicesUrl(customFieldId);
        var mlRequest = require('../mlRequest.js');
        mlRequest.get(token, url, oncompleted);
    };

    return choices;
}();