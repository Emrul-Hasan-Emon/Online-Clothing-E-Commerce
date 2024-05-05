import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductDeleteService } from 'src/app/Service/Product-Delete/product-delete.service';
import { ProductFetchService } from 'src/app/Service/product-fetch.service';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css']
})
export class ProductsTableComponent implements OnInit {
  item = [1, 2, 3, 4, 5, 6, 7, 8];
  products;

  constructor(
    private productFetchService: ProductFetchService,
    private router: Router,
    private productDeleteService: ProductDeleteService
  ) {}
  
  private fetchAllProducts() {
    this.productFetchService.getAllProducts().subscribe(
      (products) => {
        this.products = products;
        console.log('Products in Admin Panel ---> ', this.products);
      },
      (error) => {
        alert('An error occured while fetching products details');
      }
    );
  }

  ngOnInit(): void {
    this.fetchAllProducts();
  }

  viewProductDetails(product: any) {
    this.router.navigate(['admin/show-product-details', product.id]);
  }

  deleteProduct(product: any) {
    const confirmed = window.confirm('Are you sure you want to delete this product?');
    if(confirm) {
      this.productDeleteService.deleteProduct(product.id).subscribe(
        (response: any) => {
          alert('Product Deleted SuccessFully');
          this.fetchAllProducts();
        },
        (error) => {
          alert(`Product Couldn't be deleted`);
        }
      )
    }
  }
}
