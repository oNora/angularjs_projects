import {Component } from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Component({
	selector: 'my-app',
	template:`
			<p> (Observable) </p>
			<p>Result: <strong>{{resultObservable}}</strong> </p>
			<p>Time: <strong> {{timeObservable}} </strong></p>
			<p>Error: <strong> {{errorObservable}} </strong></p>
			<br />
			<br />
			<p> (Promise) </p>
			<p>Result: <strong>{{result}}</strong> </p>
			<p>Time: <strong> {{time}} </strong></p>
			<p>Error: <strong> {{error}} </strong></p>
			<br />
			<br />
			<p>count down {{count}} </p>
		`
})
export class AppComponent{

	resultObservable;
	result;
	errorObservable;
	error;
	timeObservable;
	time;
	count;

	constructor() {
		const startTime = Date.now();

		this.add(5, 2)
			// .map(result => result + 3) //second asiasyncng call
			.mergeMap(result => this.add(result, 3))
			.mergeMap(result => this.add(result, 1))
			.finally(() => this.timeObservable = Date.now() - startTime) // the same case like in last .then() in promise
			.subscribe(result => {
				this.resultObservable = result;
				this.timeObservable = Date.now() - startTime;
			}, error => this.errorObservable = error );


		// if expected single result not a stream - converting Observable to Promise
		this.addPromise(5, 2)
			.then(result => this.addPromise(result, 3))
			.then(result => this.addPromise(result, 1))
			.then(result => this.result = result).catch(error => this.error = error)
			.then(() => this.time = Date.now() - startTime);

		this.countDown(5)
			.subscribe(count => this.count = count, null, () => this.count = 'Complete!')	
	}

	// with Observable
	add(x, y): Observable<number> {
		return Observable.create(observer =>{
			setTimeout(() => {
				const result = x + y;
				if(result >= 0){
					observer.next(result);
					observer.complete();
				}else{
					observer.error('invalid value: ' + result);
				}
			}, 100);
		});
	}

	// with Promise - the same like 'add'
	addPromise(n, m): Promise<number> {
		return new Promise( (resolve, reject) =>{
			setTimeout(() => {
				const result = m + n;
				if(result >= 0){
					resolve(result);
				}else{
					reject('invalid value: ' + result);
				}
			}, 100);
		});
	}

	countDown(start): Observable<number>{
		// return Observable.create(observer => {
		// 	let counter = start;
		// 	observer.next(counter--);
		// 	const intervalId = setInterval(() => {
		// 		if(counter >0) {
		// 			observer.next(counter--);
		// 		} else {
		// 			observer.complete();
		// 			clearInterval(intervalId);
		// 		}
		// 	}, 1000)
		// });

		// or shorter
		return Observable.timer(1, 1000)
			.map(x => start -x)
			.takeWhile(x => x > 0)

	}


}

