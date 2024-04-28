import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'auth';
  public isUserLogged = false;
  public isAdminLogged = false;
  public userInformation;
  public adminInformation;
  
  constructor(private http: HttpClient) { }

  public registerNewUser(registerUserData: any) {
    return this.http.post(`${this.baseUrl}/register`, registerUserData)
  }

  public authenticateUser(userData: any) {
    return this.http.post(`${this.baseUrl}/login`, userData)
  }
}
