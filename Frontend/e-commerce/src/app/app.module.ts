import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuModule } from 'primeng/menu';
import { FeatureModule } from './Modules/feature/feature.module';
import { SharedModule } from './Modules/shared/shared.module';
import { OrderHistoryComponent } from './Modules/order/order-history/order-history.component';
import { AdminModule } from './Modules/admin/admin.module';
import { PaymentModule } from './Modules/payment/payment.module';
import { OrderModule } from './Modules/order/order.module';

@NgModule({
  declarations: [
    AppComponent,
    OrderHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    MenuModule,
    FeatureModule,
    SharedModule,
    AdminModule,
    PaymentModule,
    OrderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
