(function  () {
    var app = angular.module("cookingBook");

    app.controller("CookingBookController",
                [ "$scope", '$rootScope',  'cbRecipeService',
                function($scope, $rootScope, cbRecipeService){

        $rootScope.recipeList = cbRecipeService.getRecipe();

        $scope.isMobileMenu = false;
        $scope.showMobileMenu = 'hideMobile';
        $scope.toggle = function() {
            $scope.isMobileMenu = !$scope.isMobileMenu;
            $scope.showMobileMenu = $scope.isMobileMenu ? 'showMobile' : 'hideMobile';
        };

    }]);
})();