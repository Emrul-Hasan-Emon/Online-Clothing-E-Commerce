import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderAddressService {
  orderAddressInfo: any;
  constructor() { }

  public setOrderAddressInfo(addressInfo: any) {
    this.orderAddressInfo = addressInfo;
    localStorage.setItem('orderAddressInfo', addressInfo);
  }

  public getOrderAdressInfo() {
    // if(!this.orderAddressInfo) {
    //   // this.orderAddressInfo = JSON.parse(localStorage.getItem('orderAddressInfo'));
    // }
    return this.orderAddressInfo;
  }
}
