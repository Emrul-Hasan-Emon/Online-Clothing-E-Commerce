import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/Service/cart.service';

@Component({
  selector: 'app-cart-show',
  templateUrl: './cart-show.component.html',
  styleUrls: ['./cart-show.component.css']
})
export class CartShowComponent implements OnInit {
  isCart = false;
  cartDetails;

  constructor(private cartService: CartService) {
    this.cartService.cartEvent.subscribe(
      (response) => {
        console.log('Response ===> ', response);
        this.isCart = true;

        console.log(this.isCart)
      }
    )
  }

  ngOnInit(): void {
    this.cartService.cartEvent.subscribe(
      (response) => {
        console.log('Response ===> ', response);
        this.isCart = true;
        this.cartDetails = response;
        console.log(this.isCart)
      }
    )
  }
}
