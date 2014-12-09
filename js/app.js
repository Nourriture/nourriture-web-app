/**
 * Created by niels on 11/30/14.
 *
 * Main Angular script file for application
 */

//create a module with injected modules in brackets (our custom MODULES)
var app = angular.module('nourWebApp', ["ngRoute", "ngResource", "nourConfig", "nourControllers", "userServices", "recipeServices", "companyServices"]);

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
            when('/users', {
                templateUrl: "/partials/users.html",
                controller: "manageUsersCtrl"
            }).
            when('/recipes', {
                templateUrl: "/partials/recipes.html",
                controller: "recipesCtrl"
            }).
            when('/gastronomists', {
                templateUrl: "/partials/gastronomists.html",
                controller: "gastronomistsCtrl"
            }).
            when('/companyProfile', {
                templateUrl: "/partials/companyProfile.html",
                controller: "companyCtrl"
            }).
            when('/gastronomistProfile', {
                templateUrl: "/partials/gastronomistProfile.html",
                controller: "gastronomistsCtrl"
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);