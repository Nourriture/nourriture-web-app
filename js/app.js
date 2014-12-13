/**
 * Created by niels on 11/30/14.
 *
 * Main Angular script file for application
 */

//create a module with injected modules in brackets (our custom MODULES)
var app = angular.module('nourWebApp', ["ngRoute", "ngResource", "nourConfig", "nourControllers", "userServices", "recipeServices", "companyServices", "ingredientServices", "gastronomistServices"]);

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
            when('/user/create', {
                templateUrl: "/partials/createUser.html",
                controller: "createUserCtrl"
            }).
            when('/users', {
                templateUrl: "/partials/users.html",
                controller: "manageUsersCtrl"
            }).
            when('/recipes/create', {
                templateUrl: "/partials/createRecipes.html",
                controller: "recipesCtrl"
            }).
            when('/recipes/update', {
                templateUrl: "/partials/updateRecipes.html",
                controller: "updateRecipes"
            }).
            when('/recipes/search', {
                templateUrl: "/partials/searchRecipes.html",
                controller: "searchRecipes"
            }).
            when('/recipes/profile', {
                templateUrl: "/partials/recipeProfile.html",
                controller: "profileRecipes"
            }).
            when('/gastronomists', {
                templateUrl: "/partials/gastronomists.html",
                controller: "gastronomistsCtrl"
            }).
            when('/gastronomistProfile', {
                templateUrl: "/partials/gastronomistProfile.html",
                controller: "gastronomistsCtrl"
            }).
            when('/createGastronomistProfile', {
                templateUrl: "/partials/createGastronomistProfile.html",
                controller: "gastronomistCreationCtrl"
            }).
            when('/companyProfile', {
                templateUrl: "/partials/companyProfile.html",
                controller: "companyCtrl"
            }).
            when('/createCompanyProfile', {
                templateUrl: "/partials/createCompanyProfile.html",
                controller: "companyCreationCtrl"
            }).
            when('/ingredientProfile', {
                templateUrl: "/partials/ingredientProfile.html",
                controller: "ingredientCtrl"
            }).
            when('/createIngredientProfile', {
                templateUrl: "/partials/createIngredientProfile.html",
                controller: "ingredientCreationCtrl"
            }).
            when('/upload', {
                templateUrl: "/partials/upload.html",
                controller: "uploadCtrl"
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);