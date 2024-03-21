import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeatureModule } from './Modules/feature/feature.module';
import { HomeComponent } from './Modules/feature/home/home.component';
import { ProductsShowPageComponent } from './Modules/feature/products-show-page/products-show-page.component';

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
  { path: "", component: HomeComponent },
  { path: "products", component: ProductsShowPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
