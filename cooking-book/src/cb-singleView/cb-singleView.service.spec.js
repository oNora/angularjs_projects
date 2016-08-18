'use strict';

describe('Service: cbSingleViewService', function() {

    beforeEach(module('cookingBook.singleView'));

    var cbSingleViewService,
        mockInitData;

    // Initialize factory
    beforeEach(inject(function(_cbSingleViewService_) {
        cbSingleViewService = _cbSingleViewService_;
    }));

    it('Should have a service', function () {
        expect(cbSingleViewService).not.toEqual(null);
    });

    describe('Get findRecipe call', function() {

        beforeEach(function() {
            mockInitData = [
                {id: 1, name: "Кекс", description: "някакво описание", ingredients: [{"ingredientName":"масло", "amount":"100", "amountUnits":"гр" }, {"ingredientName":"захар", "amount":"100", "amountUnits":"гр"}]},
                {id: 2, name: "Хрупкаво пиле", description: "Пече се на фирна на 175 градуса.", ingredients: [{"ingredientName":"корнфелкс", "amount":"1", "amountUnits":"чаша" },{"ingredientName":"пармезам", "amount":"3/4", "amountUnits":"чаша" }]},
                {id: 3, name: "Чийзкейк", description: "Пече се на фирна на 175 градуса.", ingredients: [{"ingredientName":"яйца", "amount":"2", "amountUnits":"бр" },{"ingredientName":"захар", "amount":"1/2", "amountUnits":"чаша" }]},
                {id: 4, name: "Мъфини", description: "Комбинирайте заквасена сметана и захар; Смесете добре. Добавете кокос и разбъркайта.", ingredients: [{"ingredientName":"заквасена сметана", "amount":"2", "amountUnits":"чаша" }]}
            ];
        });

        it('Should have findRecipe function', function () {
            expect(cbSingleViewService.findRecipe).toBeDefined();
        });

        it('Should have call to return specific receipt by ID', function () {
            var repeiptId = 1;

            spyOn(cbSingleViewService, 'findRecipe').and.callThrough();
            cbSingleViewService.findRecipe(repeiptId, mockInitData);
            expect(cbSingleViewService.findRecipe).toHaveBeenCalledWith(repeiptId, mockInitData);

            // $rootScope.$apply();

            expect(typeof cbSingleViewService.foundRecipe).toBe('object');

            expect(cbSingleViewService.foundRecipe.id).toBeDefined();
            expect(cbSingleViewService.foundRecipe.id).toEqual(repeiptId);

            expect(cbSingleViewService.foundRecipe.name).toBeDefined();
            expect(cbSingleViewService.foundRecipe.name).toEqual("Кекс");

        });

        it('Should return NULL if ID does not match', function () {
            var repeiptId = 15;
            spyOn(cbSingleViewService, 'findRecipe').and.callThrough();
            cbSingleViewService.findRecipe(repeiptId, mockInitData);
            expect(cbSingleViewService.findRecipe).toHaveBeenCalledWith(repeiptId, mockInitData);

            // $rootScope.$apply();

            expect(cbSingleViewService.foundRecipe).toBeNull();
        });
    });
});