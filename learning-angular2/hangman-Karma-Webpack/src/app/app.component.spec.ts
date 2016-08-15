/**
 * not needed if you use:
 * typings install --save --global dt~jasmine
 * (look typings.json file)
 */
//import { beforeEachProviders, describe, expect, fit, inject, it, TestComponentBuilder } from '@angular/core/testing';
import { inject, TestBed, TestComponentBuilder } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { WordService } from './word.service';
import { AppModule } from './app.module';
import { LetterButtonsComponent } from './letter-buttons.component';
import { MaskPipe } from './mask.pipe';

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


//NO new instance of the component RC-4
// describe('AppComponent', () => {

//     it('should get the solution from the WordService',
//         inject( [TestComponentBuilder], (tcb: TestComponentBuilder) => {
//             tcb.overrideProviders(AppComponent, [
//                 {provide: WordService, useClass: MockWordService}
//             ])
//             .createAsync(AppComponent).then( (fixture) => {
//                 const appComponent = <AppComponent>fixture.componentInstance;
//                 expect(appComponent.solution).toBe('SOLUTION');
//             })
//         })
//     )


// });

//RC-5
describe('AppComponent', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [
        {provide: WordService, useClass: MockWordService}
      ]
    });
  });

  it('should get the solution from the WordService', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const appComponent = <AppComponent>fixture.componentInstance;
    expect(appComponent.solution).toBe('SOLUTION');
  });

});