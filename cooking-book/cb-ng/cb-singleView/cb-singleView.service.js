(function  () {

    'use strict';

    var app = angular.module("cookingBook.singleView");

    app.service("cbSingleViewService", [function() {

        var $this = this;


        /**
         * Reset object
         * @type {Object} - current recipe object
         */
        $this.receiptFound = null;

        /**
         * findRecipe - Current recipe object
         * @param  {String} recipeID   - current recipe ID
         * @param  {Object} allRecipes - all available recipes
         * @return {Object}            - current recipe object
         */
        $this.findRecipe = function(recipeID, allRecipes) {

            for (var i = 0; i <  allRecipes.length; i++) {

                if( allRecipes[i].id ==  recipeID){
                    $this.receiptFound =  allRecipes[i];
                    break;
                }

                $this.receiptFound = null;

            }

            return $this.receiptFound;
        };

    }]);
})();