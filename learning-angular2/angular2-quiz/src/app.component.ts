import { Component } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { QuestionComponent } from './question.component';
import { QuestionService } from './question.service';
import { Question } from './question';

@Component({
    selector: 'angular2-quiz',
    directives: [QuestionComponent],
    providers: [HTTP_PROVIDERS, QuestionService],
    template: `
                <h1>Quiz</h1>
                <question-item *ngFor="let question of questions" [question]=" question " 
                                (answer)="onAnswer(question.id, $event)"
                                [correct]=" isCorrect(question.id) ">
                </question-item>
                <button (click)="check()" *ngIf="!checked"> Check </button>
                <p *ngIf="correctAnswers">
                        Score: {{correctAnswers.size}} / {{questions.length}} 
                        ( {{correctAnswers.size / questions.length | percent }} )
                </p>
        `,
})
export class AppComponent {

    questions: Question[];
    correctAnswers: Set<string>;
    private answers = new Map<string, string>();

    constructor(private questionService: QuestionService) {
        this.questionService.getQuestion()
            .then(question => this.questions = question);
    }

    onAnswer(questionId , answerId){
        this.answers.set(questionId, answerId);
        // console.info('answers: ', this.answers);
    }

    check(){
        this.correctAnswers = this.questionService.checkAnswers(this.answers);
        // console.info('this.correctAnswers: ', this.correctAnswers);
    }

    get checked() {
        return this.correctAnswers !== undefined;
    }

    isCorrect(questionId) {
        if(this.correctAnswers !== undefined) {
            if (this.correctAnswers.has(questionId)) {
                // console.log('correct id:', questionId);
                return true;
            }else{
                return false;
            }

        }
    }
}
