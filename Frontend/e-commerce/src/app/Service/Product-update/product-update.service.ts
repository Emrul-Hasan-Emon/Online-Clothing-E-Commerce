import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductUpdateService {
  private productDetails: any;
  public productUpdateEvent =  new BehaviorSubject<any>(null);

  constructor() { }

  public setProductDetailsForProduct(productDetails: any) {
    this.productDetails = productDetails;
    this.productUpdateEvent.next(this.productDetails);
  }

  public getProductDetailsForProduct() {
    return this.productUpdateEvent.asObservable();
  }
}
