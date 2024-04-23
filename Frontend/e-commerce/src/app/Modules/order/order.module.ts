import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { ShowSingleOrderDetailsComponent } from './show-single-order-details/show-single-order-details.component';
import { FeatureModule } from '../feature/feature.module';



@NgModule({
  declarations: [
    OrderDetailsComponent,
    ShowSingleOrderDetailsComponent
  ],
  imports: [
    CommonModule,
    FeatureModule
  ],
  exports: [
    ShowSingleOrderDetailsComponent
  ]
})
export class OrderModule { }
