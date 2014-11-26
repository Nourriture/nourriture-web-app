/**
 * Created by niels on 11/26/14.
 *
 * Main angular script file where controllers are either defined or referenced
 */

var app = angular.module('NourritureWebApp', []);

app.controller("MainCtrl", ['$scope', '$http', function ($scope, $http) {
    // Application state
    $scope.name = "John";
}]);