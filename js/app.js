/**
 * Created by niels on 11/30/14.
 *
 * Main Angular script file for application
 */

var app = angular.module('nourWebApp', ["ngRoute", "nourControllers", "userServices"]);

app.config(["$routeProvider", "$httpProvider",
    function ($routeProvider, $httpProvider) {
        $httpProvider.defaults.withCredentials = true;

        $routeProvider.
            when('/', {
                templateUrl: "/partials/frontpage.html",
                controller: "mainCtrl"
            }).
            when('/login', {
                templateUrl: "/partials/login.html",
                controller: "loginCtrl"
            }).
            when('/recipes', {
                templateUrl: "/partials/recipes.html",
                controller: "recipesCtrl"
            }).
            when('/gastronomists', {
                templateUrl: "/partials/gastronomists.html",
                controller: "gastronomistsCtrl"
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);