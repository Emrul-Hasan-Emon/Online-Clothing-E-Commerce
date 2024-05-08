import { Component, OnInit } from '@angular/core';
import { DeliveryService } from 'src/app/Service/Delivery/delivery.service';
import { OrderService } from 'src/app/Service/Order/order.service';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-completed-delivery',
  templateUrl: './completed-delivery.component.html',
  styleUrls: ['./completed-delivery.component.css']
})
export class CompletedDeliveryComponent implements OnInit {
  completedDelivery;
  userDetails;
  orderDetails
  totalEarnings: number = 0;
  totalOrder: number = 0;

  constructor(
    private deliveryService: DeliveryService,
    private authService: AuthService,
    private orderService: OrderService
  ) {}

  private getUserCredentials() {
    this.authService.getLoginCredentials().subscribe(
      (response: any) => {
        this.userDetails = response;
      }
    );
  }

  private fetchOrderForCompleteDelivery() {
    this.orderService.fetchAllOrders().subscribe(
      (orders: any) => {
        console.log("All orders: ", orders);
        var orderIds = [];
        for (let idx = 0; idx < this.completedDelivery.length; idx++) {
          orderIds.push(this.completedDelivery[idx].orderID);
          this.totalEarnings += 60;
          this.totalOrder++;
        }
        this.orderDetails = orders.filter(order => orderIds.includes(order.orderID));
        console.log("Filtered Orders: ", this.orderDetails);
      }
    );
  }

  private fetchCompletedDelivery() {
    this.deliveryService.fetchCompletedDelivery(+this.userDetails.id, "Delivered").subscribe(
      (deliveryDetails: any) => {
        this.completedDelivery = deliveryDetails;
        console.log("Completed Delivery Details ---->  ", this.completedDelivery);
        this.fetchOrderForCompleteDelivery();
      },
      (error) => {
        alert('An error occured while fetching completed delivery information');
      }
    )
  }

  ngOnInit(): void {
      this.getUserCredentials();
      this.fetchCompletedDelivery();
  }
}
