/**
 * Created by niels on 12/2/14.
 */

var recipeServices = angular.module('recipeServices', ['ngResource']);

recipeServices.factory('Recipe', ['$resource',
    function ($resource) {
        return $resource(host + '/recipe/:id', {}, {
            byAuthor: {method:'GET', url:host + '/recipe/author/:authorId', isArray:true}
        });
    }]);