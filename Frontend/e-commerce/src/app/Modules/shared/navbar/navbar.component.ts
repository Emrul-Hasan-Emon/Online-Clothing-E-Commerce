import { HostListener } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Service/auth.service';

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

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
      this.isNavBarContentOpen = false;
      this.currentSection = "";
      this.isLogged = true;
      this.name = 'emrulHasan';
      
      this.authService.login.subscribe(
        (response) => {
          this.isLogged = true;
          this.name = response.name;

          console.log('Response -----> ', response);
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
}
