(function  () {
    var app = angular.module("cookingBook.search");

    app.service("cookingBookSearchRecipeService", [function() {

        var $this = this,
            foundRecipesId = [];

        $this.search = function(allIngredients, availableRecipe) {
            // console.log('dasli raboti');
            // console.log('ingredientValue: ', ingredientValue);
            // console.log('availableRecipe: ', availableRecipe);

            // reset list of found recipes for every single search
            if(foundRecipesId.length){
                foundRecipesId = [];
            }

            function checkRecipe (enteryValue) {
                // console.log('enteryValue: ', enteryValue);
                for (var i = 0; i < availableRecipe.length; i++ ) {
                    // console.log(availableRecipe[i].ingredients.indexOf(enteryValue));
                    var statusIng = availableRecipe[i].ingredients.indexOf(enteryValue);
                    if (statusIng > -1) {
                        var statusRecp = foundRecipesId.indexOf(availableRecipe[i].id);
                            // console.log('statusRecp: ', statusRecp);
                            if (statusRecp == -1) {
                                foundRecipesId.push(availableRecipe[i].id);
                            }
                    }
                };

                // console.log('foundRecipesId: ', foundRecipesId);
            }

            for (var x = 0; x < allIngredients.length; x++) {
                // console.log("allIn: ", allIngredients[x])

                checkRecipe(allIngredients[x])
            }

            console.log('foundRecipesId: ', foundRecipesId);

            return foundRecipesId;

        }

    }]);
})();
