var app = angular.module("CookingBookApp");

app.controller("CookingBookController", [ "$scope",  function($scope){

    $scope.recipeList = [
    	{id: 1, name: "musaka", ingredients: "kaima, kartofi"},
        {id: 2, name: "princesa", ingredients: "kaima, hlqb"}
    ]


    // {1: "{"title":"saS","ingredients":"saSA"}", 2: "{"title":"saS","ingredients":"SAsaA"}
    $scope.addManagersForm = function () {
        $scope.recipeList.push({
        	id: ($scope.recipeList.length + 1),
        	name: $scope.recipeList.name,
        	type: $scope.recipeList.ingredients
        });
        $scope.recipeList.name = '';
        $scope.recipeList.ingredients = '';

        console.log("$scope.recipeList: ", $scope.recipeList);
    };

    $scope.deletingList = function() {

    }

}]);