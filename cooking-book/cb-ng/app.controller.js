(function  () {
    var app = angular.module("cookingBook");

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

        // $scope.showMobileMenu = true;
        var isMobileMenu = false;
        $scope.showMobileMenu = 'hideMobile';
        $scope.toggle = function() {
            isMobileMenu = !isMobileMenu;
            $scope.showMobileMenu = isMobileMenu ? 'showMobile' : 'hideMobile';
        };


    }]);
})();