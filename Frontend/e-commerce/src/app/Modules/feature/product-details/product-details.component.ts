import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';
import { Product } from 'src/app/Model/product';
import { ProductFetchService } from 'src/app/Service/product-fetch.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productID: string;
  product: Product;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productFetchService: ProductFetchService
  ) {}
  
  ngOnInit(): void {
      this.activatedRoute.paramMap.subscribe(
        parmas => {
          this.productID = parmas.get('id');
          this.fetchProductDetails();
        }
      )
  }

  private fetchProductDetails() {
    this.productFetchService.getSpecificProduct(this.productID).pipe(
      // delay(5000)
    )
    .subscribe(
      (productDetails) => {
        this.product = productDetails
        console.log('Product Details: ', productDetails);        
      },
      (error) => {
        console.log('An error occured while fetching product details for product id: ', this.productID);
      }
    )
  }
  buttonClicked() {
    this.router.navigate(['cart']);
  }
}
