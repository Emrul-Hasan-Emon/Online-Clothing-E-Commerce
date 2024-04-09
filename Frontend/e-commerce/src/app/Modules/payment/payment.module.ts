import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './payment/payment.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';



@NgModule({
  declarations: [
    PaymentComponent,
    PaymentSuccessComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PaymentModule { }
