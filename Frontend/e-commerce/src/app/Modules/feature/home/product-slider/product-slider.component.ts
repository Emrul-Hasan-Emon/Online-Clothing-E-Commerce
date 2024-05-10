import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-slider',
  templateUrl: './product-slider.component.html',
  styleUrls: ['./product-slider.component.css']
})
export class ProductSliderComponent {
  @Input() // It will take the title from Home Component
  title: any;
  
  @Input()
  products: any;

  @Input()
  categoryId: string;

  constructor(
    private router: Router
  ) {}

  responsiveOptions: any[] | undefined;

  buttonClicked() {
    this.router.navigate(['products'], {queryParams : { categoryId: this.categoryId }});
  }
}
