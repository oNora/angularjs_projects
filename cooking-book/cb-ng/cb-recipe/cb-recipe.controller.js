(function  () {
    'use strict';

    var app = angular.module("cookingBook.recipe");

    app.controller("CookingBookRecipe", ['$scope', '$stateParams', 'cookingBookRecipeService', function($scope, $stateParams, cookingBookRecipeService){
        // get the id
        var currentRecipeId = $stateParams.recipeID;
        var currentRecipe = cookingBookRecipeService.findRecipe(currentRecipeId, $scope.recipeList);

        $scope.name = currentRecipe.name;
        $scope.ingredients = currentRecipe.ingredients;
        $scope.description = currentRecipe.description;
        $scope.id = currentRecipeId;

        $scope.getLength = function(obj) {
            return Object.keys(obj).length;
        };

    }]);
})();