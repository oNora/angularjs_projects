(function  () {
    var app = angular.module("cookingBook.addRecipe");

    app.controller("CookingBookAddRecipeController",
        [ "$scope", '$stateParams', '$location', 'cookingBookRecipeService',
        function($scope, $stateParams, $location, cookingBookRecipeService){

            // da se definira list predi da sepolzwa wse pak
            $scope.ingredientsList = [ {} ];

            var curentRecipe = cookingBookRecipeService.findRecipe($stateParams.recipeID, $scope.recipeList);
            $scope.templateTitle = $stateParams.recipeID ? 'Edit recipe' : 'Add a new Recipe';

            if($stateParams.recipeID){

                $scope.recipeNameField = curentRecipe.name;
                $scope.recipeDescriptionField = curentRecipe.description;
                $scope.ingredientsList = curentRecipe.ingredients;

            } else {
                //reset ingredients object
                $scope.ingredientsList = [ {} ];
            }


            $scope.saveRecipe = function (isValid) {

                var recipeValues = {
                    id:          null,
                    name:        $scope.recipeNameField,
                    ingredients: $scope.ingredientsList,
                    description: $scope.recipeDescriptionField,
                }


                if($stateParams.recipeID){
                    recipeValues.id = curentRecipe.id;

                    var recipeIndex = curentRecipe.id - 1;
                    $scope.recipeList[recipeIndex] = recipeValues;

                    $location.path('/addRecipe');
                } else {
                    recipeValues.id = ( $scope.recipeList.length + 1 );
                    $scope.recipeList.push(recipeValues);
                }

                $scope.recipeNameField = null;
                $scope.recipeDescriptionField = null;
                $scope.ingredientsList = [ {} ];

                console.log("$scope.recipeList: ", $scope.recipeList);
            };

            $scope.deletingList = function() {

            }

            $scope.addIngredient = function() {
                var ingredients = $scope.ingredientsList;
                ingredients[ingredients.length] = {};
            };

            $scope.removeIngredient = function(index) {
                $scope.ingredientsList.splice(index, 1);
            };

    }]);
})();