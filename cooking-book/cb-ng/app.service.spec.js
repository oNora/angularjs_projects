'use strict';

describe('Service: cookingBooAppService', function() {

    beforeEach(module('cookingBook'));

    var cookingBooAppService,
        $rootScope,
        mockInitData;

    // Initialize factory
    beforeEach(inject(function(_cookingBooAppService_, _$rootScope_) {
        $rootScope = _$rootScope_;
        cookingBooAppService = _cookingBooAppService_;
    }));

    it('Should have a service', function () {
        expect(cookingBooAppService).not.toEqual(null);
    });

    it('Should have initData', function () {
        expect(cookingBooAppService.initData).toBeDefined();
        expect(cookingBooAppService.initData instanceof Array).toBeTruthy();
        expect(typeof cookingBooAppService.initData[0]).toBe('object');

        expect(cookingBooAppService.initData[0].id).toBeDefined();
        expect(typeof cookingBooAppService.initData[0].id).toBe('number');
        
        expect(cookingBooAppService.initData[0].name).toBeDefined();
        expect(typeof cookingBooAppService.initData[0].name).toBe('string');

        expect(cookingBooAppService.initData[0].description).toBeDefined();
        expect(typeof cookingBooAppService.initData[0].description).toBe('string');

        expect(cookingBooAppService.initData[0].ingredients).toBeDefined();
        expect(cookingBooAppService.initData[0].ingredients instanceof Array).toBeTruthy();
    });

    it('Should have call init',function(){
        expect(cookingBooAppService.init).toBeDefined();
        expect(typeof cookingBooAppService.init).toBe('function');

        spyOn(cookingBooAppService, 'init').and.callThrough();
        cookingBooAppService.init();
        expect(cookingBooAppService.init).toHaveBeenCalled();
    });

});