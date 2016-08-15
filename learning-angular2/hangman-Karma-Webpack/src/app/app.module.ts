import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { WordService } from './word.service';
import { AppComponent } from './app.component';
import { LetterButtonsComponent } from './letter-buttons.component';
import { MaskPipe } from './mask.pipe';

@NgModule({
  imports: [BrowserModule],
  declarations: [MaskPipe, LetterButtonsComponent, AppComponent],
  providers: [WordService],
  bootstrap: [AppComponent]
})
export class AppModule { }