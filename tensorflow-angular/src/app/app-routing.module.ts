import { LinnearRegressionComponent, PolinomialRegressionComponent, PerceptronComponent, OverfittingComponent } from './components';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'linear', component: LinnearRegressionComponent},
  { path: 'polynomial', component: PolinomialRegressionComponent },
  { path: 'overfitting', component: OverfittingComponent },
  { path: 'perceptron', component: PerceptronComponent },
  { path: '', redirectTo: 'linear', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
