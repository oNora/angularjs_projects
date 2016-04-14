(function  () {

    'use strict';

    var app = angular.module("cookingBook.singleView");

    app.service("cbSingleViewService", [function() {

        var $this = this;

        $this.receiptFound = null;

        $this.findRecipe = function(recipeID, allRecipes) {

            for (var i = 0; i <  allRecipes.length; i++) {
                if( allRecipes[i].id ==  recipeID){
                    $this.receiptFound =  allRecipes[i];
                    break;
                }
            }

            return $this.receiptFound;
        };

    }]);
})();