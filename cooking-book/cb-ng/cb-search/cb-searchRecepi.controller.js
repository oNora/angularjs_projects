(function  () {
    var app = angular.module("cookingBook.search");

    app.controller("CookingBookSearch", ['$scope', 'cookingBookSearchRecipeService', function($scope, cookingBookSearchRecipeService){

        $scope.searchMsg = $scope.recipeList.length > 0 ? 'Choose from available  ingredients:': 'There are not available ingredients. First enter recipes.';

        var recipesId ;

        $scope.foundList = [];


        // vzima inputa ot poleto za tursene
        $scope.searchRecipe = function (ingredientsInput) {

            // reset list of found recipes
            if($scope.foundList.length){
                $scope.foundList = [];
            }
            var input = ingredientsInput.split(', ');

            recipesId = cookingBookSearchRecipeService.search(input, $scope.recipeList);
            // console.log('recipesId controller: ', recipesId);

            for (var i=0; i < $scope.recipeList.length; i++) {

                if(recipesId.indexOf($scope.recipeList[i].id) > -1 ){
                    $scope.foundList.push($scope.recipeList[i]);
                }
            };
            // console.log('$scope.foundList: ', $scope.foundList);
        }


        // da iskara wsichki nalichni sustvki
        $scope.avelibleIngredients = (function () {
            var avelibleUniqIntegrates = [];

            for (var i=0; i < $scope.recipeList.length; i++) {

                var arrayIngredients = cookingBookSearchRecipeService.ingrediesList($scope.recipeList[i].ingredients);
                var arrayIngredientsLen = arrayIngredients.length;

                for (var y = 0; y < arrayIngredientsLen; y++){
                        var valueIngredient = arrayIngredients[y];
                        var statusIng = avelibleUniqIntegrates.indexOf(valueIngredient);
                        if (statusIng == -1) {
                            avelibleUniqIntegrates.push(valueIngredient);
                        }
                }
            };
            console.log('avelibleUniqIntegrates: ', avelibleUniqIntegrates);
            return avelibleUniqIntegrates;
        })();

        // $scope.avelibleIngredients();1
    }]);
})();