'use strict';

describe('Service: cbRecipeService', function() {

    beforeEach(module('cookingBook.recipe'));

    var cbRecipeService,
        $rootScope,
        mockAllRecipesList,
        mockRecipeValues,
        mockLocalStorageService;

    beforeEach(inject(function(_cbRecipeService_, _$rootScope_) {
        $rootScope = _$rootScope_;
        cbRecipeService = _cbRecipeService_;
        mockAllRecipesList = [
                {id: 1, name: "Кекс", description: "някакво описание", ingredients: [{"ingredientName":"масло", "amount":"100", "amountUnits":"гр" }, {"ingredientName":"захар", "amount":"100", "amountUnits":"гр"}]},
                {id: 2, name: "Хрупкаво пиле", description: "Пече се на фирна на 175 градуса.", ingredients: [{"ingredientName":"корнфелкс", "amount":"1", "amountUnits":"чаша" },{"ingredientName":"пармезам", "amount":"3/4", "amountUnits":"чаша" }]},
                {id: 3, name: "Чийзкейк", description: "Пече се на фирна на 175 градуса.", ingredients: [{"ingredientName":"яйца", "amount":"2", "amountUnits":"бр" },{"ingredientName":"захар", "amount":"1/2", "amountUnits":"чаша" }]},
                {id: 4, name: "Мъфини", description: "Комбинирайте заквасена сметана и захар; Смесете добре. Добавете кокос и разбъркайта.", ingredients: [{"ingredientName":"заквасена сметана", "amount":"2", "amountUnits":"чаша" }]}
            ];
        mockRecipeValues = {
            id:          null,
            name:        "Кекс",
            ingredients: [{"ingredientName":"масло", "amount":"100", "amountUnits":"гр" }, {"ingredientName":"захар", "amount":"100", "amountUnits":"гр"}],
            description: "някакво описание"
        };
        mockLocalStorageService = {
            get: function ()  {
                return null;
            },
            set: function ()  {},
            remove: function ()  {
                return null;
            }
        };
    }));

    it('Should have a service', function () {
        expect(cbRecipeService).not.toEqual(null);
    });

    it('Should have all variables', function () {
        expect(cbRecipeService.indexRecipe).toBeDefined();
        expect(cbRecipeService.recipeValues).toBeDefined();
        expect(cbRecipeService.confirmDate).toBeDefined();
    });

    describe('Get returnRecipeIndex call', function() {
        it('Should have a returnRecipeIndex', function () {
            expect(cbRecipeService.returnRecipeIndex).toBeDefined();
            expect(typeof cbRecipeService.returnRecipeIndex).toBe('function');
        });

        it('Should have call returnRecipeIndex', function () {
            var currentRecipeId = 4;

            spyOn(cbRecipeService, 'returnRecipeIndex').and.callThrough();
            cbRecipeService.returnRecipeIndex(mockAllRecipesList, currentRecipeId);
            expect(cbRecipeService.returnRecipeIndex).toHaveBeenCalledWith(mockAllRecipesList, currentRecipeId);

            expect( cbRecipeService.indexRecipe).toBeDefined();
            expect(typeof cbRecipeService.indexRecipe).toBe('number');
        });
    });

    describe('Get getRecipe call', function() {

        var mockInitData = [
                {id: 1, name: "Кекс", description: "някакво описание", ingredients: [{"ingredientName":"масло", "amount":"100", "amountUnits":"гр" }, {"ingredientName":"захар", "amount":"100", "amountUnits":"гр"}]},
                {id: 2, name: "Хрупкаво пиле", description: "Пече се на фирна на 175 градуса.", ingredients: [{"ingredientName":"корнфелкс", "amount":"1", "amountUnits":"чаша" },{"ingredientName":"пармезам", "amount":"3/4", "amountUnits":"чаша" }]},
                {id: 3, name: "Чийзкейк", description: "Пече се на фирна на 175 градуса.", ingredients: [{"ingredientName":"яйца", "amount":"2", "amountUnits":"бр" },{"ingredientName":"захар", "amount":"1/2", "amountUnits":"чаша" }]},
                {id: 4, name: "Мъфини", description: "Комбинирайте заквасена сметана и захар; Смесете добре. Добавете кокос и разбъркайта.", ingredients: [{"ingredientName":"заквасена сметана", "amount":"2", "amountUnits":"чаша" }]}
            ];


        it('Should have a getRecipe', function () {
            expect(cbRecipeService.getRecipe).toBeDefined();
            expect(typeof cbRecipeService.getRecipe).toBe('function');
        });

        it('Should have call getRecipe and set localStorageService', function () {

            spyOn( mockLocalStorageService, 'get').and.callThrough();
            spyOn( mockLocalStorageService, 'set').and.callThrough();

            cbRecipeService.getRecipe();
            mockLocalStorageService.get( "recipeList");
            expect(mockLocalStorageService.get).toHaveBeenCalledWith("recipeList");
            mockLocalStorageService.set( "recipeList", mockInitData);
            expect(mockLocalStorageService.set).toHaveBeenCalledWith("recipeList", mockInitData);

         });


    });

    describe('Get addRecipe call', function() {

         var recipeName ,
            ingredientsList ,
            recipeDescription ;

         beforeEach(function() {
            recipeName = 'new recipe',
            ingredientsList = 'new ingredientsList',
            recipeDescription = 'some description';
         });

        it('Should have a addRecipe', function () {
            expect(cbRecipeService.addRecipe).toBeDefined();
            expect(typeof cbRecipeService.addRecipe).toBe('function');
        });

        it('Should have call addRecipe and check related functions', function () {
            var recipeList = [];

            spyOn( cbRecipeService, 'addRecipe').and.callThrough();
            spyOn( cbRecipeService, 'getRecipe').and.callThrough();
            spyOn( recipeList, 'push').and.callThrough();
            spyOn( mockLocalStorageService, 'set').and.callThrough();

            cbRecipeService.addRecipe(recipeName, ingredientsList, recipeDescription);
            expect(cbRecipeService.addRecipe).toHaveBeenCalledWith(recipeName, ingredientsList, recipeDescription);
            
            expect(cbRecipeService.getRecipe).toHaveBeenCalled();

            recipeList.push(cbRecipeService.recipeValues);
            expect(recipeList.push).toHaveBeenCalledWith(cbRecipeService.recipeValues);

            mockLocalStorageService.set( "recipeList", recipeList);
            expect(mockLocalStorageService.set).toHaveBeenCalled();

        });

        it('Should have call addRecipe and check related values', function () {
            var recipeList = [];

            recipeList = cbRecipeService.getRecipe();

            cbRecipeService.addRecipe(recipeName, ingredientsList, recipeDescription);
            expect(recipeList instanceof Array).toBeTruthy();

            expect(cbRecipeService.recipeValues.id > recipeList[recipeList.length -1].id).toBeTruthy();
            expect(cbRecipeService.recipeValues.name).toEqual(recipeName);
            expect(cbRecipeService.recipeValues.ingredients).toEqual(ingredientsList);
            expect(cbRecipeService.recipeValues.description).toEqual(recipeDescription);

        });

    });

    describe('Get updateRecipe call', function() {

         var recipeName ,
            ingredientsList ,
            recipeDescription,
            recipeID;

         beforeEach(function() {
            recipeName = 'new recipe';
            ingredientsList = 'new ingredientsList';
            recipeDescription = 'some description';
            recipeID = '4';
         });

        it('Should have a updateRecipe', function () {
            expect(cbRecipeService.updateRecipe).toBeDefined();
            expect(typeof cbRecipeService.updateRecipe).toBe('function');
        });

        it('Should have call updateRecipe and check related functions', function () {
            var recipeList = [];

            spyOn( cbRecipeService, 'updateRecipe').and.callThrough();
            spyOn( cbRecipeService, 'getRecipe').and.callThrough();
            spyOn( cbRecipeService, 'returnRecipeIndex').and.callThrough();
            spyOn( mockLocalStorageService, 'set').and.callThrough();

            cbRecipeService.updateRecipe(recipeName, ingredientsList, recipeDescription, recipeID);
            expect(cbRecipeService.updateRecipe).toHaveBeenCalledWith(recipeName, ingredientsList, recipeDescription, recipeID);

            expect(cbRecipeService.getRecipe).toHaveBeenCalled();

            cbRecipeService.returnRecipeIndex(recipeList, parseInt(recipeID));
            expect(cbRecipeService.returnRecipeIndex).toHaveBeenCalledWith(recipeList, parseInt(recipeID));

            mockLocalStorageService.set( "recipeList", recipeList);
            expect(mockLocalStorageService.set).toHaveBeenCalledWith("recipeList", recipeList);

        });

        it('Should have call updateRecipe and check related values', function () {
            var recipeList = [],
                recipeIndex;

            recipeList = cbRecipeService.getRecipe();
            recipeIndex = cbRecipeService.returnRecipeIndex(recipeList, parseInt(recipeID));

            cbRecipeService.updateRecipe(recipeName, ingredientsList, recipeDescription, parseInt(recipeID));

            expect(typeof recipeIndex).toBe('number');
            expect(recipeList instanceof Array).toBeTruthy();

            expect(cbRecipeService.recipeValues.id).toEqual(parseInt(recipeID));
            expect(cbRecipeService.recipeValues.name).toEqual(recipeName);
            expect(cbRecipeService.recipeValues.ingredients).toEqual(ingredientsList);
            expect(cbRecipeService.recipeValues.description).toEqual(recipeDescription);

        });

    });


    describe('Get deleteRecipe call', function() {
        var recipeList,
            recipeID,
            recipeIndex ;

        beforeEach(function() {
            recipeList = [];
            recipeID = '4';
        });

        afterEach(function() {
            recipeList = [];
        });

        it('Should have a deleteRecipe', function () {
            expect(cbRecipeService.deleteRecipe).toBeDefined();
            expect(typeof cbRecipeService.deleteRecipe).toBe('function');
        });

        it('Should have call deleteRecipe and check related functions', function () {

            spyOn( cbRecipeService, 'deleteRecipe').and.callThrough();
            spyOn( cbRecipeService, 'getRecipe').and.callThrough();
            spyOn( cbRecipeService, 'returnRecipeIndex').and.callThrough();
            spyOn( recipeList, 'splice').and.callThrough();
            spyOn( mockLocalStorageService, 'set').and.callThrough();

            cbRecipeService.deleteRecipe( recipeID);
            expect(cbRecipeService.deleteRecipe).toHaveBeenCalledWith(recipeID);

            expect(cbRecipeService.getRecipe).toHaveBeenCalled();

            recipeIndex = cbRecipeService.returnRecipeIndex(recipeList, parseInt(recipeID));
            expect(cbRecipeService.returnRecipeIndex).toHaveBeenCalledWith(recipeList, parseInt(recipeID));

            recipeList.splice(recipeIndex, 1);
            expect(recipeList.splice).toHaveBeenCalledWith(recipeIndex, 1);

            mockLocalStorageService.set( "recipeList", recipeList);
            expect(mockLocalStorageService.set).toHaveBeenCalledWith("recipeList", recipeList);

        });

        it('Should have call updateRecipe and check related values', function () {

            recipeList = cbRecipeService.getRecipe();
            recipeIndex = cbRecipeService.returnRecipeIndex(recipeList, parseInt(recipeID));

            cbRecipeService.deleteRecipe(recipeID);

            expect(typeof recipeIndex).toBe('number');
            expect(recipeList instanceof Array).toBeTruthy();
            
            expect(cbRecipeService.confirmDate.confirmDeleting).toBeDefined()
            expect(cbRecipeService.confirmDate.confirmDeleting).toEqual(1)
            expect(cbRecipeService.confirmDate.updateRecipeList).toBeDefined()
            expect(cbRecipeService.confirmDate.updateRecipeList instanceof Array).toBeTruthy();


        });

    });

});