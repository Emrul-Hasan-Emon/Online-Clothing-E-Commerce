import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/Service/auth.service';
import { CartService } from 'src/app/Service/cart.service';
import { ProductFetchService } from 'src/app/Service/product-fetch.service';

@Component({
  selector: 'app-show-single-order-details',
  templateUrl: './show-single-order-details.component.html',
  styleUrls: ['./show-single-order-details.component.css']
})
export class ShowSingleOrderDetailsComponent implements OnInit {
  isUser = false;
  isAdmin = false;
  orderID;
  orderDetails: any;
  productDetails: any = [];
  orderStatus;
  totalPrice = 0;
  discount = 0;
  shippingCost = 60;
  payablePrice = 0;

  constructor(
    private cartService: CartService,
    private activatedRoute: ActivatedRoute,
    private productFetchService: ProductFetchService,
    private authService: AuthService
  ) {}

  calculateCost() {
    this.orderDetails.forEach(item => {
      this.totalPrice += item.TotalPrice;
      this.discount += item.Discount ? item.Discount : 0;
      this.payablePrice += item.PayablePrice;
    });

    this.payablePrice += this.shippingCost;
  }

  private fetchProductDetails(productId: string) {
    this.productFetchService.getSpecificProduct(productId).subscribe(
      (productDetails: any) => {
        console.log('Product Details ---> ', productDetails);
        this.productDetails.push(productDetails);
      }
    )
  }
  private fetchOrderDetails() {
    this.cartService.fetchCartDetailsForOrder(this.orderID).subscribe(
      (orderDetails: any) => {
        console.log('Order details ---->  ', orderDetails);
        this.orderDetails = orderDetails;

        orderDetails.forEach(item => {
          this.fetchProductDetails(item.ProductId);
        });
        this.calculateCost();
      },
      (error) => {
        alert('An error occured while fetching order details');
      }
    )
  }

  ngOnInit(): void {
    this.isUser = this.authService.isUserLogged;
    this.isAdmin = this.authService.isAdminLogged;
    this.isAdmin = true;

    console.log(this.isAdmin);

    this.activatedRoute.queryParams.subscribe(params => {
      this.orderStatus = params['status'];
    });

    this.activatedRoute.paramMap.subscribe(
      (params) => {
        this.orderID = params.get('id');
        console.log('orderId --> ', this.orderID);
        this.fetchOrderDetails();
      }
    )
  }

  statusFilterSelected(event) {
    console.log(event);
  }
}
