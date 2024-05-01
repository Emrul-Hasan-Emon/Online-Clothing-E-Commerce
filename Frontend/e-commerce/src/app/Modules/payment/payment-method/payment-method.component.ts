import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.css']
})
export class PaymentMethodComponent {
  
  paymentMethod: string;
  number: string;
  transactionNumber: string;
  constructor(private router: Router) {}
  
  expressPaymentMethod(method: any) {
    this.paymentMethod = method;

    const addressContainer = document.getElementById('address-container');
    if (addressContainer) {
      addressContainer.style.display = 'block';
    }
  }
}
