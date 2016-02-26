(function  () {
    var app = angular.module("CookingBookApp");

    app.controller("CookingBookController", [ "$scope",  function($scope){

        // pyrwvo definiralen na lista - tetowo e pylen posle kato dolnot
        $scope.recipeList = [
            {id: 1, name: "musaka", description: "some description", ingredients: [{"ingredientName":"kaima", "amount":"1", "amountUnits":"ks" }, {"ingredientName":"kartofi", "amount":"1", "amountUnits":"ks" }]},
            {id: 2, name: "princesa", description: "some description", ingredients: [{"ingredientName":"hlqb", "amount":"1", "amountUnits":"ks" },{"ingredientName":"kaima", "amount":"1", "amountUnits":"ks" }]},
            {id: 3, name: "kashkavalka", description: "some description", ingredients: [{"ingredientName":"hlqb", "amount":"1", "amountUnits":"ks" },{"ingredientName":"kashkaval", "amount":"1", "amountUnits":"ks" }]},
            {id: 4, name: "kiuvteta", description: "some description", ingredients: [{"ingredientName":"siren", "amount":"1", "amountUnits":"ks" }]}
        ]

    }]);
})();