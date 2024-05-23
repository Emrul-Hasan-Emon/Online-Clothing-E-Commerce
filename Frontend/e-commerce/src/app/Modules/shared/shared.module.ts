import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarContentComponent } from './navbar/navbar-content/navbar-content.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SingleFilterShowComponent } from './single-filter-show/single-filter-show.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    NavbarContentComponent,
    SingleFilterShowComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    DropdownModule,
    RouterModule,
    BrowserModule,
    ReactiveFormsModule
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    NavbarContentComponent,
    SingleFilterShowComponent
  ]
})
export class SharedModule { }
