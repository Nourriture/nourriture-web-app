/**
 * Created by niels on 11/30/14.
 *
 * Controller for listing, adding and editing recipes
 */

ctrls.controller("recipesCtrl", ['$scope', '$http', "Recipe", function ($scope, $http, Recipe) {
    $scope.recipes = [];
    $scope.loadError = false;

    // Get specific recipe
    var recipe = Recipe.get({id:"547d1d02b26533900daa3074"}, function() {
        if(recipe) {
            console.log(JSON.stringify(recipe));
        }
    });

    // Get recipes by author (Alternatively we could implement this as Recipe.query({authorId:35832..})
    var authorsRecipes = Recipe.byAuthor({authorId:"54775770df67049a124cbd8c"}, function() {
        if(authorsRecipes) {
            console.log(JSON.stringify(authorsRecipes));
        }
    });

    // Get all recipes
    $scope.recipes = Recipe.query(function() {
        if($scope.recipes) {
            $scope.loadError = false;
            console.log("Yay, recipes loaded!");
        } else {
            $scope.loadError = true;
            console.log("Recipes failed t o load :(");
        }
    });

    // The following are also supported:
    //  * Recipe.save
    //  * Recipe.remove

}]);