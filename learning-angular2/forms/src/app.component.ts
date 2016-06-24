import {Component } from '@angular/core';
import {NgForm, ControlGroup, FormBuilder, Validators, Control, FORM_DIRECTIVES} from '@angular/common';
import {CustomInput} from './customInput.component';

@Component({
	selector: 'my-app',
	directives: [FORM_DIRECTIVES, CustomInput],
	template:`
			<form (ngSubmit)="onSubmit()" [ngFormModel]="form">
				<p>
					<label for="name">name &nbsp;</label>
					<input type="text" ngControl="name" id="name" > 
					<span>Is name valid: <em>{{form.controls['name'].valid}}</em>;</span>
					<span>Is name touched: <em>{{form.controls['name'].touched}}</em>;</span>
				</p>
				<p>
					<label for="adress">adress</label>
					<input type="text" ngControl="adress" id="adress">
					<span>Is name valid: <em>{{form.controls['adress'].valid}}</em>;</span>
					<span>Is name touched: <em>{{form.controls['adress'].touched}}</em>;</span>
				</p>
				<p>
					<label for="phone">phone</label>
					<customInput [(ngModel)]='value' ngControl="phone" [idName]=" 'phone' "></customInput>
					<span>Is name valid: <em>{{form.controls['phone'].valid}}</em>;</span>
					<span>Is name touched: <em>{{form.controls['phone'].touched}}</em>;</span>
				<p>
				Is form valid: <em>{{form.valid}}</em> <br />
				<button type="submit" (ngSubmit)="onSubmit()">Submit</button>
				<br />
				<br />
				<br />
				<br />
				Values of inputs: <br />
				<p>{{form.value | json}}</p>
			</form>
		`
})
export class AppComponent{

	form: ControlGroup;
	value = 'some value';

	constructor(private builder: FormBuilder) {

		this.form = builder.group({
            "name": ['', Validators.required],
            "adress": ['', Validators.required],
            "phone": ['', Validators.required]
        });
	}


	onSubmit(){
		console.log('submit', this.form.value);
	}

}

