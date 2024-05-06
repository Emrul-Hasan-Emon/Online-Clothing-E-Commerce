import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/Service/Order/order.service';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.css']
})
export class OrderTableComponent implements OnInit {
  item = [1, 2,3 , 4, 5, 6, 7, 8, 9, 10];
  orderHistory: any;
  allOrderHistory: any;
  selectedStatus: any;

  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private router: Router
  ) {}

  sortOrderHistory() {
    this.orderHistory = this.orderHistory.sort((a, b) => {
      const dateComparison = new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime();
      if (dateComparison === 0) {
        return b.orderID - a.orderID; // If dates are the same, prioritize the order with higher order ID
      }
      return dateComparison;
    });
  }

  fetchOrderHistory() {
    this.orderService.fetchAllOrders().subscribe(
      (orderHistory: any) => {
        console.log('Order History ---> ', orderHistory);
        this.orderHistory = orderHistory;
        this.allOrderHistory = orderHistory;
        this.sortOrderHistory();
      }
    );
  }

  ngOnInit(): void {
    this.selectedStatus = 'all';
   this.fetchOrderHistory();
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

  showOrderDetails(orderID: number, status: string) {
    this.router.navigate(['single-order-history-details', orderID], { queryParams: { status: status } });
  }

  onStatusChange() {
    console.log('Selected Status ---> ', this.selectedStatus);
    this.orderHistory = this.allOrderHistory.filter(order => 
      order.status.toLowerCase() === this.selectedStatus.toLowerCase()
    );
    if(this.selectedStatus === 'all') {
      this.orderHistory = this.allOrderHistory;
    }
    this.sortOrderHistory();
  }
}
