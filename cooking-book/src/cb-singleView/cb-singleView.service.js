(function  () {

    'use strict';

    var app = angular.module("cookingBook.singleView");


    /**
     * @ngdoc service
     * @name cookingBook.singleView.service:cbSingleViewService
     * @module cookingBook.singleView
     * @description

     * Управление на зареждането на данните за конкретна рецепта
     *
     */
    app.service("cbSingleViewService", [function() {

        var $this = this;

        /**
         * @ngdoc property
         * @name foundRecipe
         * @propertyOf cookingBook.singleView.service:cbSingleViewService

         * @description
         * Обект за стойности на конкретна рецепта. Първоначална стойност null.
         */
        $this.foundRecipe = null;

        /**
         * @ngdoc method
         * @name findRecipe
         * @methodOf cookingBook.singleView.service:cbSingleViewService
         * @description

         * Намиране конкретна рецепта
         * @param  {String} recipeID   - уникален номер на конкретна рецепта
         * @param  {Array} allRecipes - всички налични рецепти
         * @return {Object}            - конкретна рецепта
         */
        $this.findRecipe = function(recipeID, allRecipes) {

            for (var i = 0; i <  allRecipes.length; i++) {

                if( allRecipes[i].id ==  recipeID){
                    $this.foundRecipe =  allRecipes[i];
                    break;
                }

                $this.foundRecipe = null;

            }

            return $this.foundRecipe;
        };

    }]);
})();