import {Component } from '@angular/core';

@Component({
	selector: 'my-app',
	template:`
			<p>Result: <strong>{{result}}</strong> </p>
			<p>Time: <strong> {{time}} </strong></p>
			<p>Error: <strong> {{error}} </strong></p>
		`
})
export class AppComponent{

	result;
	error;
	time;

	constructor() {
		const startTime = Date.now();
		this.add(5, 2)
			.then(result => this.add(result, 3))
			.then(result => this.add(result, 1))
			.then(result => this.result = result).catch(error => this.error = error)
		.then(() => this.time = Date.now() - startTime);	
	}

	add(x, y): Promise<number> {
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

