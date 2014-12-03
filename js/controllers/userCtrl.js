/**
 * Created by niels on 12/1/14.
 *
 * Controller for handling user creation, user settings, login and logout
 */

// Login page
ctrls.controller("loginCtrl", ['$scope', '$location', 'UserService', function ($scope, $location, UserService) {
    $scope.attemptLogin = function(credentials) {
        $scope.error = null;
        UserService.logIn(credentials, function(errorCode, status) {
            if(!errorCode) {
                $location.path('/'); // Success! Navigate to front page
            } else {
                if(errorCode == 401) {
                    // Invalid credentials
                    $scope.credentials.password = "";
                    $scope.error = "Invalid"
                } else {
                    // Any other error
                    $scope.error = "Unexpected"
                }
                console.log("Login failed");
            }
        });
    };

    // jQuery junk for bootstrap
    $('.login-using-tooltip').tooltip();
}]);

// User menu in top navigation bar
ctrls.controller("userNavCtrl", ['$scope', "$location", 'UserService', function ($scope, $location, UserService) {
    $scope.loggedIn = UserService.isLoggedIn;
    $scope.username = UserService.currentUsername;

    $scope.$on("user:loginStateChanged", function(event, data) {
        $scope.loggedIn = data.isLoggedIn;
        $scope.username = data.currentUsername;
    });

    $scope.logOut = function() {
        UserService.logOut(function() {
            $location.path("/"); // Navigate to front page
        });
    }
}]);