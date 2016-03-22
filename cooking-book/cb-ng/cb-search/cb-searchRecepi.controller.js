(function  () {

    'use strict';

    var app = angular.module("cookingBook.search");

    app.controller("CookingBookSearch",
        ['$scope', 'cookingBookSearchRecipeService',
        function($scope, cookingBookSearchRecipeService){

        // TODO: oprawi imeto na survisa  cookingBookSearchRecipeService na cookingBookSearchService, kakto i na dajlovete da e taka

        // reference to search service:
         var searchService = cookingBookSearchRecipeService;

        $scope.searchMsg = $scope.recipeList.length > 0 ? 'Choose from available  ingredients:' : 'There are not available ingredients. First enter recipes.';
        $scope.foundList = [];
        $scope.isRecipeListEmpty = $scope.recipeList.length === 0;
        $scope.isFoundListEmpty = $scope.foundList.length === 0;

        $scope.searchRecipe = function (ingredientsInput) {

            // reset list of found recipes
            if($scope.foundList.length > 0){
                $scope.foundList = [];
            }

            searchService.search(ingredientsInput, $scope.recipeList);

            $scope.foundList = searchService.returnFoundRecipes($scope.recipeList);
            $scope.isFoundListEmpty = $scope.foundList.length === 0;
        };

        // da iskara wsichki nalichni sustvki
        $scope.availableUniqueIntegrates = searchService.availableUniqueIntegrates($scope.recipeList);

    }]);
})();