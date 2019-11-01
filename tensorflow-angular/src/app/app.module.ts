import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LinnearRegressionComponent, PolinomialRegressionComponent } from './components/';

@NgModule({
  declarations: [
    AppComponent,
    LinnearRegressionComponent,
    PolinomialRegressionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
