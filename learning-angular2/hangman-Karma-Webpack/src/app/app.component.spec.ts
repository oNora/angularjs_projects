import { beforeEachProviders, describe, expect, fit, inject, it } from '@angular/core/testing';
import { TestComponentBuilder } from '@angular/compiler/testing';
import { AppComponent } from './app.component';
import { WordService } from './word.service';

// extends is optional
class MockWordService extends WordService {
    getWord() {
        return 'SOLUTION'
    }
}


//new instance of the component
// describe('AppComponent', () => {
//     const appComponent = new AppComponent(new MockWordService());


//     fit('should get the solution from the WordService', () => {
//         expect(appComponent.solution).toBe('SOLUTION');
//     });
// });


//NO new instance of the component
describe('AppComponent', () => {
    
    beforeEachProviders( () => [TestComponentBuilder] )

    it('should get the solution from the WordService',
        inject( [TestComponentBuilder], (tcb: TestComponentBuilder) => {
            tcb.overrideProviders(AppComponent, [
                {provide: WordService, useClass: MockWordService}
            ])
            .createAsync(AppComponent).then( (fixture) => {
                const appComponent = <AppComponent>fixture.componentInstance;
                expect(appComponent.solution).toBe('SOLUTION');
            })
        })
    )


});