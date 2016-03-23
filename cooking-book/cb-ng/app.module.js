(function  () {

    'use strict';

    angular.module('CookingBookApp', [
        'ui.router',
        'LocalStorageModule',
        'cookingBook.recipe',
        'cookingBook.singleView',
        'cookingBook.search'
    ]);

})();