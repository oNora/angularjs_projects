'use strict';
describe('Controller: RecipeController', function() {

    beforeEach(module('cookingBook.recipe'));

    var scope,
        ctrl,
        $rootScope,
        mockedRecipeService,
        mockedSingleViewService,
        mockLocalStorageService,
        mockInitData,
        mockCurrentRecipe,
        location,
        stateParams;
        //recipeID = 3;
        var recipeValues = {
                id:          5,
                name:        'нова рецепта',
                ingredients: [{"ingredientName":"яйца", "amount":"2", "amountUnits":"" }],
                description: 'some description'
            };

    beforeEach(function() {

        mockInitData = [
                {id: 1, name: "Кекс", description: "някакво описание", ingredients: [{"ingredientName":"масло", "amount":"100", "amountUnits":"гр" }, {"ingredientName":"захар", "amount":"100", "amountUnits":"гр"}]},
                {id: 2, name: "Хрупкаво пиле", description: "Пече се на фирна на 175 градуса.", ingredients: [{"ingredientName":"корнфелкс", "amount":"1", "amountUnits":"чаша" },{"ingredientName":"пармезам", "amount":"3/4", "amountUnits":"чаша" }]},
                {id: 3, name: "Чийзкейк", description: "Пече се на фирна на 175 градуса.", ingredients: [{"ingredientName":"яйца", "amount":"2", "amountUnits":"бр" },{"ingredientName":"захар", "amount":"1/2", "amountUnits":"чаша" }]},
                {id: 4, name: "Мъфини", description: "Комбинирайте заквасена сметана и захар; Смесете добре. Добавете кокос и разбъркайта.", ingredients: [{"ingredientName":"заквасена сметана", "amount":"2", "amountUnits":"чаша" }]}
            ];



        mockedRecipeService = {

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
            name:        "Кекс",
            ingredients: [{"ingredientName":"масло", "amount":"100", "amountUnits":"гр" }, {"ingredientName":"захар", "amount":"100", "amountUnits":"гр"}],
            description: "някакво описание"
        };
        mockedSingleViewService = {
            findRecipe: function () { return mockCurrentRecipe }
        };

    });

     describe('Empty stateParams', function() {

        beforeEach(inject(function($controller, _$rootScope_,  _$location_){
            $rootScope =  _$rootScope_;
            scope = $rootScope.$new();
            location = _$location_;
            stateParams = {};

            scope.recipeList = mockInitData;

            ctrl = $controller('RecipeController', {
                $scope: scope,
                $stateParams: stateParams,
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

        describe('Get saveRecipe call', function() {

            var recipeID,
                intialRecipeLength;

            it('Should saveRecipe be defined', function(){
                expect(scope.saveRecipe).toBeDefined();
            });

            it('Should have call removeRecipe and check related functions - updatedRecipeList', function(){
                recipeID = 3;
                intialRecipeLength = mockInitData.length;

                spyOn( scope, 'saveRecipe').and.callThrough();
                spyOn( mockedRecipeService, 'updateRecipe').and.callThrough();
                spyOn( mockedRecipeService, 'addRecipe').and.callThrough();

                scope.saveRecipe();

                expect(stateParams.recipeID).not.toBeDefined();
                expect(mockedRecipeService.updateRecipe).not.toHaveBeenCalled();
                expect(mockedRecipeService.addRecipe).toHaveBeenCalled();

                expect(scope.recipeList instanceof Array).toBeTruthy();
                expect(scope.recipeList.length > intialRecipeLength).toBeTruthy();

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

    describe('With stateParams', function() {

        beforeEach(inject(function($controller, _$rootScope_,  _$location_){
            $rootScope =  _$rootScope_;
            scope = $rootScope.$new();
            location = _$location_;
            stateParams = {recipeID: 4};

            scope.recipeList = mockInitData;

            ctrl = $controller('RecipeController', {
                $scope: scope,
                $stateParams: stateParams,
                'cbRecipeService': mockedRecipeService,
                'cbSingleViewService': mockedSingleViewService
            });
            $rootScope.$apply();

        }));

        describe('Get saveRecipe call', function() {

            var recipeID,
                intialRecipeLength;

            it('Should saveRecipe be defined', function(){
                expect(scope.saveRecipe).toBeDefined();
            });

            it('Should have call removeRecipe and check related functions - updatedRecipeList', function(){
                recipeID = 3;
                intialRecipeLength = mockInitData.length;

                spyOn( scope, 'saveRecipe').and.callThrough();
                spyOn( mockedRecipeService, 'updateRecipe').and.callThrough();
                spyOn( mockedRecipeService, 'addRecipe').and.callThrough();

                scope.saveRecipe();

                expect(stateParams.recipeID).toBeDefined();
                expect(mockedRecipeService.updateRecipe).toHaveBeenCalled();
                expect(mockedRecipeService.addRecipe).not.toHaveBeenCalled();

                expect(scope.recipeList instanceof Array).toBeTruthy();

            });
        });

    });

});



    //     describe('Get saveRecipe call', function() {

    //     var recipeID;

    //     it('Should saveRecipe be defined', function(){
    //         expect(scope.saveRecipe).toBeDefined();
    //     });

    //     fit('Should have call removeRecipe and check related functions - updatedRecipeList', function(){
    //         recipeID = 3;

    //         spyOn( scope, 'saveRecipe').and.callThrough();
    //         spyOn( mockedRecipeService, 'updateRecipe').and.callThrough();
    //         spyOn( mockedRecipeService, 'addRecipe').and.callThrough();


    //         scope.addIngredient();

    //         console.log('stateParam', stateParam.recipeID)

    //     });
    // });