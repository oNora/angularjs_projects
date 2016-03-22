(function  () {

    'use strict';

    var app = angular.module("cookingBook.search");

    app.service("cookingBookSearchRecipeService", [function() {

        var $this = this,
            foundRecipesId = []; // списък с рецепти, вкоито има поне една от търсените съставки

        function checkRecipe (entryValue, allRecipes) {

            for (var i = 0; i < allRecipes.length; i++ ) {
                var recipeIn = ingredientsList(allRecipes[i].ingredients);

                if (recipeIn.indexOf(entryValue) > -1) {
                    if (foundRecipesId.indexOf(allRecipes[i].id) == -1) {
                        foundRecipesId.push(allRecipes[i].id);
                    }
                }
            }

        }

        $this.search = function(allIngredients, availableRecipes) {

            var input = allIngredients.split(',');

            // reset list of found recipes
            if(foundRecipesId.length  > 0){
                foundRecipesId = [];
            }

            for (var x = 0; x < input.length; x++) {
                var currentInput = input[x].trim();

                checkRecipe(currentInput, availableRecipes);
            }

        };

        $this.returnFoundRecipes = function(recipeList) {

            var all = [];

            for (var i = 0; i < recipeList.length; i++) {

                if (foundRecipesId.indexOf(recipeList[i].id) > -1) {
                    all.push(recipeList[i]);
                }
            }

            return all;
        };

        function ingredientsList(recipeIntegrates) {

            var allRecipeIn = [];
            for( var item in (recipeIntegrates)){
                allRecipeIn.push((recipeIntegrates)[item].ingredientName);
            }

            return allRecipeIn;

        }

        $this.availableUniqueIntegrates = function (allRecipesList) {

            var availableUniqueIntegrates = [];

            for (var i=0; i < allRecipesList.length; i++) {

                var arrayIngredients = ingredientsList(allRecipesList[i].ingredients);

                for (var y = 0; y < arrayIngredients.length; y++){
                    if (availableUniqueIntegrates.indexOf(arrayIngredients[y]) == -1) {
                        availableUniqueIntegrates.push(arrayIngredients[y]);
                    }
                }
            }

            return availableUniqueIntegrates;
        };

    }]);
})();