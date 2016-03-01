(function  () {
    var app = angular.module("cookingBook.search");

    app.service("cookingBookSearchRecipeService", [function() {

        var $this = this,
            foundRecipesId = [];

        // vrushta samo receptite s konkretnite se sydyrva pone edna ot posochenite sustavki
        $this.search = function(allIngredients, availableRecipe) {

            // reset list of found recipes
            if(foundRecipesId.length){
                foundRecipesId = [];
            }

            function checkRecipe (enteryValue) {
                for (var i = 0; i < availableRecipe.length; i++ ) {

                    var recipeIn = $this.ingrediesList(availableRecipe[i].ingredients);
                    var r = recipeIn.join();
                    var statusIng = r.indexOf(enteryValue);

                    if (statusIng > -1) {
                        var statusRecp = foundRecipesId.indexOf(availableRecipe[i].id);
                            // console.log('statusRecp: ', statusRecp);
                            if (statusRecp == -1) {
                                foundRecipesId.push(availableRecipe[i].id);
                            }
                    }
                }

            }


            for (var x = 0; x < allIngredients.length; x++) {
                checkRecipe(allIngredients[x]);
            }

            return foundRecipesId;

        };

        $this.ingrediesList = function(recipeIngre) {

            var allRecipeIn = [];
            for( var item in recipeIngre){
                allRecipeIn.push(recipeIngre[item].ingredientName);
            }

            return allRecipeIn;

        };

    }]);
})();