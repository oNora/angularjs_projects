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
            {id: 1, name: "Galette", description: "some description", ingredients: [{"ingredientName":"butter", "amount":"100", "amountUnits":"g" }, {"ingredientName":"suggar", "amount":"100", "amountUnits":"g"}]},
            {id: 2, name: "Cheddar Chicken", description: "Preheat oven to 350 degrees F (175 degrees C).", ingredients: [{"ingredientName":"crushed cornflakes cereal", "amount":"1", "amountUnits":"cup" },{"ingredientName":"parmesan", "amount":"3/4", "amountUnits":"cup" }]},
            {id: 3, name: "Cheesecake", description: "Preheat oven to 350 degrees F (175 degrees C).", ingredients: [{"ingredientName":"eggs", "amount":"2", "amountUnits":"" },{"ingredientName":"suggar", "amount":"1/2", "amountUnits":"cup" }]},
            {id: 4, name: "Cupcake", description: "Combine sour cream and sugar; mix well. Stir in coconut. Fold in whipped topping. Spread top and sides of two 9-inch cake layers.", ingredients: [{"ingredientName":"cream", "amount":"2", "amountUnits":"cups" }]}
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