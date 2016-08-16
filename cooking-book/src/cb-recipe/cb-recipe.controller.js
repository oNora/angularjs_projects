(function  () {

    'use strict';

    var app = angular.module("cookingBook.recipe");


    /**
     * @ngdoc controller
     * @name cookingBook.recipe.controller:RecipeController
     * @module cookingBook.recipe
     * @description

     * Управление на работата с данни на рецепта
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

                //ако рецептата е вече изтрита
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
                    //нулиране на стойност на  ingredients обект
                    $scope.ingredientsList = [{}];
                }
            };
            $scope.initView();

            /**
             * @ngdoc method
             * @name saveRecipe
             * @methodOf cookingBook.recipe.controller:RecipeController
             * @description

             * Запазване на данните на рецепти при добавяне или редактиране на такава
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

             * добавяне на нов ред на продукт
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

             * премахване на ред на продукт
             * @param  {Number} index   - индех на ред на продукт
             */
            $scope.removeIngredient = function(index) {
                $scope.ingredientsList.splice(index, 1);
            };


            /**
             * @ngdoc method
             * @name removeRecipe
             * @methodOf cookingBook.recipe.controller:RecipeController
             * @description

             * изтриване на рецепта
             * @param  {Number} recipeID  - иникален номер id на рецепта
             */
            $scope.removeRecipe = function(recipeID) {

                var deletingData = cbRecipeService.deleteRecipe(recipeID);

                $scope.confirmDeleting = deletingData.confirmDeleting;
                $rootScope.recipeList = deletingData.updateRecipeList;

            };

    }]);
})();