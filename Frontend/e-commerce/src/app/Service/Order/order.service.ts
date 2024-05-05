import { Injectable } from '@angular/core';
import { Order } from 'src/app/Model/order';
import { OrderAddressService } from '../Order-Address/order-address.service';
import { CartService } from '../cart.service';
import { CartCost } from 'src/app/Model/cost';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orderDetails: Order = {
    userId: 0,
    name: '',
    contact: '',
    email: '',
    address: '',
    city: '',
    district: '',
    paymentNumber: '',
    transactionNumber: '',
    totalCost: 0,
    discount: 0,
    shippingCost: 0,
    payableCost: 0
  };

  private baseUrl: string = 'order';

  constructor(
    private orderAddressInfo: OrderAddressService,
    private cartService: CartService,
    private authService: AuthService,
    private http: HttpClient
  ) { 
    
  }

  public insertNewOrderDetails() {
    return this.http.post(`${this.baseUrl}/insert`, this.orderDetails);
  }

  public fetchOrderDetails(userId: string) {
    return this.http.get(`${this.baseUrl}/user/${userId}`);
  }
  
  public removeOrderDetails(orderId: string) {
    this.http.get(`${this.baseUrl}/remove/${orderId}`);
  }
  
  private setOrderAddressInfo(orderAddressInfo: any) {
    this.orderDetails.name = orderAddressInfo.name;
    this.orderDetails.contact = orderAddressInfo.contact;
    this.orderDetails.email = orderAddressInfo.email;
    this.orderDetails.address = orderAddressInfo.address;
    this.orderDetails.city = orderAddressInfo.city;
    this.orderDetails.district = orderAddressInfo.district;
  }

  private setOrderCost(cartCost: CartCost) {
    this.orderDetails.totalCost = cartCost.TotalPrice;
    this.orderDetails.discount = cartCost.Discount;
    this.orderDetails.payableCost = cartCost.PayablePrice;
  }

  public createNewOrder(number: string, transactionNumber: string) {
    this.setOrderAddressInfo(this.orderAddressInfo.getOrderAdressInfo());
    this.setOrderCost(this.cartService.getTotalCartCost());
    this.orderDetails.userId = +this.authService.userInfo.id;
    this.orderDetails.paymentNumber = number;
    this.orderDetails.transactionNumber = transactionNumber;
    console.log('Complete Order Details ---> ', this.orderDetails);
  }
}
