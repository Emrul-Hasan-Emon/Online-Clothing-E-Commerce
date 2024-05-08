import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  private baseUrl: string = 'delivery';

  constructor(private http: HttpClient) { }

  public changeDeliveryOrderStatus(orderId: number) {
    return this.http.get(`${this.baseUrl}/change/${orderId}`);
  }

  public fetchCompletedDelivery(userID: number, status: string) {
    const d = {
      "userID": userID,
      "orderStatus": status
    };
    return this.http.post(`${this.baseUrl}/info`, d);
  }

  public fetchPendingDelivery(userID: number, status: string) {
    const d = {
      "userID": userID,
      "orderStatus": status
    };

    return this.http.post(`${this.baseUrl}/info`, d);
  }

  public fetchDeliveredDelivery(userID: number) {
    const d = {
      "userID": userID,
      "orderStatus": "Delivered"
    };

    return this.http.post(`${this.baseUrl}/info`, d);
  }

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
