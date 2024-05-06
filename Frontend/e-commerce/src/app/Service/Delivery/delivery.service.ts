import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  private baseUrl: string = 'delivery';

  constructor(private http: HttpClient) { }

  public fetchAllDeliveryManDetails() {
    return this.http.get(`${this.baseUrl}/delivery`);
  }

  public fetchDeliveryQuantityInfo() {
    return this.http.get(`${this.baseUrl}/d/count`);
  }
}
