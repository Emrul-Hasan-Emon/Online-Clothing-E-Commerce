import { Component, OnInit } from '@angular/core';

interface Sort {
  name: string;
  code: string;
}

@Component({
  selector: 'app-products-show-page',
  templateUrl: './products-show-page.component.html',
  styleUrls: ['./products-show-page.component.css']
})
export class ProductsShowPageComponent implements OnInit {
  sortingOptions: Sort[];
  selectedSortOption: Sort;

  ngOnInit(): void {
      this.sortingOptions = [
        { name: "Sort By Price", code: "sp"},
        { name: "Sort By Name", code: "sn" }
      ]
      this.selectedSortOption = null;
  }

  onSortSelect(event) {
    console.log("Event: ", event);
  }
}
