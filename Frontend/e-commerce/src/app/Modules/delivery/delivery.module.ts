import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveryHomeComponent } from './delivery-home/delivery-home.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { DeliveryRoutingModule } from './delivery-routing.module';



@NgModule({
  declarations: [
    DeliveryHomeComponent,
    DeliveryComponent
  ],
  imports: [
    CommonModule,
    DeliveryRoutingModule
  ]
})
export class DeliveryModule { }
