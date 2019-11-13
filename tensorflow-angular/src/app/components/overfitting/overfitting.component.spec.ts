import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverfittingComponent } from './overfitting.component';

describe('OverfittingComponent', () => {
  let component: OverfittingComponent;
  let fixture: ComponentFixture<OverfittingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverfittingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverfittingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
