import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'letter-buttons',
    template: `
        <button *ngFor="let letter of alphabet"
        (click)="select(letter)"
        [disabled]="selection.includes(letter)">{{letter}}</button>
    `
})
export class LetterButtonsComponent {

    @Input() selection = '';
    @Output() selectionChange = new EventEmitter<string>();

    alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    select(letter) {
        this.selection += letter;
        this.selectionChange.emit(this.selection);
    }

}