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
  colors =  [];
  sizes = [];
  colorsOptions = [];
  sizeOptions = [];
  discountedPrice: number;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productFetchService: ProductFetchService,
    private authService: AuthService,
    private cartService: CartService
  ) {}
  
  fetchAllColors() {
    var uniqueColors = new Set<string>();
    var uniqueSizes = new Set<string>();

    this.product.Size.forEach(size => {
      uniqueColors.add(size.Color);
      uniqueSizes.add(size.Name);
    });
    
    this.colorsOptions = Array.from(uniqueColors);
    this.sizeOptions = Array.from(uniqueSizes);

    this.colors = this.colorsOptions;
    this.sizes = this.sizeOptions;
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      parmas => {
        this.productID = parmas.get('id');
        this.fetchProductDetails();
      }
    )

    this.authService.getLoginCredentials().subscribe(
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
        this.discountedPrice = this.product.Price -  ((this.product.Discount * this.product.Price) / 100);
        console.log('Product Details: ', productDetails);   
        this.fetchAllColors();     
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
    } else if(this.productQuantity == 0) {
      alert('Please select quantity');
    }
    else {
      this.cartService.addAnotherProductToCart(this.productID, this.product, this.selectedSize, this.color, this.productQuantity);
      this.router.navigate(['cart-show']);
    }
  }

  undoSelection() {
    this.selectedSize = '';
    this.color = '';
    this.fetchAllColors();
  }

  onSizeChange(size: string) {
    if(!this.color) {
      this.selectedSize = size;
      this.filterColors();
    }
    else {
      this.selectedSize = size;
    }
  }

  filterSizes() {
    var uniqueSizes = new Set<string>();
    this.product.Size.forEach(size => {
      if(size.Color === this.color) {
        uniqueSizes.add(size.Name);
      }
    });

    this.sizes = Array.from(uniqueSizes);
  }

  filterColors() {
    var uniqueColors = new Set<string>();
    this.product.Size.forEach(size => {
      if(size.Name === this.selectedSize) {
        uniqueColors.add(size.Color);
      }
    });

    this.colors = Array.from(uniqueColors);
  }

  onColorChange(color: string) {
    if(!this.selectedSize) {
      this.color = color;
      this.filterSizes();
    } else {
      this.color = color;
    }
  }
  removeProduct() {

  }
  decrementQuantity() {
    this.productQuantity--;
  }

  incrementQuantity() {
    if(!this.color) {
      alert('Please a color');
    }
    else if(!this.selectedSize) {
      alert('Please select size');
    }
    else {
      var maxQuantity: number;
      this.product.Size.forEach(size => {
        if(size.Color === this.color && size.Name === this.selectedSize) {
          maxQuantity = size.Quantity;
        }
      });
      if(this.productQuantity === maxQuantity) {
        alert('Maximum Quantity Limit Reached');
      } 
      else {
        this.productQuantity++;
      }
    }
  }

}
