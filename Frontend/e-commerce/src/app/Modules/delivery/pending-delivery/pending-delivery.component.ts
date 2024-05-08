import { Component, OnInit } from '@angular/core';
import { DeliveryService } from 'src/app/Service/Delivery/delivery.service';
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

  constructor(
    private deliveryService: DeliveryService,
    private authService: AuthService
  ) {}
  
  private fetchPendingDelivery() {
    this.deliveryService.fetchPendingDelivery(+this.userDetails.id).subscribe(
      (deliveryDetails: any) => {
        this.pendingDeliveryDetails = deliveryDetails;
        console.log("Pending Delivery Details --> ", this.pendingDeliveryDetails);
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
}
