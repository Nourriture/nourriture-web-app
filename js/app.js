/**
 * Created by niels on 11/30/14.
 *
 * Main Angular script file for application
 */

var app = angular.module('nourWebApp', ["ngRoute", "nourControllers"]);

app.config(["$routeProvider",
    function ($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: "/partials/frontpage.html",
                controller: "mainCtrl"
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