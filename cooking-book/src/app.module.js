(function  () {

    'use strict';

    /**
     * @ngdoc overview
     * @module cookingBook
     * @name cookingBook
     *
     * @description

     * Главен модул за приложението cookingBook
     */
    angular.module('cookingBook', [
        'ui.router',
        'ngAnimate',
        'cookingBook.recipe',
        'cookingBook.singleView',
        'cookingBook.search'
    ]);

})();