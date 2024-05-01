import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { pantCollection } from 'src/app/Data/meansPant';
import { mensCollection } from 'src/app/Data/mensColletion';
import { jeansCollection } from 'src/app/Data/mensJeans';
import { Product } from 'src/app/Model/product';
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
  products: Product[];
  allProducts: Product[];

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

  filterProductsByBrand() {
    this.activatedRoute.queryParamMap.subscribe(
      (params) => {
        const brand = params.get('brand');
        if(brand) {
          this.products = this.allProducts.filter((item) => item?.Brand == brand);
        }
      }
    );
  }

  filterProductByCategoryId() {
    this.activatedRoute.queryParamMap.subscribe(
      (params) => {
        this.categoryId = params.get('categoryId');

        if(this.categoryId) {
          this.products = this.allProducts.filter((item) => item.CategoryID == this.categoryId);
        }
      }
    );
  }

  ngOnInit(): void {
    this.categoryId = '';

    this.productFetchService.getAllProducts().subscribe(
      (productList) => {
        console.log('Response: ', productList); 
        this.allProducts = productList;     
        this.products = this.allProducts;
        
        this.filterProductsByBrand();
        this.filterProductByCategoryId();
      },
      (error) => {
        console.log('An error occured while fetching products');        
      }
    );

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
    this.router.navigate(['product-details', product.id]);
  }
}
