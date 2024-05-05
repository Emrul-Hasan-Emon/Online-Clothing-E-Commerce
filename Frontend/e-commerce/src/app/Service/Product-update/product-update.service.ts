import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductUpdateService {
  private productDetails: any;
  private baseUrl: string = 'products'
  public productUpdateEvent =  new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { }

  public updateProducts(product: any, productId: string) {
    return this.http.post(`${this.baseUrl}/update/${productId}`, product);
  }

  public setProductDetailsForProduct(productDetails: any) {
    this.productDetails = productDetails;
    this.productUpdateEvent.next(this.productDetails);
  }

  public getProductDetailsForProduct() {
    return this.productUpdateEvent.asObservable();
  }
}
