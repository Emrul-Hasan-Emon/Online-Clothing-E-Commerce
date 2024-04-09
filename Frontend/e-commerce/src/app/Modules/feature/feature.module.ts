import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { CarouselComponent } from './home/carousel/carousel.component';
import { HomeProductCardComponent } from './home/home-product-card/home-product-card.component';
import { ProductSliderComponent } from './home/product-slider/product-slider.component';
import { CarouselModule } from 'primeng/carousel';
import { ProductsShowPageComponent } from './products-show-page/products-show-page.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DividerModule } from 'primeng/divider';
import { CheckboxModule } from 'primeng/checkbox';
import { SharedModule } from '../shared/shared.module';
import { FeatureRoutingModule } from './feature-routing.module';
import { CartComponent } from './cart/cart.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

@NgModule({
  declarations: [
    HomeComponent,
    CarouselComponent,
    HomeProductCardComponent,
    ProductSliderComponent,
    ProductsShowPageComponent,
    CartComponent,
    ProductDetailsComponent
  ],
  imports: [
    FormsModule,
    BrowserAnimationsModule,
    CommonModule,
    CarouselModule,
    DropdownModule,
    DividerModule,
    CheckboxModule,
    SharedModule,
    FeatureRoutingModule
  ],
  exports: [
    HomeComponent,
    CarouselComponent,
    HomeProductCardComponent,
    ProductSliderComponent,
    ProductsShowPageComponent
  ]
})
export class FeatureModule { }
