import { Component, Input, OnInit } from '@angular/core';
import { navigation } from 'src/app/Data/nav-content';

@Component({
  selector: 'app-navbar-content',
  templateUrl: './navbar-content.component.html',
  styleUrls: ['./navbar-content.component.css']
})
export class NavbarContentComponent implements OnInit {
  catergory: any;
  @Input() // The input will come from NavBar Component
  selectedCategory: any;

  ngOnInit(): void {
      this.catergory = navigation
      console.log("Selected Section: ", this.selectedCategory);
      
  }
}
