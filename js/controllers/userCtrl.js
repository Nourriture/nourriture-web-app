/**
 * Created by niels on 12/1/14.
 *
 * Controller for handling user creation, user settings, login and logout
 */

ctrls.controller("userCtrl", ['$scope', '$http', function ($scope, $http) {
    $scope.loggedIn = false;
    $scope.user = "John";
}]);