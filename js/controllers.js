/**
 * Created by niels on 11/26/14.
 *
 * Main angular script file where controllers are either defined or referenced
 */

var app = angular.module('NourritureWebApp', []);
var host = "http://localhost:2121";
//var host = "http://dev.9la.dk/platform";

app.controller("MainCtrl", ['$scope', '$http', function ($scope, $http) {
    // Application state
    $scope.name = "World";
    $scope.ingredients = [];
    $scope.loaderror = false;

    // Get ingredients
    $http.get(host + "/ingredient")
        .then(
            // Success
            function (res) {
                $scope.loaderror = false;
                $scope.ingredients = res.data;
            },
            // Failure
            function (res) {
                $scope.loaderror = true;
                console.log("Failed to retrieve ingredients");
            }
        );
}]);