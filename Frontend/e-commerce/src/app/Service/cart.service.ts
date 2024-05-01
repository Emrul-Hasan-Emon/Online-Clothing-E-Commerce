import { Injectable, signal } from '@angular/core';
import { Cart } from '../Model/cart';
import { Product } from '../Model/product';
import { Subject } from 'rxjs';
import { CartCost } from '../Model/cost';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartDetails: any = [];
  public cartEvent =  new Subject<any>();
  public calculation = {
    quantity: 0,
    totalPrice: 0,
    discount: 0,
    payablePrice: 0
  };

  constructor() {
    // Retrieve cart data from localStorage on service initialization
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cartDetails = JSON.parse(storedCart);
      this.cartEvent.next(this.cartDetails);
    }
   }

  private updateLocalStorage() {
    // Save cart data to localStorage
    localStorage.setItem('cart', JSON.stringify(this.cartDetails));
    // Emit updated cart data to subscribers
    this.cartEvent.next(this.cartDetails);
  }

  public addAnotherProductToCart(productID: number, selectedSize: string, selectedColor: string) {
    const singleCart = {
      Id: productID,
      Size: selectedSize,
      Color: selectedColor,
      Quantity: 0,
      TotalPrice: 0,
      Discount: 0,
      PayablePrice: 0
    };

    this.cartDetails.push(singleCart);
    this.updateLocalStorage();
    this.cartEvent.next(this.cartDetails);
  }

  public updateCartDetails(Id: number, Quantity: number, TotalPrice: number, Discount: number, PayablePrice: number) {
    this.cartDetails.forEach(item => {
      if(item.Id == Id) {
        console.log('Okay');
      }
    });
    this.cartDetails = this.cartDetails.map(item => {
      if(item.id == Id) {
        item.Quantity = Quantity;
        item.TotalPrice = TotalPrice;
        item.Discount = Discount;
        item.PayablePrice = PayablePrice;
        return item;
      }
      return item;
    })
    this.updateLocalStorage();
  }
}
