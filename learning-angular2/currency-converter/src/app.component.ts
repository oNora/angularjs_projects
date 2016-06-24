import { Component } from '@angular/core';
import {ExchangeService} from './exchange.service';
import {CurrencySelectComponent} from './currency-select.component';
import { FixedPipe } from './fixed.pipe'

@Component({
  selector: 'currency-converter',
  providers: [ExchangeService],
  directives: [CurrencySelectComponent],
  pipes: [FixedPipe],
  // template: `
  //   <!-- this return string-->
  //   <!--Convert: <input type="number" [value]="baseAmount" (input)="update($event.target.value)">-->
  //
  //   <!-- this return number-->
  //   <!--Convert: <input type="number" [ngModel]="baseAmount" (ngModelChange)="update($event.target.value)">-->
  //
  //   <!--Convert: <input type="number" [ngModel]="baseAmount" (ngModelChange)="baseAmount = $event">-->
  //   Convert: <input type="number" [(ngModel)]="baseAmount" [class.error]="isInvalid(baseAmount)">
  //   <!-- advantage of [ngClass] - adding more than one class in the same time -->
  //   <!--Convert: <input type="number" [(ngModel)]="baseAmount" [ngClass]="{error: isInvalid(baseAmount), worning: baseAmount < 0 }">-->
  //     <p>
  //       <!--<currency-select [selected]=" 'GBP' "></currency-select>-->
  //       <currency-select [selected]=" baseCurrency " (setClick)="targetCurrency = $event"></currency-select>  = <strong>{{targetAmount}}</strong>
  //       <!-- onSetClick - method used here ,it is not the same in component where setClick is declared -->
  //       <!--<currency-select [selected]=" targetCurrency " (setClick)="onSetClick($event)" ></currency-select>-->
  //       <currency-select [selected]=" targetCurrency " (setClick)="targetCurrency = $event" ></currency-select>
  //     </p>
  //
  //   `,
  template: `
    Convert: <input type="number" [(ngModel)]="baseAmount" [class.error]="isInvalid(baseAmount)">
      <p>
        <!-- or with two-way-binding - without usein separate event binding (setClick) - look in currency-select.component -->
        <!--with angular Pipe-->
        <!--<currency-select [(selected)]=" baseCurrency "></currency-select>  = <strong>{{targetAmount | number:'1.2-2'}}</strong>-->
        <!--with custom Pipe-->
        <currency-select [(selected)]=" baseCurrency "></currency-select>  = <strong>{{targetAmount | fixed:2}}</strong>
        <currency-select [(selected)]=" targetCurrency " ></currency-select>
      </p>
      <p *ngIf="isInvalid(baseAmount)">Please enter a valid amount</p>
  
    `,
  styles: [`
        input[type=number]{
            width: 10ex;
            text-align: right;
        }
        .error{
            background: #ff6666;
        }
        .worning{
            background: yellow;
        }
    `]
})
export class AppComponent {

  baseCurrency = 'USD';
  targetCurrency = 'GBP';
  baseAmount = 1;

  // private exchangeService;
  // constructor(exchangeService: ExchangeService){
  //   this.exchangeService = exchangeService;
  // }
  // or shorter
  constructor(private exchangeService: ExchangeService){}

  // update(baseAmount){
  //   this.baseAmount = parseFloat(baseAmount);
  // }

  get targetAmount() {
    const exchangeRate = this.exchangeService.getExchangeRate(this.baseCurrency, this.targetCurrency);
    return this.baseAmount * exchangeRate;
  }

  isInvalid(value){
    return !Number.isFinite(value);
  }

  // onSetClick(event) {
  //   console.info('setclick: ', event)
  // }

}
