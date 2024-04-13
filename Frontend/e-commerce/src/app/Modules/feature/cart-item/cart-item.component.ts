import { Component } from '@angular/core';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent {
  productQuantity = 0;

  decrementQuantity() {
    this.productQuantity--;
  }

  incrementQuantity() {
    this.productQuantity++;
  }
}