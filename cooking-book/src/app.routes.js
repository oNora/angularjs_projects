(function() {

    'use strict';

    var app = angular.module('cookingBook');

    app.config(['$stateProvider', '$urlRouterProvider', 'localStorageServiceProvider',
            function($stateProvider, $urlRouterProvider, localStorageServiceProvider) {

                $urlRouterProvider.otherwise('/addRecipe');

                $stateProvider

                    // търсене на рецепта
                    .state('search', {
                        url: '/search',
                        templateUrl: 'views/search.html',
                        controller: 'SearchController'
                    })

                    // добавяне на нова рецепта
                    .state('addRecipe', {
                        url: '/addRecipe',
                        templateUrl: 'views/recipe/saveRecipe.html',
                        controller: 'RecipeController'
                    })

                    // редактиране на рецепта
                    .state('editRecipe', {
                        url: '/editRecipe/:recipeID',
                        templateUrl: 'views/recipe/saveRecipe.html',
                        controller: 'RecipeController'
                    })

                    // преглед на единична рецепта
                    .state('singleView', {
                        url: '/singleView/:recipeID',
                        templateUrl: 'views/singleView.html',
                        controller: 'SingleViewController'
                    })

                    // изтриване на рецепта
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