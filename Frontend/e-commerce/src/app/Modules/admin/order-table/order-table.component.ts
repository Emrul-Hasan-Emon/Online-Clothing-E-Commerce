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
  orderHistory: any;
  allOrderHistory: any;
  selectedStatus: any;
  names: string[] = [];
  startDate: string = '';
  endDate: string = '';
  filteredOrderHistory: any;
  filterMark: boolean = false;
  searchQuery: string = '';

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
        this.orderHistory = orderHistory;
        this.allOrderHistory = orderHistory;
        this.sortOrderHistory();
        console.log('Order History ---> ', orderHistory);
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

  onDateRangeFilter() {
    if (this.startDate && this.endDate) {
      this.orderHistory = this.allOrderHistory.filter(order => {
        const orderDate = new Date(order.orderDate);
        const startDate = new Date(this.startDate);
        const endDate = new Date(this.endDate);
        return orderDate >= startDate && orderDate <= endDate;
      });
      this.filterMark = true;
    } else {
      this.orderHistory = this.allOrderHistory;
    }
  }

  undoFilteres() {
    this.filterMark = false;
    this.selectedStatus = 'all';
    this.orderHistory = this.allOrderHistory;
  }

  onSearch() {
    this.onStatusChange();
    if (this.searchQuery.trim() !== '') {
      this.orderHistory = this.orderHistory.filter(order =>
        order.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.orderHistory = this.allOrderHistory;
    }
  }
}
