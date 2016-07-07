(function  () {

    'use strict';

    var app = angular.module("cookingBook.search");


    /**
     * @ngdoc controller
     * @name cookingBook.search.controller:SearchController
     * @module cookingBook.search
     * @description

     * Manage search of recipes.
     *
     */
    app.controller("SearchController",
        ['$scope', 'cbSearchService',
        function($scope, cbSearchService){

        /**
         * @type {Object} -  reference to search service
         */
         var searchService = cbSearchService;

        $scope.searchMsg = $scope.recipeList.length > 0 ? 'Choose from available  ingredients:' : 'There are not available ingredients. First enter recipes.';
        $scope.foundList = [];
        $scope.isRecipeListEmpty = $scope.recipeList.length === 0;
        $scope.isFoundListEmpty = $scope.foundList.length === 0;

        /**
         * @ngdoc method
         * @name searchRecipe
         * @methodOf cookingBook.search.controller:SearchController
         * @description

         * search for recipes
         * @param  {String} ingredientsInput - search inputs - ingredients list
         */
        $scope.searchRecipe = function (ingredientsInput) {

            // reset list of found recipes
            $scope.foundList = [];

            $scope.foundList = searchService.returnFoundRecipes(ingredientsInput, $scope.recipeList);
            $scope.isFoundListEmpty = $scope.foundList.length === 0;
        };


        /**
         * @ngdoc property
         * @name availableUniqueIntegrates
         * @propertyOf cookingBook.search.controller:SearchController

         * @description
         *  Array of objects - all available ingredients
         */
        $scope.availableUniqueIntegrates = searchService.availableUniqueIntegrates($scope.recipeList);

    }]);
})();