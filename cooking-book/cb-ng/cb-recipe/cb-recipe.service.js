(function  () {

    'use strict';

    var app = angular.module("cookingBook.recipe");

    app.service("cbRecipeService", ['localStorageService', function (localStorageService) {

        var $this = this;

        /**
         * reset value
         * object returned from function $this.returnRecipeIndex
         * @type {Number} - index of current recipe in allRecipes array
         */
        $this.indexRecipe = null;

        /**
         * reset value
         * variable used  in $this.addRecipe and $this.updateRecipe
         * @type {[type]}
         */
        $this.recipeValues = {};

        /**
         * reset value
         * @type {Object} - confirm deletion data of current recipe
         */
        $this.confirmDate = {};

        /**
         * Get recipe index in allRecipes array
         * @param  {Array} allRecipe        - all available recipe
         * @param  {Number} currentRecipeId - recipe ID
         * @return {Number}                 - index of current recipe in allRecipes array
         */
        $this.returnRecipeIndex = function (allRecipe, currentRecipeId) {

            for(var i = 0; i < allRecipe.length; i++){
                if(allRecipe[i].id === currentRecipeId){
                    $this.indexRecipe = i;
                }
            }

            return $this.indexRecipe;
        };


        /**
         * Get all available/saved recipes
         * @return {Array}    - all available/saved recipes
         */
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


        /**
         * add new resipe
         * @param {String} recipeName        - name of current recipe
         * @param {Array} ingredientsList    - list with all ingredient objects of current recipe
         * @param {string} recipeDescription - description/instruction for current recipe
         * @return {Array}                   - alist of all available recipe with the new one
         */
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

        /**
         * update recipe
         * @param {String} recipeName        - name of current recipe
         * @param {Array} ingredientsList    - list with all ingredient objects of current recipe
         * @param {string} recipeDescription - description/instruction for current recipe
         * @param {String} recipeID          - current recipe id
         * @return {Array}                   - list of all available recipe with the updated one
         */
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


        /**
         * delete recipe
         * @param  {Number} recipeID - current recipe id
         * @return {Object}          - confirm deletion data of current recipe
         */
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