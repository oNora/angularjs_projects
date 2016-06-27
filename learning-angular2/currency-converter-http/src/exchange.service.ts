import 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class ExchangeService {

    supportedCurrencies = ['EUR', 'GBP', "USD"];

    private exchangeRates = new Map<string, string>();

    constructor(private http: Http){
        for (const baseCurrency of this.supportedCurrencies) {
            this.loadExchangeRates(baseCurrency);
        }
    }

    getExchangeRate(baseCurrency: string, targetCurrency: string) : string | number{

        if(baseCurrency === targetCurrency){
            return 1;
        }
        // return this.exchangeRates[baseCurrency +'/'+ targetCurrency];
        return this.exchangeRates.get(`${baseCurrency}/${targetCurrency}`);

    }


    loadExchangeRates(baseCurrency){

        var targetCurrency = this.supportedCurrencies.filter(currency => currency !== baseCurrency);

        this.http.get(`http://api.fixer.io/latest?base=${baseCurrency}&symbols=${targetCurrency}`)
            .map((result) =>result.json().rates)
            .subscribe(data => {
                 var currenciesData = data
                console.log('x: ', currenciesData);

                for (var key in currenciesData) {

                    this.exchangeRates.set(`${baseCurrency}/${key}`, currenciesData[key]);
                    // console.log('this.exchangeRates', this.exchangeRates);
                }

            });
    }
}