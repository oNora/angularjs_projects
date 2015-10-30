(function  () {
    var app = angular.module("cookingBook.recipe");

    app.controller("CookingBookRecipe", ['$scope', '$stateParams', 'cookingBookRecipeService', function($scope, $stateParams, cookingBookRecipeService){
        // get the id
        var currentRecipeId = $stateParams.recipeID;

        var curentRecipe = cookingBookRecipeService.findRecipe(currentRecipeId, $scope.recipeList);
        $scope.name = curentRecipe.name;
        $scope.ingredients = curentRecipe.ingredients;
        $scope.instructions = curentRecipe.instructions;
        console.log('curentRecipe: ', curentRecipe);

    }]);
})();