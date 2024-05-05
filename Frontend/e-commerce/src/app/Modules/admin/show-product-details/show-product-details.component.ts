import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/Model/product';
import { ProductDeleteService } from 'src/app/Service/Product-Delete/product-delete.service';
import { ProductUpdateService } from 'src/app/Service/Product-update/product-update.service';
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
    private productFetchService: ProductFetchService,
    private productDeleteService: ProductDeleteService,
    private productUpdateService: ProductUpdateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      (params) => {
        this.productID = params.get('id');
        this.fetchProductDetails();
      }
    );
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

  updateProduct() {
    const confirm = window.confirm('Are you sure you want to update this product?');
    if(confirm) {
      this.productUpdateService.setProductDetailsForProduct(this.product);
      this.router.navigate(['admin/products-add']);
    }
  }

  deleteProduct() {
    const confirm = window.confirm('Are you sure you want to delete this product?');
    if(confirm) {
      this.productDeleteService.deleteProduct(this.product.id.toString()).subscribe(
        (response: any) => {
          alert('Product Deleted SuccessFully');
          this.router.navigate(['admin/productsTable']);
        },
        (error) => {
          alert(`Product Couldn't be deleted`);
        }
      );
    }
  }
}
