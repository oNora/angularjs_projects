(function  () {
    var app = angular.module("cookingBook.search");

    app.controller("CookingBookSearch", ['$scope', 'cookingBookSearchRecipeService', function($scope, cookingBookSearchRecipeService){

        var recipesId ;

        $scope.foundList = [];

        $scope.searchRecipe = function (ingredientsInput) {

            var input = ingredientsInput.split(', ');

            recipesId = cookingBookSearchRecipeService.search(input, $scope.recipeList);
            // console.log('recipesId controller: ', recipesId);

            for (var i=0; i < $scope.recipeList.length; i++) {

                if(recipesId.indexOf($scope.recipeList[i].id) > -1 ){
                    $scope.foundList.push($scope.recipeList[i]);
                }
            };
            console.log('$scope.foundList: ', $scope.foundList);
        }


    }]);
})();