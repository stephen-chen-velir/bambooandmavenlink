angular.module("bulkEdit")
    .constant("dataUrl", "http://mavenlink.sol.velir.com/")
    .controller("bulkEditCtrl", function ($scope, $http, dataUrl) {
        $scope.data = {};
        $scope.data.accesstoken = "";

    var clientCode = "8c2bed3570eab61d3271a9e5c02cd26960c5bd07b46455c0179106ba92d96bbc";
    var callbackUrl = encodeURIComponent("http://mavenlink.sol.velir.com/bulk.htm");
    var secret = "46ce07310cc2ac54c9563e391fd622cdb3599e9620a3ca3e9cc760e32b567e2b";

    var getQueryString = function (field, url) {
        var href = url ? url : window.location.href;
        var reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
        var string = reg.exec(href);
        return string ? string[1] : null;
    };

    var authenticate = function(code) {
        var authUrl = dataUrl + "bulkEdit/auth/" + code;
        var result = $http({
            url: authUrl,
            params: {}
        }).then(function mySucces(response) {
            if (response.data.successful) {
                $scope.data.accesstoken = response.data.content.access_token;

            } else {
                window.location.href = "https://app.mavenlink.com/oauth/authorize?response_type=code&client_id=" + clientCode + "&redirect_uri=" + callbackUrl;
            }
        });
    }

    var init = function() {
        var code = getQueryString("code");
        
        if (!code) {
            window.location.href = "https://app.mavenlink.com/oauth/authorize?response_type=code&client_id=" + clientCode + "&redirect_uri=" + callbackUrl;
        } else {
            authenticate(code);
        }
       
    };

   
    init();
});