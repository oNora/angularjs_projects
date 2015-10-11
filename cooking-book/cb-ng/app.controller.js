(function  () {
    var app = angular.module("CookingBookApp");

    app.controller("CookingBookController", [ "$scope",  function($scope){

        $scope.recipeList = [
            {id: 1, name: "musaka", ingredients: "kaima, kartofi"},
            {id: 2, name: "princesa", ingredients: "kaima, hlqb"},
            {id: 3, name: "kashkavalka", ingredients: "kashkaval, hlqb"},
            {id: 4, name: "kiuvteta", ingredients: "kaima, hlqb, luk"},
            {id: 5, name: "fritata", ingredients: "tikvi, sirene"},
        ]


    }]);
})();