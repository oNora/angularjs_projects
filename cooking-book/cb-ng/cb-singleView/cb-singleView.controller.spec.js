'use strict';
describe('Controller: CookingBookSingleViewController', function() {

    beforeEach(module('cookingBook.singleView'));

    var $scope,
        ctrl,
        $rootScope,
        mockedSingleViewService,
        mockCurrentRecipe,
        location,
        stateParams = {recipeID: "1"};

    beforeEach(function() {
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

    beforeEach(inject(function($controller, _$rootScope_, $location){
        $rootScope =  _$rootScope_;
        $scope = $rootScope.$new();
        location = $location;

        ctrl = $controller('CookingBookSingleViewController', {
            $scope: $scope,
            $stateParams: stateParams,
            $location: location,
            'cbSingleViewService': mockedSingleViewService
        });

        $rootScope.$apply();
    }));


    it('ctrl should be defined', function() {
        expect(ctrl).toBeDefined();
    });


    describe('all scope variables should be defined correctly', function() {
        it('$scope.name', function() {
            expect($scope.name).toBeDefined();
            expect(typeof $scope.name).toBe('string');
        });

        it('$scope.ingredients', function() {
            expect($scope.ingredients).toBeDefined();
            expect(typeof $scope.ingredients).toBe('object');
        });

        it('$scope.description', function() {
            expect($scope.description).toBeDefined();
            expect(typeof $scope.description).toBe('string');
        });

        it('$scope.id', function() {
            expect($scope.id).toBeDefined();
        });

        it('$scope.getLength', function() {
            expect($scope.getLength).toBeDefined();
            expect(typeof $scope.getLength).toBe('function');
        });

    });

});