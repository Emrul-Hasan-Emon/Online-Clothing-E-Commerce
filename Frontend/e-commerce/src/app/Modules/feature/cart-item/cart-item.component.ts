import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/Model/cart';
import { Product } from 'src/app/Model/product';
import { StockService } from 'src/app/Service/Stock Check/stock.service';
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
  @Input()
  cartNumber: number;

  @Output()
  deleteCartItem = new EventEmitter<number>();

  totalPrice: number = 0;
  discountedPrice: number = 0;
  ultimatePrice: number = 0;
  notAvailable: boolean = false;
  productdetails: Product;

  constructor(
    private router: Router,
    private cartService: CartService,
    private productFetchService: ProductFetchService,
    private stockService: StockService
  ) {}

  private checkProductUnavailability() {
    this.productdetails.Size.forEach(size => {
      const sizeName = size.Name.toLowerCase();
      const colorName = size.Color.toLowerCase();
      const quantityP = size.Quantity ? size.Quantity : 0;

      const name = this.cartItem.Size.toLowerCase();
      const color = this.cartItem.Color.toLowerCase();
      const quantity = this.cartItem.Quantity;

      console.log(`Product -> Size: ${sizeName}, Color: ${colorName}, Quantity: ${quantityP}`);
      console.log(`Cart -> Size: ${name}, Color: ${color}, Quantity: ${quantity}`);
      if(sizeName === name && colorName === color && quantity > quantityP) {
        this.notAvailable = true;
      }
    });
  }

  ngOnInit(): void {

    this.productQuantity = this.cartItem.Quantity;
    this.totalPrice = this.cartItem.TotalPrice;
    this.discountedPrice = this.cartItem.Discount;
    this.ultimatePrice = this.cartItem.PayablePrice;

    this.productFetchService.getSpecificProduct(this.cartItem.Id.toString()).subscribe(
      (productDetails) => {
        this.productdetails = productDetails;
        console.log('Cart Item ---> ', this.cartItem);
        console.log('Product Details --> ', productDetails);
        this.checkProductUnavailability();  
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

  deleteCart() {
    this.deleteCartItem.emit(this.cartNumber);
  }
}