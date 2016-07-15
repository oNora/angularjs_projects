(function  () {
    'use strict';

    var app = angular.module("cookingBook.singleView");


    /**
     * @ngdoc controller
     * @name cookingBook.singleView.controller:SingleViewController
     * @module cookingBook.singleView
     * @description

     * Manage single view of recipe.
     *
     */
    app.controller("SingleViewController",
        ['$scope', '$stateParams', 'cbSingleViewService', '$location',
        function($scope, $stateParams, cbSingleViewService, $location){

            /**
             * @ngdoc property
             * @name currentRecipeId
             * @propertyOf cookingBook.singleView.controller:SingleViewController

             * @description
             * recipe ID form stateParams (String)
             */
            var currentRecipeId = $stateParams.recipeID;

            /**
             * @ngdoc property
             * @name currentRecipe
             * @propertyOf cookingBook.singleView.controller:SingleViewController

             * @description
             * Single recipe object
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
                 * @ngdoc method
                 * @name getLength
                 * @methodOf cookingBook.singleView.controller:SingleViewController
                 * @description

                 * Check if has any available ingredients
                 * @param  {Object} obj - ingredients object of single recipe
                 * @return {Number}     - number of available recipe ingredients;
                 *                      if return 1 - no avalible ingredients (default Angular property $$hashKey )
                 */
                $scope.getLength = function(obj) {
                    return Object.keys(obj).length;
                };
            }

    }]);
})();