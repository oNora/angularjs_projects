(function  () {

    'use strict';

    angular.module('CookingBookApp', [
        'ui.router',
        'LocalStorageModule',
        'cookingBook.formRecipe',
        'cookingBook.singleView',
        'cookingBook.search'
    ]);

})();