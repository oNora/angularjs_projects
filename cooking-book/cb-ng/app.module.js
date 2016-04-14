(function  () {

    'use strict';

    angular.module('cookingBook', [
        'ui.router',
        'LocalStorageModule',
        'ngAnimate',
        'cookingBook.recipe',
        'cookingBook.singleView',
        'cookingBook.search'
    ]);

})();