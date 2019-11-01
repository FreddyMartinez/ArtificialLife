import { LinnearRegressionComponent, PolinomialRegressionComponent } from './components';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'linear', component: LinnearRegressionComponent},
  { path: 'polinomial', component: PolinomialRegressionComponent },
  { path: '', redirectTo: 'linear', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
