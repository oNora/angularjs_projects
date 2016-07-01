(function  () {

    'use strict';

    var app = angular.module("cookingBook.recipe");

    app.service("cbRecipeService", ['localStorageService', function (localStorageService) {

        var $this = this;

        $this.indexRecipe = null;
        $this.valuesForSave = {};
        $this.recipeValues = {};
        $this.confirmDate = {};

        $this.returnRecipeIndex = function (allRecipe, currentRecipeId) {

            for(var i = 0; i < allRecipe.length; i++){
                if(allRecipe[i].id === currentRecipeId){
                    $this.indexRecipe = i;
                }
            }

            return $this.indexRecipe;
        };

        $this.getRecipe = function (){
            //DB simulation
            var initData = [
                {id: 1, name: "Galette", description: "some description", ingredients: [{"ingredientName":"butter", "amount":"100", "amountUnits":"g" }, {"ingredientName":"suggar", "amount":"100", "amountUnits":"g"}]},
                {id: 2, name: "Cheddar Chicken", description: "Preheat oven to 350 degrees F (175 degrees C).", ingredients: [{"ingredientName":"crushed cornflakes cereal", "amount":"1", "amountUnits":"cup" },{"ingredientName":"parmesan", "amount":"3/4", "amountUnits":"cup" }]},
                {id: 3, name: "Cheesecake", description: "Preheat oven to 350 degrees F (175 degrees C).", ingredients: [{"ingredientName":"eggs", "amount":"2", "amountUnits":"" },{"ingredientName":"suggar", "amount":"1/2", "amountUnits":"cup" }]},
                {id: 4, name: "Cupcake", description: "Combine sour cream and sugar; mix well. Stir in coconut. Fold in whipped topping. Spread top and sides of two 9-inch cake layers.", ingredients: [{"ingredientName":"cream", "amount":"2", "amountUnits":"cups" }]}
            ];

            var localStorage = localStorageService.get( "recipeList");

            if(localStorage === null) {
                localStorageService.set( "recipeList", initData);
                return initData;
            }
            else {
                return localStorage;
            }

        };

        // $this.saveRecipe = function(recipeValues, recipeList, recipeID){
        $this.addRecipe = function(recipeName, ingredientsList, recipeDescription){

            var recipeList = $this.getRecipe();
            $this.recipeValues = {
                id:          recipeList[recipeList.length -1].id + 1,
                name:        recipeName,
                ingredients: ingredientsList,
                description: recipeDescription
            };

            recipeList.push($this.recipeValues);

            localStorageService.set( "recipeList", recipeList);

            //update $scope.recipeList
            return recipeList;

        };
        
        $this.updateRecipe = function(recipeName, ingredientsList, recipeDescription, recipeID){

            var recipeList = $this.getRecipe();
            var recipeIndex = $this.returnRecipeIndex(recipeList, parseInt(recipeID));
            $this.recipeValues = {
                id:          parseInt(recipeID),
                name:        recipeName,
                ingredients: ingredientsList,
                description: recipeDescription
            };

            recipeList[recipeIndex] = $this.recipeValues;

            localStorageService.set( "recipeList", recipeList);

            //update $scope.recipeList
            return recipeList;

        };

        $this.deleteRecipe = function (recipeID){

            var recipeList = $this.getRecipe();
            var recipeIndex = $this.returnRecipeIndex(recipeList, recipeID);

            recipeList.splice(recipeIndex, 1);
            localStorageService.set( "recipeList", recipeList);

            //update $scope.recipeList
            $this.confirmDate = {
                confirmDeleting: 1,
                updateRecipeList: recipeList
            };
            return $this.confirmDate;

        };

    }]);
})();