import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolinomialRegressionComponent } from './polinomial-regression.component';

describe('PolinomialRegressionComponent', () => {
  let component: PolinomialRegressionComponent;
  let fixture: ComponentFixture<PolinomialRegressionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolinomialRegressionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolinomialRegressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
