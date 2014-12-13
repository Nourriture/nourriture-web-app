/**
 * Created by niels on 11/30/14.
 *
 * Controller for listing, adding and editing recipes
 */

ctrls.controller("recipesCtrl", ['$scope', '$http', '$location', "Recipe", "Ingredient", "SaveRecipe", function ($scope, $http, $location, Recipe, Ingredient, SaveRecipe) {

    $scope.addrecipe = {};
    $scope.addrecipe.ingredients = [];
    $scope.addrecipe.instructions = [];
    $scope.tmp = [];
    $scope.ingredientslist = [];
    $scope.loadError = false;
    $scope.difficultys = [1, 2, 3, 4, 5];
    var index = 0;
    var stepIndex = 1;


    $scope.getNumber = function(num)
    {
        return new Array(num);
    }


    $scope.save = function(addrecipe) {
    console.log(addrecipe);

    /*    Recipe.save(id:addrecipe.id, addrecipe);
    $location.path("/recipes/search");*/
    };

    $scope.search = function(name)
      {

        // ----- TEST WITHOUT SERVER -----
        //$scope.tmp = Ingredient.byName(name);
        $scope.tmp = [
        { name: 'Orange',   quantityUnit: 'piece' },
        { name: 'tomato',   quantityUnit: 'piece' },
        { name: 'Ketchup',   quantityUnit: 'ml' },
        { name: 'Cookie',   quantityUnit: 'piece' },
        { name: 'Shite', quantityUnit: 'g' },
        { name: 'Pasta',  quantityUnit: 'g' },
        { name: 'Banana',   quantityUnit: 'piece' },
        { name: 'truc',   quantityUnit: 'piece' },
        { name: 'machin',   quantityUnit: 'ml' },
        { name: 'bidule',   quantityUnit: 'piece' },
        { name: 'chouette', quantityUnit: 'g' },
        { name: 'tralala',  quantityUnit: 'g' },
        { name: 'trololo',   quantityUnit: 'piece' },
        { name: 'Jean-mi',   quantityUnit: 'piece' },
        { name: 'Jackie',   quantityUnit: 'ml' },
        { name: 'Michel',   quantityUnit: 'piece' },
        { name: 'Fred', quantityUnit: 'g' },
        { name: 'Jamie',  quantityUnit: 'g' }];
        //-----------------------------------------
        
        console.log($scope.tmp.length);
        $scope.ingredientslist = [];
        if ($scope.tmp.length > 10)
        {
            for (index = 0; index < 10; index++) {
                $scope.ingredientslist.push($scope.tmp[index]);
            }
        }
        else {
            $scope.ingredientslist = $scope.tmp;
        }
        };
          

    $scope.toggleAdd = function (index) {
        console.log(index);
        if ($scope.addrecipe.ingredients.indexOf($scope.ingredientslist[index]) == -1)
        {
            $scope.addrecipe.ingredients.push($scope.ingredientslist[index]);
        }
    };

    $scope.toggleDelete = function (index) {
        console.log(index);
        $scope.addrecipe.ingredients.splice(index, 1);
    };

    $scope.loadMore = function ()
    {
        var indexTmp = index + 10;
        if (indexTmp > $scope.tmp.length)
            indexTmp = $scope.tmp.length;
        for (index; index < indexTmp; index++) {
            $scope.ingredientslist.push($scope.tmp[index]);
        };
    };


    $scope.stepChange = function()
    {
        for (stepIndex; stepIndex > $scope.steps; stepIndex--) {
        $scope.addrecipe.instructions.pop();
        };
        stepIndex = $scope.steps;
    }

}]);

ctrls.controller("searchRecipes", ['$scope', '$http', '$location', "Recipe", "SaveRecipe", function ($scope, $http, $location, Recipe, SaveRecipe) {

$scope.tmp = [];

$scope.search = function(name)
      {

        //-------- TEST WITHOUT SERVER ------------
        //$scope.tmp = Recipe.byName(name);

        $scope.tmp = [
        { name: 'lazagne',   quantityUnit: 'piece' },
        { name: 'tomato',   quantityUnit: 'piece' },
        { name: 'Ketchup',   quantityUnit: 'ml' },
        { name: 'Cookie',   quantityUnit: 'piece' },
        { name: 'Shite', quantityUnit: 'g' },
        { name: 'Pasta',  quantityUnit: 'g' },
        { name: 'Banana',   quantityUnit: 'piece' },
        { name: 'truc',   quantityUnit: 'piece' },
        { name: 'machin',   quantityUnit: 'ml' },
        { name: 'bidule',   quantityUnit: 'piece' },
        { name: 'chouette', quantityUnit: 'g' },
        { name: 'tralala',  quantityUnit: 'g' },
        { name: 'trololo',   quantityUnit: 'piece' },
        { name: 'Jean-mi',   quantityUnit: 'piece' },
        { name: 'Jackie',   quantityUnit: 'ml' },
        { name: 'Michel',   quantityUnit: 'piece' },
        { name: 'Fred', quantityUnit: 'g' },
        { name: 'Jamie',  quantityUnit: 'g' }];
        
        //--------------------------------------------


        $scope.recipeslist = [];
        if ($scope.tmp.length > 10)
        {
            for (index = 0; index < 10; index++) {
                $scope.recipeslist.push($scope.tmp[index]);
            }
        }
        else {
            $scope.recipeslist = $scope.tmp;
        }
        };

$scope.loadMore = function ()
{
    var indexTmp = index + 10;
    if (indexTmp > $scope.tmp.length)
        indexTmp = $scope.tmp.length;
    for (index; index < indexTmp; index++) {
        $scope.recipeslist.push($scope.tmp[index]);
    };
};


$scope.toggleShow = function (data)
    {
        console.log(data);
        SaveRecipe.set(data);
        $location.path("/recipes/profile");
    }

}]);


