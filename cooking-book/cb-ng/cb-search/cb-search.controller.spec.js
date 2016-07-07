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
            expect(scope.searchMsg).toEqual('Choose from available  ingredients:');
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
            expect(scope.searchMsg).toEqual('There are not available ingredients. First enter recipes.');
        });
    });

});