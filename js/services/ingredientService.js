var ingredientServices = angular.module('ingredientServices', ['ngResource', 'nourConfig']);

ingredientServices.factory('Ingredient', ['$resource', 'config',
    function ($resource, config) {
        return $resource(config.BE_HOST + '/ingredient/:name', {}, {
            update: {
                method:'PUT',
                url:config.BE_HOST + '/ingredient/:name'
            }
        });
    }]);