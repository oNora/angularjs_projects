'use strict';
describe('Controller: CookingBookController', function() {

    beforeEach(module('cookingBook'));

    var $scope,
        ctrl,
        $rootScope,
        cookingBooAppService,
        mockAllRecipesList,
        localStorageService;

    describe('currentRecipe is NOT empty', function(){

        beforeEach(function() {
            localStorageService = {
                get: function ()  {},
                set: function ()  {},
                remove: function ()  {}
            };

            mockAllRecipesList = [
                {id: 1, name: "Galette", description: "some description", ingredients: [{"ingredientName":"butter", "amount":"100", "amountUnits":"g" }, {"ingredientName":"suggar", "amount":"100", "amountUnits":"g"}]},
                {id: 2, name: "Cheddar Chicken", description: "Preheat oven to 350 degrees F (175 degrees C).", ingredients: [{"ingredientName":"crushed cornflakes cereal", "amount":"1", "amountUnits":"cup" },{"ingredientName":"parmesan", "amount":"3/4", "amountUnits":"cup" }]},
                {id: 3, name: "Cheesecake", description: "Preheat oven to 350 degrees F (175 degrees C).", ingredients: [{"ingredientName":"eggs", "amount":"2", "amountUnits":"" },{"ingredientName":"suggar", "amount":"1/2", "amountUnits":"cup" }]},
                {id: 4, name: "Cupcake", description: "Combine sour cream and sugar; mix well. Stir in coconut. Fold in whipped topping. Spread top and sides of two 9-inch cake layers.", ingredients: [{"ingredientName":"cream", "amount":"2", "amountUnits":"cups" }]}
            ];

            cookingBooAppService = {
                init: function () { return mockAllRecipesList }
            };
        });

        beforeEach(inject(function($controller, _$rootScope_, _cookingBooAppService_, _localStorageService_){
            $rootScope = _$rootScope_;
            $scope = $rootScope.$new();
            cookingBooAppService = _cookingBooAppService_;
            localStorageService = _localStorageService_;

            ctrl = $controller('CookingBookController', {
                $scope: $scope,
                'cookingBooAppService': cookingBooAppService,
                localStorageService: localStorageService
            });

            $rootScope.$apply();
        }));


        it('ctrl should be defined', function() {
            expect(ctrl).toBeDefined();
        });



    });

});