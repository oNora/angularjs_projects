import { Component } from '@angular/core';
// import { HTTP_PROVIDERS } from '@angular/http';
import {ExchangeService} from './exchange.service';
// import {CurrencySelectComponent} from './currency-select.component';
// import { FixedPipe } from './fixed.pipe'

@Component({
  selector: 'currency-converter',
  // providers: [HTTP_PROVIDERS, ExchangeService],
  // directives: [CurrencySelectComponent],
  // pipes: [FixedPipe],
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

  constructor(private exchangeService: ExchangeService){}


  get targetAmount() {
    const exchangeRate = this.exchangeService.getExchangeRate(this.baseCurrency, this.targetCurrency);
    return this.baseAmount * exchangeRate;
  }

  isInvalid(value){
    return !Number.isFinite(value);
  }


}
