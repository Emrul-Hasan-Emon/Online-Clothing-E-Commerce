import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './payment/payment.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AddressInfoComponent } from './address-info/address-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValiditityMessageComponent } from './validitity-message/validitity-message.component';
import { PaymentMethodComponent } from './payment-method/payment-method.component';
import { PaymentRoutingModule } from './payment-routing.module';
import { SinglePaymentMethodComponent } from './single-payment-method/single-payment-method.component';

@NgModule({
  declarations: [
    PaymentComponent,
    PaymentSuccessComponent,
    CheckoutComponent,
    AddressInfoComponent,
    ValiditityMessageComponent,
    PaymentMethodComponent,
    SinglePaymentMethodComponent
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PaymentModule { }
