import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-payment-method',
  templateUrl: './single-payment-method.component.html',
  styleUrls: ['./single-payment-method.component.css']
})
export class SinglePaymentMethodComponent implements OnInit {
  
  paymentMethod: string;
  number: string;
  transactionNumber: string;
  
  constructor(private activatedRoute: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      (paramms) => {
        this.paymentMethod = paramms.get('method');
        console.log('Payment Method ---> ', this.paymentMethod);
      }
    )
  }
}
