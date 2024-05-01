import { Injectable, signal } from '@angular/core';
import { Cart } from '../Model/cart';
import { Product } from '../Model/product';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartCost } from '../Model/cost';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartDetails: any = [];
  public cartSource =  new BehaviorSubject<any>(null);
  cartEvent = this.cartSource.asObservable();

  public cartTotalSource = new BehaviorSubject<CartCost>(null);
  cartTotal = this.cartTotalSource.asObservable();

  constructor() {
    const storedCart = localStorage.getItem('userCart');
    if (storedCart) {
      this.cartDetails = JSON.parse(storedCart);
      this.cartSource.next(this.cartDetails);
    }
   }

  private updateLocalStorage() {
    localStorage.setItem('userCart', JSON.stringify(this.cartDetails));
    this.cartSource.next(this.cartDetails);
  }

  public addAnotherProductToCart(product: Product, selectedSize: string, selectedColor: string, quantity: number) {
    let discountInfo = 0;
    if(product.Discount) discountInfo = product.Discount;

    const subPrice = quantity * product.Price;
    const discount = quantity * ((discountInfo * product.Price) / 100);
    const total = subPrice - discount;
    
    const singleCart = {
      Id: product.id,
      Size: selectedSize,
      Color: selectedColor,
      Quantity: quantity,
      TotalPrice: subPrice,
      Discount: discount,
      PayablePrice: total
    };

    this.cartDetails.push(singleCart);
    this.updateLocalStorage();
  }

  public updateCartDetails(Id, Quantity, TotalPrice, Discount, PayablePrice) {
  
    this.cartDetails = this.cartDetails.map(item => {
      if (item.Id === Id) {
        item.Quantity = Quantity;
        item.TotalPrice = TotalPrice;
        item.Discount = Discount;
        item.PayablePrice = PayablePrice;
        return item;
      }
      return item;
    });

    // console.log('Cart Service ---> Cart Details: ', this.cartDetails);
    this.updateLocalStorage();
  }

  public getCartDetails() {
    return this.cartSource.asObservable();
  }
}
