import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryFetchService {
  private baseUrl: string = 'category';
  constructor(private http: HttpClient) { }

  public fetchCategories() {
    return this.http.get(this.baseUrl);
  }
}
