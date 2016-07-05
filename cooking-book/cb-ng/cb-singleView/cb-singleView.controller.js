(function  () {
    'use strict';

    var app = angular.module("cookingBook.singleView");

    app.controller("CookingBookSingleViewController",
        ['$scope', '$stateParams', 'cbSingleViewService', '$location',
        function($scope, $stateParams, cbSingleViewService, $location){

            /**
             * @type {String} - recipe ID form stateParams
             */
            var currentRecipeId = $stateParams.recipeID;

            /**
             * @type {Object} - single recipe object
             */
            var currentRecipe = cbSingleViewService.findRecipe(currentRecipeId, $scope.recipeList);

            if(currentRecipe === null ) {
                $location.path('/404');
            }else{
                $scope.name = currentRecipe.name;
                $scope.ingredients = currentRecipe.ingredients;
                $scope.description = currentRecipe.description;
                $scope.id = currentRecipeId;

                /**
                 * Check if has any available ingredients
                 * @param  {Object}  - ingredients object of single recipe
                 * @return {Number}  - number of available recipe ingredients;
                 *                     return 1 - no avalible ingredients (default Angular property $$hashKey )
                 */
                $scope.getLength = function(obj) {
                    return Object.keys(obj).length;
                };
            }

    }]);
})();