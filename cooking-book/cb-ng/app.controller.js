(function  () {
    var app = angular.module("CookingBookApp");

    app.controller("CookingBookController", [ "$scope",  function($scope){

        $scope.recipeList = [
            {id: 1, name: "musaka", ingredients: "kaima, kartofi", instructions: "some description"},
            {id: 2, name: "princesa", ingredients: "kaima, hlqb", instructions: "some description"},
            {id: 3, name: "kashkavalka", ingredients: "kashkaval, hlqb", instructions: "some description"},
            {id: 4, name: "kiuvteta", ingredients: "kaima, hlqb, luk", instructions: "some description"},
            {id: 5, name: "fritata", ingredients: "tikvi, sirene", instructions: "some description"},
        ]


    }]);
})();