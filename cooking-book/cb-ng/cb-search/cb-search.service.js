(function  () {

    'use strict';

    var app = angular.module("cookingBook.search");

    app.service("cbSearchService", [function() {

        var $this = this;

        $this.foundRecipesId = []; // списък с рецепти, вкоито има поне една от търсените съставки


        $this.checkRecipe = function (entryValue, allRecipes) {

            for (var i = 0; i < allRecipes.length; i++ ) {
                var recipeIn = $this.ingredientsList(allRecipes[i].ingredients);

                if (recipeIn.indexOf(entryValue) > -1) {
                    if ($this.foundRecipesId.indexOf(allRecipes[i].id) == -1) {
                        $this.foundRecipesId.push(allRecipes[i].id);
                    }
                }
            }

        };

        $this.search = function(allIngredients, availableRecipes) {

            var input = allIngredients.split(',');

            // reset list of found recipes
            $this.foundRecipesId = [];

            for (var x = 0; x < input.length; x++) {
                var currentInput = input[x].trim();

                $this.checkRecipe(currentInput, availableRecipes);
            }

        };

        $this.returnFoundRecipes = function(recipeList) {
            // var all = [];
            $this.allFoundRecipes = [];

            for (var i = 0; i < recipeList.length; i++) {

                if ($this.foundRecipesId.indexOf(recipeList[i].id) > -1) {
                    $this.allFoundRecipes.push(recipeList[i]);
                }
            }

            return $this.allFoundRecipes;
        };

        $this.ingredientsList = function(recipeIntegrates) {
            this.allRecipeIn = [];
            for( var item in (recipeIntegrates)){
                this.allRecipeIn.push((recipeIntegrates)[item].ingredientName);
            }

            return this.allRecipeIn;

        };

        $this.availableUniqueIntegrates = function (allRecipesList) {

            // var availableUniqueIntegrates = [];
            $this.allUniqueIntegrates = [];

            for (var i=0; i < allRecipesList.length; i++) {

               // var arrayIngredients = ingredientsList(allRecipesList[i].ingredients);
                var arrayIngredients = $this.ingredientsList(allRecipesList[i].ingredients);

                for (var y = 0; y < arrayIngredients.length; y++){
                    if ($this.allUniqueIntegrates.indexOf(arrayIngredients[y]) == -1) {
                        $this.allUniqueIntegrates.push(arrayIngredients[y]);
                    }
                }
            }

            return $this.allUniqueIntegrates;
        };

    }]);
})();