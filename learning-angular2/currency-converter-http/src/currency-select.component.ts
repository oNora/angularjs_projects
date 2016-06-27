import { Component, EventEmitter, Input, Output } from '@angular/core';
import {ExchangeService} from './exchange.service'

@Component({
    selector: 'currency-select',
    // inputs: ['selected'],
    // outpust: ['setClick'],
    template: `
                <!--if using two-way-binding and separate event - button -->
                <!--<select [(ngModel)]="selected">-->
                <select [ngModel]="selected" (ngModelChange)="onSelectedChange($event)">
                    <option *ngFor="let currency of supportedCurrencies" [value]="currency">
                        {{currency}}
                    </option>
                </select>
                <!--<button (click)="onSetClick()">Set</button>-->
            `

})
export class CurrencySelectComponent {

    @Input() selected: string;
    // @Output() setClick = new EventEmitter();
    // for two-way-binding use the same name from @Input + Change
    @Output() selectedChange = new EventEmitter<string>();

    supportedCurrencies: string[];

    constructor(exchangeService: ExchangeService) {
        this.supportedCurrencies = exchangeService.supportedCurrencies;
    }

    // onSetClick() {
    //     // this.setClick.emit(this.selected);
    //     this.selectedChange.emit(this.selected);
    // }

    onSelectedChange (selected: string) {
        this.selected = selected;
        this.selectedChange.emit(selected);
    }
}