import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrderTableComponent } from './order-table/order-table.component';
import { CustomerTableComponent } from './customer-table/customer-table.component';
import { ProductsTableComponent } from './products-table/products-table.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ShowProductDetailsComponent } from './show-product-details/show-product-details.component';
import { StockComponent } from './stock/stock.component';

const routes: Routes = [
  { path: "", component: AdminHomeComponent, children: [
      { path: "", component: DashboardComponent },
      { path: "order-table", component: OrderTableComponent },
      { path: "customer-table", component: CustomerTableComponent },
      { path: "productsTable", component: ProductsTableComponent },
      { path: "products-add", component: AddProductComponent },
      { path: "show-product-details/:id", component: ShowProductDetailsComponent},
      { path: "stock", component: StockComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
