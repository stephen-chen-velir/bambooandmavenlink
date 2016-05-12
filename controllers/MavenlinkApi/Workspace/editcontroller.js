module.exports = function() {
    
    function generate(attribute, value, isFirst) {
        value = encodeURIComponent(value);
        var queryString = isFirst ? '?' : '&';
        queryString += 'workspace[' + attribute + ']=' + value;
        return queryString;
    }

    function buildQueryString(workspaceId, updateValues) {
        var url = 'https://api.mavenlink.com/api/v1/workspaces/' + workspaceId + '.json';
        for (var i = 0; i < updateValues.length; i++) {
            if (updateValues[i].attribute.toLowerCase() === "workspace id") {
                continue;
            }
            url += generate(updateValues[i].attribute, updateValues[i].value, i === 0);
        }
        return url;
    }

    var edit = function (token, workspaceId, updateValues, oncompleted) {
        var url = buildQueryString(workspaceId, updateValues);
        console.log(url);
       
        var request = require('request');
        request({
            method: 'PUT',
            url: url
        }, function (error, response, body) { oncompleted(response) }).auth(null, null, true, token);
    }

    return edit;
}();