/**
 * Created by Pavel Prochazka on 09/12/14.
 */

ctrls.controller("companyCtrl", ['$scope', '$http', 'Company', 'UserService', function ($scope, $http, Company, UserService) {  //have to load Company and UserService SERVICE

    $scope.editedCompany = null;  //edited company
    $scope.isEditing = false;

    // Get specific company
    var c = Company.query({username:UserService.user.username}, function() {
        $scope.company = c[0];
    });

    //Edit
    $scope.edit = function(){
        $scope.isEditing = true;

        $scope.editedCompany = angular.copy($scope.company)
    }

    $scope.abortEdit = function(){
        $scope.isEditing = false;

        $scope.editedCompany = null;
    }

    $scope.confirmEdit = function(){
        Company.update({username:$scope.company.username}, $scope.editedCompany,
            function(resp) {
                $scope.company = resp;  //set the newly updated company object to scope

                $scope.abortEdit();      //invoke abort so that elements are rendered accordingly & editedCompany set to NULL

                $("#company-edit-confirm").modal(); //show modal pop-up
            },
            function(resp) {
                // TODO: Post error message somehow
                console.log("Save edit failed..");
            }
        );
    }


    //Deletion
    $scope.delete = function() {
        $("#company-delete-confirm").modal();
    };

    $scope.confirmDelete = function(){
        console.log("aaa");

        /*User.remove( {username:company.model.username},
            function() {
                user.deleted = true;
                _.remove($scope.users, function(item) { return item.model.username == user.model.username });
                userDone()
            },
            function() {
                user.deleteFailed = true;
                userDone()
            }
        );*/
    }

}]);

ctrls.filter('formatDate', function() {
    return function(input, format) {
        var date = moment(input);
        return date.format(format);
    };
});