import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';
import { Product } from 'src/app/Model/product';
import { AuthService } from 'src/app/Service/auth.service';
import { ProductFetchService } from 'src/app/Service/product-fetch.service';

export interface Response {
  name: string,
  role: string
}

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productID: string;
  product: Product;
  isUserLoggedIn = false;
  isAdminLoggedIn = false;
  selectedSize= '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productFetchService: ProductFetchService,
    private authService: AuthService
  ) {}
  
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      parmas => {
        this.productID = parmas.get('id');
        this.fetchProductDetails();
      }
    )

    this.authService.login.subscribe(
      (response: Response) => {
        if(response.role == 'admin') {
          this.isAdminLoggedIn = true;
        }
        else {
          this.isUserLoggedIn = true;
        }
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
  addToCheckout() {
    if(!this.selectedSize) {
      alert('Please select a Size');
    }
    else {
      this.router.navigate(['cart']);
    }
}

  onSizeChange(size: any) {
    console.log('Selected Size ----> ', size);
    this.selectedSize = size.Name;
  }

  removeProduct() {

  }
}
