import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-product-card',
  templateUrl: './home-product-card.component.html',
  styleUrls: ['./home-product-card.component.css']
})
export class HomeProductCardComponent implements OnInit {
  @Input() // It will take input from Product Slider Component
  product: any;
  isDiscount: boolean = false;
  discountedPrice: number = 0;

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    if(this.product.Discount) {
      this.isDiscount = true;

      this.discountedPrice = (this.product.Price * this.product.Discount) / 100;
    }
  }

  navigateToProductDetailsPage(productID) {
    this.router.navigate(['product-details', productID]);
  }
}
