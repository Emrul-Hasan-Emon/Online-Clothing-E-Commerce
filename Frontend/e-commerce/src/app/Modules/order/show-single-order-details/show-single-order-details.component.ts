import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { count } from 'rxjs';
import { DeliveryService } from 'src/app/Service/Delivery/delivery.service';
import { OrderService } from 'src/app/Service/Order/order.service';
import { AuthService } from 'src/app/Service/auth.service';
import { CartService } from 'src/app/Service/cart.service';
import { ProductFetchService } from 'src/app/Service/product-fetch.service';

@Component({
  selector: 'app-show-single-order-details',
  templateUrl: './show-single-order-details.component.html',
  styleUrls: ['./show-single-order-details.component.css']
})
export class ShowSingleOrderDetailsComponent implements OnInit, OnDestroy {
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
  deliveryInfo;
  status;
  deliveryOrderStatus: string = '';

  constructor(
    private cartService: CartService,
    private activatedRoute: ActivatedRoute,
    private productFetchService: ProductFetchService,
    private authService: AuthService,
    private deliveryService: DeliveryService,
    private orderService: OrderService
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

  formDeliveryManArray(quantityInfo: any, delivery: any) {
    const userCountArray = quantityInfo.map(quantity => {
      const user = delivery.find(deliveryPerson => deliveryPerson.id === quantity.userID);
      return {
        userID: quantity.userID,
        count: quantity.deliveryCount,
        name: user ? user.name: 'Delivery Man'
      };
    });
    this.deliveryInfo = userCountArray.sort((a, b) => a.count - b.count);
  }

  private doAdminJobs() {
    this.deliveryService.fetchAllDeliveryManDetails().subscribe(
      (delivery: any) => {
        this.deliveryService.fetchDeliveryQuantityInfo().subscribe(
          (quantityInfo: any) => {
            this.formDeliveryManArray(quantityInfo, delivery);
          },
          (error) => {
            alert(`delivery men details couldn't be fetched`);
          }
        )
      }, 
      (error) => {
        alert('delivery men details couldnt be fetched');
      }
    )
  }

  private fetchOrderStatus() {
    this.orderService.fetchOrderStatus(this.orderID).subscribe(
      (response: any) => {
        this.orderStatus = response.toString();
        this.status = this.orderStatus
      },
      (error) => {
        alert('An error occured while fetching order status');
      }
    );
  }

  private fetchDeliveryOrderStatus() {
    this.deliveryService.fetchDeliveryOrderStatus(this.orderID).subscribe(
      (response: any) => {
        this.deliveryOrderStatus = response.toString();
      }
    );
  }

  ngOnInit(): void {
    this.isUser = this.authService.isUserLogged;
    this.isAdmin = this.authService.isAdminLogged;
    this.isAdmin = true;
    
    if(this.isAdmin) {
      this.doAdminJobs();
    }
    console.log(this.isAdmin);

    this.activatedRoute.queryParams.subscribe(params => {
      this.orderStatus = params['status'];
    });

    this.activatedRoute.paramMap.subscribe(
      (params) => {
        this.orderID = params.get('id');
        console.log('orderId --> ', this.orderID);
        this.fetchOrderDetails();
        this.fetchOrderStatus();
        this.fetchDeliveryOrderStatus();
      }
    )
  }

  statusFilterSelected() {
    this.doAdminJobs();
  }

  private changeOrderStatus(status: string) {
    this.orderService.changeOrderStatus(this.orderID, status).subscribe(
      (response: any) => {
        alert('Order Change status is changed');
        this.orderStatus = "Shipping";
      },
      (error) => {
        alert('An error occured while changing order status');
      }
    )
  }

  assignOrder(d: any) {
    const confirm = window.confirm(`Are you sure to assign the order to ${d.name}?`);
    if(confirm) {
      this.deliveryService.assignOrderToADeliveryMan(d.userID, this.orderID).subscribe(
        (response: any) => {
          alert(`The order is assigned to ${d.name}`);
          this.changeOrderStatus("Shipping");
          this.doAdminJobs();
          this.fetchOrderStatus();
        },
        (error) => {
          alert('An error occured');
        }
      )
    }
  }

  ngOnDestroy(): void {
      if(this.status != this.orderStatus) {
        const confirm = window.confirm('Do you want change the order status?');
        if(confirm) {
          this.orderStatus = this.status;
          this.changeOrderStatus(this.status);
        }
      }
  }
}
