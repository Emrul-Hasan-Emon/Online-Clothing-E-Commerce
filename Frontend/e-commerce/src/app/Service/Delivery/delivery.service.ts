import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  private baseUrl: string = 'delivery';

  constructor(private http: HttpClient) { }

  public assignOrderToADeliveryMan(userId: string, orderId: string) {
    const userID = +userId
    const orderID = +orderId

    const d = {
      "userID": userID,
      "orderID": orderID
    }

    return this.http.post(`${this.baseUrl}/place`, d);
  }

  public fetchDeliveryOrderStatus(orderId: string) {
    return this.http.get(`${this.baseUrl}/status/${orderId}`);
  }

  public fetchAllDeliveryManDetails() {
    return this.http.get(`${this.baseUrl}/delivery`);
  }

  public fetchDeliveryQuantityInfo() {
    return this.http.get(`${this.baseUrl}/d/count`);
  }
}
