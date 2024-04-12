import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrderTableComponent } from './order-table/order-table.component';
import { ProductsTableComponent } from './products-table/products-table.component';
import { CustomerTableComponent } from './customer-table/customer-table.component';
import { AddProductComponent } from './add-product/add-product.component';


@NgModule({
  declarations: [
    AdminHomeComponent,
    DashboardComponent,
    OrderTableComponent,
    ProductsTableComponent,
    CustomerTableComponent,
    AddProductComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
})
export class AdminModule { }
