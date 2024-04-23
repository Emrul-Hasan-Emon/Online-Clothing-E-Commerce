import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeatureModule } from './Modules/feature/feature.module';
import { HomeComponent } from './Modules/feature/home/home.component';
import { ProductsShowPageComponent } from './Modules/feature/products-show-page/products-show-page.component';
import { CartComponent } from './Modules/feature/cart/cart.component';
import { ProductDetailsComponent } from './Modules/feature/product-details/product-details.component';
import { CheckoutComponent } from './Modules/payment/checkout/checkout.component';
import { PaymentComponent } from './Modules/payment/payment/payment.component';
import { PaymentSuccessComponent } from './Modules/payment/payment-success/payment-success.component';
import { OrderHistoryComponent } from './Modules/order/order-history/order-history.component';
import { OrderDetailsComponent } from './Modules/order/order-details/order-details.component';
import { ShowSingleOrderDetailsComponent } from './Modules/order/show-single-order-details/show-single-order-details.component';

const routes: Routes = [
  // { 
  //   path: "home",
  //   loadChildren: () => import('./Modules/feature/feature.module').then(m => m.FeatureModule)
  // },
  // { path: "", redirectTo: '/home', pathMatch: 'full' },
  // { 
  //   path: "products",
  //   loadChildren: () => import('./Modules/feature/feature.module').then(m => m.FeatureModule)
  // }
  { path: "home", component: HomeComponent },
  { path: "cart", component: CartComponent },
  { path: "product-details/:id", component: ProductDetailsComponent },
  { path: "products", component: ProductsShowPageComponent },
  { path: "checkout/payment/:id", component: PaymentComponent },
  { path: "payment-success", component: PaymentSuccessComponent },
  { path: "order-history", component: OrderHistoryComponent },
  { path: "order/:id", component: OrderDetailsComponent },
  { path: "", component: ProductsShowPageComponent },
  { path: "checkout", component: CheckoutComponent},
  { path: "single-order-history-details", component: ShowSingleOrderDetailsComponent},
  { 
    path: 'admin',
    loadChildren: () => import('./Modules/admin/admin.module').then(m => m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
