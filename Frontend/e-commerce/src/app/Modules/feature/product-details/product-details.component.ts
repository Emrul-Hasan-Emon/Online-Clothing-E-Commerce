import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';
import { Product } from 'src/app/Model/product';
import { AuthService } from 'src/app/Service/auth.service';
import { CartService } from 'src/app/Service/cart.service';
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
  color = '';
  productQuantity = 0;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productFetchService: ProductFetchService,
    private authService: AuthService,
    private cartService: CartService
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
  addToCart() {
    if(!this.selectedSize) {
      alert('Please select a Size');
    }
    else if(!this.color) {
      alert('Please select a color');
    }
    else {
      this.cartService.addAnotherProductToCart(this.product, this.selectedSize, this.color, this.productQuantity);
      this.router.navigate(['cart-show']);
    }
}

  onSizeChange(size: any) {
    // console.log('Selected Size ----> ', size);
    this.selectedSize = size.Name;
  }

  onColorChange(color: string) {
    // console.log('Selected Color ---> ', color);
    this.color = color;
  }
  removeProduct() {

  }
  decrementQuantity() {
    this.productQuantity--;
  }

  incrementQuantity() {
    this.productQuantity++;
  }

}
