import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Question } from './question';

@Component({
    selector: 'question-item',
    template: `
        <div>
            <p>{{question.text}}</p>
            <p *ngFor="let option of question.options"> 
                <label  (click)="onAnswer(option.id)" >
                    <input type="radio" name="{{question.id}}" [disabled]="checked"/> 
                    {{option.text}}
                </label>
            </p>
            <p *ngIf="correct === true"> Correct  &#10003;</p>
            <p *ngIf="correct === false"> Incorrect  &#x2718;</p>
        </div>
    `,
})
export class QuestionComponent {

    @Input() question: Question;
    @Input() correct: boolean;
    @Output() answer = new EventEmitter<string>();

    constructor(){}

    onAnswer(option) {
        this.answer.emit(option);
    }

    get checked() {
        return this.correct !== undefined;
    }
}