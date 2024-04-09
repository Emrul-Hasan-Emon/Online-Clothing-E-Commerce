import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrderTableComponent } from './order-table/order-table.component';
import { CustomerTableComponent } from './customer-table/customer-table.component';

const routes: Routes = [
  { path: "", component: AdminHomeComponent, children: [
      { path: "", component: DashboardComponent },
      { path: "order-table", component: OrderTableComponent },
      { path: "customer-table", component: CustomerTableComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
