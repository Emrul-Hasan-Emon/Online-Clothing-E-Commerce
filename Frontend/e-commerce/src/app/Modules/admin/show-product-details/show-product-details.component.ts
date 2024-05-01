import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/Model/product';
import { ProductFetchService } from 'src/app/Service/product-fetch.service';

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.css']
})
export class ShowProductDetailsComponent implements OnInit {
  product: Product;
  productID: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productFetchService: ProductFetchService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      (params) => {
        this.productID = params.get('id');
        this.fetchProductDetails();
      }
    )
  }

  private fetchProductDetails() {
    this.productFetchService.getSpecificProduct(this.productID).subscribe(
      (productDetails: Product) => {
        this.product = productDetails;
        console.log('Product Details ---> ', this.product);
      },
      (error) => {
        alert('An error occured while fetching product details');
      }
    )
  }
}
