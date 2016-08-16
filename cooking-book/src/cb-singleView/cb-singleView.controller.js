(function  () {
    'use strict';

    var app = angular.module("cookingBook.singleView");


    /**
     * @ngdoc controller
     * @name cookingBook.singleView.controller:SingleViewController
     * @module cookingBook.singleView
     * @description

     * Управление за view за единична рецепта
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
             * уникален номер на рецепта ID от stateParams(String)
             */
            var currentRecipeId = $stateParams.recipeID;

            /**
             * @ngdoc property
             * @name currentRecipe
             * @propertyOf cookingBook.singleView.controller:SingleViewController

             * @description
             * Обект с данни за единична рецепта
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

                 * Проверяв дали има въведен продукти
                 * @param  {Object} obj - Обект със съдържание на пордукти за конкретна рецепта 
                 * @return {Number}     - число за общия брой на въведените породукти за една рецепта;
                 *                      ако върне 1 - няма въведени продукти (по подразбиране в Angular винъги съдържа парамерът $$hashKey )
                 */
                $scope.getLength = function(obj) {
                    return Object.keys(obj).length;
                };
            }

    }]);
})();