import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/Model/cart';
import { Product } from 'src/app/Model/product';
import { CartService } from 'src/app/Service/cart.service';
import { ProductFetchService } from 'src/app/Service/product-fetch.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  productQuantity = 0;
  @Input()
  cartItem: Cart;

  totalPrice: number = 0;
  discountedPrice: number = 0;
  ultimatePrice: number = 0;

  productdetails: Product;

  constructor(
    private router: Router,
    private cartService: CartService,
    private productFetchService: ProductFetchService
  ) {}

  ngOnInit(): void {

    this.productQuantity = this.cartItem.Quantity;
    this.totalPrice = this.cartItem.TotalPrice;
    this.discountedPrice = this.cartItem.Discount;
    this.ultimatePrice = this.cartItem.PayablePrice;

    this.productFetchService.getSpecificProduct(this.cartItem.Id.toString()).subscribe(
      (productDetails) => {
        this.productdetails = productDetails;
        console.log('Cart Item ---> ', this.cartItem);
      },
      (error) => {
        alert('An error occured while fetching data');
      }
    )
  }

  changeOccured() {
    this.totalPrice = this.productQuantity * this.productdetails.Price;
    this.discountedPrice = this.productQuantity * ((this.productdetails.Discount * this.productdetails.Price) / 100);
    this.ultimatePrice = this.totalPrice - this.discountedPrice;

    this.cartService.updateCartDetails(this.cartItem.Id, this.productQuantity, this.totalPrice, this.discountedPrice, this.ultimatePrice);
  }

  decrementQuantity() {
    this.productQuantity--;
    this.changeOccured()
  }

  incrementQuantity() {
    this.productQuantity++;
    this.changeOccured();
  }

  addAnotherOne() {
    this.router.navigate(['product-details', this.cartItem.Id]);
  }
}