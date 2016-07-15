(function  () {

    'use strict';

    var app = angular.module("cookingBook.recipe");


    /**
     * @ngdoc service
     * @name cookingBook.recipe.service:cbRecipeService
     * @module cookingBook.recipe
     * @description

     * Manage loading data for a single recipe
     *
     */
    app.service("cbRecipeService", ['localStorageService', function (localStorageService) {

        var $this = this;

        //reset value

        /**
         * @ngdoc property
         * @name indexRecipe
         * @propertyOf cookingBook.recipe.service:cbRecipeService

         * @description
         * Variable returned from function **$this.returnRecipeIndex** method.
         * Type of variable **Number** - index of current recipe in allRecipes array
         */
        $this.indexRecipe = null;


        /**
         * @ngdoc property
         * @name recipeValues
         * @propertyOf cookingBook.recipe.service:cbRecipeService

         * @description
         * Object used in **$this.addRecipe** and **$this.updateRecipe** methods.
         */
        $this.recipeValues = {};


        /**
         * @ngdoc property
         * @name confirmDate
         * @propertyOf cookingBook.recipe.service:cbRecipeService

         * @description
         * Type of variable **Object** - confirm deletion data of current recipe.
         */
        $this.confirmDate = {};

        /**
         * @ngdoc method
         * @name returnRecipeIndex
         * @methodOf cookingBook.recipe.service:cbRecipeService
         * @description

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
         * @ngdoc method
         * @name getRecipe
         * @methodOf cookingBook.recipe.service:cbRecipeService
         * @description

         * Get all available/saved recipes
         * @return {Array}    - all available/saved recipes
         */
        $this.getRecipe = function (){
            //DB simulation
            var initData = [
                {id: 1, name: "Кекс", description: "някакво описание", ingredients: [{"ingredientName":"масло", "amount":"100", "amountUnits":"гр" }, {"ingredientName":"захар", "amount":"100", "amountUnits":"гр"}]},
                {id: 2, name: "Хрупкаво пиле", description: "Пече се на фирна на 175 градуса.", ingredients: [{"ingredientName":"корнфелкс", "amount":"1", "amountUnits":"чаша" },{"ingredientName":"пармезам", "amount":"3/4", "amountUnits":"чаша" }]},
                {id: 3, name: "Чийзкейк", description: "Пече се на фирна на 175 градуса.", ingredients: [{"ingredientName":"яйца", "amount":"2", "amountUnits":"бр" },{"ingredientName":"захар", "amount":"1/2", "amountUnits":"чаша" }]},
                {id: 4, name: "Мъфини", description: "Комбинирайте заквасена сметана и захар; Смесете добре. Добавете кокос и разбъркайта.", ingredients: [{"ingredientName":"заквасена сметана", "amount":"2", "amountUnits":"чаша" }]}
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
         * @ngdoc method
         * @name addRecipe
         * @methodOf cookingBook.recipe.service:cbRecipeService
         * @description

         * add new resipe
         * @param  {String} recipeName        - name of current recipe
         * @param  {Array}  ingredientsList   - list with all ingredient objects of current recipe
         * @param  {string} recipeDescription - description/instruction for current recipe
         * @return {Array}                    - alist of all available recipe with the new one
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
         * @ngdoc method
         * @name addRecipe
         * @methodOf cookingBook.recipe.service:cbRecipeService
         * @description

         * update recipe
         * @param  {String} recipeName         - name of current recipe
         * @param  {Array}  ingredientsList    - list with all ingredient objects of current recipe
         * @param  {string} recipeDescription  - description/instruction for current recipe
         * @param  {String} recipeID           - current recipe id
         * @return {Array}                     - list of all available recipe with the updated one
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
         * @ngdoc method
         * @name addRecipe
         * @methodOf cookingBook.recipe.service:cbRecipeService
         * @description

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