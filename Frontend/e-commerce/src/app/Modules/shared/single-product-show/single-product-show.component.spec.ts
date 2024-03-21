import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleProductShowComponent } from './single-product-show.component';

describe('SingleProductShowComponent', () => {
  let component: SingleProductShowComponent;
  let fixture: ComponentFixture<SingleProductShowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleProductShowComponent]
    });
    fixture = TestBed.createComponent(SingleProductShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
