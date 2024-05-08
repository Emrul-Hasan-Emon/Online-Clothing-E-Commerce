import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalEarningsComponent } from './total-earnings.component';

describe('TotalEarningsComponent', () => {
  let component: TotalEarningsComponent;
  let fixture: ComponentFixture<TotalEarningsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TotalEarningsComponent]
    });
    fixture = TestBed.createComponent(TotalEarningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
