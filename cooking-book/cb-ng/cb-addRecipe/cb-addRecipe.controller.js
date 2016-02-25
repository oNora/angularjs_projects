(function  () {
    var app = angular.module("cookingBook.addRecipe");

    app.controller("CookingBookAddRecipeController", [ "$scope",  function($scope){

        $scope.saveRecipe = function () {
            console.log("$scope.ing: ", $scope.ing);

            $scope.recipeList.push({
                id:          ( $scope.recipeList.length + 1 ),
                name:          $scope.recipeList.name,
                ingredients:   $scope.ing,
                description:  $scope.recipeList.description,

            });
            $scope.recipeList.name = '';
            $scope.recipeList.ingredients = '';
            $scope.recipeList.description = '';
            $scope.ing = [{}];

            console.log("$scope.recipeList: ", $scope.recipeList);
        };

        $scope.deletingList = function() {

        }

        $scope.addIngredient = function() {
            var ingredients = $scope.ing;
            ingredients[ingredients.length] = {};
        };

        $scope.removeIngredient = function(index) {
            $scope.recipeList.ingredients.splice(index, 1);
        };

    }]);
})();