import 'core-js';
import 'reflect-metadata';
import 'zone.js/dist/zone';

import { enableProdMode } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app/app.component';

// console.log('app.envirenment', app.envirenment);
// if(app.envirenment == 'production') {
//     enableProdMode();
// }

console.log('process.env.NODE_ENV', process.env.NODE_ENV);
if(process.env.NODE_ENV == 'production') {
    enableProdMode();
}

bootstrap(AppComponent);
