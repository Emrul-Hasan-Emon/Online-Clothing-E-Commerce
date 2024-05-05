import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/Service/Order/order.service';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-user-order-history',
  templateUrl: './user-order-history.component.html',
  styleUrls: ['./user-order-history.component.css']
})
export class UserOrderHistoryComponent implements OnInit {
  item = [1, 2, 3, 4, 5, 6];
  orderHistory: any;
  constructor(
    private authService: AuthService,
    private ordeService: OrderService,
    private router: Router
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

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return `${day} ${this.getMonthName(monthIndex)} ${year}`;
  }

  getMonthName(monthIndex: number): string {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[monthIndex];
  }

  showOrderDetails(orderID: number) {
    this.router.navigate(['single-order-history-details', orderID]);
  }
}
