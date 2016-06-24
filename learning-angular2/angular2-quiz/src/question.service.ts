import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Question } from './question';

@Injectable()
export class QuestionService {

    private questions: Question[];

    constructor (private http: Http) {}

    getQuestion() : Promise<Question[]> {
        return this.http.get('/questions.json').toPromise()
            .then( response => this.questions = response.json() );
    }

    checkAnswers(answers: Map<string, string>): Set<any> {

        // console.info('answers in service: ', answers);
        let currectAnswers = new Set();

        for (const question of this.questions) {
            if( answers.get(question.id) === question.solution){
                currectAnswers.add(question.id);
            }
        }

        // console.log('currectAnswers: ', currectAnswers);
        return currectAnswers;

    }
}