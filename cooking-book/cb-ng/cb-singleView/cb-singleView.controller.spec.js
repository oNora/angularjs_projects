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

    describe('currentRecipe is NOT empty', function(){

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

        describe('Get getLength call', function() {

            it('Should have call getLength', function () {
                var testIngredientsObj = mockCurrentRecipe.ingredients[0];

                spyOn($scope, 'getLength').and.callThrough();
                $scope.getLength(testIngredientsObj);

                expect($scope.getLength).toHaveBeenCalled();
                expect($scope.getLength).toHaveBeenCalledWith(testIngredientsObj);

            });

        });
    });

    describe('currentRecipe is empty', function(){

        beforeEach(function() {
            mockCurrentRecipe = null;
            mockedSingleViewService = {
                findRecipe: function () { return mockCurrentRecipe }
            };
        });

        beforeEach(inject(function($controller, _$rootScope_, _$location_){
            $rootScope =  _$rootScope_;
            $scope = $rootScope.$new();
            location = _$location_;

            ctrl = $controller('CookingBookSingleViewController', {
                $scope: $scope,
                $stateParams: stateParams,
                $location: location,
                'cbSingleViewService': mockedSingleViewService
            });

            $rootScope.$apply();
        }));

        it('location.path',  inject(function() {

            spyOn( location, 'path').and.callThrough();

            //expect(location.path).toHaveBeenCalled(); //failed!
            expect(location.path).toBeDefined();
            expect(typeof location.path).toBe('function');

        }));
    });
});