import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { LoginComponent } from './Modules/auth/login/login.component';
import { RegisterComponent } from './Modules/auth/register/register.component';
import { PaymentMethodComponent } from './Modules/payment/payment-method/payment-method.component';
import { SinglePaymentMethodComponent } from './Modules/payment/single-payment-method/single-payment-method.component';
import { UserOrderHistoryComponent } from './Modules/order/user-order-history/user-order-history.component';
import { DeliveryHomeComponent } from './Modules/delivery/delivery-home/delivery-home.component';

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
  { path: "cart-show", component: CartComponent },
  { path: "product-details/:id", component: ProductDetailsComponent },
  { path: "products", component: ProductsShowPageComponent },
  { path: "checkout/payment/:id", component: PaymentComponent },
  { path: "payment-success", component: PaymentSuccessComponent },
  { path: "orderhistory", component: OrderHistoryComponent},
  { path: "user-order-history", component: UserOrderHistoryComponent},
  { path: "order/:id", component: OrderDetailsComponent },
  { path: "", component: HomeComponent },
  { path: "checkout", component: CheckoutComponent},
  { path: "single-order-history-details/:id", component: ShowSingleOrderDetailsComponent},
  { path: "payment-method", component: PaymentMethodComponent},
  { 
    path: 'admin',
    loadChildren: () => import('./Modules/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'dl',
    loadChildren: () => import('./Modules/delivery/delivery.module').then(m => m.DeliveryModule)
  },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "single-payment-method/:method", component: SinglePaymentMethodComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
