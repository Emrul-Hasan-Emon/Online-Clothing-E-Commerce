import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValiditityMessageComponent } from './validitity-message.component';

describe('ValiditityMessageComponent', () => {
  let component: ValiditityMessageComponent;
  let fixture: ComponentFixture<ValiditityMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValiditityMessageComponent]
    });
    fixture = TestBed.createComponent(ValiditityMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
