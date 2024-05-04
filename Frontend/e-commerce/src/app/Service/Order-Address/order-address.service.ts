import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderAddressService {
  orderAddressInfo: any;
  constructor() { }

  public setOrderAddressInfo(addressInfo: any) {
    this.orderAddressInfo = addressInfo;
    localStorage.setItem('orderAddressInfo', this.orderAddressInfo);
  }

  public getOrderAdressInfo() {
    if(!this.orderAddressInfo) {
      this.orderAddressInfo = localStorage.getItem('orderAddressInfo');
    }
    return this.orderAddressInfo;
  }
}
