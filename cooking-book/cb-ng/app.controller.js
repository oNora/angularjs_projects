(function  () {
    var app = angular.module("CookingBookApp");

    app.controller("CookingBookController",
                [ "$scope", 'localStorageService', 'cookingBooAppService',
                function($scope, localStorageService, cookingBooAppService){

        var getInitData = cookingBooAppService.init();
        var storages = localStorageService.get( "recipeList");

        if(storages === null) {
            $scope.recipeList = getInitData;
            localStorageService.set( "recipeList", getInitData);
        }
        else {
            $scope.recipeList = storages;
        }
    }]);
})();