(function  () {

    'use strict';

    var app = angular.module("cookingBook.formRecipe");

    app.service("cookingBooFormRecipeService", [function () {

        var $this = this;

        $this.returnRecipeIndex = function (allRecipe, currentRecipeId) {
            for(var i = 0; i < allRecipe.length; i++){
                if(allRecipe[i].id === currentRecipeId){
                    return i;
                }
            }
        };

        $this.saveRecipe = function(recipeValues, recipeList, recipeID){

            var valuesForSave = {
                recipeIndex: null,
                recipeValues: {}
            };

            if(recipeID){
                var currentId = parseInt(recipeID);
                recipeValues.id = currentId;

                valuesForSave.recipeIndex = $this.returnRecipeIndex(recipeList, currentId);
                valuesForSave.recipeValues = recipeValues;

            } else {
                recipeValues.id = recipeList[recipeList.length -1].id + 1;
                valuesForSave.recipeValues = recipeValues;
            }

            return valuesForSave;

        };

    }]);
})();