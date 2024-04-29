import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'auth';
  public isUserLogged = false;
  public isAdminLogged = false;
  public userInformation;

  public login = new Subject<any>();

  constructor(private http: HttpClient) { }

  public registerNewUser(registerUserData: any) {
    return this.http.post(`${this.baseUrl}/register`, registerUserData)
  }

  public authenticateUser(userData: any) {
    return this.http.post(`${this.baseUrl}/login`, userData)
  }

  public validationHappened(response: any) {
    this.userInformation = response;
    this.login.next(this.userInformation);
  }
}
