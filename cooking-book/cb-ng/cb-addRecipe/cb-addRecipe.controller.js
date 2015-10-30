(function  () {
    var app = angular.module("cookingBook.addRecipe");

    app.controller("CookingBookAddRecipeController", [ "$scope",  function($scope){

        // {1: "{"title":"saS","ingredients":"saSA"}", 2: "{"title":"saS","ingredients":"SAsaA"}
        $scope.addRecipe = function () {
            $scope.recipeList.push({
                id:          ( $scope.recipeList.length + 1 ),
                name:          $scope.recipeList.name,
                ingredients:   $scope.recipeList.ingredients,
                instructions:   $scope.recipeList.instructions
            });
            $scope.recipeList.name = '';
            $scope.recipeList.ingredients = '';
            $scope.recipeList.instructions = '';

            console.log("$scope.recipeList: ", $scope.recipeList);
        };

        $scope.deletingList = function() {

        }

    }]);
})();