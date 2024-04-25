import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../Model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductFetchService {
  private productUrl = 'products';
  constructor(private http: HttpClient) { }

  public getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productUrl);
  }

  public getSpecificProduct(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.productUrl}/${productId}`);
  }
}
