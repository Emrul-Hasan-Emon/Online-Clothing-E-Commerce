import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedDeliveryComponent } from './completed-delivery.component';

describe('CompletedDeliveryComponent', () => {
  let component: CompletedDeliveryComponent;
  let fixture: ComponentFixture<CompletedDeliveryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompletedDeliveryComponent]
    });
    fixture = TestBed.createComponent(CompletedDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
