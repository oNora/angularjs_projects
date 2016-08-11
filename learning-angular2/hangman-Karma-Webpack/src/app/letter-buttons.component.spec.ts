/**
 * not needed if you use:
 * typings install --save --global dt~jasmine
 * (look typings.json file)
 */
//import { beforeEachProviders, describe, expect, fit, inject, it, TestComponentBuilder } from '@angular/core/testing';
import { inject,TestBed, TestComponentBuilder } from '@angular/core/testing';
import { LetterButtonsComponent } from './letter-buttons.component'


//new instance of the component
// describe('LetterButtonsComponent', () => {
//     const component = new LetterButtonsComponent();

//     fit('should display a button for each letter of the alphabet', () => {

//         expect(component.alphabet).toEqual([ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' ]);
//     })

// });

//NO new instance of the component
describe('LetterButtonsComponent', () => {
    
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    beforeEach(() => {
        TestBed.configureTestingModule({
        declarations: [LetterButtonsComponent]
        });
    });

    it('should display a button for each letter of the alphabet', () => {
        const fixture = TestBed.createComponent(LetterButtonsComponent);
        // fixture.detectChanges();
        fixture.autoDetectChanges(true);
        const element = <HTMLElement>fixture.nativeElement;
        const buttons = element.querySelectorAll('button')
        // console.log('element: ', fixture.nativeElement);
        // console.log('fixture: ', fixture);
        // console.log('buttons: ', buttons.item(0));
        // expect(buttons.length).toBe(alphabet.length);

        for(let i = 0; i < alphabet.length; i++){
            const button = <HTMLButtonElement>buttons.item(i);
            expect(button.textContent).toBe(alphabet.charAt(i));
            expect(button.disabled).toBe(false);
        }

    });

    it('should add a that letter to the selection when a button is clicked', () => {
        const fixture = TestBed.createComponent(LetterButtonsComponent);
        // fixture.detectChanges();
        fixture.autoDetectChanges(true);
        const component = <LetterButtonsComponent>fixture.componentInstance;
        const element = <HTMLElement>fixture.nativeElement;
        const buttons = element.querySelectorAll('button')
        const buttonO = <HTMLButtonElement>buttons.item(alphabet.indexOf('O'));
        const buttonK = <HTMLButtonElement>buttons.item(alphabet.indexOf('K'));
        // console.log('O: ', buttonO);
        // console.log('component: ', component);

        expect(component.selection).toBe('');
        buttonO.click();
        expect(component.selection).toBe('O');
        buttonK.click();
        expect(component.selection).toBe('OK');

    });
});