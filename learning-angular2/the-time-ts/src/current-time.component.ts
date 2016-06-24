import {Component } from '@angular/core';
import {TimeService } from './current-time.service';

@Component({
	selector: 'current-time',
	template: '<em>The time is: {{time}}</em>'
})
export class CurrentTimeComponent{

	time: string;

	constructor(timeService: TimeService) {
		timeService.getCurrentTime((currentTime) => this.time = currentTime.toLocaleTimeString());
	}
}


