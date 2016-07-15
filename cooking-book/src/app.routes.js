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