'use strict';

describe('Service: cbSearchService', function() {

    beforeEach(module('cookingBook.search'));

    var cbSearchService,
        mockAllRecipesList,
        mockIngredienObj,
        mockInputSearck;

    // Initialize factory
    beforeEach(inject(function(_cbSearchService_) {

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

    it('Should have foundRecipesId and to be EMPTY', function () {
        expect(cbSearchService.foundRecipesId).toBeDefined();
        expect(cbSearchService.foundRecipesId instanceof Array).toBeTruthy();
        expect(cbSearchService.foundRecipesId).toEqual([]);
    });

    describe('Get checkRecipe call', function() {
        var entryValue = 'suggar';

        it('Should have a checkRecipe', function () {
            expect(cbSearchService.checkRecipe).toBeDefined();
            expect(typeof cbSearchService.checkRecipe).toBe('function');
        });

        it('Should have call checkRecipe and check related functions', function(){
            spyOn(cbSearchService, 'checkRecipe').and.callThrough();
            spyOn(cbSearchService, 'ingredientsList').and.callThrough();
            cbSearchService.checkRecipe(entryValue, mockAllRecipesList);

            expect(cbSearchService.checkRecipe).toHaveBeenCalled();
            expect(cbSearchService.checkRecipe).toHaveBeenCalledWith(entryValue, mockAllRecipesList);

            expect(cbSearchService.ingredientsList).toHaveBeenCalled();

            expect(cbSearchService.foundRecipesId).toBeDefined();
            expect(cbSearchService.foundRecipesId instanceof Array).toBeTruthy();
            expect(cbSearchService.foundRecipesId).not.toEqual([]);
            expect(typeof cbSearchService.foundRecipesId[0]).toBe('number');

        });

    });

    describe('Get search call', function() {

        beforeEach(function() {
            mockInputSearck =  'suggar';
        });

        it('Should have a search', function () {
            expect(cbSearchService.checkRecipe).toBeDefined();
            expect(typeof cbSearchService.checkRecipe).toBe('function');
        });

        it('Should have call search and check related functions', function(){

            spyOn(cbSearchService, 'search').and.callThrough();
            cbSearchService.search(mockInputSearck, mockAllRecipesList);

            expect(cbSearchService.search).toHaveBeenCalled();
            expect(cbSearchService.search).toHaveBeenCalledWith(mockInputSearck, mockAllRecipesList);

            expect(cbSearchService.foundRecipesId).toBeDefined();
            expect(cbSearchService.foundRecipesId instanceof Array).toBeTruthy();
            expect(cbSearchService.foundRecipesId).not.toEqual([]);
            expect(typeof cbSearchService.foundRecipesId[0]).toBe('number');

        });

    });

    describe('Get returnFoundRecipes call', function() {

        beforeEach(function() {
            cbSearchService.foundRecipesId = [1, 3];
            mockInputSearck =  'suggar';
        });

        it('Should have a returnFoundRecipes', function () {
            expect(cbSearchService.returnFoundRecipes).toBeDefined();
            expect(typeof cbSearchService.returnFoundRecipes).toBe('function');
        });

        it('Should have call returnFoundRecipes', function(){
            spyOn(cbSearchService, 'returnFoundRecipes').and.callThrough();
            spyOn(cbSearchService, 'search').and.callThrough();
            cbSearchService.returnFoundRecipes(mockInputSearck, mockAllRecipesList);

            expect(cbSearchService.returnFoundRecipes).toHaveBeenCalled();
            expect(cbSearchService.returnFoundRecipes).toHaveBeenCalledWith(mockInputSearck, mockAllRecipesList);

            expect(cbSearchService.allFoundRecipes).toBeDefined();

            expect(cbSearchService.search).toHaveBeenCalled();

            expect(cbSearchService.allFoundRecipes instanceof Array).toBeTruthy();
            expect(typeof cbSearchService.allFoundRecipes[0]).toBe('object');
            expect(cbSearchService.allFoundRecipes[0].id).toBeDefined();
            expect(cbSearchService.allFoundRecipes[0].name).toBeDefined();
            expect(cbSearchService.allFoundRecipes[0].ingredients).toBeDefined();

        });

    });


    describe('Get ingredientsList call', function() {

        it('Should have a ingredientsList', function () {
            expect(cbSearchService.ingredientsList).toBeDefined();
            expect(typeof cbSearchService.ingredientsList).toBe('function');
        });

        it('Should have call ingredientsList', function(){
            spyOn(cbSearchService, 'ingredientsList').and.callThrough();
            cbSearchService.ingredientsList(mockIngredienObj);

            expect(cbSearchService.ingredientsList).toHaveBeenCalled();
            expect(cbSearchService.ingredientsList).toHaveBeenCalledWith(mockIngredienObj);

            expect(cbSearchService.allRecipeIn).toBeDefined();
            expect(cbSearchService.allRecipeIn instanceof Array).toBeTruthy();
            expect(typeof cbSearchService.allRecipeIn[0]).toBe('string');

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

            expect(cbSearchService.allUniqueIntegrates).toBeDefined();
            expect(cbSearchService.allUniqueIntegrates instanceof Array).toBeTruthy();
            expect(typeof cbSearchService.allUniqueIntegrates[0]).toBe('string');

        });

    });

});