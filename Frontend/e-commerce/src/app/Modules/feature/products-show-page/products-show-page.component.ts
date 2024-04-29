import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { pantCollection } from 'src/app/Data/meansPant';
import { mensCollection } from 'src/app/Data/mensColletion';
import { jeansCollection } from 'src/app/Data/mensJeans';
import { Sort } from 'src/app/Model/sortmodel';
import { ProductFetchService } from 'src/app/Service/product-fetch.service';

@Component({
  selector: 'app-products-show-page',
  templateUrl: './products-show-page.component.html',
  styleUrls: ['./products-show-page.component.css']
})
export class ProductsShowPageComponent implements OnInit {
  sortingOptions: Sort[];
  selectedSortOption: Sort;
  categoryName: string;
  categoryId;
  selectedCategories: any[] = [];
  products: any;
  allProducts: any;

  categories: any[] = [
      { name: 'Accounting', key: 'A' },
      { name: 'Marketing', key: 'M' },
      { name: 'Production', key: 'P' },
      { name: 'Research', key: 'R' }
  ];

  constructor( 
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productFetchService: ProductFetchService
  ) { }

  
  ngOnInit(): void {
    this.categoryId = '';

    this.productFetchService.getAllProducts().subscribe(
      (productList) => {
        console.log('Response: ', productList); 
        this.allProducts = productList;     
        this.products = this.allProducts;

        this.activatedRoute.queryParamMap.subscribe(
          (params) => {
            this.categoryId = params.get('id');

            // console.log('Category ID ----> ', this.categoryId);
            // console.log('Products ------> ', this.products);

            if(this.categoryId) {
              this.products = this.allProducts.filter((item) => item.CategoryID == this.categoryId);
            }
          }
        )
      },
      (error) => {
        console.log('An error occured while fetching products');        
      }
    )

    this.sortingOptions = [
      { name: "Sort By Price", code: "sp"},
      { name: "Sort By Name", code: "sn" }
    ]
    this.selectedSortOption = null;
  }

  onSortSelect(event) {
    console.log("Event: ", event);
  }

  sortOptionsSelected(event) {
    console.log("Event in Parent: ", event);
  }

  showProductDetails(product: any) {
    // console.log('Product ------> ', product);
    this.router.navigate(['product-details', product.ID]);
  }
}
