(function  () {

    'use strict';

    var app = angular.module("cookingBook.recipe");


    /**
     * @ngdoc controller
     * @name cookingBook.recipe.controller:RecipeController
     * @module cookingBook.recipe
     * @description

     * Manage recipe data manipulation.
     *
     */
    app.controller("RecipeController",
        [ "$scope", '$rootScope', '$stateParams', '$location', 'cbRecipeService', 'cbSingleViewService',
        function($scope, $rootScope, $stateParams, $location, cbRecipeService, cbSingleViewService){

            $scope.initView = function() {

                $scope.ingredientsList = [{}];
                $scope.confirmDeleting = 0;

                var viewUrl = $location.path().split('/');
                var currentRecipe = cbSingleViewService.findRecipe($stateParams.recipeID, $scope.recipeList);

                //if recipe is already deleted
                if(currentRecipe === null && viewUrl[1] != 'addRecipe' ){
                    $location.path('/404');
                }else if (viewUrl[1] == 'delete') {
                    $scope.templateTitle = "Изтриване";
                }
                else {
                    $scope.templateTitle = $stateParams.recipeID ? 'Редактирай рецепта' : 'Добави рецепта';
                }

                if ($stateParams.recipeID && currentRecipe !== null) {
                    $scope.currentID = currentRecipe.id;
                    $scope.recipeName = currentRecipe.name;
                    $scope.recipeDescriptionField = currentRecipe.description;
                    $scope.ingredientsList = currentRecipe.ingredients;
                } else {
                    //reset ingredients object
                    $scope.ingredientsList = [{}];
                }
            };
            $scope.initView();

            /**
             * @ngdoc method
             * @name saveRecipe
             * @methodOf cookingBook.recipe.controller:RecipeController
             * @description

             * Save recipe data on edit or add new
             */
            $scope.saveRecipe = function () {

                var updatedRecipeList;
                if($stateParams.recipeID){
                    updatedRecipeList = cbRecipeService.updateRecipe($scope.recipeName, $scope.ingredientsList,  $scope.recipeDescriptionField, $stateParams.recipeID );
                    $location.path('/singleView/' + $stateParams.recipeID);
                } else {
                    updatedRecipeList = cbRecipeService.addRecipe($scope.recipeName, $scope.ingredientsList,  $scope.recipeDescriptionField );
                }

                $rootScope.recipeList = updatedRecipeList;

                $scope.recipeName = null;
                $scope.recipeDescriptionField = null;
                $scope.ingredientsList = [ {} ];

            };

            /**
             * @ngdoc method
             * @name addIngredient
             * @methodOf cookingBook.recipe.controller:RecipeController
             * @description

             * add new row for ingredient
             */
            $scope.addIngredient = function() {
                var ingredients = $scope.ingredientsList;
                ingredients[ingredients.length] = {};
            };

            /**
             * @ngdoc method
             * @name removeIngredient
             * @methodOf cookingBook.recipe.controller:RecipeController
             * @description

             * remove row for ingredient
             * @param  {Number} index   - index of row of ingredient
             */
            $scope.removeIngredient = function(index) {
                $scope.ingredientsList.splice(index, 1);
            };


            /**
             * @ngdoc method
             * @name removeRecipe
             * @methodOf cookingBook.recipe.controller:RecipeController
             * @description

             * delete recipe
             * @param  {Number} recipeID  - id of recipe
             */
            $scope.removeRecipe = function(recipeID) {

                var deletingData = cbRecipeService.deleteRecipe(recipeID);

                $scope.confirmDeleting = deletingData.confirmDeleting;
                $rootScope.recipeList = deletingData.updateRecipeList;

            };

    }]);
})();