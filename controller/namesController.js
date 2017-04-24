angular.module('myApp', []).controller('interfaceName', function($scope,$http) {
   var url = 'http://10.0.1.167:3000/postman/getAllInterfaceList';// URL where the Node.js server is running 
    $http.get(url).success(function(data) {
       $scope.list  = data
    });
});