import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { ShowSingleOrderDetailsComponent } from './show-single-order-details/show-single-order-details.component';
import { FeatureModule } from '../feature/feature.module';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { UserOrderHistoryComponent } from './user-order-history/user-order-history.component';



@NgModule({
  declarations: [
    OrderDetailsComponent,
    ShowSingleOrderDetailsComponent,
    OrderHistoryComponent,
    UserOrderHistoryComponent
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
