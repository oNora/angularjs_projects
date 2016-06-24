import {Component } from '@angular/core';
import {TimeService } from './current-time.service';
import {CurrentTimeComponent } from  './current-time.component';

@Component({
	selector: 'my-app',
	directives: [CurrentTimeComponent],
	providers: [TimeService],
	template:
		`<h1>Current time</h1>
		<p><current-time></current-time></p>`
})
export class AppComponent{}

