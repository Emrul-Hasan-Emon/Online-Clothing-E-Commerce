import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router: Router) {}

  ngOnInit(): void {
      this.catergory = navigation
      console.log("Selected Section: ", this.selectedCategory);
  }

  buttonClicked(clickedItem) {
    console.log("event: ", clickedItem);
    this.router.navigate(['products'],  {queryParams: { id: clickedItem.id } } )
  }
}
