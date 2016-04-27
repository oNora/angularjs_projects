'use strict';

describe('Service: cbSearchService', function() {

    beforeEach(module('cookingBook.search'));

    var cbSearchService,
        $rootScope,
        mockAllRecipesList,
        mockIngredienObj

    // Initialize factory
    beforeEach(inject(function(_cbSearchService_, _$rootScope_) {
        $rootScope = _$rootScope_;
        cbSearchService = _cbSearchService_;
        mockAllRecipesList = [
            {id: 1, name: "Galette", description: "some description", ingredients: [{"ingredientName":"butter", "amount":"100", "amountUnits":"g" }, {"ingredientName":"suggar", "amount":"100", "amountUnits":"g"}]},
            {id: 2, name: "Cheddar Chicken", description: "Preheat oven to 350 degrees F (175 degrees C).", ingredients: [{"ingredientName":"crushed cornflakes cereal", "amount":"1", "amountUnits":"cup" },{"ingredientName":"parmesan", "amount":"3/4", "amountUnits":"cup" }]},
            {id: 3, name: "Cheesecake", description: "Preheat oven to 350 degrees F (175 degrees C).", ingredients: [{"ingredientName":"eggs", "amount":"2", "amountUnits":"" },{"ingredientName":"suggar", "amount":"1/2", "amountUnits":"cup" }]},
            {id: 4, name: "Cupcake", description: "Combine sour cream and sugar; mix well. Stir in coconut. Fold in whipped topping. Spread top and sides of two 9-inch cake layers.", ingredients: [{"ingredientName":"cream", "amount":"2", "amountUnits":"cups" }]}
        ];
        mockIngredienObj = [{"ingredientName":"butter", "amount":"100", "amountUnits":"g" }, {"ingredientName":"suggar", "amount":"100", "amountUnits":"g"}];
    }));

    it('Should have a service', function () {
        expect(cbSearchService).not.toEqual(null);
    });

    describe('Get ingredientsList call', function() {

        it('Should have a ingredientsList', function () {
            expect(cbSearchService.ingredientsList).toBeDefined();
            expect(typeof cbSearchService.ingredientsList).toBe('function');
        });

    });

    describe('Get availableUniqueIntegrates call', function() {

        it('Should have a availableUniqueIntegrates', function () {
            expect(cbSearchService.availableUniqueIntegrates).toBeDefined();
            expect(typeof cbSearchService.availableUniqueIntegrates).toBe('function');
        });

        it('Should have call availableUniqueIntegrates and check related functions', function(){

            spyOn(cbSearchService, 'availableUniqueIntegrates').and.callThrough();
            spyOn(cbSearchService, 'ingredientsList').and.callThrough();

            cbSearchService.availableUniqueIntegrates(mockAllRecipesList);
            expect(cbSearchService.availableUniqueIntegrates).toHaveBeenCalledWith(mockAllRecipesList);

            expect(cbSearchService.ingredientsList).toHaveBeenCalled();
            expect(cbSearchService.ingredientsList).toHaveBeenCalledWith(mockIngredienObj);

            expect(typeof cbSearchService.allUniqueIntegrates).toBe('object');
        });

    });

});