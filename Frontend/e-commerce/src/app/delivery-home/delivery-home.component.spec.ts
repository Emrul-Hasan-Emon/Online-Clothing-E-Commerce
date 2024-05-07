import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryHomeComponent } from './delivery-home.component';

describe('DeliveryHomeComponent', () => {
  let component: DeliveryHomeComponent;
  let fixture: ComponentFixture<DeliveryHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeliveryHomeComponent]
    });
    fixture = TestBed.createComponent(DeliveryHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
