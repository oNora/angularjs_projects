'use strict';
describe('Controller: SearchController', function() {

    beforeEach(module('cookingBook.search'));

    var scope,
        ctrl,
        $rootScope,
        mockedSearchService,
        mockInitData;

    beforeEach(function() {

        mockInitData = [
                {id: 1, name: "Кекс", description: "някакво описание", ingredients: [{"ingredientName":"масло", "amount":"100", "amountUnits":"гр" }, {"ingredientName":"захар", "amount":"100", "amountUnits":"гр"}]},
                {id: 2, name: "Хрупкаво пиле", description: "Пече се на фирна на 175 градуса.", ingredients: [{"ingredientName":"корнфелкс", "amount":"1", "amountUnits":"чаша" },{"ingredientName":"пармезам", "amount":"3/4", "amountUnits":"чаша" }]},
                {id: 3, name: "Чийзкейк", description: "Пече се на фирна на 175 градуса.", ingredients: [{"ingredientName":"яйца", "amount":"2", "amountUnits":"бр" },{"ingredientName":"захар", "amount":"1/2", "amountUnits":"чаша" }]},
                {id: 4, name: "Мъфини", description: "Комбинирайте заквасена сметана и захар; Смесете добре. Добавете кокос и разбъркайта.", ingredients: [{"ingredientName":"заквасена сметана", "amount":"2", "amountUnits":"чаша" }]}
            ];

        mockedSearchService = {
            foundRecipesId : [],
            allUniqueIntegrates : ["масло", "захар", "корнфелкс", "пармезам", "яйца", "заквасена сметана"],
            allRecipeIn : [],
            allFoundRecipes : [
                {id: 1, name: "Кекс", description: "някакво описание", ingredients: [{"ingredientName":"масло", "amount":"100", "amountUnits":"гр" }, {"ingredientName":"захар", "amount":"100", "amountUnits":"гр"}]},
                {id: 2, name: "Хрупкаво пиле", description: "Пече се на фирна на 175 градуса.", ingredients: [{"ingredientName":"корнфелкс", "amount":"1", "amountUnits":"чаша" },{"ingredientName":"пармезам", "amount":"3/4", "amountUnits":"чаша" }]},
            ],
            checkRecipe: function () { },
            search: function () { },
            returnFoundRecipes: function () { return this.allFoundRecipes },
            ingredientsList: function () { return this.allRecipeIn },
            availableUniqueIntegrates: function () { return  this.allUniqueIntegrates}
        };

    });

    beforeEach(inject(function($controller, _$rootScope_){
        $rootScope =  _$rootScope_;
        scope = $rootScope.$new();

        scope.recipeList = mockInitData;

        ctrl = $controller('SearchController', {
            $scope: scope,
            'cbSearchService': mockedSearchService
        });
        $rootScope.$apply();

    }));


    it('ctrl should be defined', function() {
        expect(ctrl).toBeDefined();
    });

    describe('all scope variables should be defined correctly', function() {
        it('$scope.searchMsg when have recipes', function() {
            expect(scope.searchMsg).toBeDefined();
            expect(typeof scope.searchMsg).toBe('string');
            expect(scope.searchMsg).toEqual('Избери от вече добавените продукти:');
        });

        it('$scope.foundList', function() {
            expect(scope.foundList).toBeDefined();
            expect(scope.foundList instanceof Array).toBeTruthy();
        });

        it('$scope.isRecipeListEmpty', function() {
            expect(scope.isRecipeListEmpty).toBeDefined();
            expect(scope.isRecipeListEmpty).toEqual(jasmine.any(Boolean));
        });

        it('$scope.isFoundListEmpty', function() {
            expect(scope.isFoundListEmpty).toBeDefined();
            expect(scope.isFoundListEmpty).toEqual(jasmine.any(Boolean));
        });

        it('$scope.availableUniqueIntegrates', function() {
            expect(scope.availableUniqueIntegrates).toBeDefined();
            expect(scope.availableUniqueIntegrates instanceof Array).toBeTruthy();
            expect(scope.availableUniqueIntegrates ).not.toEqual([]);
        });
    });

    describe('Get searchRecipe call', function() {

        it('Should have call searchRecipe and check related functions', function () {
            var mockInputs = 'sugar';

            spyOn(scope, 'searchRecipe').and.callThrough();
            spyOn(mockedSearchService, 'search').and.callThrough();
            spyOn(mockedSearchService, 'returnFoundRecipes').and.callThrough();
            scope.searchRecipe(mockInputs);

            expect(scope.searchRecipe).toHaveBeenCalled();
            expect(scope.searchRecipe).toHaveBeenCalledWith(mockInputs);

            expect(mockedSearchService.returnFoundRecipes).toHaveBeenCalled();
            expect(scope.foundList).toEqual(mockedSearchService.allFoundRecipes);

            expect(scope.isFoundListEmpty).toEqual(false);
        });

    });

    describe('Check $scope.searchMsg value when do not have recipes', function() {

        beforeEach(inject(function($controller, _$rootScope_){
            $rootScope =  _$rootScope_;
            scope = $rootScope.$new();

            scope.recipeList = [];

            ctrl = $controller('SearchController', {
                $scope: scope,
                'cbSearchService': mockedSearchService
            });
            $rootScope.$apply();

        }));

        it('$scope.searchMsg when have recipes', function() {
            expect(scope.searchMsg).toBeDefined();
            expect(typeof scope.searchMsg).toBe('string');
            expect(scope.searchMsg).toEqual('Няма налични продукти. Първо въведи рецепта.');
        });
    });

});