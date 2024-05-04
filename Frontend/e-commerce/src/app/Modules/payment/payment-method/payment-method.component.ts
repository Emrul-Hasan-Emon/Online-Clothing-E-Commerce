import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderAddressService } from 'src/app/Service/Order-Address/order-address.service';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.css']
})
export class PaymentMethodComponent implements OnInit {
  
  paymentMethod: string;
  number: string;
  transactionNumber: string;
  orderAddressInfo: any;
  paymentForm: FormGroup;

  constructor(
    private router: Router,
    private orderAddressService: OrderAddressService
  ) {}
  
  private initiateForm() {
    this.paymentForm = new FormGroup({
      number: new FormControl('', Validators.required),
      transactionNumber: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.orderAddressInfo = this.orderAddressService.getOrderAdressInfo();  
    if(!this.orderAddressInfo) {
      alert('No address information found');
      this.router.navigate(['checkout']);
    }
    this.initiateForm();
  }

  expressPaymentMethod(method: any) {
    this.paymentMethod = method;
    
    const addressContainer = document.getElementById('address-container');
    if (addressContainer) {
      addressContainer.style.display = 'block';
    }
  }

  private checkData(): boolean {
    if(!this.number) {
      alert('Please insert payment number');
      return true;
    } else if(!this.transactionNumber) {
      alert('Please insert transaction number');
      return true;
    }
    return false;
  }
  
  submitPaymentDetails() {
    this.number = this.paymentForm.get('number').value;
    this.transactionNumber = this.paymentForm.get('transactionNumber').value;

    console.log(this.paymentForm.value);

    console.log(this.number);
    console.log(this.transactionNumber);
    if(!this.checkData()) {
      const confirmed = window.confirm('Are you sure you want to submit?');
      if(confirmed) {

      }
    }
  }
}
