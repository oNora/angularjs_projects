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
                {id: 1, name: "Кекс", description: "някакво описание", ingredients: [{"ingredientName":"масло", "amount":"100", "amountUnits":"гр" }, {"ingredientName":"захар", "amount":"100", "amountUnits":"гр"}]},
                {id: 2, name: "Хрупкаво пиле", description: "Пече се на фирна на 175 градуса.", ingredients: [{"ingredientName":"корнфелкс", "amount":"1", "amountUnits":"чаша" },{"ingredientName":"пармезам", "amount":"3/4", "amountUnits":"чаша" }]},
                {id: 3, name: "Чийзкейк", description: "Пече се на фирна на 175 градуса.", ingredients: [{"ingredientName":"яйца", "amount":"2", "amountUnits":"бр" },{"ingredientName":"захар", "amount":"1/2", "amountUnits":"чаша" }]},
                {id: 4, name: "Мъфини", description: "Комбинирайте заквасена сметана и захар; Смесете добре. Добавете кокос и разбъркайта.", ingredients: [{"ingredientName":"заквасена сметана", "amount":"2", "amountUnits":"чаша" }]}
            ];
        mockIngredienObj = [{"ingredientName":"масло", "amount":"100", "amountUnits":"гр" }, {"ingredientName":"захар", "amount":"100", "amountUnits":"гр"}];
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
        var entryValue = 'захар';

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
            mockInputSearck =  'захар';
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
            mockInputSearck =  'захар';
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