(function  () {
    var app = angular.module("cookingBook.formRecipe");

    app.controller("CookingBookFormRecipeController",
        [ "$scope", '$stateParams', '$location', 'cookingBookRecipeService', 'localStorageService',
        function($scope, $stateParams, $location, cookingBookRecipeService, localStorageService){

            // da se definira list predi da sepolzwa wse pak
            $scope.ingredientsList = [ {} ];

            $scope.confirmDeleting = 0;

            var curentRecipe = cookingBookRecipeService.findRecipe($stateParams.recipeID, $scope.recipeList);
            $scope.templateTitle = $stateParams.recipeID ? 'Edit recipe' : 'Add a new Recipe';

            if($stateParams.recipeID){

                $scope.curentID = curentRecipe.id ;
                $scope.recipeName = curentRecipe.name;
                $scope.recipeDescriptionField = curentRecipe.description;
                $scope.ingredientsList = curentRecipe.ingredients;

            } else {
                //reset ingredients object
                $scope.ingredientsList = [ {} ];
            }


            $scope.saveRecipe = function () {

                var recipeValues = {
                    id:          null,
                    name:        $scope.recipeName,
                    ingredients: $scope.ingredientsList,
                    description: $scope.recipeDescriptionField,
                };


                if($stateParams.recipeID){
                    recipeValues.id = curentRecipe.id;

                    var recipeIndex = curentRecipe.id - 1;
                    $scope.recipeList[recipeIndex] = recipeValues;

                    $location.path('/addRecipe');
                } else {
                    recipeValues.id = $scope.recipeList[$scope.recipeList.length -1].id + 1;
                    $scope.recipeList.push(recipeValues);
                }

                localStorageService.set( "recipeList", $scope.recipeList);

                $scope.recipeName = null;
                $scope.recipeDescriptionField = null;
                $scope.ingredientsList = [ {} ];
            };

            $scope.addIngredient = function() {
                var ingredients = $scope.ingredientsList;
                ingredients[ingredients.length] = {};
            };

            $scope.removeIngredient = function(index) {
                $scope.ingredientsList.splice(index, 1);
            };

            $scope.removeRecipe = function(recipeID) {
                var recipeIndex = recipeID -1;

                $scope.recipeList.splice(recipeIndex, 1);
                $scope.confirmDeleting = 1;
                $scope.confirmMsg = "the recipe has been deleted";

                localStorageService.set( "recipeList", $scope.recipeList);
            };

    }]);
})();