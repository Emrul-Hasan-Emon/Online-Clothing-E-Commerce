import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveryHomeComponent } from './delivery-home/delivery-home.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { DeliveryRoutingModule } from './delivery-routing.module';
import { PendingDeliveryComponent } from './pending-delivery/pending-delivery.component';
import { CompletedDeliveryComponent } from './completed-delivery/completed-delivery.component';
import { TotalEarningsComponent } from './total-earnings/total-earnings.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DeliveryHomeComponent,
    DeliveryComponent,
    PendingDeliveryComponent,
    CompletedDeliveryComponent,
    TotalEarningsComponent
  ],
  imports: [
    CommonModule,
    DeliveryRoutingModule,
    FormsModule
  ]
})
export class DeliveryModule { }
