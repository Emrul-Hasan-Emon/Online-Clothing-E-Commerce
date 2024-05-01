import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/Service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  cartDetails: any;
  mark = false;

  quantity: number;
  totalNumberOfProducts: number;
  totalPrice: number;
  discount: number;
  payablePrice: number;
  
  constructor(
    private router: Router,
    private cartService: CartService
  ) {}
  
  updateCalculation() {
    this.cartDetails.forEach(item => {
      this.quantity = item.Quantity;
      this.totalPrice = item.TotalPrice;
      this.discount = item.Discount;
      this.payablePrice = item.PayablePrice;
      this.mark = true;
    })
  }

  ngOnInit(): void {
     this.cartDetails = this.cartService.cartDetails;
     this.updateCalculation();

     console.log('Cart Details ----> ', this.cartDetails);
     console.log('Cart Details from service ----> ', this.cartService.cartDetails);
     
  }
  
  navigateToCheckout() {
    this.router.navigate(['checkout']);
  }
}
