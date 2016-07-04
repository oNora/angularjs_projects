import { Component } from '@angular/core';
import { MaskPipe } from './mask.pipe';
import { LetterButtonsComponent } from './letter-buttons.component';
import { WordService } from './word.service';

@Component({
    selector: 'my-app',
    providers: [WordService],
    directives: [LetterButtonsComponent],
    pipes: [MaskPipe],
    template: `
        <h1>Guess The Word</h1>
        <p> {{solution | mask:selection}} </p>
        <letter-buttons [(selection)]="selection"></letter-buttons>
    `
})
export class AppComponent {

    solution: string;
    selection = '';

    constructor(wordService: WordService){
        this.solution = wordService.getWord();
    }

 }
