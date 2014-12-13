/**
 * Created by niels on 12/2/14.
 */

var recipeServices = angular.module('recipeServices', ['ngResource', 'nourConfig']);

recipeServices.factory('Recipe', ['$resource', 'config',
    function ($resource, config) {
        return $resource(config.BE_HOST + '/recipe/:id', {}, {
            byAuthor: {
                method:'GET',
                url:config.BE_HOST + '/recipe/author/:authorId',
                isArray:true
            },
            update: {
                method:'PUT',
                url:config.BE_HOST + '/recipe/:id'
            }
        });
    }]).factory('SaveRecipe', function () 
    {
    	var savedData = {}
		 function set(data) {
		   savedData = data;
		 }
		 function get() {
		  return savedData;
		 }

		 return {
		  set: set,
		  get: get
		 }

    });