import { Component, OnInit } from '@angular/core';
import { pantCollection } from 'src/app/Data/meansPant';
import { mensCollection } from 'src/app/Data/mensColletion';
import { jeansCollection } from 'src/app/Data/mensJeans';
import { Sort } from 'src/app/Model/sortmodel';

@Component({
  selector: 'app-products-show-page',
  templateUrl: './products-show-page.component.html',
  styleUrls: ['./products-show-page.component.css']
})
export class ProductsShowPageComponent implements OnInit {
  sortingOptions: Sort[];
  selectedSortOption: Sort;

  selectedCategories: any[] = [];
  products: any[] = [];

  categories: any[] = [
      { name: 'Accounting', key: 'A' },
      { name: 'Marketing', key: 'M' },
      { name: 'Production', key: 'P' },
      { name: 'Research', key: 'R' }
  ];

  ngOnInit(): void {
      this.sortingOptions = [
        { name: "Sort By Price", code: "sp"},
        { name: "Sort By Name", code: "sn" }
      ]
      this.selectedSortOption = null;

      this.products.push(mensCollection)
      console.log(this.products);
  }

  onSortSelect(event) {
    console.log("Event: ", event);
  }

  sortOptionsSelected(event) {
    console.log("Event in Parent: ", event);
    
  }
}
