import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../Model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductPostService {
  private productUrl = 'products';
  constructor(private http: HttpClient) {}
  
  public insertProduct(product: Product) {
    return this.http.post(`${this.productUrl}/insert`, product);
  }
}
