(function() {

    var app = angular.module('CookingBookApp');

    app.config(['$stateProvider', '$urlRouterProvider',
    	function($stateProvider, $urlRouterProvider) {

		    $urlRouterProvider.otherwise('/addRecipe');

		    $stateProvider

	        // HOME STATES AND NESTED VIEWS ========================================
	        .state('search', {
	            url: '/search',
	            templateUrl: 'views/search.html'
	        })

	        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
	        .state('addRecipe', {
	            url: '/addRecipe',
	            // templateUrl: 'views/addRecipe.html'
	            templateUrl: 'test-iu-view/list-form-view.html'
	        })

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