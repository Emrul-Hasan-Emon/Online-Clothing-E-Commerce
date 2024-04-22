import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSingleOrderDetailsComponent } from './show-single-order-details.component';

describe('ShowSingleOrderDetailsComponent', () => {
  let component: ShowSingleOrderDetailsComponent;
  let fixture: ComponentFixture<ShowSingleOrderDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowSingleOrderDetailsComponent]
    });
    fixture = TestBed.createComponent(ShowSingleOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
