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

    if($scope.loggedIn) {
        $scope.username = UserService.user.username;
    }

    $scope.$on("user:loginStateChanged", function(event, data) {
        $scope.loggedIn = data.isLoggedIn;
        if($scope.loggedIn) {
            $scope.username = data.user.username;
        } else {
            $scope.username = "";
        }
    });

    $scope.logOut = function() {
        UserService.logOut(function() {
            $location.path("/"); // Navigate to front page
        });
    };

    UserService.refreshLoginState();
}]);

// "Manage users" page
ctrls.controller("manageUsersCtrl", ['$scope', "$location", 'User', function ($scope, $location, User) {
    $scope.loadError = false; // TODO: Use this to show error on page in case of failure
    $scope.users = [];
    $scope.cur = null;
    $scope.deleting = [];
    $scope.checkedUsers = [];
    $scope.checkedCount = 0;

    // Retrieve list of users
    User.query({},
        // Success
        function(users) {
            var userWrappers = [];
            angular.forEach(users, function(user) {
                userWrappers.push({ model: user });
            });
            $scope.users = userWrappers;
        },
        // Error
        function() {
            $scope.loadError = true;
        }
    );

    $scope.checkedChanged = function() {
        var checkedUsers = _.filter($scope.users, "checked");
        $scope.checkedUsers = checkedUsers;
        $scope.checkedCount = checkedUsers.length;
    };

    // Start editing as user
    $scope.startEdit = function(user) {
        if(!user) {
            user = $scope.checkedUsers[0];
        }
        $scope.cur = angular.copy(user);
    };

    $scope.startDelete = function(user) {
        if(user) {
            $scope.deleting.push(user)
        } else {
            $scope.deleting = $scope.checkedUsers;
        }
        $("#user-delete-confirm").modal();
    };

    // Attempt to save edits
    $scope.attemptSave = function(user) {
        if(!user) {
            user = $scope.checkedUsers[0];
        }

        User.update({username:user.username}, user,
            function(resp) {
                $scope.cur = null;
            },
            function(resp) {
                // TODO: Post error message somehow
                console.log("Save edit failed..");
            }
        );
    };

    $scope.attemptDelete = function() {
        async.each($scope.deleting,
            // For each user
            function(user, userDone) {
                if(!user.deleted) {
                    User.remove( {username:user.model.username},
                        function() {
                            user.deleted = true;
                            _.remove($scope.users, function(item) { return item.model.username == user.model.username });
                            userDone()
                        },
                        function() {
                            user.deleteFailed = true;
                            userDone()
                        }
                    );
                }
            },
            // When all done
            function() {
                // Check if we are done
                var deletedUsers = _.filter($scope.deleting, "deleted");
                if(deletedUsers.length == $scope.deleting.length) {
                    // Close dialog
                    $("#user-delete-confirm").modal('hide');
                }
            }
        );
    };

    // Discard current edits
    $scope.discardEdits = function() {
        $scope.cur = null;
    };
}]);

ctrls.filter('formatDate', function() {
        return function(input, format) {
            var date = moment(input);
            return date.format(format);
        };
    });

ctrls.filter('fromNow', function() {
    return function(input) {
        var date = moment(input);
        return date.fromNow();
    };
});