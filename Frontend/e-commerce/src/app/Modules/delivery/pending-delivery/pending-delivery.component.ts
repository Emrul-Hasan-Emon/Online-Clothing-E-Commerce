import { Component, OnInit } from '@angular/core';
import { DeliveryService } from 'src/app/Service/Delivery/delivery.service';
import { OrderService } from 'src/app/Service/Order/order.service';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-pending-delivery',
  templateUrl: './pending-delivery.component.html',
  styleUrls: ['./pending-delivery.component.css']
})
export class PendingDeliveryComponent implements OnInit {
  flag: boolean = false;
  pendingDeliveryDetails;
  userDetails;
  orderDetails;

  constructor(
    private deliveryService: DeliveryService,
    private authService: AuthService,
    private orderService: OrderService
  ) {}
  
  private fetchOrderForPendingDelivery() {
    this.orderService.fetchAllOrders().subscribe(
      (orders: any) => {
        console.log("All orders: ", orders);
        var orderIds = [];
        for (let idx = 0; idx < this.pendingDeliveryDetails.length; idx++) {
          orderIds.push(this.pendingDeliveryDetails[idx].orderID);
        }
        this.orderDetails = orders.filter(order => orderIds.includes(order.orderID));
        console.log("Filtered Orders: ", this.orderDetails);
      }
    )
  }
  private fetchPendingDelivery() {
    this.deliveryService.fetchPendingDelivery(+this.userDetails.id, "Shipping").subscribe(
      (deliveryDetails: any) => {
        this.pendingDeliveryDetails = deliveryDetails;
        console.log("Pending Delivery Details --> ", this.pendingDeliveryDetails);
        this.fetchOrderForPendingDelivery();
      },
      (error) => {
        alert('An error occured while fetching pending delivery information');
      }
    );
  }

  private getUserCredentials() {
    this.authService.getLoginCredentials().subscribe(
      (response: any) => {
        this.userDetails = response;
      }
    );
  }

  ngOnInit(): void {
    this.getUserCredentials();    
    this.fetchPendingDelivery();
  }

  deliverOrder() {
    const confirm = window.confirm(`Are you sure that you delivered order properly?`)
    if(confirm) {

    }
  }
}
