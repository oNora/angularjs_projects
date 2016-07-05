(function  () {

    'use strict';

    var app = angular.module("cookingBook.search");

    app.service("cbSearchService", [function() {

        var $this = this;

        /**
         * reset value
         * object used in from function $this.checkRecipe
         * @type {Array} - list of ID recipes in which there is at least one of the sought ingredients
         */
        $this.foundRecipesId = [];

        /**
         * reset value
         * object returned from function $this.returnFoundRecipes
         * @type {Array} - all recipe that includes current ingredients
         */
        $this.allFoundRecipes = [];

        /**
         * reset value
         * object returned from function $this.ingredientsList
         * @type {Array} - list of all names of ingredients for a single recipe
         */
        $this.allRecipeIn = [];

        /**
         * reset value
         * object returned from function $this.availableUniqueIntegrates
         * @type {Array} - list of all unique ingredients
         */
        $this.allUniqueIntegrates = [];


        /**
         * check if any recipe includes the ingredient
         * @param  {String} entryValue - single input value, single ingredients
         * @param  {Object} allRecipes - all available recipe
         */
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


        /**
         * search recipe
         * @param  {String} allIngredients    - search input - ingredient list
         * @param  {Array} availableRecipes   - all available recipe
         */
        $this.search = function(allIngredients, availableRecipes) {

            var input = allIngredients.split(',');

            // reset list of found recipes
            $this.foundRecipesId = [];

            for (var x = 0; x < input.length; x++) {
                var currentInput = input[x].trim();

                $this.checkRecipe(currentInput, availableRecipes);
            }

        };

        /**
         * Find all recipe that includes current ingredients
         * @param  {String} input      - search input - ingredient list
         * @param  {Array} recipeList - all available recipe
         * @return {Array}             - all recipe that includes current ingredients
         */
        $this.returnFoundRecipes = function(input, recipeList) {

            $this.search(input, recipeList);

            $this.allFoundRecipes = [];

            for (var i = 0; i < recipeList.length; i++) {

                if ($this.foundRecipesId.indexOf(recipeList[i].id) > -1) {
                    $this.allFoundRecipes.push(recipeList[i]);
                }
            }

            return $this.allFoundRecipes;
        };

        /**
         * get ingredients name for a single recipe
         * @param  {Array} recipeIntegrates - all ingredients for a single recipe
         * @return {Array}                  - list of all names of ingredients for a single recipe
         */
        $this.ingredientsList = function(recipeIntegrates) {

            $this.allRecipeIn = [];

            for( var item in (recipeIntegrates)){
                $this.allRecipeIn.push((recipeIntegrates)[item].ingredientName);
            }

            return $this.allRecipeIn;

        };


        /**
         * Get all unique ingredients
         * @param  {Array} allRecipesList - all available recipe
         * @return {Array}                - list of all unique ingredients
         */
        $this.availableUniqueIntegrates = function (allRecipesList) {

            $this.allUniqueIntegrates = [];

            for (var i=0; i < allRecipesList.length; i++) {

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