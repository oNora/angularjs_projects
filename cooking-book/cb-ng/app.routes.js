(function() {

    var app = angular.module('CookingBookApp');

    app.config(['$stateProvider', '$urlRouterProvider',
    	function($stateProvider, $urlRouterProvider) {

		    $urlRouterProvider.otherwise('/addRecipe');

		    $stateProvider

	        // search recepi
	        .state('search', {
	            url: '/search',
	            templateUrl: 'views/search.html'
	        })

	        // add new recepi
	        .state('addRecipe', {
	            url: '/addRecipe',
	            templateUrl: 'views/addRecipe.html'
	        })

            // view a recepi
	        .state('recepi', {
	            url: '/recepi/:recepiID',
	            templateUrl: 'views/recepi.html',
	            controller: function($scope, $stateParams) {
	            // get the id
	                $scope.id = $stateParams.recepiID;
	                console.log('$scope.id: ', $scope.id);
	                // get the location
	                $scope.location = $stateParams.partyLocation;
	            }
	        });

		}
	]);

})();