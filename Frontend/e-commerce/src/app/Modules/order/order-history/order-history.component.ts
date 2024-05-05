import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/Service/Order/order.service';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  item = [1, 2, 3, 4, 5, 6];
  orderHistory: any;

  constructor(
    private authService: AuthService,
    private ordeService: OrderService,
  ) {}

  fetchOrderHistory(userId: string) {
    this.ordeService.fetchOrderDetails(userId).subscribe(
      (orderHistory: any) => {
        console.log('Order History ---> ', orderHistory);
        this.orderHistory = orderHistory;
      }
    )
  }
  ngOnInit(): void {
    this.authService.getLoginCredentials().subscribe(
      (userInfo) => {
        console.log('User Information ---> ', userInfo);
        this.fetchOrderHistory(userInfo.id);
      }
    )
  }
}
