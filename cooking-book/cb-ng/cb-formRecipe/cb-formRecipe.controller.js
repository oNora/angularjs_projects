(function  () {

    'use strict';

    var app = angular.module("cookingBook.formRecipe");
    app.controller("CookingBookFormRecipeController",
        [ "$scope", '$stateParams', '$location', 'cookingBooFormRecipeService', 'cbSingleViewService', 'localStorageService',
        function($scope, $stateParams, $location, cookingBooFormRecipeService, cbSingleViewService, localStorageService){

            initView();
            function initView() {
                // da se definira list predi da sepolzwa wse pak
                $scope.ingredientsList = [{}];
                $scope.confirmDeleting = 0;

                var viewUrl = $location.path().split('/');
                var currentRecipe = cbSingleViewService.findRecipe($stateParams.recipeID, $scope.recipeList);

                //ако се опита да се зареди url на изтрита рецепта да не се зарежа view с грешки
                if(currentRecipe === undefined && viewUrl[1] != 'addRecipe' ){
                    $location.path('/404');
                }else if (viewUrl[1] == 'delete') {
                    $scope.templateTitle = "Deleting";
                }
                else {
                    $scope.templateTitle = $stateParams.recipeID ? 'Edit Recipe' : 'Add a new Recipe';
                }

                 if ($stateParams.recipeID && currentRecipe !== undefined) {
                    $scope.currentID = currentRecipe.id;
                    $scope.recipeName = currentRecipe.name;
                    $scope.recipeDescriptionField = currentRecipe.description;
                    $scope.ingredientsList = currentRecipe.ingredients;
                } else {
                     console.log('else 2 $stateParams.recipeID', $stateParams.recipeID);
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
                $scope.confirmMsg = 'The recipe has been deleted';

                localStorageService.set( "recipeList", $scope.recipeList);
            };

    }]);
})();