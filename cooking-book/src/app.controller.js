(function  () {

    'use strict';

    var app = angular.module("cookingBook");

    /**
     * @ngdoc controller
     * @name cookingBook.controller:CookingBookController
     * @module cookingBook
     * @description

     * Главен контролер за прилжението cookingBook. Управлява състоянето на мобилнот меню и съдържаниерто в дясната колона
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
         * Взимане на наличните рецепти.
         * Извиква метода getRecipe от сървиса cbRecipeService и получава обект със всички налични рецепти
         */

        $rootScope.recipeList = cbRecipeService.getRecipe();

        /**
         * @ngdoc property
         * @name isMobileMenu
         * @propertyOf cookingBook.controller:CookingBookController

         * @description Състояние на мобилното меню. Първоначална стойност - false
         */
        $scope.isMobileMenu = false;

        /**
         * @ngdoc property
         * @name showMobileMenu
         * @propertyOf cookingBook.controller:CookingBookController
         * @description

         * css клас за мобилното меню. Първоначална стойност - 'hideMobile'
         */
        $scope.showMobileMenu = 'hideMobile';

        /**
         * @ngdoc method
         * @name toggle
         * @methodOf cookingBook.controller:CookingBookController
         * @description

         * превключване на състоянието на мобилното меню - показване и скриване на менюто
         */
        $scope.toggle = function() {
            $scope.isMobileMenu = !$scope.isMobileMenu;
            $scope.showMobileMenu = $scope.isMobileMenu ? 'showMobile' : 'hideMobile';
        };

    }]);
})();