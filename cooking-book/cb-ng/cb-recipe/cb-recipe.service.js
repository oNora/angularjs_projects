(function  () {
    var app = angular.module("cookingBook.recipe");

    app.service("cookingBookRecipeService", [function() {

        var $this = this;

        $this.findRecipe = function(recipeID, allRecipes) {

            var recipeIndex = recipeID - 1;
            var getRecipe = allRecipes[recipeIndex];

            return  getRecipe;
        };
    }]);
})();