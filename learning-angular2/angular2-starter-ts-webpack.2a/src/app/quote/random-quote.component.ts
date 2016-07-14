import { Component } from '@angular/core';
import { QuoteService } from './quote.service';
import {Quote} from './quote';

@Component({
  selector: 'random-quote',
  template: '<em>{{quote.line}}</em> - {{quote.author}}',
  styles: [require('./random-quote.component.css')]
})
export class RandomQuoteComponent {

  quote: Quote;

  constructor(quoteService: QuoteService) {
    quoteService.generateRandomQuotes(3, 2000, quote => this.quote = quote);
  }
}
