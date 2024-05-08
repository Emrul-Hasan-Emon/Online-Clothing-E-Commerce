import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrderTableComponent } from './order-table/order-table.component';
import { ProductsTableComponent } from './products-table/products-table.component';
import { CustomerTableComponent } from './customer-table/customer-table.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ShowProductDetailsComponent } from './show-product-details/show-product-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';

@NgModule({
  declarations: [
    AdminHomeComponent,
    DashboardComponent,
    OrderTableComponent,
    ProductsTableComponent,
    CustomerTableComponent,
    AddProductComponent,
    ShowProductDetailsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AutoCompleteModule
  ],
})
export class AdminModule { }
