import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.productFetchService.getAllProducts().subscribe(
      (products) => {
        this.products = products;
        console.log('Products in Admin Panel ---> ', this.products);
      },
      (error) => {
        alert('An error occured while fetching products details');
      }
    )
  }

  viewProductDetails(product: any) {
    this.router.navigate(['admin/show-product-details', product.ID]);
  }
}
