(function  () {

    'use strict';

    var app = angular.module("cookingBook.recipe");

    app.service("cbRecipeService", [function () {

        var $this = this;

        $this.indexRecipe = null;
        $this.valuesForSave = {};

        $this.returnRecipeIndex = function (allRecipe, currentRecipeId) {

            for(var i = 0; i < allRecipe.length; i++){
                if(allRecipe[i].id === currentRecipeId){
                    $this.indexRecipe = i;
                }
            }

            return $this.indexRecipe;
        };

        $this.saveRecipe = function(recipeValues, recipeList, recipeID){

            $this.valuesForSave = {
                recipeIndex: null,
                recipeValues: {}
            };
            if(recipeID){
                var currentId = parseInt(recipeID);
                recipeValues.id = currentId;

                $this.valuesForSave.recipeIndex = $this.returnRecipeIndex(recipeList, currentId);
                $this.valuesForSave.recipeValues = recipeValues;

            } else {
                recipeValues.id = recipeList[recipeList.length -1].id + 1;
                $this.valuesForSave.recipeValues = recipeValues;
            }

            return $this.valuesForSave;

        };

    }]);
})();