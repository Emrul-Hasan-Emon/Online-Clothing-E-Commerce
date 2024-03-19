import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsShowPageComponent } from './products-show-page.component';

describe('ProductsShowPageComponent', () => {
  let component: ProductsShowPageComponent;
  let fixture: ComponentFixture<ProductsShowPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsShowPageComponent]
    });
    fixture = TestBed.createComponent(ProductsShowPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
