import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {
  isDeliveryLoggedIn: boolean = false;
  userInfo;

  constructor(
    private authService: AuthService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.isDeliveryLoggedIn = this.authService.isDeliveryLogged;
    if(!this.isDeliveryLoggedIn) {
      this.route.navigate(['login']);
    }    
    this.authService.getLoginCredentials().subscribe(
      (userData: any) => {
        this.userInfo = userData;
        console.log("Delivery Man data --->  ", this.userInfo);
      }
    );
  }
}
