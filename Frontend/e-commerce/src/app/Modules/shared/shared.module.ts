import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarContentComponent } from './navbar/navbar-content/navbar-content.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    NavbarContentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    DropdownModule
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    NavbarContentComponent
  ]
})
export class SharedModule { }
