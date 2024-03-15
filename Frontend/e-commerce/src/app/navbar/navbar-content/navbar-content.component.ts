import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navbar-content',
  templateUrl: './navbar-content.component.html',
  styleUrls: ['./navbar-content.component.css']
})
export class NavbarContentComponent {
  catergory: any;
  @Input() // The input will come from NavBar Component
  selectedCategory: any;
}
