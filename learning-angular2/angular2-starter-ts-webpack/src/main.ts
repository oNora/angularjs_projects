import 'core-js';
import 'reflect-metadata';
import 'zone.js/dist/zone';

import { enableProdMode } from '@angular/core';
// import { bootstrap } from '@angular/platform-browser-dynamic';
// import { AppComponent } from './app/app.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

console.log('app.envirenment', app.envirenment);
if(app.envirenment == 'production') {
    enableProdMode();
}
// bootstrap(AppComponent);
platformBrowserDynamic().bootstrapModule(AppModule);
