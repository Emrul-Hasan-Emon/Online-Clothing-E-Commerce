import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private baseUrl: string = 'products';

  constructor(
    private http: HttpClient
  ) { }

  public isPossible(cartDetails: any) {
    return this.http.post(`${this.baseUrl}/check`, cartDetails);
  }
}
