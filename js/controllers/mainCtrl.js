/**
 * Created by niels on 11/26/14.
 *
 *  The main controller module which all other controllers are based on.
 *  Also, the controller "mainCtrl" used by the frontpage is defined here.
 */

var ctrls = angular.module('nourControllers', []);
var host = "http://localhost:2121";
//var host = "http://dev.9la.dk/platform";

ctrls.controller("mainCtrl", ['$scope', '$http', function ($scope, $http) {
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