/*! Source: src/app.module.js */
(function  () {

/**
     * @ngdoc overview
     * @module cookingBook
     * @name cookingBook
     *
     * @description

     * General module for cookingBook app
     */
    angular.module('cookingBook', [
        'ui.router',
        'ngAnimate',
        'cookingBook.recipe',
        'cookingBook.singleView',
        'cookingBook.search'
    ]);

})();
/*! Source: src/cb-recipe/cb-recipe.module.js */
(function  () {

/**
     * @ngdoc overview 
     * @module cookingBook.recipe
     * @name cookingBook.recipe
     *
     * @description
     * Module for recipe data manipulation.
     */
    angular.module('cookingBook.recipe', [
        'LocalStorageModule',
        'cookingBook.singleView'
    ]);

})();
/*! Source: src/cb-search/cb-search.module.js */
(function  () {

/**
     * @ngdoc overview 
     * @module cookingBook.search
     * @name cookingBook.search
     *
     * @description
     * Module for search recipes of the cookingBook app.
     */
    angular.module('cookingBook.search', [
        // 'ui.router',
    ]);

})();
/*! Source: src/cb-singleView/cb-singleView.module.js */
(function  () {

/**
     * @ngdoc overview 
     * @module cookingBook.singleView
     * @name cookingBook.singleView
     *
     * @description
     * Module for the recipe pages of the cookingBook app.
     */
    angular.module('cookingBook.singleView', [
        'ui.router'
    ]);

})();
/*! Source: src/app.routes.js */
(function() {

var app = angular.module('cookingBook');

    app.config(['$stateProvider', '$urlRouterProvider', 'localStorageServiceProvider',
            function($stateProvider, $urlRouterProvider, localStorageServiceProvider) {

                $urlRouterProvider.otherwise('/addRecipe');

                $stateProvider

                    // search recipe
                    .state('search', {
                        url: '/search',
                        templateUrl: 'views/search.html',
                        controller: 'SearchController'
                    })

                    // add new recipe
                    .state('addRecipe', {
                        url: '/addRecipe',
                        templateUrl: 'views/recipe/saveRecipe.html',
                        controller: 'RecipeController'
                    })

                    // edit recipe
                    .state('editRecipe', {
                        url: '/editRecipe/:recipeID',
                        templateUrl: 'views/recipe/saveRecipe.html',
                        controller: 'RecipeController'
                    })

                    // view a recipe
                    .state('singleView', {
                        url: '/singleView/:recipeID',
                        templateUrl: 'views/singleView.html',
                        controller: 'SingleViewController'
                    })

                    // view a recipe
                    .state('deleteRecipe', {
                        url: '/delete/:recipeID',
                        templateUrl: 'views/recipe/deleteRecipe.html',
                        controller: 'RecipeController'
                    })

                    .state('404', {
                        url: '/404',
                        templateUrl: "views/404.html"
                    });

                localStorageServiceProvider.setPrefix('cookingBook');
            }
        ]);

})();
/*! Source: src/app.controller.js */
(function  () {

var app = angular.module("cookingBook");

    /**
     * @ngdoc controller
     * @name cookingBook.controller:CookingBookController
     * @module cookingBook
     * @description

     * General controller for cookingBook app. Manage mobile menu state and right sidebar with recipes.
     *
     */
    app.controller("CookingBookController",
                [ "$scope", '$rootScope',  'cbRecipeService',
                function($scope, $rootScope, cbRecipeService){

        /**
         * @ngdoc property
         * @name recipeList
         * @propertyOf cookingBook.controller:CookingBookController

         * @description
         * Get available recipes.
         * Calling cbRecipeService method getRecipe and receives an object with all avalible recipes
         */

        $rootScope.recipeList = cbRecipeService.getRecipe();

        /**
         * @ngdoc property
         * @name isMobileMenu
         * @propertyOf cookingBook.controller:CookingBookController

         * @description state for mobile menu. Initial value is false
         */
        $scope.isMobileMenu = false;

        /**
         * @ngdoc property
         * @name showMobileMenu
         * @propertyOf cookingBook.controller:CookingBookController
         * @description

         * css class for mobile menu. Initial state is 'hideMobile'
         */
        $scope.showMobileMenu = 'hideMobile';

        /**
         * @ngdoc method
         * @name toggle
         * @methodOf cookingBook.controller:CookingBookController
         * @description

         * toggle menu status - show and hide on mobile
         */
        $scope.toggle = function() {
            $scope.isMobileMenu = !$scope.isMobileMenu;
            $scope.showMobileMenu = $scope.isMobileMenu ? 'showMobile' : 'hideMobile';
        };

    }]);
})();
/*! Source: src/cb-recipe/cb-recipe.controller.js */
(function  () {

var app = angular.module("cookingBook.recipe");


    /**
     * @ngdoc controller
     * @name cookingBook.recipe.controller:RecipeController
     * @module cookingBook.recipe
     * @description

     * Manage recipe data manipulation.
     *
     */
    app.controller("RecipeController",
        [ "$scope", '$rootScope', '$stateParams', '$location', 'cbRecipeService', 'cbSingleViewService',
        function($scope, $rootScope, $stateParams, $location, cbRecipeService, cbSingleViewService){

            $scope.initView = function() {

                $scope.ingredientsList = [{}];
                $scope.confirmDeleting = 0;

                var viewUrl = $location.path().split('/');
                var currentRecipe = cbSingleViewService.findRecipe($stateParams.recipeID, $scope.recipeList);

                //if recipe is already deleted
                if(currentRecipe === null && viewUrl[1] != 'addRecipe' ){
                    $location.path('/404');
                }else if (viewUrl[1] == 'delete') {
                    $scope.templateTitle = "Deleting";
                }
                else {
                    $scope.templateTitle = $stateParams.recipeID ? 'Edit Recipe' : 'Add a new Recipe';
                }

                if ($stateParams.recipeID && currentRecipe !== null) {
                    $scope.currentID = currentRecipe.id;
                    $scope.recipeName = currentRecipe.name;
                    $scope.recipeDescriptionField = currentRecipe.description;
                    $scope.ingredientsList = currentRecipe.ingredients;
                } else {
                    //reset ingredients object
                    $scope.ingredientsList = [{}];
                }
            };
            $scope.initView();

            /**
             * @ngdoc method
             * @name saveRecipe
             * @methodOf cookingBook.recipe.controller:RecipeController
             * @description

             * Save recipe data on edit or add new
             */
            $scope.saveRecipe = function () {

                var updatedRecipeList;
                if($stateParams.recipeID){
                    updatedRecipeList = cbRecipeService.updateRecipe($scope.recipeName, $scope.ingredientsList,  $scope.recipeDescriptionField, $stateParams.recipeID );
                    $location.path('/singleView/' + $stateParams.recipeID);
                } else {
                    updatedRecipeList = cbRecipeService.addRecipe($scope.recipeName, $scope.ingredientsList,  $scope.recipeDescriptionField );
                }

                $rootScope.recipeList = updatedRecipeList;

                $scope.recipeName = null;
                $scope.recipeDescriptionField = null;
                $scope.ingredientsList = [ {} ];

            };

            /**
             * @ngdoc method
             * @name addIngredient
             * @methodOf cookingBook.recipe.controller:RecipeController
             * @description

             * add new row for ingredient
             */
            $scope.addIngredient = function() {
                var ingredients = $scope.ingredientsList;
                ingredients[ingredients.length] = {};
            };

            /**
             * @ngdoc method
             * @name removeIngredient
             * @methodOf cookingBook.recipe.controller:RecipeController
             * @description

             * remove row for ingredient
             * @param  {Number} index   - index of row of ingredient
             */
            $scope.removeIngredient = function(index) {
                $scope.ingredientsList.splice(index, 1);
            };


            /**
             * @ngdoc method
             * @name removeRecipe
             * @methodOf cookingBook.recipe.controller:RecipeController
             * @description

             * delete recipe
             * @param  {Number} recipeID  - id of recipe
             */
            $scope.removeRecipe = function(recipeID) {

                var deletingData = cbRecipeService.deleteRecipe(recipeID);

                $scope.confirmDeleting = deletingData.confirmDeleting;
                $rootScope.recipeList = deletingData.updateRecipeList;

            };

    }]);
})();
/*! Source: src/cb-recipe/cb-recipe.service.js */
(function  () {

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
/*! Source: src/cb-search/cb-search.controller.js */
(function  () {

var app = angular.module("cookingBook.search");


    /**
     * @ngdoc controller
     * @name cookingBook.search.controller:SearchController
     * @module cookingBook.search
     * @description

     * Manage search of recipes.
     *
     */
    app.controller("SearchController",
        ['$scope', 'cbSearchService',
        function($scope, cbSearchService){

        /**
         * @type {Object} -  reference to search service
         */
         var searchService = cbSearchService;

        $scope.searchMsg = $scope.recipeList.length > 0 ? 'Choose from available  ingredients:' : 'There are not available ingredients. First enter recipes.';
        $scope.foundList = [];
        $scope.isRecipeListEmpty = $scope.recipeList.length === 0;
        $scope.isFoundListEmpty = $scope.foundList.length === 0;

        /**
         * @ngdoc method
         * @name searchRecipe
         * @methodOf cookingBook.search.controller:SearchController
         * @description

         * search for recipes
         * @param  {String} ingredientsInput - search inputs - ingredients list
         */
        $scope.searchRecipe = function (ingredientsInput) {

            // reset list of found recipes
            $scope.foundList = [];

            $scope.foundList = searchService.returnFoundRecipes(ingredientsInput, $scope.recipeList);
            $scope.isFoundListEmpty = $scope.foundList.length === 0;
        };


        /**
         * @ngdoc property
         * @name availableUniqueIntegrates
         * @propertyOf cookingBook.search.controller:SearchController

         * @description
         *  Array of objects - all available ingredients
         */
        $scope.availableUniqueIntegrates = searchService.availableUniqueIntegrates($scope.recipeList);

    }]);
})();
/*! Source: src/cb-search/cb-search.service.js */
(function  () {

var app = angular.module("cookingBook.search");


    /**
     * @ngdoc service
     * @name cookingBook.search.service:cbSearchService
     * @module cookingBook.search
     * @description

     * Manage search recipes of the cookingBook app
     *
     */
    app.service("cbSearchService", [function() {

        var $this = this;

        // reset values

        /**
         * @ngdoc property
         * @name foundRecipesId
         * @propertyOf cookingBook.search.service:cbSearchService

         * @description
         *  Array of list of ID recipes in which there is at least one of the sought ingredients. Initial value - empty array.
         */
        $this.foundRecipesId = [];

        /**
         * @ngdoc property
         * @name allFoundRecipes
         * @propertyOf cookingBook.search.service:cbSearchService

         * @description
         *  Array of  all recipe that includes current ingredients. Initial value - empty array.
         */
        $this.allFoundRecipes = [];

        /**
         * @ngdoc property
         * @name allRecipeIn
         * @propertyOf cookingBook.search.service:cbSearchService

         * @description
         *  Array of list of all names of ingredients for a single recipe. Initial value - empty array.
         */
        $this.allRecipeIn = [];


        /**
         * @ngdoc property
         * @name allUniqueIntegrates
         * @propertyOf cookingBook.search.service:cbSearchService

         * @description
         *  Array of list of all unique ingredients. Initial value - empty array.
         */
        $this.allUniqueIntegrates = [];


        /**
         * @ngdoc method
         * @name checkRecipe
         * @methodOf cookingBook.search.service:cbSearchService
         * @description

         * check if any recipe includes the ingredient
         * @param  {String} entryValue - single input value, single ingredients
         * @param  {Array} allRecipes - all available recipe
         */
        $this.checkRecipe = function (entryValue, allRecipes) {

            for (var i = 0; i < allRecipes.length; i++ ) {
                var recipeIn = $this.ingredientsList(allRecipes[i].ingredients);

                if (recipeIn.indexOf(entryValue) > -1) {
                    if ($this.foundRecipesId.indexOf(allRecipes[i].id) == -1) {
                        $this.foundRecipesId.push(allRecipes[i].id);
                    }
                }
            }

        };

        /**
         * @ngdoc method
         * @name search
         * @methodOf cookingBook.search.service:cbSearchService
         * @description

         * search recipe
         * @param  {String} allIngredients    - search input - ingredient list
         * @param  {Array} availableRecipes   - all available recipe
         */
        $this.search = function(allIngredients, availableRecipes) {

            var input = allIngredients.split(',');

            // reset list of found recipes
            $this.foundRecipesId = [];

            for (var x = 0; x < input.length; x++) {
                var currentInput = input[x].trim();

                $this.checkRecipe(currentInput, availableRecipes);
            }

        };

        /**
         * @ngdoc method
         * @name search
         * @methodOf cookingBook.search.service:cbSearchService
         * @description

         * Find all recipe that includes current ingredients
         * @param  {String} input      - search input - ingredient list
         * @param  {Array} recipeList  - all available recipe
         * @return {Array}             - all recipe that includes current ingredients
         */
        $this.returnFoundRecipes = function(input, recipeList) {

            $this.search(input, recipeList);

            $this.allFoundRecipes = [];

            for (var i = 0; i < recipeList.length; i++) {

                if ($this.foundRecipesId.indexOf(recipeList[i].id) > -1) {
                    $this.allFoundRecipes.push(recipeList[i]);
                }
            }

            return $this.allFoundRecipes;
        };

        /**
         * @ngdoc method
         * @name search
         * @methodOf cookingBook.search.service:cbSearchService
         * @description

         * get names of ingredients for a single recipe
         * @param  {Array} recipeIntegrates - all ingredients for a single recipe
         * @return {Array}                  - list of all names of ingredients for a single recipe
         */
        $this.ingredientsList = function(recipeIntegrates) {

            $this.allRecipeIn = [];

            for( var item in (recipeIntegrates)){
                $this.allRecipeIn.push((recipeIntegrates)[item].ingredientName);
            }

            return $this.allRecipeIn;

        };


        /**
         * @ngdoc method
         * @name search
         * @methodOf cookingBook.search.service:cbSearchService
         * @description

         * Get all unique ingredients
         * @param  {Array} allRecipesList - all available recipe
         * @return {Array}                - list of all unique ingredients
         */
        $this.availableUniqueIntegrates = function (allRecipesList) {

            $this.allUniqueIntegrates = [];

            for (var i=0; i < allRecipesList.length; i++) {

                var arrayIngredients = $this.ingredientsList(allRecipesList[i].ingredients);

                for (var y = 0; y < arrayIngredients.length; y++){
                    if ($this.allUniqueIntegrates.indexOf(arrayIngredients[y]) == -1) {
                        $this.allUniqueIntegrates.push(arrayIngredients[y]);
                    }
                }
            }

            return $this.allUniqueIntegrates;
        };

    }]);
})();
/*! Source: src/cb-singleView/cb-singleView.controller.js */
(function  () {
var app = angular.module("cookingBook.singleView");


    /**
     * @ngdoc controller
     * @name cookingBook.singleView.controller:SingleViewController
     * @module cookingBook.singleView
     * @description

     * Manage single view of recipe.
     *
     */
    app.controller("SingleViewController",
        ['$scope', '$stateParams', 'cbSingleViewService', '$location',
        function($scope, $stateParams, cbSingleViewService, $location){

            /**
             * @ngdoc property
             * @name currentRecipeId
             * @propertyOf cookingBook.singleView.controller:SingleViewController

             * @description
             * recipe ID form stateParams (String)
             */
            var currentRecipeId = $stateParams.recipeID;

            /**
             * @ngdoc property
             * @name currentRecipe
             * @propertyOf cookingBook.singleView.controller:SingleViewController

             * @description
             * Single recipe object
             */
            var currentRecipe = cbSingleViewService.findRecipe(currentRecipeId, $scope.recipeList);

            if(currentRecipe === null ) {
                $location.path('/404');
            }else{
                $scope.name = currentRecipe.name;
                $scope.ingredients = currentRecipe.ingredients;
                $scope.description = currentRecipe.description;
                $scope.id = currentRecipeId;

                /**
                 * @ngdoc method
                 * @name getLength
                 * @methodOf cookingBook.singleView.controller:SingleViewController
                 * @description

                 * Check if has any available ingredients
                 * @param  {Object} obj - ingredients object of single recipe
                 * @return {Number}     - number of available recipe ingredients;
                 *                      if return 1 - no avalible ingredients (default Angular property $$hashKey )
                 */
                $scope.getLength = function(obj) {
                    return Object.keys(obj).length;
                };
            }

    }]);
})();
/*! Source: src/cb-singleView/cb-singleView.service.js */
(function  () {

var app = angular.module("cookingBook.singleView");


    /**
     * @ngdoc service
     * @name cookingBook.singleView.service:cbSingleViewService
     * @module cookingBook.singleView
     * @description

     * Manage loading data for a single recipe
     *
     */
    app.service("cbSingleViewService", [function() {

        var $this = this;

        /**
         * @ngdoc property
         * @name foundRecipe
         * @propertyOf cookingBook.singleView.service:cbSingleViewService

         * @description
         * current recipe object. Initial value is null.
         */
        $this.foundRecipe = null;

        /**
         * @ngdoc method
         * @name findRecipe
         * @methodOf cookingBook.singleView.service:cbSingleViewService
         * @description

         * Find a recipe. Current recipe object
         * @param  {String} recipeID   - current recipe ID
         * @param  {Array} allRecipes - all available recipes
         * @return {Object}            - current recipe object
         */
        $this.findRecipe = function(recipeID, allRecipes) {

            for (var i = 0; i <  allRecipes.length; i++) {

                if( allRecipes[i].id ==  recipeID){
                    $this.foundRecipe =  allRecipes[i];
                    break;
                }

                $this.foundRecipe = null;

            }

            return $this.foundRecipe;
        };

    }]);
})();
//# sourceMappingURL=cooking-book.js.map