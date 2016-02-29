(function  () {
    var app = angular.module("cookingBook.recipe");

    app.controller("CookingBookRecipe", ['$scope', '$stateParams', 'cookingBookRecipeService', function($scope, $stateParams, cookingBookRecipeService){
        // get the id
        var currentRecipeId = $stateParams.recipeID;

        var curentRecipe = cookingBookRecipeService.findRecipe(currentRecipeId, $scope.recipeList);
        $scope.name = curentRecipe.name;
        $scope.ingredients = curentRecipe.ingredients;
        $scope.description = curentRecipe.description;
        $scope.id = currentRecipeId;

        $scope.getLength = function(obj) {
            console.log(Object.keys(obj).length)
            return Object.keys(obj).length;
        }

    }]);
})();