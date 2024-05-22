import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private baseUrl: string = 'products';
  public stockUnavailableEvent =  new BehaviorSubject<any>(null);

  constructor(
    private http: HttpClient
  ) { }

  public isPossible(cartDetails: any) {
    return this.http.post(`${this.baseUrl}/check`, cartDetails);
  }

  public raiseStockUnavailableEvent(missingProductIds: any) {
    this.stockUnavailableEvent.next(missingProductIds);
  }

  public getMissingStockProductIds() {
    return this.stockUnavailableEvent.asObservable();
  }
}
