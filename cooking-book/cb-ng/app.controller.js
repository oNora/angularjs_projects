(function  () {

    'use strict';

    /**
     * General controller for CookingBook
     */
    var app = angular.module("cookingBook");

    app.controller("CookingBookController",
                [ "$scope", '$rootScope',  'cbRecipeService',
                function($scope, $rootScope, cbRecipeService){

        /**
         * Get available recipes
         */
        $rootScope.recipeList = cbRecipeService.getRecipe();

        /**
         * @type {Boolean} - initial menu status on mobile
         */
        $scope.isMobileMenu = false;

        /**
         * @type {String} - initial css class for menu status on mobile
         */
        $scope.showMobileMenu = 'hideMobile';

        /**
         * toggle menu status - show and hide on mobile
         */
        $scope.toggle = function() {
            $scope.isMobileMenu = !$scope.isMobileMenu;
            $scope.showMobileMenu = $scope.isMobileMenu ? 'showMobile' : 'hideMobile';
        };

    }]);
})();