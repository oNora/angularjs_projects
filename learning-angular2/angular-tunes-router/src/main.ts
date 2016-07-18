import { enableProdMode } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app/app.component';
import { APP_ROUTER_PROVIDER } from './app/app.routes';

console.info('app.environment:', app.environment);
if (app.environment === 'production') {
  enableProdMode();
}
bootstrap(AppComponent, [
  APP_ROUTER_PROVIDER,
  {provide: LocationStrategy, useClass: HashLocationStrategy}
]);
