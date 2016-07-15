(function  () {

    'use strict';

    var app = angular.module("cookingBook.singleView");


    /**
     * @ngdoc service
     * @name cookingBook.singleView.service:cbSingleViewService
     * @module cookingBook.singleView
     * @description

     * Manage loading data for a single recipe
     *
     */
    app.service("cbSingleViewService", [function() {

        var $this = this;

        /**
         * @ngdoc property
         * @name foundRecipe
         * @propertyOf cookingBook.singleView.service:cbSingleViewService

         * @description
         * current recipe object. Initial value is null.
         */
        $this.foundRecipe = null;

        /**
         * @ngdoc method
         * @name findRecipe
         * @methodOf cookingBook.singleView.service:cbSingleViewService
         * @description

         * Find a recipe. Current recipe object
         * @param  {String} recipeID   - current recipe ID
         * @param  {Array} allRecipes - all available recipes
         * @return {Object}            - current recipe object
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