import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'auth';
  public isUserLogged = false;
  public isAdminLogged = false;
  public isDeliveryLogged = false;
  public userInfo: any;

  public loginCredentials = new BehaviorSubject<any>(null);
  public adminLoginAlert = new BehaviorSubject<Boolean>(null);

  constructor(private http: HttpClient) { }

  public adminLoggedIn(adminData: any) {
    this.isAdminLogged = true;
    this.validationHappened(adminData);
  }

  public userLoggedIn(userData: any) {
    this.isUserLogged = true;
    this.validationHappened(userData);
  }

  public deliveryManLoggedIn(deliveryManData: any) {
    this.isDeliveryLogged = true;
    this.validationHappened(deliveryManData);
  }

  public registerNewUser(registerUserData: any) {
    return this.http.post(`${this.baseUrl}/register`, registerUserData)
  }

  public authenticateUser(userData: any) {
    return this.http.post(`${this.baseUrl}/login`, userData)
  }

  public fetchAllUsers() {
    return this.http.get(`${this.baseUrl}/all`);
  }
  public fetchSpecificUserInfo(userId: number) {
    return this.http.get(`${this.baseUrl}/user/${userId}`);
  }
  public validationHappened(response: any) {
    this.userInfo = response;
    this.loginCredentials.next(response);
  }

  public validateUserThroughToken(token: string) {
    return this.http.get<string>(`${this.baseUrl}/validate`, { headers: { 'Authorization': token } });
  }

  public getLoginCredentials() {
    return this.loginCredentials.asObservable();
  }
}
