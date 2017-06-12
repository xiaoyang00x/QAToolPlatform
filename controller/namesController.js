angular.module('myApp', []).controller('interfaceName', function ($scope, $http) {
    var url = 'http://' + window.serverIP + ':3000/postman/getAllInterfaceList';// URL where the Node.js server is running
    $http.get(url).success(function (data) {
        if(data.indexOf("404")>0)
            alert(data);
        $scope.list = data
    });
});