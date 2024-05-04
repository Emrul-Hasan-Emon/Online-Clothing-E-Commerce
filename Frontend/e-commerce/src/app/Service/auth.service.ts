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


  public loginCredentials = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { }

  public registerNewUser(registerUserData: any) {
    return this.http.post(`${this.baseUrl}/register`, registerUserData)
  }

  public authenticateUser(userData: any) {
    return this.http.post(`${this.baseUrl}/login`, userData)
  }

  public fetchSpecificUserInfo(userId: number) {
    return this.http.get(`${this.baseUrl}/user/${userId}`);
  }
  public validationHappened(response: any) {
    this.loginCredentials.next(response);
  }

  public validateUserThroughToken(token: string) {
    return this.http.get<string>(`${this.baseUrl}/validate`, { headers: { 'Authorization': token } });
  }

  public getLoginCredentials() {
    return this.loginCredentials.asObservable();
  }
}
