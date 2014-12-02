/**
 * Created by niels on 12/1/14.
 */

var userServices = angular.module('userServices', ["nourConfig"]);

userServices.factory('UserService', ['$rootScope', '$http', 'config',
    function($rootScope, $http, config){
        var api = {
            isLoggedIn: false, // TODO: Make sure to update isLoggedIn upon instantiation (incase user has existing session upon page load)
            currentUsername: null
        };

        // Attempt to log in to Nourriture platform
        api.logIn = function(credentials, callback) {
            $http.post(config.BE_HOST + "/login", credentials).
                success(function(data, status, headers, config) {
                    if(status == 200) {
                        // Update login state
                        api.isLoggedIn = true;
                        api.currentUsername = credentials.username;
                        // Broadcast state change
                        $rootScope.$broadcast("user:loginStateChanged", api);
                        // Return
                        callback();
                    } else {
                        callback(status);
                    }
                })
                .error(function(data, status, headers, config) {
                    if(status == 0) {
                        callback(-1);
                    } else {
                        callback(status);
                    }
                });
        };

        // Log Out
        api.logOut = function(callback) {
            $http.get(config.BE_HOST + "/logout").
                success(function(data, status, headers, config) {
                    if(status == 200) {
                        // Update login state
                        api.isLoggedIn = false;
                        api.currentUsername = "";
                        // Broadcast state change
                        $rootScope.$broadcast("user:loginStateChanged", api);
                        // Return
                        callback();
                    } else {
                        callback(status);
                    }
                })
                .error(function(data, status, headers, config) {
                    if(status == 0) {
                        callback(-1);
                    } else {
                        callback(status);
                    }
                });
        };

        return api;
    }]);