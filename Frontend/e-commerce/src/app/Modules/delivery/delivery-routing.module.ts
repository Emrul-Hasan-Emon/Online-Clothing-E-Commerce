import { NgModule } from "@angular/core";
import { Route, RouterModule, Routes } from "@angular/router";
import { DeliveryComponent } from "./delivery/delivery.component";
import { DeliveryHomeComponent } from "./delivery-home/delivery-home.component";
import { PendingDeliveryComponent } from "./pending-delivery/pending-delivery.component";
import { CompletedDeliveryComponent } from "./completed-delivery/completed-delivery.component";
import { TotalEarningsComponent } from "./total-earnings/total-earnings.component";

const routes: Routes = [
    { path: "", component: DeliveryComponent, children: [
        { path: "", component: DeliveryHomeComponent },
        { path: "pending", component: PendingDeliveryComponent },
        { path: "completed", component: CompletedDeliveryComponent },
        { path: "earnings", component: TotalEarningsComponent }
    ] }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class DeliveryRoutingModule { }