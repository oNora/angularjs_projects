(function  () {

    'use strict';

    var app = angular.module("cookingBook.singleView");

    app.service("cbSingleViewService", [function() {

        var $this = this;

        $this.findRecipe = function(recipeID, allRecipes) {
            var getRecipe;

            for (var i = 0; i < allRecipes.length; i++) {

                if(allRecipes[i].id == recipeID){
                    getRecipe = allRecipes[i];
                    break;
                }
            }

            return  getRecipe;
        };
    }]);
})();