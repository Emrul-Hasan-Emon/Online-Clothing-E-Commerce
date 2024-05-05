import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductDeleteService {
  private baseUrl: string = 'products';
  constructor(private http: HttpClient) { }

  public deleteProduct(productId: string) {
    return this.http.get(`${this.baseUrl}/delete/${productId}`);
  }
}
