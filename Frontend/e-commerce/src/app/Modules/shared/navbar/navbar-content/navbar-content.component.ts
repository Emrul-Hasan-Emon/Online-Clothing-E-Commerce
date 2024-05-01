import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { navigation } from 'src/app/Data/nav-content';
import { Category } from 'src/app/Model/category';
import { CategoryFetchService } from 'src/app/Service/Category Fetch/category-fetch.service';

@Component({
  selector: 'app-navbar-content',
  templateUrl: './navbar-content.component.html',
  styleUrls: ['./navbar-content.component.css']
})
export class NavbarContentComponent implements OnInit {
  categories: Category[];
  selectedCategories: Category[];
  catergory: any;
  @Input() // The input will come from NavBar Component
  selectedCategory;

  brands = ['A', 'B', 'C', 'D', 'E'];

  constructor(
    private router: Router,
    private categoryFetch: CategoryFetchService
  ) {}

  ngOnInit(): void {
      this.catergory = navigation
      console.log("Selected Section: ", this.selectedCategory);

      this.categoryFetch.fetchCategories().subscribe(
        (categories: Category[]) => {
          this.categories = categories
          console.log('Categories ---> ', categories);
          console.log('Selected Category --> ', this.selectedCategory);
          
          this.filterCategory();
        },
        (error) => {
          alert('An error occured while fetching categories');
        }
      )
  }

  filterCategory() {
    this.selectedCategories = this.categories.filter(categoryItem => categoryItem.Gender === this.selectedCategory);
    console.log('Filtered Category ---> ', this.selectedCategories);
  }

  categorySelected(categoryItem: Category) {
    this.router.navigate(['products'], { queryParams : { categoryId: categoryItem.CategoryID } } );
  }

  brandSelected(brand: string) {
    this.router.navigate(['products'], { queryParams : { brand: brand } } );
  }
}
