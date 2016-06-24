import { Component, EventEmitter, Input, Output, Provider, forwardRef } from '@angular/core';
import {NgForm, ControlGroup, Control, ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/common';


const noop = () => { };

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = new Provider(
	NG_VALUE_ACCESSOR, {
		useExisting: forwardRef(() => CustomInput),
		multi: true
	});

@Component({
    selector: 'customInput',
	providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
    template: `
            <input type="text" [(ngModel)]="value" (blur)="onTouched()" [attr.id]=" idName ">
    `,
})
export class CustomInput {

    private _value: any = '';
    @Input() idName;
  
    //Placeholders for the callbacks
    private _onTouchedCallback: () => void = noop;
    private _onChangeCallback: (_:any) => void = noop;

    //get accessor
    get value(): any { return this._value; };
  
    //set accessor including call the onchange callback
    set value(v: any) {
      if (v !== this._value) {
        this._value = v;
        this._onChangeCallback(v);
      }
    }
    
    //Set touched on blur
    onTouched(){
      this._onTouchedCallback();
    }
  
    //From ControlValueAccessor interface
    writeValue(value: any) {
      this._value = value;
    }
  
    //From ControlValueAccessor interface
    registerOnChange(fn: any) {
      this._onChangeCallback = fn;
    }
  
    //From ControlValueAccessor interface
    registerOnTouched(fn: any) {
      this._onTouchedCallback = fn;
    }

}