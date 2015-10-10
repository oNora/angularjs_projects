(function() {

    var app = angular.module('CookingBookApp');

    app.config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/addRecipe');

            $stateProvider

            // search recipe
            .state('search', {
                url: '/search',
                templateUrl: 'views/search.html'
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
                controller: (['$scope', '$stateParams',function($scope, $stateParams) {
                // get the id
                    $scope.id = $stateParams.recipeID;
                    console.log('$scope.id: ', $scope.id);
                    // get the location
                    $scope.location = $stateParams.partyLocation;
                }])
            });

        }
    ]);

})();