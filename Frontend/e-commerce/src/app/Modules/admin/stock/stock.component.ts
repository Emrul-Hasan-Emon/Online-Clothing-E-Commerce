import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { Product } from 'src/app/Model/product';
import { ProductFetchService } from 'src/app/Service/product-fetch.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  searchProductByName: string = '';
  mark: boolean = false;
  allProducts;
  searchOptions: string[] = [];
  singleProduct: Product; 

  constructor(
    private productFetchService: ProductFetchService,
    private router: Router
  ) {}

  private storeProductsName() {
    this.allProducts.forEach(product => {
      this.searchOptions.push(product.Name);
    });
  }

  private fetchAllProducts() {
    this.productFetchService.getAllProducts().subscribe(
      (products: any) => {
        this.allProducts = products;
        console.log(this.allProducts);
        this.storeProductsName();  
      },
      (error) => {
        alert('An unexpected occured');
      }
    )
  }

  ngOnInit(): void {
    this.fetchAllProducts();
  }

  filterCountry(event: AutoCompleteCompleteEvent) {
    this.searchOptions = this.searchOptions.filter(option => option.toLowerCase().includes(this.searchProductByName.toLowerCase()));
  }

  onSelect(event) {
    console.log('Event --> ', event);
    const value = event.value;
    this.allProducts.forEach(product => {
      if(value.toLowerCase() === product.Name.toLowerCase()) {
        this.singleProduct = product;
        this.mark = true;
      }
    });
    if(!this.mark) {
      alert('No product found with this name');
    }
  }
  
  navigateToProductDetails() {
    this.router.navigate(['admin/show-product-details', this.singleProduct.id]);
  }
}
