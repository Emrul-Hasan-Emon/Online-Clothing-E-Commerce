import { Injectable, signal } from '@angular/core';
import { Cart } from '../Model/cart';
import { Product } from '../Model/product';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartCost } from '../Model/cost';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartDetails: any = [];
  public cartSource =  new BehaviorSubject<any>(null);
  cartEvent = this.cartSource.asObservable();

  private baseUrl: string = 'cart';

  public cartCost = {
    TotalPrice: 0,
    Discount: 0,
    PayablePrice: 0
  };

  constructor(
    private http: HttpClient
  ) {
    const storedCart = localStorage.getItem('userCart');
    if (storedCart) {
      this.cartDetails = JSON.parse(storedCart);
      this.cartSource.next(this.cartDetails);
    }
   }

  public insertCartDetails(userId: number, orderId: number) {
    this.cartDetails.forEach(item => {
      item.UserId = userId;
      item.OrderId = orderId;
    });

    return this.http.post(`${this.baseUrl}/insert`, this.cartDetails);
  }

  public fetchCartDetailsForOrder(orderID: number) {
    
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
      OrderId: 0,
      UserId: 0,
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

  public setCartCost() {
    let totalPrice = 0;
    let discount = 0;
    let payablePrice = 0;

    this.cartDetails.forEach(item => {
        totalPrice += item.TotalPrice;
        discount += item.Discount;
        payablePrice += item.PayablePrice;
      }
    );

    this.cartCost.TotalPrice = totalPrice;
    this.cartCost.Discount = discount;
    this.cartCost.PayablePrice = payablePrice;
  }

  public getTotalCartCost() {
    console.log('Total Cart Cost ---> ', this.cartCost);
    return this.cartCost;
  }
}
