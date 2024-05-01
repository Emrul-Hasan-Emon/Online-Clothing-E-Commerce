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
  shippingCost: number = 60;

  constructor(
    private router: Router,
    private cartService: CartService
  ) {}
  
  private setZero() {
    this.quantity = 0;
    this.totalPrice = 0;
    this.discount = 0;
    this.payablePrice = 0;
  }

  updateCalculation() {
    this.setZero();
    this.cartDetails.forEach(item => {
      this.quantity += item.Quantity;
      this.totalPrice += item.TotalPrice;
      this.discount += item.Discount;
      this.payablePrice += item.PayablePrice;
    })

    this.payablePrice += this.shippingCost;
  }

  ngOnInit(): void {
     this.cartService.getCartDetails().subscribe(
      (cartData) => {
        console.log('Cart Data -----> ', cartData);
        this.cartDetails = cartData;
        this.mark = true;

        this.updateCalculation();
      }
     )
  }
  
  navigateToCheckout() {
    this.router.navigate(['checkout']);
  }
}
