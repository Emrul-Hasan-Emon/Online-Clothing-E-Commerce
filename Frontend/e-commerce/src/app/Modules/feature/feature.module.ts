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

@NgModule({
  declarations: [
    HomeComponent,
    CarouselComponent,
    HomeProductCardComponent,
    ProductSliderComponent,
    ProductsShowPageComponent
  ],
  imports: [
    FormsModule,
    BrowserAnimationsModule,
    CommonModule,
    CarouselModule,
    DropdownModule
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
