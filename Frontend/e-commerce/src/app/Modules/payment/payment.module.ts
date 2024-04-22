import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './payment/payment.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AddressInfoComponent } from './address-info/address-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ValiditityMessageComponent } from './validitity-message/validitity-message.component';

@NgModule({
  declarations: [
    PaymentComponent,
    PaymentSuccessComponent,
    CheckoutComponent,
    AddressInfoComponent,
    ValiditityMessageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class PaymentModule { }
