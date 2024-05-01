import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePaymentMethodComponent } from './single-payment-method.component';

describe('SinglePaymentMethodComponent', () => {
  let component: SinglePaymentMethodComponent;
  let fixture: ComponentFixture<SinglePaymentMethodComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SinglePaymentMethodComponent]
    });
    fixture = TestBed.createComponent(SinglePaymentMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