ctrls.controller("profileRecipes", ['$scope', '$http', '$location', "Recipe", "SaveRecipe", function ($scope, $http, $location, Recipe, SaveRecipe) {

/*$scope.addrecipe = SaveRecipe.get();*/
//----- TEST WITHOUT SERVER ------
$scope.addrecipe = {title: "Test",
description: "trololololo",
difficulty: 3,
instructions: ["step1", "step2"],
ingredients: [{name: "Orange", quantity: "piece"}, {name: "tomato", quantity: "piece"}]
};
// -----------------------------


$scope.steps = $scope.addrecipe.instructions.length;
$scope.toggleUpdate = function ()
    {
        $location.path("/recipes/update");
    }

    $scope.toggleDelete = function ()
    {
     /*   Recipe.delete(id:addrecipe.id);
        $location.path("/recipes/search");*/
    }

}]);

ctrls.controller("updateRecipes", ['$scope', '$http', '$location', "Recipe", "SaveRecipe", function ($scope, $http, $location, Recipe, SaveRecipe) {

/*$scope.addrecipe = SaveRecipe.get();*/
//----- TEST WITHOUT SERVER -----
$scope.addrecipe = {title: "Test",
description: "trololololo",
difficulty: 3,
instructions: ["step1", "step2"],
ingredients: [{name: "Orange", quantity: "piece"}, {name: "tomato", quantity: "piece"}]
};

// -----------------------------------


$scope.steps = $scope.addrecipe.instructions.length;


    $scope.tmp = [];
    $scope.ingredientslist = [];
    $scope.loadError = false;
    $scope.difficultys = [1, 2, 3, 4, 5];
    var index = 0;
    var stepIndex = 1;


    $scope.getNumber = function(num)
    {
        return new Array(num);
    }


    $scope.save = function(addrecipe) {
    console.log(addrecipe);
    SaveRecipe.set(data);

    //-------- TEST WITHOUT SERVER -----------
    /*Recipe.update(id:addrecipe.id, addrecipe);
    $location.path("/recipes/profile");*/

    // -----------------------------
    };


    $scope.search = function(name)
      {

        

        //-------- TEST WITHOUT SERVER ------------
        //$scope.tmp = Ingredient.query(_id);

        $scope.tmp = [
        { name: 'Orange',   quantityUnit: 'piece' },
        { name: 'tomato',   quantityUnit: 'piece' },
        { name: 'Ketchup',   quantityUnit: 'ml' },
        { name: 'Cookie',   quantityUnit: 'piece' },
        { name: 'Shite', quantityUnit: 'g' },
        { name: 'Pasta',  quantityUnit: 'g' },
        { name: 'Banana',   quantityUnit: 'piece' },
        { name: 'truc',   quantityUnit: 'piece' },
        { name: 'machin',   quantityUnit: 'ml' },
        { name: 'bidule',   quantityUnit: 'piece' },
        { name: 'chouette', quantityUnit: 'g' },
        { name: 'tralala',  quantityUnit: 'g' },
        { name: 'trololo',   quantityUnit: 'piece' },
        { name: 'Jean-mi',   quantityUnit: 'piece' },
        { name: 'Jackie',   quantityUnit: 'ml' },
        { name: 'Michel',   quantityUnit: 'piece' },
        { name: 'Fred', quantityUnit: 'g' },
        { name: 'Jamie',  quantityUnit: 'g' }];
        
        //-------------------------------------------------

        console.log($scope.tmp.length);
        $scope.ingredientslist = [];
        if ($scope.tmp.length > 10)
        {
            for (index = 0; index < 10; index++) {
                $scope.ingredientslist.push($scope.tmp[index]);
            }
        }
        else {
            $scope.ingredientslist = $scope.tmp;
        }
        };
          

    $scope.toggleAdd = function (index) {
        console.log(index);
        if ($scope.addrecipe.ingredients.indexOf($scope.ingredientslist[index]) == -1)
        {
            $scope.addrecipe.ingredients.push($scope.ingredientslist[index]);
        }
    };

    $scope.toggleDelete = function (index) {
        console.log(index);
        $scope.addrecipe.ingredients.splice(index, 1);
    };

    $scope.loadMore = function ()
    {
        var indexTmp = index + 10;
        if (indexTmp > $scope.tmp.length)
            indexTmp = $scope.tmp.length;
        for (index; index < indexTmp; index++) {
            $scope.ingredientslist.push($scope.tmp[index]);
        };
    };


    $scope.stepChange = function()
    {
        for (stepIndex; stepIndex > $scope.steps; stepIndex--) {
        $scope.addrecipe.instructions.pop();
        };
        stepIndex = $scope.steps;
    }



}]);