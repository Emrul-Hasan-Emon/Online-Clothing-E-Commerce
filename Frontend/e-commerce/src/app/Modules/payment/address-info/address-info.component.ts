import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Service/auth.service';
import { Response } from '../../auth/login/login.component';
import { OrderAddressService } from 'src/app/Service/Order-Address/order-address.service';

@Component({
  selector: 'app-address-info',
  templateUrl: './address-info.component.html',
  styleUrls: ['./address-info.component.css']
})
export class AddressInfoComponent implements OnInit {
  checkoutForm: FormGroup;
  userData: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private orderAddressService: OrderAddressService
  ) {}

  private fetchUserInformation(userId: string) {
    this.authService.fetchSpecificUserInfo(+userId).subscribe(
      (response) => {
        if(response) {
          this.intiateAddressForm(response);
        }
        this.userData = response;
      }
    )
  }

  private intiateAddressForm(userResponse: any) {
    this.checkoutForm = new FormGroup({
      name: new FormControl(userResponse.name, Validators.required),
      contact: new FormControl(userResponse.phoneNumber, Validators.required),
      email: new FormControl(userResponse.email, [Validators.required, Validators.email]),
      address: new FormControl(userResponse.address, Validators.required),
      city: new FormControl(userResponse.city, Validators.required),
      district: new FormControl(userResponse.district, Validators.required)
    });
  }

  ngOnInit(): void {
    this.authService.getLoginCredentials().subscribe(
      (userResponse: Response) => {
        if(userResponse) {
          this.fetchUserInformation(userResponse.id);
        }
      }
    )
  }

  navigateToPaymentMethod() {
    const confirmed = window.confirm('Are you sure you want to submit?');
    if(confirmed) { 
      this.checkoutForm.get('name').setValue(this.userData.name);
      this.orderAddressService.setOrderAddressInfo(this.checkoutForm.value);
      this.router.navigate(['payment-method']);
    }
  }
}
