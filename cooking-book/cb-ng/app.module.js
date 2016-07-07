(function  () {

    'use strict';

    /**
     * @ngdoc overview
     * @module cookingBook
     * @name cookingBook
     *
     * @description

     * General module for cookingBook app
     */
    angular.module('cookingBook', [
        'ui.router',
        'ngAnimate',
        'cookingBook.recipe',
        'cookingBook.singleView',
        'cookingBook.search'
    ]);

})();