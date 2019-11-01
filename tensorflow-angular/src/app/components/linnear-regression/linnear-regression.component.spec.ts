import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinnearRegressionComponent } from './linnear-regression.component';

describe('LinnearRegressionComponent', () => {
  let component: LinnearRegressionComponent;
  let fixture: ComponentFixture<LinnearRegressionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinnearRegressionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinnearRegressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
