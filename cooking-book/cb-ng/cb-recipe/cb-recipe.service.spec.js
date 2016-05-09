'use strict';

describe('Service: cbRecipeService', function() {

    beforeEach(module('cookingBook.recipe'));

    var cbRecipeService,
        $rootScope,
        mockAllRecipesList,
        mockRecipeValues;

    beforeEach(inject(function(_cbRecipeService_, _$rootScope_) {
        $rootScope = _$rootScope_;
        cbRecipeService = _cbRecipeService_;
        mockAllRecipesList = [
            {id: 1, name: "Galette", description: "some description", ingredients: [{"ingredientName":"butter", "amount":"100", "amountUnits":"g" }, {"ingredientName":"suggar", "amount":"100", "amountUnits":"g"}]},
            {id: 2, name: "Cheddar Chicken", description: "Preheat oven to 350 degrees F (175 degrees C).", ingredients: [{"ingredientName":"crushed cornflakes cereal", "amount":"1", "amountUnits":"cup" },{"ingredientName":"parmesan", "amount":"3/4", "amountUnits":"cup" }]},
            {id: 3, name: "Cheesecake", description: "Preheat oven to 350 degrees F (175 degrees C).", ingredients: [{"ingredientName":"eggs", "amount":"2", "amountUnits":"" },{"ingredientName":"suggar", "amount":"1/2", "amountUnits":"cup" }]},
            {id: 4, name: "Cupcake", description: "Combine sour cream and sugar; mix well. Stir in coconut. Fold in whipped topping. Spread top and sides of two 9-inch cake layers.", ingredients: [{"ingredientName":"cream", "amount":"2", "amountUnits":"cups" }]}
        ];
        mockRecipeValues = {
            id:          null,
            name:        "Galette",
            ingredients: [{"ingredientName":"butter", "amount":"100", "amountUnits":"g" }, {"ingredientName":"suggar", "amount":"100", "amountUnits":"g"}],
            description: "some description"
        };
    }));

    it('Should have a service', function () {
        expect(cbRecipeService).not.toEqual(null);
    });

    describe('Get returnRecipeIndex call', function() {
        it('Should have a returnRecipeIndex', function () {
            expect(cbRecipeService.returnRecipeIndex).toBeDefined();
            expect(typeof cbRecipeService.returnRecipeIndex).toBe('function');
        });

        it('Should have call checkRecipe', function () {
            var currentRecipeId = 4;

            spyOn(cbRecipeService, 'returnRecipeIndex').and.callThrough();
            cbRecipeService.returnRecipeIndex(mockAllRecipesList, currentRecipeId);
            expect(cbRecipeService.returnRecipeIndex).toHaveBeenCalled();

            expect( cbRecipeService.indexRecipe).toBeDefined();
            expect(typeof cbRecipeService.indexRecipe).toBe('number');
        });
    });

    describe('Get saveRecipe call', function() {
        it('Should have a saveRecipe', function () {
            expect(cbRecipeService.saveRecipe).toBeDefined();
            expect(typeof cbRecipeService.saveRecipe).toBe('function');
        });

        it('Should have call checkRecipe check related functions WITHOUT recipeID', function () {
            var recipeID = undefined;

            spyOn(cbRecipeService, 'saveRecipe').and.callThrough();
            cbRecipeService.saveRecipe(mockRecipeValues, mockAllRecipesList, recipeID);
            expect(cbRecipeService.saveRecipe).toHaveBeenCalled();

            expect(typeof mockRecipeValues.id).toBe('number');
        });

        it('Should have call checkRecipe check related functions WITH recipeID', function () {
            var recipeID = 5;

            spyOn(cbRecipeService, 'saveRecipe').and.callThrough();
            spyOn(cbRecipeService, 'returnRecipeIndex').and.callThrough();
            cbRecipeService.saveRecipe(mockRecipeValues, mockAllRecipesList, recipeID);
            expect(cbRecipeService.saveRecipe).toHaveBeenCalled();

            expect( mockRecipeValues.id).toBe(recipeID);

            expect(cbRecipeService.returnRecipeIndex).toHaveBeenCalled();
            expect( cbRecipeService.valuesForSave).toBeDefined();
            expect(typeof cbRecipeService.valuesForSave).toBe('object');

        });
    });

});