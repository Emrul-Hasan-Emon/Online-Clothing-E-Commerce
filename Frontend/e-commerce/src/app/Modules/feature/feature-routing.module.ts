import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsShowPageComponent } from './products-show-page/products-show-page.component';


const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "products", component: ProductsShowPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class FeatureRoutingModule { }
