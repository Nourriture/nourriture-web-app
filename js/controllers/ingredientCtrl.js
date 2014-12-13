ctrls.controller("ingredientCtrl", ['$scope', '$http', '$location', 'Ingredient', 'UserService', function ($scope, $http, $location, Ingredient, UserService) {

    $scope.ingredient = {};
    $scope.missingRequired = false;

    var ingr = Ingredient.query({username:UserService.user.username}, function() {
        $scope.ingredient = ingr[0];
    });

    $scope.edit = function(){
        $scope.isEditing = true;

        $scope.editedIngerdient = angular.copy($scope.ingredient)
    }

    $scope.abortEdit = function(){
        $scope.isEditing = false;

        $scope.editedIngredient = null;
    }

    $scope.confirmEdit = function(){
        Company.update({username:$scope.ingredient.username}, $scope.editedIngredient,
            function(resp) {
                $scope.ingredient = resp;

                $scope.abortEdit();

                $("#ingredient-edit-confirm").modal();
            },
            function(resp) {
                // TODO: Post error message somehow
                console.log("Save edit failed..");
            }
        );
    }


    //Deletion
    $scope.delete = function() {
        $("#ingredient-delete-confirm").modal();
    };

    $scope.confirmDelete = function(){

        Ingredient.remove( {username:$scope.ingredient.username},
            function() {
                UserService.logOut(function() {
                    $location.path("/");
                });
            },
            function() {
                // TODO: Post error message somehow
                console.log("Deletion failed...");
            }
        );
    }
}]);

ctrls.controller("ingredientCreationCtrl", ['$scope', '$http', "$location", 'Ingredient', 'UserService', function ($scope, $http, $location, Ingredient, UserService) {

    $scope.ingredient = {};
    $scope.missingRequired = false;

    // Submit form
    $scope.submit = function(){
        console.log("Submitting");

        if($scope.ingredient != null && $scope.ingredient.name != ""){
            $scope.ingredient.username = UserService.user.username;
            Ingredient.save({}, $scope.ingredient,
                function(response){
                    console.log("Success");

                    $("#ingredient-created-confirm").modal();
                },
                function(response){
                   console.log("Ups error");
                });
        }
        else{
            $scope.missingRequired = true;
        }
    }

    // Reset form values
    $scope.reset = function(){
        $scope.ingredient = null;
        $scope.missingRequired = false;
    }

    $scope.finishCreation = function(){
        console.log("Profile creation finished, redirect to the front page")

        $location.path("/");
    }
}]);