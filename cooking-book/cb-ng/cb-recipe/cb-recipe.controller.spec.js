'use strict';
describe('Controller: CookingBookRecipeController', function() {

    beforeEach(module('cookingBook.recipe'));

    var scope,
        ctrl,
        $rootScope,
        mockedRecipeService,
        mockedSingleViewService,
        mockLocalStorageService,
        mockInitData,
        mockCurrentRecipe,
        location;
        //recipeID = 3;

    beforeEach(function() {

        mockInitData = [
            {id: 1, name: "Galette", description: "some description", ingredients: [{"ingredientName":"butter", "amount":"100", "amountUnits":"g" }, {"ingredientName":"suggar", "amount":"100", "amountUnits":"g"}]},
            {id: 2, name: "Cheddar Chicken", description: "Preheat oven to 350 degrees F (175 degrees C).", ingredients: [{"ingredientName":"crushed cornflakes cereal", "amount":"1", "amountUnits":"cup" },{"ingredientName":"parmesan", "amount":"3/4", "amountUnits":"cup" }]},
            {id: 3, name: "Cheesecake", description: "Preheat oven to 350 degrees F (175 degrees C).", ingredients: [{"ingredientName":"eggs", "amount":"2", "amountUnits":"" },{"ingredientName":"suggar", "amount":"1/2", "amountUnits":"cup" }]},
            {id: 4, name: "Cupcake", description: "Combine sour cream and sugar; mix well. Stir in coconut. Fold in whipped topping. Spread top and sides of two 9-inch cake layers.", ingredients: [{"ingredientName":"cream", "amount":"2", "amountUnits":"cups" }]}
        ];



        mockedRecipeService = {
            valuesForSave : {
                recipeIndex: null,
                recipeValues: {
                    id:          5,
                    name:        'new one',
                    ingredients: [{"ingredientName":"eggs", "amount":"2", "amountUnits":"" }],
                    description: 'some description'
                }
            },
            returnRecipeIndex: function (allRecipe, currentRecipeId) { return (currentRecipeId -1) },
            getRecipe: function() {
                return mockInitData;
            },
            addRecipe: function (recipeName, ingredientsList, recipeDescriptionField) {
                var newData = mockInitData.push(recipeValues);
                return newData;
            },
            updateRecipe: function (recipeName, ingredientsList, recipeDescription, recipeID) {
                var newData = mockInitData[4] = recipeValues;
                return newData;
            },
            deleteRecipe: function (recipeID) {
                mockInitData.splice(recipeID, 1);
                var confirmDate = {
                    confirmDeleting: 1,
                    updateRecipeList: mockInitData
                };
                return confirmDate;
            },

        };

        mockCurrentRecipe = {
            id: 1,
            name: "Galette",
            description: "some description",
            ingredients: [{"ingredientName":"butter", "amount":"100", "amountUnits":"g" }, {"ingredientName":"suggar", "amount":"100", "amountUnits":"g"}]
        };
        mockedSingleViewService = {
            findRecipe: function () { return mockCurrentRecipe }
        };

    });

    beforeEach(inject(function($controller, _$rootScope_,  _$location_){
        $rootScope =  _$rootScope_;
        scope = $rootScope.$new();
        location = _$location_;

        scope.recipeList = mockInitData;

        ctrl = $controller('CookingBookRecipeController', {
            $scope: scope,
            'cbRecipeService': mockedRecipeService,
            'cbSingleViewService': mockedSingleViewService
        });
        $rootScope.$apply();

    }));


    it('ctrl should be defined', function() {
        expect(ctrl).toBeDefined();
    });

    describe('Get initView call', function() {

        it('Should have call initView and check variables', function(){

            spyOn(scope, 'initView').and.callThrough();
            scope.initView();
            expect(scope.initView).toHaveBeenCalled();

            expect(scope.ingredientsList).toBeDefined();
            expect(scope.ingredientsList instanceof Array).toBeTruthy();
            expect(typeof scope.ingredientsList[0]).toBe('object');
            expect(scope.ingredientsList.length).toBe(1);

            expect(scope.confirmDeleting).toBeDefined();
            expect(scope.confirmDeleting).toEqual(0);
        });
    });

    describe('Get addIngredient call', function() {

        it('Should have call addIngredient and check related functions', function(){
            var initialIngredientsNumber = scope.ingredientsList.length;

            spyOn(scope, 'addIngredient').and.callThrough();

            scope.addIngredient();

            expect(scope.addIngredient).toHaveBeenCalled();
            expect(scope.ingredientsList.length > initialIngredientsNumber).toBeTruthy();
        });
    });

    describe('Get removeIngredient call', function() {


        it('Should have call removeIngredient and check related functions', function(){
           var initialIngredientsNumber = scope.ingredientsList.length;

            spyOn(scope, 'removeIngredient').and.callThrough();
            spyOn(scope.ingredientsList, 'splice').and.callThrough();

            scope.removeIngredient(0);

            expect(scope.removeIngredient).toHaveBeenCalled();
            expect(scope.ingredientsList.splice).toHaveBeenCalled();
            expect(scope.ingredientsList.length < initialIngredientsNumber).toBeTruthy();

        });
    });


    describe('Get removeRecipe call', function() {

        var recipeIndex ,
            initialResipiesNumber,
            recipeID = 3,
            recipeList;

        it('Should have call removeRecipe and check related functions', function(){
                spyOn( scope, 'removeRecipe').and.callThrough();
                spyOn( mockedRecipeService, 'deleteRecipe').and.callThrough();

                var initialRecipeLenght = mockInitData.length;
                scope.removeRecipe();

                var deletingData = mockedRecipeService.deleteRecipe(recipeID);
                expect(mockedRecipeService.deleteRecipe).toHaveBeenCalledWith(recipeID);
                
                expect(deletingData.updateRecipeList).toBeDefined();
                expect(deletingData.updateRecipeList instanceof Array).toBeTruthy();
                expect(deletingData.updateRecipeList.length < initialRecipeLenght).toBeTruthy();

                expect(deletingData.confirmDeleting).toBeDefined();
                expect(deletingData.confirmDeleting).toEqual(1);

        });
    });

});