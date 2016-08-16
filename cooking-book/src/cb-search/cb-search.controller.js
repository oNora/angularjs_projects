(function  () {

    'use strict';

    var app = angular.module("cookingBook.search");


    /**
     * @ngdoc controller
     * @name cookingBook.search.controller:SearchController
     * @module cookingBook.search
     * @description

     * Управление на търсенето на рецепти
     *
     */
    app.controller("SearchController",
        ['$scope', 'cbSearchService',
        function($scope, cbSearchService){

        /**
         * @type {Object} -  референция към сървис cbSearchService
         */
         var searchService = cbSearchService;

        $scope.searchMsg = $scope.recipeList.length > 0 ? 'Избери от вече добавените продукти:' : 'Няма налични продукти. Първо въведи рецепта.';
        $scope.foundList = [];
        $scope.isRecipeListEmpty = $scope.recipeList.length === 0;
        $scope.isFoundListEmpty = $scope.foundList.length === 0;

        /**
         * @ngdoc method
         * @name searchRecipe
         * @methodOf cookingBook.search.controller:SearchController
         * @description

         * търсене на рецепти
         * @param  {String} ingredientsInput - входящ текст от полето за търсене - списък с продукти
         */
        $scope.searchRecipe = function (ingredientsInput) {

            // занулване на спусъка с намерене рецепти
            $scope.foundList = [];

            $scope.foundList = searchService.returnFoundRecipes(ingredientsInput, $scope.recipeList);
            $scope.isFoundListEmpty = $scope.foundList.length === 0;
        };


        /**
         * @ngdoc property
         * @name availableUniqueIntegrates
         * @propertyOf cookingBook.search.controller:SearchController

         * @description
         * Масив от обекти - всички налични продукти
         */
        $scope.availableUniqueIntegrates = searchService.availableUniqueIntegrates($scope.recipeList);

    }]);
})();