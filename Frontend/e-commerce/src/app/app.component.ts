import { Component, OnInit } from '@angular/core';
import { AuthService } from './Service/auth.service';
import { CartService } from './Service/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'e-commerce';
  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private router: Router
  ) {}

  private userValidation(userData: Response) {
    this.authService.userLoggedIn(userData);
    this.router.navigate(['home']);
  }

  private adminValidation(userData: Response) {
    this.authService.adminLoggedIn(userData);
    this.router.navigate(['admin']);
  }

  private deliveryManValidation(userData: Response) {
    this.authService.deliveryManLoggedIn(userData);
    this.router.navigate(['dl']);
  }

  ngOnInit(): void {
    const tokenString = localStorage.getItem('token');
    // console.log('Token String: ', tokenString);
  //  localStorage.removeItem('userCart');

    if(tokenString) {
      this.authService.validateUserThroughToken(tokenString).subscribe(
        (data: any) => {
          this.authService.isUserLogged = true
          const userData = JSON.parse(localStorage.getItem('userinfo'));
          console.log('User Information ---> ', userData);

          if(userData.role == 'user') {
            this.userValidation(userData);
          }
          else if(userData.role == 'admin') {
            this.adminValidation(userData);
          }
          else {
            this.deliveryManValidation(userData);
          }

          this.authService.validationHappened(userData);
        },
        (error) => {
          console.log(error);
        }
      )
    }
    this.cartService.setCartCost();
  }
}
