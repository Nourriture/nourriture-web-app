

var ingredientServices = angular.module('ingredientServices', ['ngResource', 'nourConfig']);

ingredientServices.factory('Ingredient', ['$resource', 'config',
    function ($resource, config) {
        return $resource(config.BE_HOST + '/ingredient/:id', {}, {
            query: {
                method:'GET',
                isArray:true
            }
        });
    }]);