import { Component } from '@angular/core';
import { QuoteService } from './quote/quote.service';
import { RandomQuoteComponent } from './quote/random-quote.component';

@Component({
  selector: 'my-app',
  directives: [RandomQuoteComponent],
  providers: [QuoteService],
  template: require('./app.component.html'),
  styles: [require('./app.component.css')]
})
export class AppComponent { }
