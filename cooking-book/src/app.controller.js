(function  () {

    'use strict';

    var app = angular.module("cookingBook");

    /**
     * @ngdoc controller
     * @name cookingBook.controller:CookingBookController
     * @module cookingBook
     * @description

     * General controller for cookingBook app. Manage mobile menu state and right sidebar with recipes.
     *
     */
    app.controller("CookingBookController",
                [ "$scope", '$rootScope',  'cbRecipeService',
                function($scope, $rootScope, cbRecipeService){

        /**
         * @ngdoc property
         * @name recipeList
         * @propertyOf cookingBook.controller:CookingBookController

         * @description
         * Get available recipes.
         * Calling cbRecipeService method getRecipe and receives an object with all avalible recipes
         */

        $rootScope.recipeList = cbRecipeService.getRecipe();

        /**
         * @ngdoc property
         * @name isMobileMenu
         * @propertyOf cookingBook.controller:CookingBookController

         * @description state for mobile menu. Initial value is false
         */
        $scope.isMobileMenu = false;

        /**
         * @ngdoc property
         * @name showMobileMenu
         * @propertyOf cookingBook.controller:CookingBookController
         * @description

         * css class for mobile menu. Initial state is 'hideMobile'
         */
        $scope.showMobileMenu = 'hideMobile';

        /**
         * @ngdoc method
         * @name toggle
         * @methodOf cookingBook.controller:CookingBookController
         * @description

         * toggle menu status - show and hide on mobile
         */
        $scope.toggle = function() {
            $scope.isMobileMenu = !$scope.isMobileMenu;
            $scope.showMobileMenu = $scope.isMobileMenu ? 'showMobile' : 'hideMobile';
        };

    }]);
})();