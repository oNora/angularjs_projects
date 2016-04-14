(function() {

    'use strict';

    var app = angular.module('cookingBook');

    app.config(['$stateProvider', '$urlRouterProvider', 'localStorageServiceProvider',
            function($stateProvider, $urlRouterProvider, localStorageServiceProvider) {

                $urlRouterProvider.otherwise('/addRecipe');

                $stateProvider

                    // search recipe
                    .state('search', {
                        url: '/search',
                        templateUrl: 'views/search.html',
                        controller: 'CookingBookSearchController'
                    })

                    // add new recipe
                    .state('addRecipe', {
                        url: '/addRecipe',
                        templateUrl: 'views/recipe/saveRecipe.html',
                        controller: 'CookingBookRecipeController'
                    })

                    // edit recipe
                    .state('editRecipe', {
                        url: '/editRecipe/:recipeID',
                        templateUrl: 'views/recipe/saveRecipe.html',
                        controller: 'CookingBookRecipeController'
                    })

                    // view a recipe
                    .state('singleView', {
                        url: '/singleView/:recipeID',
                        templateUrl: 'views/singleView.html',
                        controller: 'CookingBookSingleViewController'
                    })

                    // view a recipe
                    .state('deleteRecipe', {
                        url: '/delete/:recipeID',
                        templateUrl: 'views/recipe/deleteRecipe.html',
                        controller: 'CookingBookRecipeController'
                    })

                    .state('404', {
                        url: '/404',
                        templateUrl: "views/404.html"
                    });

                localStorageServiceProvider.setPrefix('cookingBook');
            }
        ]);

})();