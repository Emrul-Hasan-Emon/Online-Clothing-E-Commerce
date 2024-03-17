import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CarouselComponent } from './home/carousel/carousel.component';
import { ProductSliderComponent } from './home/product-slider/product-slider.component';
import { HomeProductCardComponent } from './home/home-product-card/home-product-card.component';
import { CarouselModule } from 'primeng/carousel';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { MenuModule } from 'primeng/menu';
import { NavbarContentComponent } from './navbar/navbar-content/navbar-content.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CarouselComponent,
    ProductSliderComponent,
    HomeProductCardComponent,
    NavbarComponent,
    NavbarContentComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule,
    NgbModule,
    MenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
