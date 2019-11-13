import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LinnearRegressionComponent, PolinomialRegressionComponent } from './components/';
import { PerceptronComponent } from './components/perceptron/perceptron.component';
import { OverfittingComponent } from './components/overfitting/overfitting.component';

@NgModule({
  declarations: [
    AppComponent,
    LinnearRegressionComponent,
    PolinomialRegressionComponent,
    PerceptronComponent,
    OverfittingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
