import { HostListener } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Service/auth.service';
import { CartService } from 'src/app/Service/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  logoImagePath = "https://i.pinimg.com/originals/cb/ca/38/cbca38012ddfa7faaab7591df95c2b5a.png";
  isNavBarContentOpen: boolean;
  currentSection: string;
  isLogged = false;
  name = '';
  totalCart: number = 0;
  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
      this.isNavBarContentOpen = false;
      this.currentSection = "";
  

      this.authService.getLoginCredentials().subscribe(
        (response) => {
          this.name = response?.name;
          if(this.name) {
            this.isLogged = true;
          }
          console.log('Name: ', this.name);
        }
      )

      this.cartService.getCartDetails().subscribe(
        (cartDetails) => {
          this.totalCart = cartDetails.length;

          console.log('Total Number of Product in Cart: ', this.totalCart);
        }
      )
  }

  openNavBarContent(navBarItem: string) {
    this.isNavBarContentOpen = true;
    this.currentSection = navBarItem;
  }

  closeNavBarContent() {
    this.isNavBarContentOpen = false;
  }

  buttonClickedOrNot(openButtons: any, event: MouseEvent): boolean {
    for (const button of openButtons) {
      if (button.contains(event.target as Node)) {
        return true;
      }
    }
    return false;
  }
  

  @HostListener('document: click', [`$event`])
  onDocumentClick(event: MouseEvent) {
    const modalContainer = document.querySelector(".modal-container");
    const openButtons = document.querySelectorAll(".open-button");
    let clickInsideButton = this.buttonClickedOrNot(openButtons, event);

    if (modalContainer && !clickInsideButton && this.isNavBarContentOpen) {
      this.closeNavBarContent();
    }
  }

  logoutClicked() {
    this.isLogged = false;
    localStorage.removeItem('token');
    localStorage.removeItem('userinfo');
  }

  navigateToCartDetails() {
    this.router.navigate(['cart-show']);
  }

  navigateToLogin() {
    console.log('Login');
    this.router.navigate(['login']);
  }
}
