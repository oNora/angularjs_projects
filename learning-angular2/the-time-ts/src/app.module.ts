import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CurrentTimeComponent } from  './current-time.component';
import { TimeService } from './current-time.service';

@NgModule({
    imports: [BrowserModule],
    declarations: [AppComponent, CurrentTimeComponent],
    providers: [TimeService],
    bootstrap: [AppComponent]
})
export class AppModule {

}