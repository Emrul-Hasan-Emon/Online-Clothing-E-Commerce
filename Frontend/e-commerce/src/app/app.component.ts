import { Component, OnInit } from '@angular/core';
import { AuthService } from './Service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'e-commerce';
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const tokenString = localStorage.getItem('token');
    console.log('Token String: ', tokenString);
  //  localStorage.removeItem('userCart');

    if(tokenString) {
      this.authService.validateUserThroughToken(tokenString).subscribe(
        (data) => {
          this.authService.isUserLogged = true
          const userData = JSON.parse(localStorage.getItem('userinfo'));
          console.log('User Information ---> ', userData);

          if(userData.role == 'user') {
            this.authService.isUserLogged = true;
          } else if (userData.role == 'admin') {
            this.authService.isAdminLogged = true;
          }

          this.authService.validationHappened(userData);
        },
        (error) => {
          console.log(error);
        }
      )
    }
  }
}
