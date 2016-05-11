'use strict';
describe('Controller: CookingBookController', function() {

    beforeEach(module('cookingBook'));

    var $scope,
        ctrl,
        $rootScope,
        mockCookingBooAppService,
        mockAllRecipesList,
        mockLocalStorageService;

    beforeEach(function() {
        mockAllRecipesList = [
            {id: 1, name: "Galette", description: "some description", ingredients: [{"ingredientName":"butter", "amount":"100", "amountUnits":"g" }, {"ingredientName":"suggar", "amount":"100", "amountUnits":"g"}]},
            {id: 2, name: "Cheddar Chicken", description: "Preheat oven to 350 degrees F (175 degrees C).", ingredients: [{"ingredientName":"crushed cornflakes cereal", "amount":"1", "amountUnits":"cup" },{"ingredientName":"parmesan", "amount":"3/4", "amountUnits":"cup" }]},
            {id: 3, name: "Cheesecake", description: "Preheat oven to 350 degrees F (175 degrees C).", ingredients: [{"ingredientName":"eggs", "amount":"2", "amountUnits":"" },{"ingredientName":"suggar", "amount":"1/2", "amountUnits":"cup" }]},
            {id: 4, name: "Cupcake", description: "Combine sour cream and sugar; mix well. Stir in coconut. Fold in whipped topping. Spread top and sides of two 9-inch cake layers.", ingredients: [{"ingredientName":"cream", "amount":"2", "amountUnits":"cups" }]}
        ];

        mockCookingBooAppService = {
            init: function () { return mockAllRecipesList }
        };
    });

    describe('storages is NOT empty', function(){

        beforeEach(function() {

            mockLocalStorageService = {
                get: function ()  {
                    return [];
                },
                set: function ()  {},
                remove: function ()  {}
            };

        });

        beforeEach(inject(function($controller, _$rootScope_){
            $rootScope = _$rootScope_;
            $scope = $rootScope.$new();

            ctrl = $controller('CookingBookController', {
                $scope: $scope,
                'cookingBooAppService': mockCookingBooAppService,
                localStorageService: mockLocalStorageService
            });

            $rootScope.$apply();
        }));


        it('ctrl should be defined', function() {
            expect(ctrl).toBeDefined();
        });

        describe('Should set up initial data', function(){
            var getInitData,
                storages;

               it('Service calls', function () {
                   spyOn( mockCookingBooAppService, 'init').and.callThrough();
                   spyOn( mockLocalStorageService, 'get').and.callThrough();

                   getInitData =  mockCookingBooAppService.init();
                   storages =  mockLocalStorageService.get();

                   expect(mockCookingBooAppService.init).toHaveBeenCalled();
                   expect(mockLocalStorageService.get).toHaveBeenCalled();
                   expect(getInitData instanceof Array).toBeTruthy();
                   expect(storages instanceof Array).toBeTruthy();

                   expect($scope.recipeList).toEqual(storages);
               });
        });

        describe('Should set up initial data', function(){
            var getInitData,
                storages;

            it('Service calls - else statement', function () {
                spyOn( mockCookingBooAppService, 'init').and.callThrough();
                spyOn( mockLocalStorageService, 'get').and.callThrough();

                getInitData =  mockCookingBooAppService.init();
                storages =  mockLocalStorageService.get();

                expect(mockCookingBooAppService.init).toHaveBeenCalled();
                expect(mockLocalStorageService.get).toHaveBeenCalled();
                expect(getInitData instanceof Array).toBeTruthy();
                expect(storages instanceof Array).toBeTruthy();

                expect($scope.recipeList).toEqual(storages);
            });
        });

        describe('Should has call toggle and correct defined variables - mobile menu ', function(){

            it('Should has correct defined variable', function () {

                expect($scope.showMobileMenu).toBeDefined();
                expect(typeof $scope.showMobileMenu).toBe('string');
                expect( $scope.showMobileMenu).toEqual('hideMobile');

                expect($scope.isMobileMenu).toBeDefined();
                expect(typeof $scope.isMobileMenu).toBe('boolean');

            });

            it('Should has call toggle', function () {
                expect($scope.showMobileMenu).toBeDefined();
                //check initial value
                expect($scope.isMobileMenu).toEqual(false);

                spyOn( $scope, 'toggle').and.callThrough();
                $scope.toggle();

                expect($scope.toggle).toHaveBeenCalled();

                //should be changed after calling toggle
                expect($scope.isMobileMenu).toEqual(true);
                expect($scope.showMobileMenu).toEqual('showMobile');

                // call again to check menu state
                $scope.toggle();
                expect($scope.showMobileMenu).toEqual('hideMobile');

            });

        });

    });

    describe('storages is EMPTY', function(){

        beforeEach(function() {

            mockLocalStorageService = {
                get: function ()  {
                    return null;
                },
                set: function ()  {},
                remove: function ()  {}
            };

        });

        beforeEach(inject(function($controller, _$rootScope_){
            $rootScope = _$rootScope_;
            $scope = $rootScope.$new();

            ctrl = $controller('CookingBookController', {
                $scope: $scope,
                'cookingBooAppService': mockCookingBooAppService,
                localStorageService: mockLocalStorageService
            });

            $rootScope.$apply();
        }));

        describe('Should set up initial data', function(){
            var getInitData,
                storages;

            it('Service calls - if statement', function () {
                spyOn( mockCookingBooAppService, 'init').and.callThrough();
                spyOn( mockLocalStorageService, 'get').and.callThrough();
                spyOn( mockLocalStorageService, 'set').and.callThrough();

                getInitData =  mockCookingBooAppService.init();
                storages =  mockLocalStorageService.get();

                expect(mockCookingBooAppService.init).toHaveBeenCalled();
                expect(mockLocalStorageService.get).toHaveBeenCalled();

                expect($scope.recipeList).toEqual(getInitData);

                mockLocalStorageService.set();
                expect(mockLocalStorageService.set).toHaveBeenCalled();
            });
        });
    });

});