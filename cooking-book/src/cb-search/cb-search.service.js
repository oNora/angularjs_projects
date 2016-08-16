(function  () {

    'use strict';

    var app = angular.module("cookingBook.search");


    /**
     * @ngdoc service
     * @name cookingBook.search.service:cbSearchService
     * @module cookingBook.search
     * @description

     * Управление на търсенето на рецепти в приложението cookingBook
     *
     */
    app.service("cbSearchService", [function() {

        var $this = this;

        // зануляване на стойности

        /**
         * @ngdoc property
         * @name foundRecipesId
         * @propertyOf cookingBook.search.service:cbSearchService

         * @description
         * Array of list of ID recipes in which there is at least one of the sought ingredients. Initial value - empty array.
         * Масив с уникалните номера ID на рецепти, които съдържат търсените продукти. Първоначална стойност - празен масив.
         */
        $this.foundRecipesId = [];

        /**
         * @ngdoc property
         * @name allFoundRecipes
         * @propertyOf cookingBook.search.service:cbSearchService

         * @description
         * Масив от рецепти, който съдържат конкретен продукт. Първоначална стойност - празен масив.
         */
        $this.allFoundRecipes = [];

        /**
         * @ngdoc property
         * @name allRecipeIn
         * @propertyOf cookingBook.search.service:cbSearchService

         * @description
         * Масив със всички имена на продукти за една рецепта. Първоначална стойност - празен масив.
         */
        $this.allRecipeIn = [];


        /**
         * @ngdoc property
         * @name allUniqueIntegrates
         * @propertyOf cookingBook.search.service:cbSearchService

         * @description
         * Масив със всички използвани продукти. Първоначална стойност - празен масив.
         */
        $this.allUniqueIntegrates = [];


        /**
         * @ngdoc method
         * @name checkRecipe
         * @methodOf cookingBook.search.service:cbSearchService
         * @description

         * Търсене дали някоя рецепта съдържа конкретния продукт/и
         * @param  {String} entryValue - единичен продукт от списъка с продукти въведен в полето за търсене
         * @param  {Array} allRecipes  - всички налични рецепти
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
         * @ngdoc method
         * @name search
         * @methodOf cookingBook.search.service:cbSearchService
         * @description

         * търсене на рецепта
         * @param  {String} allIngredients    - входящ текст от полето за търсене - списък с продукти
         * @param  {Array} availableRecipes   - всички налични рецепти
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
         * @ngdoc method
         * @name search
         * @methodOf cookingBook.search.service:cbSearchService
         * @description

         * Намиране на всички рецепти, който съдържат конкретни продукти
         * @param  {String} input      - входящ текст от полето за търсене - списък с продукти
         * @param  {Array} recipeList  - всички налични рецепти
         * @return {Array}             - всички рецепти в които има конкретен продукт
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
         * @ngdoc method
         * @name search
         * @methodOf cookingBook.search.service:cbSearchService
         * @description

         * Намиране на имената на продуктите за една рецепта
         * @param  {Array} recipeIntegrates - списък с всички продукти за една рецепта
         * @return {Array}                  - списък с всички имена на продукти за една рецепта
         */
        $this.ingredientsList = function(recipeIntegrates) {

            $this.allRecipeIn = [];

            for( var item in (recipeIntegrates)){
                $this.allRecipeIn.push((recipeIntegrates)[item].ingredientName);
            }

            return $this.allRecipeIn;

        };


        /**
         * @ngdoc method
         * @name search
         * @methodOf cookingBook.search.service:cbSearchService
         * @description

         * Get all unique ingredients
         * Намиране на всички въведени продукти (уникални)
         * @param  {Array} allRecipesList - всички налични рецепти
         * @return {Array}                - списък с всички уникални продукти
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