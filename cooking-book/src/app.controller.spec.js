'use strict';
describe('Controller: CookingBookController', function() {

    beforeEach(module('cookingBook'));

    var $scope,
        ctrl,
        $rootScope,
        mockCbRecipeService,
        mockAllRecipesList;

    beforeEach(function() {
        mockAllRecipesList = [
                {id: 1, name: "Кекс", description: "някакво описание", ingredients: [{"ingredientName":"масло", "amount":"100", "amountUnits":"гр" }, {"ingredientName":"захар", "amount":"100", "amountUnits":"гр"}]},
                {id: 2, name: "Хрупкаво пиле", description: "Пече се на фирна на 175 градуса.", ingredients: [{"ingredientName":"корнфелкс", "amount":"1", "amountUnits":"чаша" },{"ingredientName":"пармезам", "amount":"3/4", "amountUnits":"чаша" }]},
                {id: 3, name: "Чийзкейк", description: "Пече се на фирна на 175 градуса.", ingredients: [{"ingredientName":"яйца", "amount":"2", "amountUnits":"бр" },{"ingredientName":"захар", "amount":"1/2", "amountUnits":"чаша" }]},
                {id: 4, name: "Мъфини", description: "Комбинирайте заквасена сметана и захар; Смесете добре. Добавете кокос и разбъркайта.", ingredients: [{"ingredientName":"заквасена сметана", "amount":"2", "amountUnits":"чаша" }]}
            ];

        mockCbRecipeService = {
            getRecipe: function () { return mockAllRecipesList }
        };
    });

    describe('storages is NOT empty', function(){

        beforeEach(inject(function($controller, _$rootScope_){
            $rootScope = _$rootScope_;
            $scope = $rootScope.$new();

            ctrl = $controller('CookingBookController', {
                $scope: $scope,
                $rootScope: $rootScope,
                'cookingBooAppService': mockCbRecipeService,
            });

            $rootScope.$apply();
        }));


        it('ctrl should be defined', function() {
            expect(ctrl).toBeDefined();
        });

        describe('Should set up initial data', function(){

               it('Service calls', function () {
                   spyOn( mockCbRecipeService, 'getRecipe').and.callThrough();
                    $scope.recipeList =  mockCbRecipeService.getRecipe();

                    expect(mockCbRecipeService.getRecipe).toHaveBeenCalled();
                    expect($scope.recipeList instanceof Array).toBeTruthy();
      
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


});