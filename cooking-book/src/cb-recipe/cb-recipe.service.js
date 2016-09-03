(function  () {

    'use strict';

    var app = angular.module("cookingBook.recipe");


    /**
     * @ngdoc service
     * @name cookingBook.recipe.service:cbRecipeService
     * @module cookingBook.recipe
     * @description

     * Управление на зараждането на данните за рецептите, добавяне, изтриване и редактиране
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
         * Променлива/връщана стойност от метод **$this.returnRecipeIndex**.
         * Тип на променлива **Number** - индех на текуща рецепта в масива allRecipes
         */
        $this.indexRecipe = null;


        /**
         * @ngdoc property
         * @name recipeValues
         * @propertyOf cookingBook.recipe.service:cbRecipeService

         * @description
         * Обект ползван в **$this.addRecipe** и **$this.updateRecipe** методи.
         */
        $this.recipeValues = {};


        /**
         * @ngdoc property
         * @name confirmData
         * @propertyOf cookingBook.recipe.service:cbRecipeService

         * @description
         * Тип на променлива **Object** - обект с данни за потвърждаване на изтриването.
         */
        $this.confirmData = {};

        /**
         * @ngdoc method
         * @name returnRecipeIndex
         * @methodOf cookingBook.recipe.service:cbRecipeService
         * @description

         * Намиране на индекс на рецепта от масива allRecipes
         * @param  {Array} allRecipe        - всички налични рецепти
         * @param  {Number} currentRecipeId - уникален номер ID на рецепта 
         * @return {Number}                 - индех на текуща рецепта в масива allRecipes
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

         * Намиране на всички налични/запазени рецепти
         * @return {Array}    - всички налични/запазени рецепти
         */
        $this.getRecipe = function (){
            //DB simulation
            var initData = [
                {id: 1, name: "Кекс", description: "някакво описание", ingredients: [{"ingredientName":"масло", "amount":"100", "amountUnits":"гр" }, {"ingredientName":"захар", "amount":"100", "amountUnits":"гр"}]},
                {id: 2, name: "Хрупкаво пиле", description: "Пече се на фурна на 175 градуса.", ingredients: [{"ingredientName":"корнфелкс", "amount":"1", "amountUnits":"чаша" },{"ingredientName":"пармезам", "amount":"3/4", "amountUnits":"чаша" }]},
                {id: 3, name: "Чийзкейк", description: "Пече се на фурна на 175 градуса.", ingredients: [{"ingredientName":"яйца", "amount":"2", "amountUnits":"бр" },{"ingredientName":"захар", "amount":"1/2", "amountUnits":"чаша" }]},
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
         * @param  {String} recipeName        - име на текущата рецепта
         * @param  {Array}  ingredientsList   - списък със всички продукти за текущата рецепта
         * @param  {string} recipeDescription - описание на текуща рецепта
         * @return {Array}                    - списък със всички налични рецепти плюс добавената
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

            //обновяване на $scope.recipeList
            return recipeList;

        };

        /**
         * @ngdoc method
         * @name addRecipe
         * @methodOf cookingBook.recipe.service:cbRecipeService
         * @description

         * update recipe
         * @param  {String} recipeName         - име на текущата рецепта
         * @param  {Array}  ingredientsList    - списък със всички продукти за текущата рецепта
         * @param  {string} recipeDescription  - описание на текуща рецепта
         * @param  {String} recipeID           - конретен уникален номер ID на текуща рецепта
         * @return {Array}                     - списък на всички налични рецепти с обновяване на стойнощ на редактираната рецепта
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

            //обновяване на $scope.recipeList
            return recipeList;

        };

        /**
         * @ngdoc method
         * @name addRecipe
         * @methodOf cookingBook.recipe.service:cbRecipeService
         * @description

         * Изтриване на рецепта
         * @param  {Number} recipeID - текущ уникален номер на рецепта ID
         * @return {Object}          - обект с потвърждаващи данни за изтриването на рецепта
         */
        $this.deleteRecipe = function (recipeID){

            var recipeList = $this.getRecipe();
            var recipeIndex = $this.returnRecipeIndex(recipeList, recipeID);

            recipeList.splice(recipeIndex, 1);
            localStorageService.set( "recipeList", recipeList);

            //обновяване на $scope.recipeList
            $this.confirmData = {
                confirmDeleting: 1,
                updateRecipeList: recipeList
            };
            return $this.confirmData;

        };

    }]);
})();