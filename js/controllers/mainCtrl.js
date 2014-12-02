/**
 * Created by niels on 11/26/14.
 *
 *  The main controller module which all other controllers are based on.
 *  Also, the controller "mainCtrl" used by the frontpage is defined here.
 */

var ctrls = angular.module('nourControllers', []);

ctrls.controller("mainCtrl", ['$scope', '$http', function ($scope, $http) {
    // Application state
    $scope.name = "World";
}]);