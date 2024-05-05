import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/Service/cart.service';
import { ProductFetchService } from 'src/app/Service/product-fetch.service';

@Component({
  selector: 'app-show-single-order-details',
  templateUrl: './show-single-order-details.component.html',
  styleUrls: ['./show-single-order-details.component.css']
})
export class ShowSingleOrderDetailsComponent implements OnInit {
  orderID;
  orderDetails;
  productDetails;
  orderStatus;

  constructor(
    private cartService: CartService,
    private activatedRoute: ActivatedRoute,
    private productFetchService: ProductFetchService
  ) {}

  private fetchProductDetails(productId: string) {
    this.productFetchService.getSpecificProduct(productId).subscribe(
      (productDetails: any) => {
        console.log('Product Details ---> ', productDetails);
        this.productDetails = productDetails;
      }
    )
  }
  private fetchOrderDetails() {
    this.cartService.fetchCartDetailsForOrder(this.orderID).subscribe(
      (orderDetails: any) => {
        this.orderDetails = orderDetails;
        console.log(orderDetails);
      },
      (error) => {
        alert('An error occured while fetching order details');
      }
    )
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.orderStatus = params['status'];
      console.log('Received status:', status);
    });

    this.activatedRoute.paramMap.subscribe(
      (params) => {
        this.orderID = params.get('id');
        console.log('orderId --> ', this.orderID);
        this.fetchOrderDetails();
      }
    )
  }
}
