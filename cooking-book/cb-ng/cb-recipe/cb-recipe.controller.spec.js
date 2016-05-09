'use strict';
describe('Controller: CookingBookRecipeController', function() {

    beforeEach(module('cookingBook.recipe'));

    var scope,
        ctrl,
        $rootScope,
        mockedSearchService,
        mockedSingleViewService,
        mockInitData,
        mockCurrentRecipe,
        location;

    beforeEach(function() {

        mockInitData = [
            {id: 1, name: "Galette", description: "some description", ingredients: [{"ingredientName":"butter", "amount":"100", "amountUnits":"g" }, {"ingredientName":"suggar", "amount":"100", "amountUnits":"g"}]},
            {id: 2, name: "Cheddar Chicken", description: "Preheat oven to 350 degrees F (175 degrees C).", ingredients: [{"ingredientName":"crushed cornflakes cereal", "amount":"1", "amountUnits":"cup" },{"ingredientName":"parmesan", "amount":"3/4", "amountUnits":"cup" }]},
            {id: 3, name: "Cheesecake", description: "Preheat oven to 350 degrees F (175 degrees C).", ingredients: [{"ingredientName":"eggs", "amount":"2", "amountUnits":"" },{"ingredientName":"suggar", "amount":"1/2", "amountUnits":"cup" }]},
            {id: 4, name: "Cupcake", description: "Combine sour cream and sugar; mix well. Stir in coconut. Fold in whipped topping. Spread top and sides of two 9-inch cake layers.", ingredients: [{"ingredientName":"cream", "amount":"2", "amountUnits":"cups" }]}
        ];

        mockedSearchService = {
            foundRecipesId : [],
            allUniqueIntegrates : ["butter", "suggar", "crushed cornflakes cereal", "parmesan", "eggs", "cream"],
            allRecipeIn : [],
            allFoundRecipes : [
                {id: 1, name: "Galette", description: "some description", ingredients: [{"ingredientName":"butter", "amount":"100", "amountUnits":"g" }, {"ingredientName":"suggar", "amount":"100", "amountUnits":"g"}]},
                {id: 3, name: "Cheesecake", description: "Preheat oven to 350 degrees F (175 degrees C).", ingredients: [{"ingredientName":"eggs", "amount":"2", "amountUnits":"" },{"ingredientName":"suggar", "amount":"1/2", "amountUnits":"cup" }]}
            ],
            checkRecipe: function () { },
            search: function () { },
            returnFoundRecipes: function () { return this.allFoundRecipes },
            ingredientsList: function () { return this.allRecipeIn },
            availableUniqueIntegrates: function () { return  this.allUniqueIntegrates}

        };

        mockCurrentRecipe = {
            id: 1,
            name: "Galette",
            description: "some description",
            ingredients: [{"ingredientName":"butter", "amount":"100", "amountUnits":"g" }, {"ingredientName":"suggar", "amount":"100", "amountUnits":"g"}]
        };
        mockedSingleViewService = {
            findRecipe: function () { return mockCurrentRecipe }
        }

    });

    beforeEach(inject(function($controller, _$rootScope_,  _$location_){
        $rootScope =  _$rootScope_;
        scope = $rootScope.$new();
        location = _$location_;

        //scope.recipeList = mockInitData;

        ctrl = $controller('CookingBookRecipeController', {
            $scope: scope,
            'cbRecipeService': mockedSearchService,
            'cbSingleViewService': mockedSingleViewService
        });
        $rootScope.$apply();

    }));


    it('ctrl should be defined', function() {
        expect(ctrl).toBeDefined();
    });

});