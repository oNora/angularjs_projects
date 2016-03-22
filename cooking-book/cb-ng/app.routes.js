(function() {

    'use strict';

    var app = angular.module('CookingBookApp');

    app.config(['$stateProvider', '$urlRouterProvider', 'localStorageServiceProvider',
        function($stateProvider, $urlRouterProvider, localStorageServiceProvider) {

            $urlRouterProvider.otherwise('/addRecipe');

            $stateProvider

            // search recipe
            .state('search', {
                url: '/search',
                templateUrl: 'views/search.html',
                controller: 'CookingBookSearch'
            })

            // add new recipe
            .state('addRecipe', {
                url: '/addRecipe',
                templateUrl: 'views/formRecipe.html',
                controller: 'CookingBookFormRecipeController'
            })

            // edit recipe
            .state('editRecipe', {
                url: '/editRecipe/:recipeID',
                templateUrl: 'views/formRecipe.html',
                controller: 'CookingBookFormRecipeController'
            })

            // view a recipe
            .state('recipe', {
                url: '/recipe/:recipeID',
                templateUrl: 'views/recipe.html',
                controller: 'CookingBookRecipe'
            })

            // view a recipe
            .state('deleteRecipe', {
                url: '/delete/:recipeID',
                templateUrl: 'views/formRecipe.html',
                controller: 'CookingBookFormRecipeController'
            });

            localStorageServiceProvider.setPrefix('CookingBookApp');
        }
    ]);

})();