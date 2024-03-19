import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { CarouselComponent } from './home/carousel/carousel.component';
import { HomeProductCardComponent } from './home/home-product-card/home-product-card.component';
import { ProductSliderComponent } from './home/product-slider/product-slider.component';
import { CarouselModule } from 'primeng/carousel';



@NgModule({
  declarations: [
    HomeComponent,
    CarouselComponent,
    HomeProductCardComponent,
    ProductSliderComponent
  ],
  imports: [
    CommonModule,
    CarouselModule
  ],
  exports: [
    HomeComponent,
    CarouselComponent,
    HomeProductCardComponent,
    ProductSliderComponent
  ]
})
export class FeatureModule { }
