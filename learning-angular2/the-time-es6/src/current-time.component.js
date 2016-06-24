import {Component, Inject } from '@angular/core';
import {TimeService } from './current-time.service';

@Component({
	selector: 'current-time',
	template: '<em>The time is: {{time}}</em>'
})
export class CurrentTimeComponent{
	constructor(@Inject(TimeService) timeService) {
		timeService.getCurrentTime((currentTime) => this.time = currentTime.toLocaleTimeString());
	}
}


