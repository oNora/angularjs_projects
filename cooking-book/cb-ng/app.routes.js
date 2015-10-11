(function() {

    var app = angular.module('CookingBookApp');

    app.config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {

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
                templateUrl: 'views/addRecipe.html'
            })

            // view a recipe
            .state('recipe', {
                url: '/recipe/:recipeID',
                templateUrl: 'views/recipe.html',
                controller: 'CookingBookRecipe'
            });

        }
    ]);

})();