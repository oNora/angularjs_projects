import {Component } from '@angular/core';

@Component({
	selector: 'my-app',
	template:`
			<p>(callback)</p>
			<p>Result: <strong>{{result}}</strong> </p>
			<p>Time: <strong> {{time}} </strong></p>
			<p>Error: <strong> {{error}} </strong></p>
			<br />
			<br />
			<p>(Promise)</p>
			<p>Result: <strong>{{resultPromise}}</strong> </p>
			<p>Time: <strong> {{timePromise}} </strong></p>
			<p>Error: <strong> {{errorPromise}} </strong></p>
		`
})
export class AppComponent{

	result;
	error;
	time;
	resultPromise;
	errorPromise;
	timePromise;

	constructor() {
		const startTime = Date.now();

		this.add(5,2, result => {
			this.add(result, 3, result => {
				this.add(result, 1, result => {
					this.result= result;
					this.time = Date.now() - startTime;
				}, error => this.error = error)
			}, error => this.error = error)
		}, error => this.error = error);

		this.addPromise(5, 2)
			.then(result => this.addPromise(result, 3))
			.then(result => this.addPromise(result, 1), error => 0) // to handle error  for a single .then
			.then(result => {
			this.resultPromise = result;
			//this.time = Date.now() - startTime; //this is not longer needed, we have .then() after .catch()
		}).catch(error => this.errorPromise = error)
		//if has an error the time will not update, therefore using .then() ofter .chach()
		.then(() => this.timePromise = Date.now() - startTime);	
	}

	// callbacks
	add(x, y, callback, errorCallback){
		setTimeout(() => {
			const result = x + y;
			if(result >= 0){
				callback(result);
			}else{
				errorCallback('invalide value: ' + result);
			}
		}, 100);
	}

	// the same like 'add' - with promise
	addPromise(x, y): Promise<number> {
		return new Promise( (resolve, reject) =>{
			setTimeout(() => {
				const result = x + y;
				if(result >= 0){
					resolve(result);
				}else{
					reject('invalid value: ' + result);
				}
			}, 100);
		});
	}

}

