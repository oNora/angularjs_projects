(function  () {

    'use strict';

    var app = angular.module("cookingBook.formRecipe");
    app.controller("CookingBookFormRecipeController",
        [ "$scope", '$stateParams', '$location', 'cookingBooFormRecipeService', 'cookingBookRecipeService', 'localStorageService',
        function($scope, $stateParams, $location, cookingBooFormRecipeService, cookingBookRecipeService, localStorageService){

            initView();
            function initView() {
                // da se definira list predi da sepolzwa wse pak
                $scope.ingredientsList = [{}];
                $scope.confirmDeleting = 0;
                $scope.isWarningView = false;
                $scope.isDeleteView = false;
                $scope.isFormView = false;

                var viewUrl = $location.path().split('/');
                if (viewUrl[1] == 'delete') {
                    $scope.isDeleteView = true;
                    $scope.templateTitle = "Deleting";
                }
                else {
                    $scope.isFormView = true;
                    $scope.templateTitle = $stateParams.recipeID ? 'Edit recipe' : 'Add a new Recipe';
                }

                var currentRecipe = cookingBookRecipeService.findRecipe($stateParams.recipeID, $scope.recipeList);
                //ако се опита да се зареди url на изтрита рецепта да не се зарежа view с грешки
                if(currentRecipe === undefined && viewUrl[1] == 'delete' ){
                    $scope.templateTitle = 'Warning';
                    $scope.isWarningView = true;
                    $scope.isDeleteView = false;
                }
                else if ($stateParams.recipeID) {
                    $scope.currentID = currentRecipe.id;
                    $scope.recipeName = currentRecipe.name;
                    $scope.recipeDescriptionField = currentRecipe.description;
                    $scope.ingredientsList = currentRecipe.ingredients;
                } else {
                    //reset ingredients object
                    $scope.ingredientsList = [{}];
                }
            }

            $scope.saveRecipe = function () {

                var recipeValues = {
                    id:          null,
                    name:        $scope.recipeName,
                    ingredients: $scope.ingredientsList,
                    description: $scope.recipeDescriptionField
                };

                var savedValue = cookingBooFormRecipeService.saveRecipe(recipeValues, $scope.recipeList, $stateParams.recipeID );

                if(savedValue.recipeIndex === null){
                    $scope.recipeList.push(savedValue.recipeValues);
                }else{
                    $scope.recipeList[savedValue.recipeIndex] = savedValue.recipeValues;
                    $location.path('/addRecipe');
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

                var recipeIndex = cookingBooFormRecipeService.returnRecipeIndex($scope.recipeList, recipeID);

                $scope.recipeList.splice(recipeIndex, 1);
                $scope.confirmDeleting = 1;
                $scope.confirmMsg = "the recipe has been deleted";

                localStorageService.set( "recipeList", $scope.recipeList);
            };

    }]);
})();